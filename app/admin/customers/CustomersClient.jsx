"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { exportToCSV } from "@/lib/utils/csv-export";
import { getCustomersAction } from "../actions";

export default function CustomersClient({ initialData }) {
  const [customers, setCustomers] = useState(initialData.customers || []);
  const [totalCount, setTotalCount] = useState(initialData.totalCount || 0);
  const [loading, setLoading] = useState(false);
  
  // Filters
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    let isMounted = true;
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const { customers: newCustomers, totalCount: newCount } = await getCustomersAction({
          search, page, limit
        });
        if (isMounted) {
          setCustomers(newCustomers || []);
          setTotalCount(newCount || 0);
        }
      } catch (err) {
        console.error("Failed to load customers", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    // Skip initial fetch since we have server data, unless filters changed
    if (search !== '' || page !== 1) {
      fetchCustomers();
    } else {
      setCustomers(initialData.customers || []);
      setTotalCount(initialData.totalCount || 0);
    }

    return () => { isMounted = false; };
  }, [search, page, initialData]);

  const handleExport = () => {
    const exportData = customers.map(c => ({
      ID: c.id,
      Name: c.full_name,
      Email: c.email,
      Phone: c.phone,
      City: c.city,
      State: c.state,
      Total_Orders: c.orders_count,
      Total_Spend: c.total_spend
    }));
    exportToCSV(exportData, `vanameya_customers_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Customers</h1>
          <p className="text-secondary-text">Manage customer profiles and lifetime value. ({totalCount} total)</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-surface border border-border/20 text-primary-text px-4 py-2 text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface border border-border/20 p-4 rounded-xl flex">
        <input 
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent flex-1 max-w-md"
        />
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
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Joined Date</th>
                <th className="p-4 font-semibold text-center">Orders</th>
                <th className="p-4 font-semibold text-right">Lifetime Spend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-secondary-text">No customers found.</td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <Link href={`/admin/customers/${customer.id}`} className="text-accent font-semibold hover:underline block">
                        {customer.full_name || 'N/A'}
                      </Link>
                      <div className="text-xs text-secondary-text mt-1">{customer.email}</div>
                      <div className="text-xs text-secondary-text">{customer.phone}</div>
                    </td>
                    <td className="p-4 text-sm text-primary-text">
                      {customer.city ? `${customer.city}, ${customer.state}` : 'N/A'}
                    </td>
                    <td className="p-4 text-xs text-secondary-text">
                      {format(new Date(customer.created_at), 'MMM d, yyyy')}
                    </td>
                    <td className="p-4 text-center font-semibold text-primary-text">
                      {customer.orders_count}
                    </td>
                    <td className="p-4 text-right font-semibold text-primary-text">
                      ₹{customer.total_spend?.toLocaleString('en-IN') || 0}
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
