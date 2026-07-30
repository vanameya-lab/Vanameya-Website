import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerId, orderId, productId, rating, title, review, images, reviewerName, consent } = body;

    const supabaseAdmin = createAdminClient();

    let finalCustomerId = customerId;

    if (!finalCustomerId) {
      const guestName = (consent && reviewerName && reviewerName.trim()) ? reviewerName.trim() : 'Anonymous';
      const dummyEmail = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}@vanameya.com`;
      
      const { data: newGuest, error: guestError } = await supabaseAdmin
        .from('customers')
        .insert([{
          full_name: guestName,
          email: dummyEmail,
          phone: '0000000000'
        }])
        .select('id')
        .single();
      
      if (guestError || !newGuest) {
        console.error("Error creating guest customer:", guestError);
        return NextResponse.json({ success: false, error: "Failed to create guest record" }, { status: 500 });
      }
      
      finalCustomerId = newGuest.id;
    }

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          customer_id: finalCustomerId,
          order_id: orderId,
          product_id: productId,
          rating,
          title,
          review,
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
