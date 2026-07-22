-- ==============================================================================
-- Add Reviews Table and Storage Bucket
-- ==============================================================================

-- 1. REVIEWS TABLE
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  review TEXT NOT NULL,
  review_images TEXT[] DEFAULT '{}',
  verified_purchase BOOLEAN NOT NULL DEFAULT false,
  approved BOOLEAN NOT NULL DEFAULT false,
  featured BOOLEAN NOT NULL DEFAULT false,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Ensure a customer can only review a specific order once
  UNIQUE(customer_id, order_id)
);

-- ==============================================================================
-- INDEXES
-- ==============================================================================
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_approved ON reviews(approved);
CREATE INDEX idx_reviews_featured ON reviews(featured);

-- ==============================================================================
-- TRIGGERS
-- ==============================================================================
CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) FOR REVIEWS
-- ==============================================================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read approved reviews
CREATE POLICY "Public can view approved reviews" 
ON reviews FOR SELECT 
USING (approved = true);

-- No public insert policies. Insert will happen via server (Service Role) 
-- to ensure order validation and verified_purchase logic.

-- ==============================================================================
-- STORAGE BUCKET FOR REVIEW IMAGES
-- ==============================================================================
-- Insert the bucket record
INSERT INTO storage.buckets (id, name, public) 
VALUES ('review-images', 'review-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for Storage Bucket
-- Public can read images
CREATE POLICY "Public can view review images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'review-images');

-- Insert requires authenticated user, but since we handle via server service role, 
-- we don't strictly need a public insert policy for storage.objects if uploaded server-side.
-- We will assume server-side upload to maintain security.
