"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  number: string;
  label: string;
}

export default function ImpactStats() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout animation: shrink width to 85% and apply 150px border-radius
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(
          cardRef.current,
          {
            width: "100%",
            borderRadius: "0px",
          },
          {
            width: "85%",
            borderRadius: "300px",
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top bottom",
              end: "bottom 95%",
              scrub: true,
            },
          }
        );
      });

      // Mobile / Tablet layout animation: shrink width to 92% and apply 48px border-radius
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          cardRef.current,
          {
            width: "100%",
            borderRadius: "0px",
          },
          {
            width: "92%",
            borderRadius: "48px",
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top bottom",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      });

      // Staggered fade-in and slide-up of the stats row items
      if (statsRef.current) {
        const statItems = statsRef.current.children;
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 60%",
              end: "bottom 90%",
              scrub: true,
            },
          }
        );
      }
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  const stats: StatItem[] = [
    {
      number: "100 +",
      label: "Yazidis are still residing in refugee camps by 2021",
    },
    {
      number: "200 k",
      label: "People already received help & assistance from us",
    },
    {
      number: "78 M",
      label: "of youth are not attending school, globally",
    },
  ];

  return (
    <section
      ref={triggerRef}
      className="relative w-full bg-white py-16 md:py-24 flex items-center justify-center overflow-hidden border-t border-zinc-100"
    >
      {/* Morphing dark container */}
      <div
        ref={cardRef}
        className="w-full bg-[#131316] text-white flex flex-col items-center justify-center text-center px-6 py-16 sm:px-12 sm:py-24 md:py-28 mx-auto shadow-xl"
        style={{ width: "100%", borderRadius: "0px" }} // Initial inline styles to prevent layouts flashes
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 md:gap-16 w-full">

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4.5xl font-bold tracking-tight text-white max-w-4xl leading-tight px-4">
            It is a long established fact that a reader will be distracted by the readable
          </h2>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full max-w-5xl"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Large Cursive Number */}
                <span className="font-cursive text-7xl sm:text-8xl md:text-9xl text-sky-300 select-none leading-none drop-shadow-[0_4px_16px_rgba(147,197,253,0.15)]">
                  {stat.number}
                </span>

                {/* Description label */}
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-[220px] mx-auto mt-3 sm:mt-4 font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
