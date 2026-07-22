import Link from "next/link";
import { getOrderByIdAction } from "../../actions";
import OrderDetailsClient from "./OrderDetailsClient";

export default async function AdminOrderDetailsPage({ params }) {
  // Use params.id
  // Next.js 15+ sometimes requires params to be awaited if they are asynchronous, 
  // but for Next.js 13/14 App Router, accessing params.id directly is fine.
  const { id } = params;
  
  let order;
  try {
    order = await getOrderByIdAction(id);
  } catch (error) {
    return (
      <div className="bg-surface border border-border/20 rounded-2xl p-12 text-center text-secondary-text">
        <h2 className="text-xl font-semibold text-error mb-2">Order Not Found</h2>
        <p>We couldn't find the details for this order.</p>
        <Link href="/admin/orders" className="text-accent underline mt-4 block">Return to Orders</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/orders" className="w-10 h-10 bg-surface border border-border/20 rounded-xl flex items-center justify-center text-secondary-text hover:text-accent hover:border-accent transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-1">Order Details</h1>
          <p className="text-secondary-text">Manage order #{order.order_number}</p>
        </div>
      </div>

      <OrderDetailsClient order={order} />
    </div>
  );
}
