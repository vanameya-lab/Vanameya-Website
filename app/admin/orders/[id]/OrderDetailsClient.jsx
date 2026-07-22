"use client";
import { useState } from "react";
import { format } from "date-fns";
import { updateOrderStatusAction, deleteOrderAction, updateCustomerAction } from "../../actions";
import { useRouter } from "next/navigation";

export default function OrderDetailsClient({ order }) {
  const router = useRouter();
  const [currentOrder, setCurrentOrder] = useState(order);
  const [loading, setLoading] = useState(false);
  
  // Edit Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address_line1: order.customers?.address_line1 || '',
    address_line2: order.customers?.address_line2 || '',
    city: order.customers?.city || '',
    state: order.customers?.state || '',
    pincode: order.customers?.pincode || '',
    country: order.customers?.country || 'India',
  });

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      await updateOrderStatusAction(order.id, newStatus, `Admin manually changed status to ${newStatus}`);
      setCurrentOrder({ ...currentOrder, status: newStatus });
      // The events array won't instantly update here without a full refetch, 
      // but for UI purposes the status badge updates instantly.
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!confirm("Are you sure you want to completely delete this order? This action cannot be undone.")) return;
    setLoading(true);
    try {
      await deleteOrderAction(order.id);
      router.push('/admin/orders');
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
      setLoading(false);
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateCustomerAction(order.customers.id, addressForm);
      setCurrentOrder({
        ...currentOrder,
        customers: {
          ...currentOrder.customers,
          ...addressForm
        }
      });
      setIsEditingAddress(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-warning/20 text-warning';
      case 'processing': return 'bg-accent/20 text-accent';
      case 'shipped': return 'bg-[#3b82f6]/20 text-[#3b82f6]';
      case 'delivered': return 'bg-success/20 text-success';
      case 'cancelled': return 'bg-error/20 text-error';
      default: return 'bg-white/10 text-secondary-text';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
      {/* Edit Address Modal */}
      {isEditingAddress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface border border-border/20 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-heading font-semibold text-primary-text mb-4">Edit Shipping Address</h3>
            <form onSubmit={handleUpdateAddress} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary-text mb-1">Address Line 1</label>
                <input required type="text" value={addressForm.address_line1} onChange={e => setAddressForm({...addressForm, address_line1: e.target.value})} className="w-full bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-primary-text outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-secondary-text mb-1">Address Line 2 (Optional)</label>
                <input type="text" value={addressForm.address_line2} onChange={e => setAddressForm({...addressForm, address_line2: e.target.value})} className="w-full bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-primary-text outline-none focus:border-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-1">City</label>
                  <input required type="text" value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} className="w-full bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-primary-text outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-1">State</label>
                  <input required type="text" value={addressForm.state} onChange={e => setAddressForm({...addressForm, state: e.target.value})} className="w-full bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-primary-text outline-none focus:border-accent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-1">Pincode</label>
                  <input required type="text" value={addressForm.pincode} onChange={e => setAddressForm({...addressForm, pincode: e.target.value})} className="w-full bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-primary-text outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-secondary-text mb-1">Country</label>
                  <input required type="text" value={addressForm.country} onChange={e => setAddressForm({...addressForm, country: e.target.value})} className="w-full bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-primary-text outline-none focus:border-accent" />
                </div>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setIsEditingAddress(false)} className="px-4 py-2 rounded-lg font-semibold text-secondary-text hover:text-primary-text">Cancel</button>
                <button type="submit" disabled={loading} className="bg-accent text-white px-4 py-2 font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-50">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="lg:col-span-2 space-y-6">
        
        {/* Order Info */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-heading font-semibold text-primary-text">Order #{currentOrder.order_number}</h2>
              <p className="text-sm text-secondary-text">{format(new Date(currentOrder.created_at), 'MMMM d, yyyy h:mm a')}</p>
            </div>
            <span className={`px-3 py-1.5 text-xs rounded-full uppercase tracking-wider font-bold inline-block ${getStatusColor(currentOrder.status)}`}>
              {currentOrder.status}
            </span>
          </div>

          <div className="border-t border-border/20 pt-6">
            <h3 className="font-semibold text-primary-text mb-4">Items Purchased</h3>
            <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl">
              <div>
                <p className="font-semibold text-primary-text">{currentOrder.products?.name}</p>
                <p className="text-sm text-secondary-text">Qty: {currentOrder.quantity}</p>
              </div>
              <p className="font-semibold text-primary-text">₹{currentOrder.total}</p>
            </div>
            <div className="mt-4 flex justify-between text-sm text-secondary-text px-2">
              <span>Subtotal</span>
              <span>₹{currentOrder.total}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-secondary-text px-2">
              <span>Shipping</span>
              <span>₹0.00</span>
            </div>
            <div className="mt-4 flex justify-between font-semibold text-primary-text text-lg px-2 border-t border-border/10 pt-4">
              <span>Total</span>
              <span>₹{currentOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <h3 className="font-semibold text-primary-text mb-4">Update Status</h3>
          <div className="flex flex-wrap gap-3">
            <button disabled={loading} onClick={() => handleStatusUpdate('processing')} className="bg-accent text-background px-4 py-2 font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-accent-hover disabled:opacity-50">Pack Order</button>
            <button disabled={loading} onClick={() => handleStatusUpdate('shipped')} className="bg-blue-600 text-white px-4 py-2 font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-blue-500 disabled:opacity-50">Mark Shipped</button>
            <button disabled={loading} onClick={() => handleStatusUpdate('delivered')} className="bg-green-600 text-white px-4 py-2 font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-green-500 disabled:opacity-50">Mark Delivered</button>
            <button disabled={loading} onClick={() => handleStatusUpdate('cancelled')} className="bg-red-600/20 text-red-500 border border-red-600/30 px-4 py-2 font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-red-600/40 disabled:opacity-50">Cancel Order</button>
          </div>
          <div className="border-t border-border/20 mt-6 pt-6">
            <h3 className="font-semibold text-red-500 mb-4">Danger Zone</h3>
            <button disabled={loading} onClick={handleDeleteOrder} className="bg-red-600 text-white px-4 py-2 font-bold uppercase text-sm tracking-wider rounded-lg hover:bg-red-700 disabled:opacity-50">Delete Order Permanently</button>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <h3 className="font-semibold text-primary-text mb-6">Order Timeline</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/30 before:to-transparent">
            {currentOrder.order_events?.map((event, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-surface text-accent shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-xl">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border/20 bg-black/20">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-primary-text">{event.event}</div>
                  </div>
                  <div className="text-xs text-secondary-text mb-2">{format(new Date(event.created_at), 'MMM d, yyyy h:mm a')}</div>
                  <div className="text-sm text-secondary-text">{event.notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Customer Info */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <h3 className="font-semibold text-primary-text mb-4">Customer Information</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Name</p>
              <p className="font-medium text-primary-text">{currentOrder.customers?.full_name}</p>
            </div>
            <div>
              <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Email</p>
              <p className="font-medium text-primary-text break-all">{currentOrder.customers?.email}</p>
            </div>
            <div>
              <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Phone</p>
              <p className="font-medium text-primary-text">{currentOrder.customers?.phone}</p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-primary-text">Shipping Address</h3>
            <button onClick={() => setIsEditingAddress(true)} className="text-xs font-bold text-accent uppercase tracking-wider hover:underline">Edit</button>
          </div>
          <div className="text-sm text-secondary-text leading-relaxed">
            <p>{currentOrder.customers?.address_line1}</p>
            {currentOrder.customers?.address_line2 && <p>{currentOrder.customers?.address_line2}</p>}
            <p>{currentOrder.customers?.city}, {currentOrder.customers?.state}</p>
            <p>{currentOrder.customers?.pincode}</p>
            <p className="mt-2 text-primary-text font-medium">{currentOrder.customers?.country}</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-surface border border-border/20 p-6 rounded-2xl">
          <h3 className="font-semibold text-primary-text mb-4">Payment Details</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Status</p>
              <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold inline-block ${
                currentOrder.payment_status === 'paid' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
              }`}>
                {currentOrder.payment_status}
              </span>
            </div>
            {currentOrder.payments?.[0] && (
              <>
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Razorpay Payment ID</p>
                  <p className="font-mono text-primary-text">{currentOrder.payments[0].provider_payment_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Razorpay Order ID</p>
                  <p className="font-mono text-primary-text">{currentOrder.payments[0].provider_order_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Payment Method</p>
                  <p className="font-medium text-primary-text capitalize">{currentOrder.payments[0].payment_method || 'Online'}</p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
