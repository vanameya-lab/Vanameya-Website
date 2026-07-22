"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { createClient } from "@/lib/supabase/client";
import { getOrdersAction } from "./actions";

export default function DashboardClient({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders || []);
  const supabase = createClient();

  // Calculate Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const paidOrders = orders.filter(o => o.payment_status === 'paid').length;
  const revenue = orders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + Number(o.total || 0), 0);
  const recentOrders = orders.slice(0, 5);

  const fetchLatestOrders = async () => {
    try {
      const { orders: latestOrders } = await getOrdersAction({ limit: 50 });
      setOrders(latestOrders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Set up Realtime listener
    const channel = supabase
      .channel('admin_dashboard')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Realtime event received!', payload);
          // Trigger a refetch via server action to bypass RLS securely
          fetchLatestOrders();
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'payments' },
        (payload) => {
          fetchLatestOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Dashboard</h1>
          <p className="text-secondary-text">Live overview of your store's performance.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Live Updates Active
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <p className="text-sm text-secondary-text uppercase tracking-widest font-bold mb-1">Total Orders</p>
          <p className="text-3xl font-semibold text-primary-text">{totalOrders}</p>
        </div>
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <p className="text-sm text-secondary-text uppercase tracking-widest font-bold mb-1">Pending Orders</p>
          <p className="text-3xl font-semibold text-warning">{pendingOrders}</p>
        </div>
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <p className="text-sm text-secondary-text uppercase tracking-widest font-bold mb-1">Paid Orders</p>
          <p className="text-3xl font-semibold text-success">{paidOrders}</p>
        </div>
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <p className="text-sm text-secondary-text uppercase tracking-widest font-bold mb-1">Total Revenue</p>
          <p className="text-3xl font-semibold text-accent">₹{revenue.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-surface border border-border/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border/20 flex justify-between items-center">
          <h2 className="text-xl font-heading font-semibold text-primary-text">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm text-accent underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-xs text-secondary-text uppercase tracking-widest border-b border-border/20">
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-secondary-text">No orders yet.</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <Link href={`/admin/orders/${order.id}`} className="text-accent font-semibold hover:underline">
                        {order.order_number}
                      </Link>
                      <div className="text-xs text-secondary-text mt-1">
                        {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                      </div>
                    </td>
                    <td className="p-4 text-primary-text text-sm">{order.customers?.full_name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold ${
                        order.status === 'pending' ? 'bg-warning/20 text-warning' :
                        order.status === 'processing' ? 'bg-accent/20 text-accent' :
                        order.status === 'delivered' ? 'bg-success/20 text-success' :
                        'bg-white/10 text-secondary-text'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold ${
                        order.payment_status === 'paid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-semibold text-primary-text">₹{order.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
