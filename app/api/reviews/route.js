import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerId, orderId, productId, rating, title, review, images } = body;

    const supabaseAdmin = createAdminClient();

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          customer_id: customerId,
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
