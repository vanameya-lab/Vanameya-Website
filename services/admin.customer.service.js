import { createAdminClient } from "@/lib/supabase/admin";

export const adminCustomerService = {
  /**
   * Get all customers with basic aggregate data
   */
  async getCustomers({ search = '', page = 1, limit = 20 }) {
    const supabase = createAdminClient();
    
    // We fetch customers and their orders to calculate aggregates in memory
    // For large scale, this should be a Supabase Database View or RPC function
    let query = supabase
      .from('customers')
      .select('*, orders(id, total, status)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }

    // Process aggregates
    const customers = data.map(c => {
      const validOrders = c.orders || [];
      const totalSpend = validOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
      
      return {
        ...c,
        orders_count: validOrders.length,
        total_spend: totalSpend
      };
    });

    return { customers, totalCount: count };
  },

  /**
   * Get single customer by ID with their complete history
   */
  async getCustomerById(id) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *,
        orders(*, products(name), payments(status, amount, provider)),
        reviews(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching customer details:", error);
      throw error;
    }
    
    // Sort orders newest first
    if (data.orders) {
      data.orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return data;
  },

  /**
   * Update a customer's information (like address, phone, etc.)
   */
  async updateCustomer(id, updates) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating customer:", error);
      throw error;
    }

    return data;
  }
};
