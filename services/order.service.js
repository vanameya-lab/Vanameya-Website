import { createAdminClient } from '@/lib/supabase/admin'
import { logOrderEvent } from './order-events.service'

/**
 * @typedef {import('@/types/index').Order} Order
 * @typedef {import('@/types/index').OrderInsert} OrderInsert
 */

/**
 * Generates the next order number (e.g., VNM000001).
 * 
 * @returns {Promise<string>}
 */
async function generateOrderNumber() {
  const supabaseAdmin = createAdminClient()
  
  // Get the most recent order to find the last order number
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('order_number')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
    
  if (error) {
    console.error('Error fetching last order number:', error)
    throw new Error('Failed to generate order number')
  }
  
  let nextNumber = 1
  if (data && data.order_number && data.order_number.startsWith('VNM')) {
    const currentNumber = parseInt(data.order_number.replace('VNM', ''), 10)
    if (!isNaN(currentNumber)) {
      nextNumber = currentNumber + 1
    }
  }
  
  // Format with leading zeros: VNM000001
  return `VNM${String(nextNumber).padStart(6, '0')}`
}

/**
 * Creates a new order and logs the 'Order Created' event.
 * 
 * @param {Omit<OrderInsert, 'order_number'>} orderData - The data to create the order.
 * @returns {Promise<{data: Order | null, error: any}>}
 */
export async function createOrder(orderData) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const order_number = await generateOrderNumber()
    
    const insertData = {
      ...orderData,
      order_number
    }
    
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert(insertData)
      .select()
      .single()
      
    if (error) {
      console.error('Error creating order:', error)
      return { data: null, error }
    }
    
    // Log the event
    await logOrderEvent({
      order_id: data.id,
      event: 'Order Created',
      notes: `Order ${order_number} created successfully.`
    })
    
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error creating order:', error)
    return { data: null, error }
  }
}

/**
 * Updates an order (e.g., status or payment_status).
 * 
 * @param {string} orderId - The UUID of the order.
 * @param {Partial<Order>} updates - The fields to update.
 * @returns {Promise<{data: Order | null, error: any}>}
 */
export async function updateOrder(orderId, updates) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', orderId)
      .select()
      .single()
      
    if (error) {
      console.error(`Error updating order (${orderId}):`, error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error(`Unexpected error updating order (${orderId}):`, error)
    return { data: null, error }
  }
}

/**
 * Fetches an order by its ID or order_number.
 * 
 * @param {string} identifier - The UUID or the order_number.
 * @param {'id' | 'order_number'} by - Which field to search by.
 * @returns {Promise<{data: Order | null, error: any}>}
 */
export async function getOrder(identifier, by = 'id') {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        customers (*),
        products (*)
      `)
      .eq(by, identifier)
      .single()
      
    if (error) {
      console.error(`Error fetching order by ${by} (${identifier}):`, error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error(`Unexpected error fetching order by ${by} (${identifier}):`, error)
    return { data: null, error }
  }
}
