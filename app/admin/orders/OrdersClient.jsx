"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { exportToCSV } from "@/lib/utils/csv-export";
import { getOrdersAction } from "../actions";

export default function OrdersClient({ initialData }) {
  const [orders, setOrders] = useState(initialData.orders || []);
  const [totalCount, setTotalCount] = useState(initialData.totalCount || 0);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [status, setStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { orders: newOrders, totalCount: newCount } = await getOrdersAction({
          status, paymentStatus, search, page, limit
        });
        if (isMounted) {
          setOrders(newOrders || []);
          setTotalCount(newCount || 0);
        }
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    // Skip initial fetch since we have server data, unless filters changed
    if (status !== 'all' || paymentStatus !== 'all' || search !== '' || page !== 1) {
      fetchOrders();
    } else {
      setOrders(initialData.orders || []);
      setTotalCount(initialData.totalCount || 0);
    }

    return () => { isMounted = false; };
  }, [status, paymentStatus, search, page, initialData]);

  const handleExport = () => {
    const exportData = orders.map(order => ({
      Order_Number: order.order_number,
      Date: format(new Date(order.created_at), 'yyyy-MM-dd HH:mm:ss'),
      Customer_Name: order.customers?.full_name,
      Customer_Phone: order.customers?.phone,
      Customer_Email: order.customers?.email,
      Status: order.status,
      Payment_Status: order.payment_status,
      Total: order.total
    }));
    exportToCSV(exportData, `vanameya_orders_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Orders</h1>
          <p className="text-secondary-text">Manage and track customer orders. ({totalCount} total)</p>
        </div>
        <div className="flex gap-2">
          <Link 
            href="/admin/orders/print-labels" 
            target="_blank"
            className="bg-accent text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Print Unshipped Labels
          </Link>
          <button 
            onClick={handleExport}
            className="bg-surface border border-border/20 text-primary-text px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface border border-border/20 p-4 rounded-xl flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          placeholder="Search order number..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent flex-1"
        />
        <select 
          value={status} 
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing (Packed)</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select 
          value={paymentStatus} 
          onChange={(e) => { setPaymentStatus(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent"
        >
          <option value="all">All Payments</option>
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
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold text-right">Total</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-secondary-text">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="text-accent font-semibold hover:underline">
                        {order.order_number}
                      </Link>
                    </td>
                    <td className="p-4 text-xs text-secondary-text">
                      {format(new Date(order.created_at), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-semibold text-primary-text">{order.customers?.full_name}</div>
                      <div className="text-xs text-secondary-text">{order.customers?.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold inline-block ${
                        order.status === 'pending' ? 'bg-warning/20 text-warning' :
                        order.status === 'processing' ? 'bg-accent/20 text-accent' :
                        order.status === 'shipped' ? 'bg-[#3b82f6]/20 text-[#3b82f6]' :
                        order.status === 'delivered' ? 'bg-success/20 text-success' :
                        'bg-white/10 text-secondary-text'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold inline-block ${
                        order.payment_status === 'paid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold text-primary-text">₹{order.total}</td>
                    <td className="p-4 text-center">
                      <a 
                        href={`/api/invoice/${order.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 bg-white/5 hover:bg-white/10 border border-border/20 rounded-lg text-secondary-text hover:text-primary-text transition-colors"
                        title="Download Invoice"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      </a>
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
