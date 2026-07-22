import { createAdminClient } from "@/lib/supabase/admin";

export const adminReviewService = {
  /**
   * Get all reviews for admin dashboard
   */
  async getAllReviews({ page = 1, limit = 20, status = 'all' }) {
    const supabase = createAdminClient();
    
    let query = supabase
      .from('reviews')
      .select('*, customers(full_name), products(name)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (status === 'approved') {
      query = query.eq('approved', true);
    } else if (status === 'pending') {
      query = query.eq('approved', false);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      console.error("Error fetching admin reviews:", error);
      throw error;
    }

    return { reviews: data, totalCount: count };
  },

  /**
   * Approve or reject a review
   */
  async updateReviewStatus(id, approved) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('reviews')
      .update({ approved })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating review status:", error);
      throw error;
    }

    return data;
  },

  /**
   * Feature or unfeature a review
   */
  async updateReviewFeatured(id, featured) {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('reviews')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating review featured status:", error);
      throw error;
    }

    return data;
  },

  /**
   * Delete a review
   */
  async deleteReview(id) {
    const supabase = createAdminClient();
    
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting review:", error);
      throw error;
    }

    return true;
  }
};
