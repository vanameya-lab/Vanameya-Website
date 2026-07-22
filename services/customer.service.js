import { createAdminClient } from '@/lib/supabase/admin'

/**
 * @typedef {import('@/types/index').Customer} Customer
 * @typedef {import('@/types/index').CustomerInsert} CustomerInsert
 */

/**
 * Finds a customer by their phone number.
 * 
 * @param {string} phone - The customer's phone number.
 * @returns {Promise<{data: Customer | null, error: any}>}
 */
export async function findCustomerByPhone(phone) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('customers')
      .select('*')
      .eq('phone', phone)
      .maybeSingle()
      
    if (error) {
      console.error('Error finding customer by phone:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error finding customer by phone:', error)
    return { data: null, error }
  }
}

/**
 * Creates a new customer.
 * 
 * @param {CustomerInsert} customerData - The data to create the customer.
 * @returns {Promise<{data: Customer | null, error: any}>}
 */
export async function createCustomer(customerData) {
  const supabaseAdmin = createAdminClient()
  
  try {
    const { data, error } = await supabaseAdmin
      .from('customers')
      .insert(customerData)
      .select()
      .single()
      
    if (error) {
      console.error('Error creating customer:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error creating customer:', error)
    return { data: null, error }
  }
}

/**
 * Upserts a customer based on their phone number.
 * If the customer exists (by phone), their details are updated.
 * Otherwise, a new customer is created.
 * 
 * @param {CustomerInsert} customerData - The customer data.
 * @returns {Promise<{data: Customer | null, error: any}>}
 */
export async function upsertCustomer(customerData) {
  // Check if customer exists
  const { data: existingCustomer, error: findError } = await findCustomerByPhone(customerData.phone)
  
  if (findError) {
    return { data: null, error: findError }
  }
  
  const supabaseAdmin = createAdminClient()
  
  try {
    if (existingCustomer) {
      // Update existing customer
      const { data, error } = await supabaseAdmin
        .from('customers')
        .update({
          full_name: customerData.full_name,
          email: customerData.email,
          address_line1: customerData.address_line1,
          address_line2: customerData.address_line2,
          city: customerData.city,
          state: customerData.state,
          country: customerData.country,
          pincode: customerData.pincode
        })
        .eq('id', existingCustomer.id)
        .select()
        .single()
        
      if (error) {
        console.error('Error updating existing customer:', error)
        return { data: null, error }
      }
      return { data, error: null }
    } else {
      // Create new customer
      return await createCustomer(customerData)
    }
  } catch (error) {
    console.error('Unexpected error upserting customer:', error)
    return { data: null, error }
  }
}
