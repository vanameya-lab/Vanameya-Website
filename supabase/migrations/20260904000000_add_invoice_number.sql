ALTER TABLE orders ADD COLUMN IF NOT EXISTS invoice_number text UNIQUE;

-- Backfill existing paid orders
UPDATE orders 
SET invoice_number = 'VMC/26-27/' || LPAD((SUBSTRING(order_number FROM 4)::integer)::text, 4, '0') 
WHERE payment_status = 'paid' AND invoice_number IS NULL;
