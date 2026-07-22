import Link from "next/link";
import { format } from "date-fns";
import { getCustomerByIdAction } from "../../actions";

export default async function AdminCustomerProfilePage({ params }) {
  const { id } = params;
  
  let customer;
  try {
    customer = await getCustomerByIdAction(id);
  } catch (error) {
    return (
      <div className="bg-surface border border-border/20 rounded-2xl p-12 text-center text-secondary-text">
        <h2 className="text-xl font-semibold text-error mb-2">Customer Not Found</h2>
        <p>We couldn't find the details for this customer.</p>
        <Link href="/admin/customers" className="text-accent underline mt-4 block">Return to Customers</Link>
      </div>
    );
  }

  const totalSpend = customer.orders?.reduce((sum, o) => sum + Number(o.total || 0), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/customers" className="w-10 h-10 bg-surface border border-border/20 rounded-xl flex items-center justify-center text-secondary-text hover:text-accent hover:border-accent transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-1">Customer Profile</h1>
          <p className="text-secondary-text">{customer.full_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Details */}
        <div className="space-y-6">
          <div className="bg-surface border border-border/20 p-6 rounded-2xl">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent text-3xl font-heading font-semibold mx-auto mb-4">
              {customer.full_name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-semibold text-center text-primary-text">{customer.full_name}</h2>
            <p className="text-center text-sm text-secondary-text mb-6">Customer since {format(new Date(customer.created_at), 'MMMM yyyy')}</p>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Email</p>
                <p className="font-medium text-primary-text">{customer.email}</p>
              </div>
              <div>
                <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Phone</p>
                <p className="font-medium text-primary-text">{customer.phone}</p>
              </div>
              <div>
                <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Address</p>
                <p className="font-medium text-primary-text">
                  {customer.address_line1}<br/>
                  {customer.address_line2 && <>{customer.address_line2}<br/></>}
                  {customer.city}, {customer.state}<br/>
                  {customer.country} - {customer.pincode}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface border border-border/20 p-6 rounded-2xl">
            <h3 className="font-semibold text-primary-text mb-4">Lifetime Value</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-xl">
                <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Total Orders</p>
                <p className="font-semibold text-xl text-primary-text">{customer.orders?.length || 0}</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl">
                <p className="text-secondary-text text-xs uppercase tracking-wider mb-1">Total Spend</p>
                <p className="font-semibold text-xl text-accent">₹{totalSpend.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border border-border/20 p-6 rounded-2xl">
            <h3 className="font-semibold text-primary-text mb-4">Purchase History</h3>
            
            {(!customer.orders || customer.orders.length === 0) ? (
              <p className="text-secondary-text text-sm">No orders found for this customer.</p>
            ) : (
              <div className="space-y-4">
                {customer.orders.map((order) => (
                  <div key={order.id} className="border border-border/10 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Link href={`/admin/orders/${order.id}`} className="font-semibold text-accent hover:underline">
                          {order.order_number}
                        </Link>
                        <p className="text-xs text-secondary-text mt-1">{format(new Date(order.created_at), 'MMM d, yyyy')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-text">₹{order.total}</p>
                        <span className={`px-2 py-1 text-[10px] rounded-full uppercase tracking-wider font-bold inline-block mt-1 ${
                          order.status === 'pending' ? 'bg-warning/20 text-warning' :
                          order.status === 'delivered' ? 'bg-success/20 text-success' :
                          'bg-white/10 text-secondary-text'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Reviews Submitted */}
          <div className="bg-surface border border-border/20 p-6 rounded-2xl">
            <h3 className="font-semibold text-primary-text mb-4">Reviews Submitted</h3>
            
            {(!customer.reviews || customer.reviews.length === 0) ? (
              <p className="text-secondary-text text-sm">No reviews found for this customer.</p>
            ) : (
              <div className="space-y-4">
                {customer.reviews.map((review) => (
                  <div key={review.id} className="border border-border/10 rounded-xl p-4 bg-white/5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent' : 'text-secondary-text opacity-30'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-semibold text-primary-text mb-1">{review.title}</p>
                    <p className="text-sm text-secondary-text">{review.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
