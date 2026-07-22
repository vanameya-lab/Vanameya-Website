import { createAdminClient } from "@/lib/supabase/admin";

export const adminProductService = {
  /**
   * Get all products for editing
   */
  async getProduct() {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return data;
  },

  /**
   * Update product details
   */
  async updateProduct(id, updates) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      throw error;
    }

    return data;
  }
};
