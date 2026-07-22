"use server";
import { upsertCustomer } from "@/services/customer.service";
import { createOrder, updateOrder } from "@/services/order.service";
import { createPayment } from "@/services/payment.service";
import { createAdminClient } from "@/lib/supabase/admin";
import Razorpay from "razorpay";
import crypto from "crypto";

export async function processCheckout(prevState, formData) {
  try {
    // 1. Extract Customer and Shipping Data
    const customerData = {
      full_name: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email") || null,
      address_line1: formData.get("addressLine1"),
      address_line2: formData.get("addressLine2") || null,
      city: formData.get("city"),
      state: formData.get("state"),
      country: formData.get("country"),
      pincode: formData.get("pincode"),
    };

    // Extract Cart Data
    const cartDataStr = formData.get("cartData");
    if (!cartDataStr) {
      return { success: false, error: "Cart is empty or invalid" };
    }
    const { items, subtotal, shippingCharge, total } = JSON.parse(cartDataStr);

    if (!items || items.length === 0) {
      return { success: false, error: "Cart is empty" };
    }

    // 2. Upsert Customer
    const { data: customer, error: customerError } = await upsertCustomer(customerData);
    
    if (customerError || !customer) {
      console.error("Customer Error:", customerError);
      return { success: false, error: "Failed to process customer information." };
    }

    // 3. Process Order (Currently supporting single product based on requirements)
    const primaryItem = items[0];
    
    // Fetch real product ID from database using slug
    const supabaseAdmin = createAdminClient();
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('id')
      .eq('slug', primaryItem.product.id)
      .single();
      
    if (productError || !product) {
      console.error("Product Error:", productError);
      return { success: false, error: "Failed to verify product information." };
    }

    const orderData = {
      customer_id: customer.id,
      product_id: product.id,
      quantity: primaryItem.quantity,
      subtotal: subtotal,
      shipping_charge: shippingCharge,
      discount: 0,
      total: total,
      status: 'pending',
      payment_status: 'pending'
    };

    const { data: order, error: orderError } = await createOrder(orderData);

    if (orderError || !order) {
      console.error("Order Error:", orderError);
      return { success: false, error: "Failed to create order." };
    }

    // 4. Create Razorpay Order
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100), // amount in paise
      currency: "INR",
      receipt: order.order_number,
      notes: {
        order_id: order.id,
        order_number: order.order_number
      }
    });

    if (!razorpayOrder) {
      return { success: false, error: "Failed to create payment order." };
    }

    // 5. Return success and order number along with Razorpay Order ID
    return { 
      success: true, 
      orderNumber: order.order_number,
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: total,
      customerData: {
        name: customerData.full_name,
        email: customerData.email,
        contact: customerData.phone
      }
    };

  } catch (error) {
    console.error("Checkout Exception:", error);
    return { success: false, error: "An unexpected error occurred during checkout." };
  }
}

export async function verifyPayment(prevState, payload) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = payload;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    const generatedBuffer = Buffer.from(generated_signature, 'utf-8');
    const signatureBuffer = Buffer.from(razorpay_signature, 'utf-8');

    if (
      generatedBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(generatedBuffer, signatureBuffer)
    ) {
      return { success: false, error: "Invalid payment signature." };
    }

    // Signature verified, update the order status
    const { data: updatedOrder, error } = await updateOrder(order_id, {
      payment_status: "paid"
    });

    if (error || !updatedOrder) {
      console.error("Error updating order payment status:", error);
      return { success: false, error: "Payment verified but failed to update order status." };
    }

    // Insert payment record
    const { error: paymentError } = await createPayment({
      order_id: order_id,
      provider: 'razorpay',
      provider_order_id: razorpay_order_id,
      provider_payment_id: razorpay_payment_id,
      provider_signature: razorpay_signature,
      amount: updatedOrder.total,
      currency: "INR",
      status: "paid",
      paid_at: new Date().toISOString()
    });

    if (paymentError) {
      console.error("Payment insert error (might be duplicate):", paymentError);
    }

    return { success: true };
  } catch (error) {
    console.error("Payment Verification Exception:", error);
    return { success: false, error: "An unexpected error occurred during payment verification." };
  }
}
