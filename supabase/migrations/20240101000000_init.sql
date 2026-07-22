-- ==============================================================================
-- VANAMÉYA Supabase Initial Migration (Version 1)
-- ==============================================================================

-- Create Custom Types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- ==============================================================================
-- 1. PRODUCTS TABLE
-- ==============================================================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  compare_price NUMERIC(10, 2),
  sku TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 2. CUSTOMERS TABLE
-- ==============================================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT UNIQUE NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  pincode TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 3. ORDERS TABLE
-- ==============================================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL DEFAULT 1,
  subtotal NUMERIC(10, 2) NOT NULL,
  shipping_charge NUMERIC(10, 2) NOT NULL DEFAULT 0,
  discount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  status order_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 4. PAYMENTS TABLE
-- ==============================================================================
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'razorpay',
  provider_order_id TEXT,
  provider_payment_id TEXT,
  provider_signature TEXT,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status payment_status NOT NULL DEFAULT 'pending',
  paid_at TIMESTAMPTZ,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- 5. ORDER EVENTS TABLE
-- ==============================================================================
CREATE TABLE order_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_order_events_order_id ON order_events(order_id);

-- ==============================================================================
-- TRIGGERS (Auto-update updated_at)
-- ==============================================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_events ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can read active products.
CREATE POLICY "Public can view active products" 
ON products FOR SELECT 
USING (is_active = true);

-- Customers, Orders, Payments, Order Events: 
-- In V1, all creation/updates happen via Server/Service Role.
-- No public RLS policies are created for these tables to ensure 
-- anonymous users cannot read or modify them directly from the client.
-- The service role key used on the server bypasses RLS.

-- ==============================================================================
-- SEED DATA
-- ==============================================================================
INSERT INTO products (
  slug, 
  name, 
  short_description, 
  description, 
  price, 
  compare_price, 
  sku, 
  stock, 
  is_active
) VALUES (
  'premium-dry-ginger',
  'Premium Dry Ginger',
  'Sun-dried, authentic Kerala dry ginger for culinary and wellness rituals.',
  'Sourced directly from the lush estates of Kerala, our premium dry ginger (Chukku) is carefully sun-dried to preserve its intense flavor, aroma, and therapeutic properties. Perfect for traditional preparations, modern infusions, and daily wellness rituals.',
  149.00,
  149.00,
  'VNM-DG-001',
  100,
  true
) ON CONFLICT (slug) DO NOTHING;
