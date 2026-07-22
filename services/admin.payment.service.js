import { createAdminClient } from "@/lib/supabase/admin";

export const adminPaymentService = {
  /**
   * Get all payments with filtering and pagination
   */
  async getPayments({ status = 'all', search = '', page = 1, limit = 20 }) {
    const supabase = createAdminClient();
    
    let query = supabase
      .from('payments')
      .select('*, orders(order_number, customers(full_name))', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }
    
    if (search) {
      // Search by provider payment id or order id
      query = query.or(`provider_payment_id.ilike.%${search}%,provider_order_id.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      console.error("Error fetching payments:", error);
      throw error;
    }

    return { payments: data, totalCount: count };
  },

  /**
   * Get single payment by ID
   */
  async getPaymentById(id) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('payments')
      .select('*, orders(order_number, customers(full_name, email, phone))')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching payment details:", error);
      throw error;
    }

    return data;
  }
};
