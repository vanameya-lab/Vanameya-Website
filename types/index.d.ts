import { Database } from './database'

export type Product = Database['public']['Tables']['products']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type OrderEvent = Database['public']['Tables']['order_events']['Row']

export type CustomerInsert = Database['public']['Tables']['customers']['Insert']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type PaymentInsert = Database['public']['Tables']['payments']['Insert']
export type OrderEventInsert = Database['public']['Tables']['order_events']['Insert']
