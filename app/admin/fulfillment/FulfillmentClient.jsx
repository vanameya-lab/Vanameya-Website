"use client";
import { useState } from "react";
import { updateOrderStatusAction } from "../actions";

export default function FulfillmentClient({ initialQueue }) {
  const [queue, setQueue] = useState(initialQueue);
  const [processingId, setProcessingId] = useState(null);

  const handleAction = async (orderId, newStatus) => {
    setProcessingId(orderId);
    try {
      await updateOrderStatusAction(orderId, newStatus, `Fulfillment queue action: marked ${newStatus}`);
      // Remove from queue or update state if we don't want it to vanish immediately
      // But for a true queue, removing completed steps or moving them is ideal.
      if (newStatus === 'delivered' || newStatus === 'cancelled') {
        setQueue(queue.filter(q => q.id !== orderId));
      } else {
        setQueue(queue.map(q => q.id === orderId ? { ...q, status: newStatus } : q));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setProcessingId(null);
    }
  };

  const getPriorityInfo = (status) => {
    switch(status) {
      case 'pending': return { label: '🟢 New', color: 'text-green-500' };
      case 'processing': return { label: '🟡 Packed', color: 'text-yellow-500' };
      case 'shipped': return { label: '🔵 Shipped', color: 'text-blue-500' };
      default: return { label: status, color: 'text-secondary-text' };
    }
  };

  if (queue.length === 0) {
    return (
      <div className="bg-surface border border-border/20 rounded-2xl p-12 text-center text-secondary-text">
        <p className="text-lg">No orders currently pending fulfillment.</p>
        <p className="text-sm mt-2">Check back later or view all orders in the Orders tab.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border/20 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 text-xs text-secondary-text uppercase tracking-widest border-b border-border/20">
              <th className="p-4 font-semibold">Priority</th>
              <th className="p-4 font-semibold">Order</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Payment</th>
              <th className="p-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {queue.map((order) => {
              const priority = getPriorityInfo(order.status);
              const isProcessing = processingId === order.id;

              return (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className={`p-4 font-medium ${priority.color}`}>
                    {priority.label}
                  </td>
                  <td className="p-4 text-primary-text font-semibold">
                    {order.order_number}
                  </td>
                  <td className="p-4">
                    <div className="text-primary-text text-sm font-semibold">{order.customers?.full_name}</div>
                    <div className="text-secondary-text text-xs">{order.customers?.phone}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-success/20 text-success px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold">
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {order.status === 'pending' && (
                      <button 
                        disabled={isProcessing}
                        onClick={() => handleAction(order.id, 'processing')}
                        className="bg-accent text-background px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
                      >
                        📦 Pack
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button 
                        disabled={isProcessing}
                        onClick={() => handleAction(order.id, 'shipped')}
                        className="bg-blue-600 text-white px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50"
                      >
                        🚚 Ship
                      </button>
                    )}
                    {order.status === 'shipped' && (
                      <button 
                        disabled={isProcessing}
                        onClick={() => handleAction(order.id, 'delivered')}
                        className="bg-green-600 text-white px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
                      >
                        ✅ Deliver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
