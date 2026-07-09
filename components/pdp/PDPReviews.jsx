"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PDPReviews() {
  const reviews = [
    {
      name: "Aisha M.",
      verified: true,
      rating: 5,
      date: "October 12, 2025",
      title: "Replaced my morning coffee completely",
      text: "I was skeptical at first, but the flavor is incredible. It has that perfect kick of ginger without being overwhelming. My digestion feels so much better, and I don't get the caffeine crash anymore.",
      photos: ["/products/dry-ginger-coffee/Pack.png", "/products/dry-ginger-coffee/sachet.png"]
    },
    {
      name: "Rahul K.",
      verified: true,
      rating: 5,
      date: "September 28, 2025",
      title: "Just like my grandmother used to make",
      text: "Authentic taste! The palm jaggery gives it a beautiful caramel-like sweetness. It's so convenient to just tear a sachet and mix with hot water at the office.",
      photos: []
    },
    {
      name: "Priya S.",
      verified: true,
      rating: 4,
      date: "September 15, 2025",
      title: "Great for travel",
      text: "I take these everywhere now. It's so hard to find healthy, natural drinks when traveling. Only giving 4 stars because I wish the box had 15 sachets instead of 10!",
      photos: ["/products/dry-ginger-coffee/herodesktopview.png"]
    }
  ];

  return (
    <section className="w-full py-24 px-6 bg-surface border-t border-border/50">
      <div className="max-w-container-max mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Summary */}
          <div className="lg:col-span-4 flex flex-col">
            <h2 className="type-display-lg text-primary-text mb-6">Customer Reviews</h2>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-6xl font-bold text-primary-text leading-none">4.9</span>
              <div className="flex flex-col gap-1 pb-1">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="text-secondary-text font-medium text-sm">Based on 248 reviews</span>
              </div>
            </div>

            {/* Distribution Bars */}
            <div className="flex flex-col gap-2 mb-10">
              {[
                { stars: 5, pct: 90 },
                { stars: 4, pct: 8 },
                { stars: 3, pct: 2 },
                { stars: 2, pct: 0 },
                { stars: 1, pct: 0 }
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-12 text-sm font-medium text-primary-text shrink-0">{item.stars} Stars</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="w-8 text-right text-xs text-secondary-text/70">{item.pct}%</span>
                </div>
              ))}
            </div>

            <button className="w-full py-4 border-2 border-primary-text text-primary-text hover:bg-primary-text hover:text-background type-label rounded-xl transition-all duration-300 font-bold uppercase tracking-widest text-center cursor-pointer mb-8">
              Write a Review
            </button>
            <p className="text-xs text-secondary-text/60 italic text-center">Only verified buyers can leave reviews.</p>
          </div>

          {/* Right Column: Review List */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Controls */}
            <div className="flex justify-between items-center border-b border-border/50 pb-4">
              <span className="font-semibold text-primary-text">248 Reviews</span>
              <select className="bg-transparent border border-border/50 text-primary-text rounded-lg px-4 py-2 outline-none focus:border-accent cursor-pointer">
                <option value="newest">Newest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
                <option value="photos">With Photos</option>
              </select>
            </div>

            {/* Reviews */}
            <div className="flex flex-col gap-10">
              {reviews.map((review, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <h4 className="text-lg font-bold text-primary-text">{review.title}</h4>
                    </div>
                    <span className="text-sm text-secondary-text/70">{review.date}</span>
                  </div>
                  
                  <p className="text-secondary-text font-light leading-relaxed mb-4">{review.text}</p>
                  
                  {/* Review Photos */}
                  {review.photos.length > 0 && (
                    <div className="flex gap-3 mb-4 overflow-x-auto pb-2 hide-scrollbar">
                      {review.photos.map((photo, pIdx) => (
                        <div key={pIdx} className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0 border border-border/50 bg-white/5 cursor-zoom-in">
                          <Image src={photo} alt="Customer Photo" fill className="object-cover" sizes="96px" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm mt-2">
                    <span className="font-semibold text-primary-text">{review.name}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-green-500 font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="mx-auto mt-4 px-8 py-3 border border-border text-primary-text rounded-full hover:border-accent hover:text-accent transition-colors font-medium">
              Load More Reviews
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
