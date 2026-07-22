import { createClient } from "@/lib/supabase/client";

export const reviewService = {
  /**
   * Submit a new review
   */
  async createReview({ customerId, orderId, productId, rating, title, review, images = [] }) {
    const supabase = createClient();
    
    // First, upload images if any
    const uploadedImages = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}/${customerId}/${Date.now()}_${i}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('review-images')
          .upload(fileName, file, { upsert: true });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          throw new Error("Failed to upload images");
        }

        if (uploadData) {
          const { data: { publicUrl } } = supabase.storage
            .from('review-images')
            .getPublicUrl(uploadData.path);
          uploadedImages.push(publicUrl);
        }
      }
    }

    // Since RLS blocks public inserts for reviews, we need to call an edge function 
    // or insert directly if RLS allows authenticated users. 
    // Assuming RLS allows customers to insert, OR we must do this on the server.
    // For now, let's attempt direct insert. If it fails due to RLS, it means 
    // we need to use a server-side route.
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          customer_id: customerId,
          order_id: orderId,
          product_id: productId,
          rating,
          title,
          review,
          review_images: uploadedImages,
          // verified_purchase and approved are handled by DB defaults and admin
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error submitting review:", error);
      throw error;
    }

    return data;
  },

  /**
   * Fetch approved reviews for a product
   */
  async getReviews({ productId, sortBy = 'newest', page = 1, limit = 5 }) {
    const supabase = createClient();
    
    let query = supabase
      .from('reviews')
      .select('*, customers(full_name)', { count: 'exact' })
      .eq('product_id', productId)
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
    
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId)
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
