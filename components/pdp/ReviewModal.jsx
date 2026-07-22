"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviewService } from "@/services/review.service";

export default function ReviewModal({ isOpen, onClose, productId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // In a real app, you would fetch these from the authenticated user's session Context
  // For the sake of this implementation, we use placeholders or expect them to be passed/selected
  // Since we don't have the auth context here, we assume customer_id and order_id are known.
  // Ideally, the user selects an order they are reviewing, or we pass it down.
  const CUSTOMER_ID = "00000000-0000-0000-0000-000000000000"; 
  const ORDER_ID = "00000000-0000-0000-0000-000000000000";

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (images.length + files.length > 3) {
      setError("Maximum 3 images allowed.");
      return;
    }

    const validFiles = files.filter(file => {
      const isTypeValid = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isSizeValid = file.size <= 5 * 1024 * 1024; // 5MB
      return isTypeValid && isSizeValid;
    });

    if (validFiles.length !== files.length) {
      setError("Some files were rejected. Only JPG, PNG, WEBP under 5MB are allowed.");
    } else {
      setError("");
    }

    setImages(prev => [...prev, ...validFiles].slice(0, 3));
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!title.trim() || !review.trim()) {
      setError("Title and review text are required.");
      return;
    }

    setLoading(true);

    try {
      await reviewService.createReview({
        customerId: CUSTOMER_ID,
        orderId: ORDER_ID,
        productId,
        rating,
        title,
        review,
        images
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form
        setSuccess(false);
        setRating(0);
        setTitle("");
        setReview("");
        setImages([]);
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
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-xl font-semibold text-primary-text mb-2">Review Submitted!</h4>
                <p className="text-secondary-text">Thank you for your feedback. Your review will be visible once approved.</p>
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

                {/* Title */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm font-semibold text-primary-text">Review Title *</label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Sum up your experience"
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-primary-text placeholder-secondary-text/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                {/* Review Text */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="review" className="text-sm font-semibold text-primary-text">Your Review *</label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell us what you loved about it..."
                    rows={4}
                    className="w-full bg-white/5 border border-border/50 rounded-xl px-4 py-3 text-primary-text placeholder-secondary-text/50 focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-primary-text">Add Photos (Optional, Max 3)</label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <div className="flex flex-wrap gap-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-border/50">
                        <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-error transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                    
                    {images.length < 3 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-20 h-20 rounded-xl border-2 border-dashed border-border/50 hover:border-accent flex flex-col items-center justify-center text-secondary-text hover:text-accent transition-colors bg-white/5"
                      >
                        <svg className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        <span className="text-[10px] font-semibold uppercase">Add</span>
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-secondary-text/60">JPG, PNG, WEBP up to 5MB each.</p>
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
