import { createAdminClient } from '@/lib/supabase/admin'
import { logOrderEvent } from './order-events.service'

/**
 * @typedef {import('@/types/index').Payment} Payment
 * @typedef {import('@/types/index').PaymentInsert} PaymentInsert
 */

/**
 * Creates a new payment record linked to an order.
 * Note: Razorpay integration will be added in a later phase.
 * 
 * @param {PaymentInsert} paymentData - The payment data.
 * @returns {Promise<{data: Payment | null, error: any}>}
 */
export async function createPayment(paymentData) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .insert(paymentData)
      .select()
      .single()
      
    if (error) {
      if (error.code !== '23505') {
        console.error('Error creating payment:', error)
      }
      return { data: null, error }
    }
    
    await logOrderEvent({
      order_id: paymentData.order_id,
      event: 'Payment Initiated',
      notes: `Payment record created with status ${data.status}.`
    })
    
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error creating payment:', error)
    return { data: null, error }
  }
}

/**
 * Updates a payment record (e.g., when a webhook is received).
 * 
 * @param {string} paymentId - The UUID of the payment.
 * @param {Partial<Payment>} updates - The fields to update.
 * @returns {Promise<{data: Payment | null, error: any}>}
 */
export async function updatePayment(paymentId, updates) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .update(updates)
      .eq('id', paymentId)
      .select()
      .single()
      
    if (error) {
      console.error(`Error updating payment (${paymentId}):`, error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error(`Unexpected error updating payment (${paymentId}):`, error)
    return { data: null, error }
  }
}

/**
 * Verifies the payment signature (placeholder for Razorpay logic).
 * 
 * @param {string} orderId - The Razorpay order ID.
 * @param {string} paymentId - The Razorpay payment ID.
 * @param {string} signature - The signature provided by Razorpay.
 * @returns {Promise<boolean>}
 */
export async function verifyPayment(orderId, paymentId, signature) {
  // TODO: In the next phase, implement Razorpay signature verification logic using crypto.
  // Example:
  // const generated_signature = crypto
  //   .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  //   .update(orderId + "|" + paymentId)
  //   .digest('hex');
  // return generated_signature === signature;
  
  console.log('verifyPayment placeholder hit', { orderId, paymentId, signature })
  return true
}
