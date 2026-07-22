export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          slug: string
          name: string
          short_description: string
          description: string
          price: number
          compare_price: number | null
          sku: string
          stock: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          short_description: string
          description: string
          price: number
          compare_price?: number | null
          sku: string
          stock?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          short_description?: string
          description?: string
          price?: number
          compare_price?: number | null
          sku?: string
          stock?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          full_name: string
          email: string | null
          phone: string
          address_line1: string
          address_line2: string | null
          city: string
          state: string
          country: string
          pincode: string
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          phone: string
          address_line1: string
          address_line2?: string | null
          city: string
          state: string
          country: string
          pincode: string
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          phone?: string
          address_line1?: string
          address_line2?: string | null
          city?: string
          state?: string
          country?: string
          pincode?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          order_number: string
          customer_id: string
          product_id: string
          quantity: number
          subtotal: number
          shipping_charge: number
          discount: number
          total: number
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_number: string
          customer_id: string
          product_id: string
          quantity?: number
          subtotal: number
          shipping_charge?: number
          discount?: number
          total: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_number?: string
          customer_id?: string
          product_id?: string
          quantity?: number
          subtotal?: number
          shipping_charge?: number
          discount?: number
          total?: number
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          provider: string
          provider_order_id: string | null
          provider_payment_id: string | null
          provider_signature: string | null
          amount: number
          currency: string
          status: 'pending' | 'paid' | 'failed' | 'refunded'
          paid_at: string | null
          raw_response: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          provider?: string
          provider_order_id?: string | null
          provider_payment_id?: string | null
          provider_signature?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'paid' | 'failed' | 'refunded'
          paid_at?: string | null
          raw_response?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          provider?: string
          provider_order_id?: string | null
          provider_payment_id?: string | null
          provider_signature?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'paid' | 'failed' | 'refunded'
          paid_at?: string | null
          raw_response?: Json | null
          created_at?: string
        }
      }
      order_events: {
        Row: {
          id: string
          order_id: string
          event: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          event: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          event?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
      payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
    }
  }
}
