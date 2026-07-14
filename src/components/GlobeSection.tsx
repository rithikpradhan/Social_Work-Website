"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobeSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !sectionRef.current ||
      !stickyRef.current ||
      !bgTextRef.current ||
      !curtainRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Dynamic globe size based on viewport width
      const getGlobeSize = () => {
        if (typeof window !== "undefined") {
          return window.innerWidth < 640 ? 320 : 540;
        }
        return 540;
      };

      const globeSize = getGlobeSize();
      const MUMBAI_X = "49.8%";
      const MUMBAI_Y = "50.8%";

      // --- Set Initial States ---
      gsap.set(containerRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0px",
        scale: 1,
        opacity: 1,
      });

      gsap.set(mapRef.current, {
        scale: 1,
        transformOrigin: `${MUMBAI_X} ${MUMBAI_Y}`,
      });

      gsap.set(pinRef.current, {
        scale: 0,
        opacity: 0,
      });

      gsap.set(stickyRef.current, {
        backgroundColor: "#ffffff",
      });

      // Background watermark text is initially small and transparent
      gsap.set(bgTextRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      // Curtain sits below the viewport
      gsap.set(curtainRef.current, {
        y: "100%",
      });

      // --- Create Scrollytelling Timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: stickyRef.current,
          anticipatePin: 1,
          onLeave: () => {
            // Rises the curtain from bottom to cover screen, then route to dedicated page
            gsap.to(curtainRef.current, {
              y: "0%",
              duration: 0.8,
              ease: "power3.inOut",
              onComplete: () => {
                router.push("/contact");
              },
            });
          },
          onEnterBack: () => {
            // Reset/Hide the curtain if the user scrolls back up quickly
            gsap.to(curtainRef.current, {
              y: "100%",
              duration: 0.5,
              ease: "power2.out",
            });
          },
        },
      });

      // Phase 1 (0 -> 0.28): Full width banner morphs to a circle (globe) & background turns light blue (#93c5fd)
      tl.to(
        containerRef.current,
        {
          width: globeSize,
          height: globeSize,
          borderRadius: "9999px",
          ease: "power2.inOut",
          duration: 0.28,
        },
        0
      );

      tl.to(
        stickyRef.current,
        {
          backgroundColor: "#93c5fd", // Light blue background
          ease: "power2.inOut",
          duration: 0.28,
        },
        0
      );

      tl.to(
        textRef.current,
        {
          opacity: 0,
          scale: 0.7,
          ease: "power2.inOut",
          duration: 0.2,
        },
        0
      );

      // Watermark text fades in slightly during Phase 1
      tl.to(
        bgTextRef.current,
        {
          opacity: 0.35,
          scale: 1,
          ease: "power2.inOut",
          duration: 0.28,
        },
        0
      );

      // Phase 2 (0.28 -> 0.55): Zoom in to center on India
      tl.to(
        mapRef.current,
        {
          scale: 4,
          ease: "power1.inOut",
          duration: 0.27,
        },
        0.28
      );

      // Phase 3 (0.55 -> 0.75): Zoom extremely close to Mumbai location & reveal glowing pin
      tl.to(
        mapRef.current,
        {
          scale: 14,
          ease: "power1.in",
          duration: 0.2,
        },
        0.55
      );

      tl.to(
        pinRef.current,
        {
          opacity: 1,
          scale: 1 / 14, // counter-scale to maintain constant visual size of the pin
          ease: "power2.out",
          duration: 0.15,
        },
        0.58
      );

      // Phase 4 (0.75 -> 1.0): Zoom past the globe (fade & expand)
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          scale: 2.2,
          ease: "power2.in",
          duration: 0.25,
        },
        0.75
      );

      // Watermark text scales up and becomes fully solid as the Earth fades out
      tl.to(
        bgTextRef.current,
        {
          opacity: 1,
          scale: 1.2,
          ease: "power2.out",
          duration: 0.25,
        },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [router]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-zinc-950"
      style={{ height: "350vh" }}
    >
      {/* Sticky wrapper pinning viewport */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full flex items-center justify-center overflow-hidden transition-colors duration-300"
        style={{ height: "100vh" }}
      >
        {/* Background Watermark Text behind the Earth */}
        <div
          ref={bgTextRef}
          className="absolute z-0 flex items-center justify-center pointer-events-none select-none text-center px-4 font-black tracking-tighter uppercase"
          style={{
            fontFamily: "'Gondens Demo', 'League Gothic', 'Impact', 'Oswald', sans-serif",
            fontSize: "clamp(5rem, 15vw, 18rem)",
            color: "#14233c",
            lineHeight: 0.9,
          }}
        >
          Contact
        </div>

        {/* Morphing Globe Container */}
        <div
          ref={containerRef}
          className="relative flex-shrink-0 z-10 border border-zinc-800/40 shadow-2xl"
          style={{
            overflow: "hidden",
            backgroundColor: "#111827",
          }}
        >
          {/* Map Layer */}
          <div
            ref={mapRef}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/images/world-map.png')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Glowing Mumbai Pin inside map so it scales geographical position */}
            <div
              ref={pinRef}
              className="absolute"
              style={{
                left: "49.8%",
                top: "50.8%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Ping rings */}
                <span className="absolute inline-flex h-20 w-20 rounded-full bg-emerald-400/40 animate-ping" />
                <span className="absolute inline-flex h-28 w-28 rounded-full bg-emerald-500/20 animate-pulse" />
                {/* Center dot */}
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 border-2 border-white shadow-lg shadow-emerald-500/50">
                  <span className="block h-3 w-3 rounded-full bg-white animate-pulse" />
                </span>
              </div>
            </div>
          </div>

          {/* Spherical shadow overlay for 3D depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, transparent 30%, rgba(0, 0, 0, 0.7) 100%)",
            }}
          />

          {/* Heading overlay shown at the beginning */}
          <div
            ref={textRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none p-6"
          >
            <span
              className="font-cursive text-white tracking-wide select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-tight text-center"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                color: "#e2f1db",
              }}
            >
              Voices Unsilenced
            </span>
          </div>
        </div>
      </div>

      {/* Solid Curtain Overlay sliding up from the bottom */}
      <div
        ref={curtainRef}
        className="fixed inset-0 w-full h-full bg-[#14233c] z-50 pointer-events-none"
        style={{ transform: "translateY(100%)" }}
      />
    </section>
  );
}
