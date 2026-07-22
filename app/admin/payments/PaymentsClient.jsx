"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { exportToCSV } from "@/lib/utils/csv-export";
import { getPaymentsAction } from "../actions";

export default function PaymentsClient({ initialData }) {
  const [payments, setPayments] = useState(initialData.payments || []);
  const [totalCount, setTotalCount] = useState(initialData.totalCount || 0);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    let isMounted = true;
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const { payments: newPayments, totalCount: newCount } = await getPaymentsAction({
          status, search, page, limit
        });
        if (isMounted) {
          setPayments(newPayments || []);
          setTotalCount(newCount || 0);
        }
      } catch (err) {
        console.error("Failed to load payments", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    // Skip initial fetch since we have server data, unless filters changed
    if (status !== 'all' || search !== '' || page !== 1) {
      fetchPayments();
    } else {
      setPayments(initialData.payments || []);
      setTotalCount(initialData.totalCount || 0);
    }

    return () => { isMounted = false; };
  }, [status, search, page, initialData]);

  const handleExport = () => {
    const exportData = payments.map(p => ({
      ID: p.id,
      Date: format(new Date(p.created_at), 'yyyy-MM-dd HH:mm:ss'),
      Order_Number: p.orders?.order_number,
      Customer_Name: p.orders?.customers?.full_name,
      Provider: p.provider,
      Provider_Payment_ID: p.provider_payment_id,
      Provider_Order_ID: p.provider_order_id,
      Amount: p.amount,
      Currency: p.currency,
      Status: p.status,
      Payment_Method: p.payment_method
    }));
    exportToCSV(exportData, `vanameya_payments_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Payments</h1>
          <p className="text-secondary-text">Track all transaction data and Razorpay responses. ({totalCount} total)</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-surface border border-border/20 text-primary-text px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface border border-border/20 p-4 rounded-xl flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          placeholder="Search by Payment ID or Order ID..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent flex-1"
        />
        <select 
          value={status} 
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent w-full md:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      <div className="bg-surface border border-border/20 rounded-2xl overflow-hidden relative">
        {loading && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-xs text-secondary-text uppercase tracking-widest border-b border-border/20">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Provider IDs</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Method</th>
                <th className="p-4 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-secondary-text">No payments found.</td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-xs text-secondary-text">
                      {format(new Date(payment.created_at), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="p-4">
                      {payment.orders ? (
                        <Link href={`/admin/orders/${payment.order_id}`} className="text-accent font-semibold hover:underline block">
                          {payment.orders.order_number}
                        </Link>
                      ) : (
                        <span className="text-secondary-text">N/A</span>
                      )}
                      <div className="text-xs text-secondary-text mt-1">{payment.orders?.customers?.full_name}</div>
                    </td>
                    <td className="p-4">
                      <Link href={`/admin/payments/${payment.id}`} className="font-mono text-xs text-primary-text hover:text-accent block truncate max-w-[200px]">
                        {payment.provider_payment_id || payment.provider_order_id || payment.id}
                      </Link>
                      <div className="text-xs text-secondary-text mt-1 capitalize">{payment.provider}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold inline-block ${
                        payment.status === 'paid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="capitalize text-sm text-primary-text bg-white/5 px-2 py-1 rounded">
                        {payment.payment_method || 'Online'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold text-primary-text">
                      ₹{payment.amount}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border/20 flex justify-between items-center bg-white/5">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 text-sm bg-black/20 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-secondary-text">Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 text-sm bg-black/20 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
