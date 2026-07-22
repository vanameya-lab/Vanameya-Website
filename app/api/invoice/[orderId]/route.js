import { generateInvoicePDF } from '@/services/invoice.service';
import { getOrder } from '@/services/order.service';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    const { orderId } = await params;
    
    // Auth check: verify admin is logged in
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          }
        }
      }
    );
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch order to get order number for filename
    const { data: order, error } = await getOrder(orderId);
    
    if (error || !order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    const pdfBuffer = await generateInvoicePDF(orderId);

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', `attachment; filename="Invoice_${order.order_number}.pdf"`);

    return new NextResponse(pdfBuffer, { headers });

  } catch (error) {
    console.error("Invoice API Error:", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
