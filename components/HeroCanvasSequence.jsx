"use client";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";

const HeroCanvasSequence = forwardRef(({ frames = [], className = "" }, ref) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef({});
  const currentFrameIndexRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = frames.length;
    
    if (totalFrames === 0) return;

    // Load first 10 frames immediately to ensure visual readiness
    const initialBatchSize = Math.min(10, totalFrames);
    let initialBatchLoaded = 0;

    const loadFrame = (index, isInitialBatch) => {
      const frameName = frames[index];
      if (imagesRef.current[frameName]) return; // Already loading/loaded

      const img = new Image();
      img.src = frameName;
      img.onload = () => {
        imagesRef.current[frameName] = img;
        loadedCount++;

        if (isInitialBatch) {
          initialBatchLoaded++;
          // Render the first frame as soon as it's ready
          if (index === 0) {
             requestAnimationFrame(() => renderFrame(0));
          }
          // If first batch is done, we can mark as initially loaded
          if (initialBatchLoaded === initialBatchSize) {
             setLoaded(true);
             // Proceed to lazy load the rest
             loadRemainingFrames();
          }
        }
        
        // If the loaded image is the one needed *now*, render it
        if (index === currentFrameIndexRef.current) {
          requestAnimationFrame(() => renderFrame(currentFrameIndexRef.current));
        }
      };
      
      // Mark as loading to avoid duplicate requests
      imagesRef.current[frameName] = { loading: true }; 
    };

    const loadRemainingFrames = () => {
      for (let i = initialBatchSize; i < totalFrames; i++) {
        loadFrame(i, false);
      }
    };

    // Start with initial batch
    for (let i = 0; i < initialBatchSize; i++) {
      loadFrame(i, true);
    }
    
  }, [frames]);

  const renderFrame = (index) => {
    currentFrameIndexRef.current = index;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const frameName = frames[index];
    let img = imagesRef.current[frameName];
    
    // Check if the actual image object is loaded (not the {loading: true} placeholder)
    const isImageReady = img && img instanceof HTMLImageElement && img.complete;
    
    if (!isImageReady) {
      // Graceful fallback to nearest loaded frame to avoid flickering
      let fallbackImg = null;
      
      // Search backwards first (usually more natural during forward scroll)
      for (let i = index - 1; i >= 0; i--) {
        const checkImg = imagesRef.current[frames[i]];
        if (checkImg && checkImg instanceof HTMLImageElement && checkImg.complete) {
          fallbackImg = checkImg;
          break;
        }
      }
      
      // If not found backwards, search forwards
      if (!fallbackImg) {
        for (let i = index + 1; i < frames.length; i++) {
          const checkImg = imagesRef.current[frames[i]];
          if (checkImg && checkImg instanceof HTMLImageElement && checkImg.complete) {
            fallbackImg = checkImg;
            break;
          }
        }
      }
      
      if (fallbackImg) {
        img = fallbackImg;
      }
    }

    if (img && img instanceof HTMLImageElement && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Cover logic to fill the screen elegantly without gaps
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio); // Math.max for COVER behavior
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      // Enable high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      ctx.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  useImperativeHandle(ref, () => ({
    renderFrame
  }));

  // Handle Resize and Retina display crispness
  useEffect(() => {
    const canvas = canvasRef.current;
    let resizeTimer;
    
    const handleResize = () => {
      if (!canvas) return;
      
      // Account for device pixel ratio for Retina displays
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect(); // Use parent to size freely
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Re-render frame after resize
      requestAnimationFrame(() => renderFrame(currentFrameIndexRef.current));
    };

    const throttledResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", throttledResize);
    handleResize(); // Initial setup
    
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`block ${className}`}
      aria-label="Frame Sequence Animation"
    />
  );
});

HeroCanvasSequence.displayName = "HeroCanvasSequence";
export default HeroCanvasSequence;
