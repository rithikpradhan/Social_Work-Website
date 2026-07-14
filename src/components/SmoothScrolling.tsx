"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

interface SmoothScrollingProps {
  children: React.ReactNode;
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,         // Linear interpolation (lower is slower/smoother)
        duration: 1.2,     // Scroll duration in seconds
        smoothWheel: true, // Smooth wheel scrolling
        syncTouch: true,   // Sync touch scroll for mobile devices
      }}
    >
      {children}
    </ReactLenis>
  );
}
