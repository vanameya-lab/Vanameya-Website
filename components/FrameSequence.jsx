"use client";
import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { FRAME_PATHS, MAPPED_FRAME_PATHS } from "@/utils/framePaths";

const FrameSequence = forwardRef(({ 
  className = "", 
  onLoadComplete 
}, ref) => {
  const canvasRef = useRef(null);
  // Store loaded images in a map keyed by their filename (e.g., "ezgif-frame-001.jpg")
  const imagesRef = useRef({});
  const currentFrameIndexRef = useRef(0);
  const [loaded, setLoaded] = useState(false);

  // Preload unique images
  useEffect(() => {
    let loadedCount = 0;
    const uniqueFrames = FRAME_PATHS;
    const totalUnique = uniqueFrames.length;
    
    console.log("FrameSequence: Preloading started. Total unique frames:", totalUnique);
    if (totalUnique === 0) return;

    // Prioritize first frame
    const firstImg = new Image();
    const firstFrameName = MAPPED_FRAME_PATHS[0];
    firstImg.src = `/hero-scroll/${firstFrameName}`;
    firstImg.onload = () => {
      console.log("FrameSequence: First frame loaded:", firstFrameName);
      imagesRef.current[firstFrameName] = firstImg;
      renderFrame(0); // Render first frame immediately
      
      // Load rest of the unique frames
      uniqueFrames.forEach((frameName) => {
        if (frameName === firstFrameName) return; // already loaded
        
        const img = new Image();
        img.src = `/hero-scroll/${frameName}`;
        img.onload = () => {
          imagesRef.current[frameName] = img;
          loadedCount++;
          
          // If the loaded image is the one we want for the currently active frame, redraw it!
          if (frameName === MAPPED_FRAME_PATHS[currentFrameIndexRef.current]) {
            renderFrame(currentFrameIndexRef.current);
          }
          
          if (loadedCount >= totalUnique - 1) {
            console.log("FrameSequence: All unique frames preloaded!");
            setLoaded(true);
            if (onLoadComplete) onLoadComplete();
          }
        };
      });
    };
  }, []);

  const renderFrame = (index) => {
    currentFrameIndexRef.current = index;
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("FrameSequence: renderFrame failed - canvas ref is null");
      return;
    }
    const ctx = canvas.getContext("2d");
    
    const frameName = MAPPED_FRAME_PATHS[index];
    let img = imagesRef.current[frameName];
    
    // Fallback: If current frame image is not loaded yet, find the nearest loaded frame
    if (!img || !img.complete) {
      let fallbackFrameName = null;
      
      // Look backwards
      for (let i = index - 1; i >= 0; i--) {
        const name = MAPPED_FRAME_PATHS[i];
        if (imagesRef.current[name] && imagesRef.current[name].complete) {
          fallbackFrameName = name;
          break;
        }
      }
      
      // If not found, look forwards
      if (!fallbackFrameName) {
        for (let i = index + 1; i < MAPPED_FRAME_PATHS.length; i++) {
          const name = MAPPED_FRAME_PATHS[i];
          if (imagesRef.current[name] && imagesRef.current[name].complete) {
            fallbackFrameName = name;
            break;
          }
        }
      }
      
      if (fallbackFrameName) {
        img = imagesRef.current[fallbackFrameName];
      }
    }

    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Preserve aspect ratio inside canvas
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    } else {
      console.log("FrameSequence: renderFrame failed - no image or image not complete for index:", index);
    }
  };

  useImperativeHandle(ref, () => ({
    renderFrame
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(currentFrameIndexRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`w-full h-full object-cover ${className}`}
      aria-label="3D Frame Sequence Animation"
    />
  );
});

FrameSequence.displayName = "FrameSequence";

export default FrameSequence;
