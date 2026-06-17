"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      // 1. Heading slide-up
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Circles stagger slide-in from the right side of the screen
      if (circlesRef.current) {
        const circles = circlesRef.current.children;
        gsap.fromTo(
          circles,
          { x: 450, opacity: 0, scale: 0.9 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: circlesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Bottom text and links fade-in and slide up
      gsap.fromTo(
        [descRef.current, linkRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
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
      label: "Solar solutions",
      cursive: "Sustainability",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
      zIndex: "z-10",
    },
    {
      label: "Enlightenment",
      cursive: "Enlightenment",
      image: "/images/what-we-do-child.png",
      zIndex: "z-20",
    },
    {
      label: "Education programs",
      cursive: "Knowledge",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=600&auto=format&fit=crop",
      zIndex: "z-10",
    },
    {
      label: "Legal support & advocacy",
      cursive: "Advocacy",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop",
      zIndex: "z-20",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden border-t border-zinc-100"
    >
      <div className="max-w-8xl mx-auto w-full flex flex-col gap-16 md:gap-20">

        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 opacity-0"
        >
          What we do
        </h2>

        {/* Circles Container */}
        <div
          ref={circlesRef}
          className="flex flex-row items-center gap-5 xl:gap-0 overflow-x-auto pb-6 scrollbar-none xl:overflow-visible w-full xl:justify-start xl:px-4 snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-56 h-56 sm:w-64 sm:h-64 xl:w-72 xl:h-72 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-center p-6 relative ${item.zIndex} hover:z-30 hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg group overflow-hidden xl:-mx-4 opacity-0 circle-group snap-center`}
            >
              {/* Default State: Text in Center */}
              <div className="relative z-10 flex items-center justify-center w-full h-full circle-default-state">
                <span className="text-zinc-800 font-semibold text-lg sm:text-xl px-4">
                  {item.label}
                </span>
              </div>

              {/* Hover State: Image & Cursive Accent Text */}
              <div className="absolute inset-0 z-0 rounded-full overflow-hidden circle-hover-state">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 1280px) 256px, 288px"
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                {/* Dark tint overlay for white text readability */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Cursive overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl xl:text-6xl font-cursive text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] -rotate-6 tracking-wide select-none pointer-events-none">
                    {item.cursive}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10 mt-4 md:mt-6 border-t border-zinc-100 pt-8 md:pt-10">

          {/* Mission/Context Paragraph */}
          <div
            ref={descRef}
            className="max-w-2xl text-zinc-500 text-sm sm:text-base leading-relaxed opacity-0"
          >
            Genocide Education and Human Rights Initiative&apos;s missions tend towards closing the
            gap between survivors of genocide and access to a proper education that promotes a
            comprehensive understanding of the world coupled with cultural awareness, which is
            essential for the creation of tolerant and inclusive societies.
          </div>

          {/* Learn More Action Button */}
          <div ref={linkRef} className="opacity-0 flex-shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-200 hover:border-zinc-400 text-zinc-800 hover:text-black font-semibold text-sm sm:text-base hover:bg-zinc-50 transition-all duration-300 group whitespace-nowrap"
            >
              <span>Learn more about how we work</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
