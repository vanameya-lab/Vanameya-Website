import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { createPayment } from '@/services/payment.service';
import { updateOrder } from '@/services/order.service';

export async function POST(req) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    // Fallback to key secret if webhook secret is not set, though webhook secret is recommended.
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.warn("Razorpay secret is not defined for webhooks.");
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(bodyText)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf-8');
    const signatureBuffer = Buffer.from(signature, 'utf-8');

    if (
      expectedBuffer.length !== signatureBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, signatureBuffer)
    ) {
      console.error("Invalid webhook signature.");
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // Idempotency: Always return 200 OK immediately if the event is unhandled, 
    // or if we've successfully processed it.
    if (event.event === 'payment.captured') {
      const paymentEntity = event.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;
      const amount = paymentEntity.amount / 100; // paise to INR
      
      // Get internal order_id from notes
      const orderId = paymentEntity.notes?.order_id;

      if (!orderId) {
        console.error("Webhook payload missing order_id in notes.");
        return NextResponse.json({ success: true, message: "Ignored, missing order_id" });
      }

      // Update Order status
      const { error: orderError } = await updateOrder(orderId, {
        payment_status: "paid"
      });
      
      if (orderError) {
        console.error("Webhook processing failed for order");
        // We still return 200 so razorpay doesn't retry infinitely, or 500 if we want a retry.
        // Returning 500 is better for transient DB errors.
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
      }

      // Insert payment record
      const { error: paymentError } = await createPayment({
        order_id: orderId,
        provider: 'razorpay',
        provider_order_id: razorpayOrderId,
        provider_payment_id: razorpayPaymentId,
        provider_signature: signature, // we store the webhook signature here
        amount: amount,
        currency: paymentEntity.currency || "INR",
        status: "paid",
        paid_at: new Date().toISOString(),
        raw_response: event
      });

      if (paymentError) {
        if (paymentError.code !== '23505') {
          console.error("Payment insert error in webhook:", paymentError);
        }
      }

      // Generate invoice and send email
      try {
        const { getOrder } = await import('@/services/order.service');
        const { data: fullOrder } = await getOrder(orderId);
        
        if (fullOrder && fullOrder.customers?.email) {
          const { generateInvoicePDF } = await import('@/services/invoice.service');
          const { sendOrderConfirmationEmail } = await import('@/services/email.service');
          
          const pdfBuffer = await generateInvoicePDF(orderId);
          await sendOrderConfirmationEmail(
            fullOrder.customers.email, 
            fullOrder.order_number, 
            pdfBuffer
          );
        }
      } catch (invoiceErr) {
        console.error("Failed to generate/send invoice in webhook:", invoiceErr);
        // We still return 200 so the webhook doesn't retry just because email failed
      }
    }

    if (event.event === 'payment.failed') {
      const paymentEntity = event.payload.payment.entity;
      const orderId = paymentEntity.notes?.order_id;

      if (orderId) {
        await updateOrder(orderId, { payment_status: "failed" });
      }
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook Exception:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
