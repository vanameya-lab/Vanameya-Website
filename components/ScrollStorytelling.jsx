"use client";
import { useRef } from "react";

export default function ScrollStorytelling() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  // Note: Future GSAP integration will pin the center column and scrub the canvas 
  // while the left/right text columns scroll normally.

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-surface section-gap-lg overflow-hidden"
      id="scroll-storytelling"
    >
      <div className="max-w-container-max mx-auto px-6">
        
        {/* Desktop Layout: 3 Columns (Left Text, Center Sticky Canvas, Right Text) */}
        <div className="hidden md:grid grid-cols-3 gap-12 relative items-start">
          
          {/* Left Column Text (Stage 1 & 3 staggered) */}
          <div className="col-span-1 flex flex-col gap-[80vh] pt-[30vh] pb-[30vh]">
            <div className="story-stage max-w-sm">
              <span className="text-label-caps text-warm-gold mb-4 block">Stage 1</span>
              <h3 className="text-headline-md text-primary mb-4">Rooted In Tradition</h3>
              <p className="text-body-lg text-on-surface-variant">
                A recipe inspired by generations of Kerala wisdom.
              </p>
            </div>
            
            <div className="story-stage max-w-sm mt-auto">
              <span className="text-label-caps text-warm-gold mb-4 block">Stage 3</span>
              <h3 className="text-headline-md text-primary mb-4">Designed For Modern Life</h3>
              <p className="text-body-lg text-on-surface-variant">
                Ready in seconds. Enjoyed every day.
              </p>
            </div>
          </div>

          {/* Center Column: Sticky Canvas Stage */}
          <div className="col-span-1 h-screen sticky top-0 flex items-center justify-center">
            <div className="w-full aspect-square relative flex items-center justify-center z-0">
              <canvas 
                ref={canvasRef}
                className="w-full h-full object-contain will-change-[transform,opacity]"
                aria-label="Storytelling image sequence animation"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-surface-dim/20 -z-10 rounded-full">
                <span className="text-label-caps text-on-surface-variant/50 text-center px-4">
                  [ 300-Frame Animation ]
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Text (Stage 2 staggered) */}
          <div className="col-span-1 flex flex-col pt-[80vh]">
            <div className="story-stage max-w-sm">
              <span className="text-label-caps text-warm-gold mb-4 block">Stage 2</span>
              <h3 className="text-headline-md text-primary mb-4">Crafted With Purpose</h3>
              <p className="text-body-lg text-on-surface-variant">
                Dry ginger, pepper, cardamom and palm jaggery in perfect harmony.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout: Stacked (Animation -> Text -> Animation -> Text) */}
        <div className="md:hidden flex flex-col gap-16">
          <div className="flex flex-col gap-8">
            <div className="w-full aspect-square bg-surface-dim/30 rounded-full flex items-center justify-center">
               <span className="text-label-caps text-on-surface-variant/50">[ Anim Frame ]</span>
            </div>
            <div className="text-center">
              <span className="text-label-caps text-warm-gold mb-2 block">Stage 1</span>
              <h3 className="text-headline-md text-primary mb-4">Rooted In Tradition</h3>
              <p className="text-body-lg text-on-surface-variant">A recipe inspired by generations of Kerala wisdom.</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="w-full aspect-square bg-surface-dim/30 rounded-full flex items-center justify-center">
               <span className="text-label-caps text-on-surface-variant/50">[ Anim Frame ]</span>
            </div>
            <div className="text-center">
              <span className="text-label-caps text-warm-gold mb-2 block">Stage 2</span>
              <h3 className="text-headline-md text-primary mb-4">Crafted With Purpose</h3>
              <p className="text-body-lg text-on-surface-variant">Dry ginger, pepper, cardamom and palm jaggery in perfect harmony.</p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="w-full aspect-square bg-surface-dim/30 rounded-full flex items-center justify-center">
               <span className="text-label-caps text-on-surface-variant/50">[ Anim Frame ]</span>
            </div>
            <div className="text-center">
              <span className="text-label-caps text-warm-gold mb-2 block">Stage 3</span>
              <h3 className="text-headline-md text-primary mb-4">Designed For Modern Life</h3>
              <p className="text-body-lg text-on-surface-variant">Ready in seconds. Enjoyed every day.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
