"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { getAllReviewsAction, updateReviewStatusAction, deleteReviewAction } from "../actions";

export default function ReviewsClient({ initialData }) {
  const [reviews, setReviews] = useState(initialData.reviews || []);
  const [totalCount, setTotalCount] = useState(initialData.totalCount || 0);
  const [loading, setLoading] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  
  // Filters
  const [status, setStatus] = useState('all'); // all, approved, pending
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { reviews: newReviews, totalCount: newCount } = await getAllReviewsAction({
          status, page, limit
        });
        if (isMounted) {
          setReviews(newReviews || []);
          setTotalCount(newCount || 0);
        }
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    // Skip initial fetch since we have server data, unless filters changed
    if (status !== 'all' || page !== 1) {
      fetchReviews();
    } else {
      setReviews(initialData.reviews || []);
      setTotalCount(initialData.totalCount || 0);
    }

    return () => { isMounted = false; };
  }, [status, page, initialData]);

  const handleApprove = async (id, currentApproved) => {
    setLoadingId(id);
    try {
      await updateReviewStatusAction(id, !currentApproved);
      // Optimistic update
      setReviews(reviews.map(r => r.id === id ? { ...r, approved: !currentApproved } : r));
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review permanently?")) return;
    setLoadingId(id);
    try {
      await deleteReviewAction(id);
      setReviews(reviews.filter(r => r.id !== id));
      setTotalCount(c => c - 1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    } finally {
      setLoadingId(null);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-primary-text mb-2">Reviews Moderation</h1>
          <p className="text-secondary-text">Manage customer reviews for your products. ({totalCount} total)</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface border border-border/20 p-4 rounded-xl flex">
        <select 
          value={status} 
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="bg-black/20 border border-border/30 rounded-lg px-4 py-2 text-sm text-primary-text outline-none focus:border-accent w-full md:w-auto"
        >
          <option value="all">All Reviews</option>
          <option value="pending">Pending Approval</option>
          <option value="approved">Approved & Visible</option>
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
                <th className="p-4 font-semibold w-1/4">Customer & Product</th>
                <th className="p-4 font-semibold w-1/2">Review</th>
                <th className="p-4 font-semibold text-center">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-secondary-text">No reviews found.</td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-primary-text">
                        {review.customers?.full_name || 'Anonymous'}
                      </div>
                      <div className="text-xs text-secondary-text mt-1 truncate max-w-[200px]">
                        {review.products?.name || 'Unknown Product'}
                      </div>
                      <div className="text-[10px] text-secondary-text mt-1 opacity-70">
                        {format(new Date(review.created_at), 'MMM d, yyyy')}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-accent' : 'text-secondary-text opacity-30'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="font-semibold text-sm text-primary-text mb-1">{review.title}</div>
                      <div className="text-sm text-secondary-text line-clamp-2">{review.review}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider font-bold inline-block ${
                        review.approved ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={loadingId === review.id}
                          onClick={() => handleApprove(review.id, review.approved)}
                          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors disabled:opacity-50 ${
                            review.approved 
                              ? 'border-warning text-warning hover:bg-warning/10' 
                              : 'border-success text-success hover:bg-success/10'
                          }`}
                        >
                          {review.approved ? 'Hide' : 'Approve'}
                        </button>
                        <button
                          disabled={loadingId === review.id}
                          onClick={() => handleDelete(review.id)}
                          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border border-error text-error hover:bg-error/10 transition-colors disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
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
