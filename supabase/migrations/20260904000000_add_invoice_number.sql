ALTER TABLE orders ADD COLUMN IF NOT EXISTS invoice_number text UNIQUE;

-- Backfill existing paid orders sequentially to avoid gaps
WITH numbered_orders AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as row_num
  FROM orders 
  WHERE payment_status = 'paid'
)
UPDATE orders
SET invoice_number = 'VMC/26-27/' || LPAD(numbered_orders.row_num::text, 4, '0')
FROM numbered_orders
WHERE orders.id = numbered_orders.id;
