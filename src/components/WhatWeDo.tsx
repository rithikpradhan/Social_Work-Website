"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading slide-up reveal
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Reveal circle cards in a stagger
      gsap.fromTo(
        ".circle-card",
        { scale: 0.85, opacity: 0, x: 50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Bottom text and links reveal
      gsap.fromTo(
        [descRef.current, linkRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    {
      id: "01",
      label: "Solar solutions",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "02",
      label: "Enlightenment",
      image: "/images/what-we-do-child.png",
    },
    {
      id: "03",
      label: "Education programs",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "04",
      label: "Legal support & advocacy",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const zIndexClasses = ["z-10", "z-20", "z-30", "z-40"];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden border-t border-zinc-100"
    >
      <div className="max-w-8xl mx-auto w-full flex flex-col gap-12 md:gap-16">
        
        {/* Section Heading */}
        <div ref={headingRef} className="flex flex-col gap-3 opacity-0">
          <div className="inline-flex items-center gap-2">
            <span className="h-[2px] w-6 bg-[#1e3a8a]/40" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#1e3a8a] font-mono">
              Core Focus Areas
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900">
            What we do
          </h2>
        </div>

        {/* Overlapping Circles Container */}
        <div className="w-full overflow-x-auto pb-8 pt-4 scrollbar-none">
          <div className="flex flex-row items-center justify-start min-w-max px-4 md:px-8 py-6 -space-x-12 sm:-space-x-16 md:-space-x-20 lg:-space-x-24">
            {items.map((item, index) => {
              const zIndexClass = zIndexClasses[index] || "z-10";
              return (
                <div
                  key={item.id}
                  className={`circle-card relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex-shrink-0 group overflow-hidden border border-zinc-200 shadow-md transition-all duration-500 ease-out hover:z-50 hover:scale-105 hover:shadow-2xl bg-zinc-50 ${zIndexClass}`}
                >
                  {/* Background Image: fully visible with no dark overlay */}
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-w-768px) 300px, 400px"
                  />
                  
                  {/* Central Glassmorphic Text Card */}
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="w-[75%] h-[75%] bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/60 flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-500 group-hover:bg-white/90 group-hover:scale-105">
                      <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase tracking-widest mb-1 sm:mb-2">
                        {item.id}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-zinc-950 leading-tight max-w-[85%]">
                        {item.label}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section Bottom Context & Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12 mt-6 border-t border-zinc-100 pt-10">
          
          <div
            ref={descRef}
            className="max-w-2xl text-zinc-500 text-sm sm:text-base leading-relaxed opacity-0"
          >
            Genocide Education and Human Rights Initiative&apos;s missions tend towards closing the
            gap between survivors of genocide and access to a proper education that promotes a
            comprehensive understanding of the world coupled with cultural awareness, which is
            essential for the creation of tolerant and inclusive societies.
          </div>

          <div ref={linkRef} className="opacity-0 flex-shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-200 hover:border-[#1e3a8a]/50 text-zinc-800 hover:text-[#1e3a8a] hover:bg-zinc-50 transition-all duration-300 group whitespace-nowrap"
            >
              <span>Learn more about how we work</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-[#1e3a8a] transition-all" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
