import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  // Only allow letters, numbers, spaces, and basic punctuation to prevent injection
  return str.replace(/[^a-zA-Z0-9\s.,!?'-]/g, '');
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerId, orderId, productId, rating, review, images, reviewerName, phone, consent } = body;

    const cleanReview = sanitizeInput(review);

    const supabaseAdmin = createAdminClient();

    let finalCustomerId = customerId;

    if (!finalCustomerId) {
      let existingCustomer = null;
      const finalPhone = phone ? sanitizeInput(phone) : `GUEST${Date.now().toString().substring(5)}`;

      if (phone) {
        const { data: matchedCustomer } = await supabaseAdmin
          .from('customers')
          .select('id')
          .eq('phone', finalPhone)
          .single();
          
        if (matchedCustomer) {
          existingCustomer = matchedCustomer;
        }
      }

      if (existingCustomer) {
        finalCustomerId = existingCustomer.id;
      } else {
        let guestName = (consent && reviewerName && reviewerName.trim()) ? reviewerName.trim() : 'Anonymous';
        guestName = sanitizeInput(guestName);
        const dummyEmail = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}@vanameya.com`;
        
        const { data: newGuest, error: guestError } = await supabaseAdmin
          .from('customers')
          .insert([{
            full_name: guestName,
            email: dummyEmail,
            phone: finalPhone,
            address_line1: 'N/A',
            city: 'N/A',
            state: 'N/A',
            pincode: '000000',
            country: 'India'
          }])
          .select('id')
          .single();
        
        if (guestError || !newGuest) {
          console.error("Error creating guest customer:", guestError);
          return NextResponse.json({ success: false, error: "Failed to create guest record" }, { status: 500 });
        }
        
        finalCustomerId = newGuest.id;
      }
    }

    let finalProductId = productId;
    if (!finalProductId || finalProductId === '00000000-0000-0000-0000-000000000000') {
      const { data: productData, error: productError } = await supabaseAdmin
        .from('products')
        .select('id')
        .limit(1)
        .single();
        
      if (productError || !productData) {
        console.error("Error fetching fallback product:", productError);
        return NextResponse.json({ success: false, error: "Failed to link review to product" }, { status: 500 });
      }
      finalProductId = productData.id;
    }

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          customer_id: finalCustomerId,
          order_id: orderId,
          product_id: finalProductId,
          rating,
          title: "Customer Review",
          review: cleanReview,
          review_images: images || [],
          approved: false,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting review via admin client:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in POST /api/reviews:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
