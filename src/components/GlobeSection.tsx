"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    const GLOBE_SIZE = 520;
    // Start width = ~88% of viewport, capped at 1100px
    const startWidth = Math.min(window.innerWidth * 0.88, 1100);

    const ctx = gsap.context(() => {
      // --- Initial states ---
      gsap.set(containerRef.current, {
        width: startWidth,
        height: GLOBE_SIZE,
        borderRadius: 9999,
      });

      // Map inner div is 300% wide so we can pan it across for "rotation"
      gsap.set(mapRef.current, {
        x: 0,
      });

      // --- Two-phase scrubbed timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // Start when section top hits viewport top, end when section bottom hits viewport bottom
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      // ── Phase 1 (0→35%): pill → circle ──
      tl.to(
        containerRef.current,
        {
          width: GLOBE_SIZE,
          borderRadius: 9999,
          ease: "power2.inOut",
          duration: 0.35, // normalized duration (35% of timeline)
        },
        0
      );

      // ── Phase 2 (35→100%): earth rotates 360° ──
      // We move the inner map div left by (200% - 100%) = 100% of the container width
      // which equates to one full world wrap = ~360° impression
      tl.to(
        mapRef.current,
        {
          x: () => -GLOBE_SIZE, // shift left by one globe width
          ease: "none",
          duration: 0.65,
        },
        0.35 // start immediately after phase 1 ends
      );

      // Text fades/scales up gently during rotation phase
      tl.fromTo(
        textRef.current,
        { scale: 1, opacity: 0.85 },
        { scale: 1.06, opacity: 1, ease: "none", duration: 0.65 },
        0.35
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: "240vh" }}
    >
      {/* Sticky viewport pinned wrapper */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden"
        style={{ height: "100vh" }}
      >
        {/* Morphing outer container — clips everything inside via overflow:hidden */}
        <div
          ref={containerRef}
          className="relative flex-shrink-0"
          style={{
            overflow: "hidden",
            backgroundColor: "#1a2744",
          }}
        >
          {/* ── Map layer — 300% wide for rotation panning ── */}
          <div
            ref={mapRef}
            className="absolute inset-y-0"
            style={{
              // Three times wider than the final globe so panning looks like rotation
              width: "300%",
              left: "-100%", // start showing the center portion (Eurasia/Africa)
              backgroundImage: "url('/images/world-map.png')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "repeat-x",
            }}
          />

          {/* Radial vignette for sphere depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(10,18,50,0.65) 100%)",
            }}
          />

          {/* "Voices Unsilenced" label */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span
              style={{
                fontFamily: "var(--font-dancing), cursive",
                fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
                fontWeight: 700,
                color: "#b5d5a2",
                letterSpacing: "0.01em",
                lineHeight: 1,
                textShadow: "0 2px 20px rgba(0,0,0,0.45)",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              Voices Unsilenced
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
