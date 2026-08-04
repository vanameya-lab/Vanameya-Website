import { createClient } from "@/lib/supabase/client";

export const reviewService = {
  /**
   * Submit a new review
   */
  async createReview({ customerId, orderId, productId, rating, review, reviewerName, phone, consent, images = [] }) {
    const supabase = createClient();
    


    // Call our server-side API route to insert the review bypassing RLS
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId,
        orderId,
        productId,
        rating,
        review,
        reviewerName,
        phone,
        consent,
        images: [],
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      console.error("Error submitting review:", result.error);
      throw new Error(result.error || "Failed to submit review");
    }

    return result.data;
  },

  /**
   * Fetch approved reviews for a product
   */
  async getReviews({ productId, sortBy = 'newest', page = 1, limit = 5 }) {
    const supabase = createClient();
    
    let finalProductId = productId;
    if (!finalProductId || finalProductId === '00000000-0000-0000-0000-000000000000') {
      const { data: productData } = await supabase
        .from('products')
        .select('id')
        .limit(1)
        .single();
      if (productData) finalProductId = productData.id;
    }

    let query = supabase
      .from('reviews')
      .select('*, customers(full_name)', { count: 'exact' })
      .eq('product_id', finalProductId)
      .eq('approved', true);

    switch (sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'highest':
        query = query.order('rating', { ascending: false });
        break;
      case 'lowest':
        query = query.order('rating', { ascending: true });
        break;
      case 'photos':
        // Supabase doesn't easily sort by array length, so we just filter or sort by newest
        query = query.not('review_images', 'eq', '{}').order('created_at', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, count, error } = await query.range(from, to);

    if (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }

    return { reviews: data, totalCount: count };
  },

  /**
   * Get rating summary
   */
  async getRatingSummary(productId) {
    const supabase = createClient();
    
    let finalProductId = productId;
    if (!finalProductId || finalProductId === '00000000-0000-0000-0000-000000000000') {
      const { data: productData } = await supabase
        .from('products')
        .select('id')
        .limit(1)
        .single();
      if (productData) finalProductId = productData.id;
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', finalProductId)
      .eq('approved', true);

    if (error) {
      console.error("Error fetching rating summary:", error);
      return null;
    }

    const total = data.length;
    if (total === 0) return null;

    let sum = 0;
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    data.forEach(r => {
      sum += r.rating;
      distribution[r.rating]++;
    });

    return {
      average: (sum / total).toFixed(1),
      total,
      distribution: [
        { stars: 5, count: distribution[5], pct: Math.round((distribution[5] / total) * 100) },
        { stars: 4, count: distribution[4], pct: Math.round((distribution[4] / total) * 100) },
        { stars: 3, count: distribution[3], pct: Math.round((distribution[3] / total) * 100) },
        { stars: 2, count: distribution[2], pct: Math.round((distribution[2] / total) * 100) },
        { stars: 1, count: distribution[1], pct: Math.round((distribution[1] / total) * 100) },
      ]
    };
  }
};
