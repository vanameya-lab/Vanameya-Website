-- Migration: add unique constraint to provider_payment_id
-- We also add a unique constraint to provider_order_id to ensure idempotency.

ALTER TABLE payments
ADD CONSTRAINT unique_provider_payment_id UNIQUE (provider_payment_id);

ALTER TABLE payments
ADD CONSTRAINT unique_provider_order_id UNIQUE (provider_order_id);
