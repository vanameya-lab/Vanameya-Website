import { createAdminClient } from "@/lib/supabase/admin";

export const adminOrderService = {
  /**
   * Get all orders with filtering and pagination
   */
  async getOrders({ status = 'all', paymentStatus = 'all', search = '', page = 1, limit = 20 }) {
    const supabase = createAdminClient();
    
    let query = supabase
      .from('orders')
      .select('*, customers(full_name, phone, email), products(name)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    if (paymentStatus !== 'all') {
      query = query.eq('payment_status', paymentStatus);
    }

    if (search) {
      // Basic text search on order number
      query = query.ilike('order_number', `%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }

    return { orders: data, totalCount: count };
  },

  /**
   * Get specialized list for Fulfillment Queue (only actionable states)
   */
  async getFulfillmentQueue() {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(full_name, phone), products(name)')
      .in('status', ['pending', 'processing', 'shipped'])
      .eq('payment_status', 'paid')
      .order('created_at', { ascending: true }); // Oldest first for queue

    if (error) {
      console.error("Error fetching fulfillment queue:", error);
      throw error;
    }

    return data;
  },

  /**
   * Get single order by ID with all relations
   */
  async getOrderById(id) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers(*),
        products(*),
        payments(*),
        order_events(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching order details:", error);
      throw error;
    }

    // Sort events
    if (data && data.order_events) {
      data.order_events.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }

    return data;
  },

  /**
   * Update order status and log event
   */
  async updateOrderStatus(orderId, newStatus, eventNote = null) {
    const supabase = createAdminClient();
    
    // Start a transaction-like sequence (Supabase JS doesn't have native transactions from client, 
    // but we can do sequential awaits)
    
    const { data, error: updateError } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Log Event
    const eventName = `Order marked as ${newStatus}`;
    const { error: eventError } = await supabase
      .from('order_events')
      .insert([
        {
          order_id: orderId,
          event: eventName,
          notes: eventNote || `Status updated to ${newStatus}`
        }
      ]);

    if (eventError) console.error("Failed to log order event:", eventError);

    return data;
  },

  /**
   * Delete an order by ID
   */
  async deleteOrder(orderId) {
    const supabase = createAdminClient();
    
    // Payments and Order Events should be deleted first if there are foreign key constraints without cascade,
    // but assuming Supabase handles cascading deletes for order_events and payments, we just delete the order.
    // If not, we might need to delete them manually. Let's try deleting the order first.
    const { data, error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error("Error deleting order:", error);
      throw error;
    }

    return data;
  }
};
