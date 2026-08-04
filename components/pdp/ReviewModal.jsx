"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviewService } from "@/services/review.service";
import ConfettiEffect from "../ConfettiEffect";

export default function ReviewModal({ isOpen, onClose, productId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // In a real app, you would fetch these from the authenticated user's session Context
  // For the sake of this implementation, we use placeholders or expect them to be passed/selected
  // Since we don't have the auth context here, we assume customer_id and order_id are known.
  // Ideally, the user selects an order they are reviewing, or we pass it down.
  const CUSTOMER_ID = null; 
  const ORDER_ID = null;



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setLoading(true);

    try {
      await reviewService.createReview({
        customerId: CUSTOMER_ID,
        orderId: ORDER_ID,
        productId,
        rating,
        review,
        reviewerName,
        phone,
        consent: reviewerName.trim().length > 0
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form
        setSuccess(false);
        setRating(0);
        setReview("");
        setPhone("");
      }, 3000);

    } catch (err) {
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-surface-elevated border border-border/50 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <h3 className="text-xl font-heading font-semibold text-primary-text">Write a Review</h3>
            <button onClick={onClose} className="text-secondary-text hover:text-primary-text transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 overflow-y-auto hide-scrollbar">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ConfettiEffect />
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-xl font-semibold text-primary-text mb-2">Thank You for Your Valuable Feedback!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Rating */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-primary-text">Overall Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg 
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating) ? 'text-yellow-500 fill-current' : 'text-white/10 fill-current'
                          }`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="reviewerName" className="text-sm font-semibold text-primary-text">Your Name (Optional)</label>
                  <input
                    id="reviewerName"
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-primary-text">Phone Number (Optional)</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent transition-colors"
                  />
                  <span className="text-xs text-secondary-text/60 italic">
                    Your number is kept completely private. We only use this for exclusive WhatsApp offers and updates.
                  </span>
                </div>

                {/* Review Text */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="review" className="text-sm font-semibold text-primary-text">Your Review (Optional)</label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-primary-text focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>



                {error && <p className="text-error text-sm font-medium">{error}</p>}

                <div className="pt-4 border-t border-border/50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl border border-border/50 text-primary-text hover:bg-white/5 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl bg-accent text-background hover:bg-accent-hover transition-colors font-bold uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
