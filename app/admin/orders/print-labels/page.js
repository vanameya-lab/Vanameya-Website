import { createAdminClient } from '@/lib/supabase/admin';
import PrintAction from './PrintAction';

export default async function PrintLabelsPage() {
  const supabase = createAdminClient();
  
  // Fetch all orders that are paid but not yet shipped or delivered
  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      customers (
        full_name,
        email,
        phone,
        address_line1,
        address_line2,
        city,
        state,
        pincode,
        country
      ),
      products (
        name
      )
    `)
    .eq('payment_status', 'paid')
    .not('status', 'in', '("shipped","delivered")')
    .order('created_at', { ascending: true });

  if (error) {
    return <div className="p-8 text-red-500">Error loading orders: {error.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <h1 className="text-2xl font-bold mb-4">No Labels to Print</h1>
        <p>All paid orders have already been shipped or there are no new paid orders.</p>
        <button onClick={() => window.close()} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close Window</button>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-4 md:p-8 print:p-0">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          @page {
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
          }
        }
      `}} />
      <div className="print:hidden mb-8 flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <div>
          <h1 className="text-xl font-bold">Print Shipping Labels</h1>
          <p className="text-sm text-gray-600">Found {orders.length} unshipped order(s).</p>
        </div>
        <PrintAction />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2 print:gap-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="border-2 border-black rounded-lg p-6 flex flex-col justify-between break-inside-avoid print:h-[125mm]"
          >
            <div>
              <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-4">
                <div>
                  <p className="font-bold text-lg">VANAMEYA EXPORTS AND IMPORTS</p>
                  <p className="text-sm">MANNARKKAD P.O, PALAKKAD 678582</p>
                  <p className="text-sm">Kerala, India | Ph: +91 94 95 96 5955</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">ORDER #{order.order_number}</p>
                  <p className="text-xs">Date: {new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="font-bold text-sm uppercase tracking-wider text-gray-600 mb-2">Ship To:</p>
                <p className="font-bold text-xl mb-1">{order.customers?.full_name}</p>
                <p className="text-lg leading-snug">{order.customers?.address_line1}</p>
                {order.customers?.address_line2 && <p className="text-lg leading-snug">{order.customers?.address_line2}</p>}
                <p className="text-lg leading-snug">
                  {order.customers?.city}, {order.customers?.state} {order.customers?.pincode}
                </p>
                <p className="text-lg mt-3 font-bold">Ph: {order.customers?.phone}</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Contents:</p>
                <p className="font-bold">{order.quantity}x {order.products?.name}</p>
              </div>
              <p className="text-sm font-bold bg-black text-white px-3 py-1 rounded">PREPAID</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
