import { createClient } from '@/lib/supabase/client'

/**
 * @typedef {import('@/types/index').Product} Product
 */

/**
 * Fetches all active products.
 * 
 * @returns {Promise<{data: Product[] | null, error: any}>}
 */
export async function getProducts() {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      
    if (error) {
      console.error('Error fetching products:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error('Unexpected error fetching products:', error)
    return { data: null, error }
  }
}

/**
 * Fetches a single product by its slug.
 * 
 * @param {string} slug - The unique slug of the product.
 * @returns {Promise<{data: Product | null, error: any}>}
 */
export async function getProductBySlug(slug) {
  const supabase = createClient()
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
      
    if (error) {
      console.error(`Error fetching product by slug (${slug}):`, error)
      return { data: null, error }
    }
    
    return { data, error: null }
  } catch (error) {
    console.error(`Unexpected error fetching product by slug (${slug}):`, error)
    return { data: null, error }
  }
}
