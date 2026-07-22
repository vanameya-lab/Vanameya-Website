import { createAdminClient } from '@/lib/supabase/admin'

/**
 * @typedef {import('@/types/index').OrderEvent} OrderEvent
 * @typedef {import('@/types/index').OrderEventInsert} OrderEventInsert
 */

/**
 * Logs a new event for an order.
 * 
 * @param {OrderEventInsert} eventData - The event details.
 * @returns {Promise<{data: OrderEvent | null, error: any}>}
 */
export async function logOrderEvent(eventData) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('order_events')
      .insert(eventData)
      .select()
      .single()
      
    if (error) {
      console.error('Error logging order event:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error logging order event:', error)
    return { data: null, error }
  }
}

/**
 * Fetches the entire timeline of events for a specific order.
 * 
 * @param {string} orderId - The UUID of the order.
 * @returns {Promise<{data: OrderEvent[] | null, error: any}>}
 */
export async function getOrderTimeline(orderId) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('order_events')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: true })
      
    if (error) {
      console.error(`Error fetching order timeline (${orderId}):`, error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error(`Unexpected error fetching order timeline (${orderId}):`, error)
    return { data: null, error }
  }
}
