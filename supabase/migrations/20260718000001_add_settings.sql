-- ==============================================================================
-- Add Settings Table
-- ==============================================================================

CREATE TABLE store_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT NOT NULL DEFAULT 'VANAMÉYA',
  support_email TEXT NOT NULL DEFAULT 'support@vanameya.com',
  support_phone TEXT NOT NULL DEFAULT '+919876543210',
  shipping_charge NUMERIC(10, 2) NOT NULL DEFAULT 50.00,
  free_shipping_threshold NUMERIC(10, 2) NOT NULL DEFAULT 500.00,
  currency TEXT NOT NULL DEFAULT 'INR',
  store_address TEXT NOT NULL DEFAULT 'Kannur, Kerala, India',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed with one default row
INSERT INTO store_settings (
  store_name, support_email, support_phone, shipping_charge, free_shipping_threshold, currency, store_address
) VALUES (
  'VANAMÉYA', 'support@vanameya.com', '+919876543210', 50.00, 500.00, 'INR', 'Kannur, Kerala, India'
);

-- RLS
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Public can read settings
CREATE POLICY "Public can view store settings" 
ON store_settings FOR SELECT 
USING (true);
