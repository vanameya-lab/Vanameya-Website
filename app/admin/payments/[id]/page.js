import Link from "next/link";
import { format } from "date-fns";
import { getPaymentByIdAction } from "../../actions";

export default async function AdminPaymentDetailsPage({ params }) {
  const { id } = params;
  
  let payment;
  try {
    payment = await getPaymentByIdAction(id);
  } catch (error) {
    return (
      <div className="bg-surface border border-border/20 rounded-2xl p-12 text-center text-secondary-text">
        <h2 className="text-xl font-semibold text-error mb-2">Payment Not Found</h2>
        <p>We couldn't find the details for this transaction.</p>
        <Link href="/admin/payments" className="text-accent underline mt-4 block">Return to Payments</Link>
      </div>
    );
  }

  // Safely parse raw response if it's a string or object
  let rawResponseStr = "{}";
  try {
    if (typeof payment.raw_response === 'string') {
      rawResponseStr = JSON.stringify(JSON.parse(payment.raw_response), null, 2);
    } else {
      rawResponseStr = JSON.stringify(payment.raw_response, null, 2);
    }
  } catch(e) {
    rawResponseStr = String(payment.raw_response);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/payments" className="w-10 h-10 bg-surface border border-border/20 rounded-xl flex items-center justify-center text-secondary-text hover:text-accent hover:border-accent transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-1">Payment Details</h1>
          <p className="text-secondary-text">Transaction ID: {payment.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column - Details */}
        <div className="space-y-6">
          <div className="bg-surface border border-border/20 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold text-primary-text mb-4">Transaction Overview</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center pb-4 border-b border-border/10">
                <span className="text-secondary-text uppercase tracking-wider text-xs">Status</span>
                <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold ${
                  payment.status === 'paid' ? 'bg-success/20 text-success' : 
                  payment.status === 'refunded' ? 'bg-[#3b82f6]/20 text-[#3b82f6]' :
                  payment.status === 'failed' ? 'bg-error/20 text-error' :
                  'bg-warning/20 text-warning'
                }`}>
                  {payment.status}
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/10">
                <span className="text-secondary-text uppercase tracking-wider text-xs">Amount Paid</span>
                <span className="font-semibold text-lg text-primary-text">{payment.currency} {payment.amount}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/10">
                <span className="text-secondary-text uppercase tracking-wider text-xs">Date</span>
                <span className="font-medium text-primary-text">{format(new Date(payment.created_at), 'MMMM d, yyyy h:mm a')}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-border/10">
                <span className="text-secondary-text uppercase tracking-wider text-xs">Payment Method</span>
                <span className="font-medium text-primary-text capitalize">{payment.payment_method || 'Online'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary-text uppercase tracking-wider text-xs">Provider</span>
                <span className="font-medium text-primary-text capitalize">{payment.provider}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface border border-border/20 p-6 rounded-2xl">
            <h3 className="font-semibold text-primary-text mb-4">Related Order</h3>
            {payment.orders ? (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Order Number</p>
                  <Link href={`/admin/orders/${payment.order_id}`} className="font-medium text-accent hover:underline text-lg">
                    {payment.orders.order_number}
                  </Link>
                </div>
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Customer Name</p>
                  <p className="font-medium text-primary-text">{payment.orders.customers?.full_name}</p>
                </div>
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Email</p>
                  <p className="font-medium text-primary-text break-all">{payment.orders.customers?.email}</p>
                </div>
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Phone</p>
                  <p className="font-medium text-primary-text">{payment.orders.customers?.phone}</p>
                </div>
              </div>
            ) : (
              <p className="text-secondary-text text-sm">No linked order found.</p>
            )}
          </div>
        </div>

        {/* Right Column - Provider Specifics */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl flex flex-col">
          <h3 className="font-semibold text-primary-text mb-4 capitalize">{payment.provider} Details</h3>
          
          <div className="space-y-4 text-sm mb-6">
            <div>
              <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Payment ID</p>
              <p className="font-mono text-primary-text break-all bg-black/20 p-2 rounded">{payment.provider_payment_id || 'N/A'}</p>
            </div>
            <div>
              <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Order ID</p>
              <p className="font-mono text-primary-text break-all bg-black/20 p-2 rounded">{payment.provider_order_id || 'N/A'}</p>
            </div>
            {payment.provider_signature && (
              <div>
                <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Signature</p>
                <p className="font-mono text-primary-text break-all bg-black/20 p-2 rounded text-xs opacity-70">
                  {payment.provider_signature.substring(0, 20)}...
                </p>
              </div>
            )}
          </div>

          <h4 className="text-sm font-semibold text-primary-text mb-2">Raw Gateway Response</h4>
          <div className="flex-1 bg-[#1e1e1e] rounded-xl overflow-hidden relative">
            <pre className="p-4 text-xs font-mono text-[#d4d4d4] overflow-auto absolute inset-0 hide-scrollbar">
              {rawResponseStr}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
}
