"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HelpCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

export default function HowToHelp() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading slide-up
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger slide-up
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cards: HelpCard[] = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 14.5C9 12 11 10 13.5 10.5C15.5 11 17 13 16 15.5C15.2 17.5 12.5 18.5 10.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Join the funding",
      description:
        "Be a part of our funding efforts and help us bring about lasting impact in underserved communities. Your contribution plays a crucial role in empowering individuals and fostering sustainable change.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 9v10M9 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 8l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: "Donate for solar panel",
      description:
        "Make a donation towards our solar panel initiative and help us bring clean, sustainable energy to communities in need. Your support will directly contribute to powering schools, community centers, and improving lives through renewable energy.",
      featured: true,
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Volunteer for refugees",
      description:
        "Join us as a volunteer and make a difference in the lives of refugees. By dedicating your time and skills, you can provide support, compassion, and empowerment to those seeking refuge and a fresh start.",
    },
  ];

  // Dark navy color used on the middle "featured" card
  const HOVER_BG = "#1a1b2e";

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-16 lg:px-24 border-t border-zinc-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-14">
        {/* Heading block */}
        <div ref={headingRef} className="flex flex-col gap-4 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
            How can you help us
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            Genocide Education and Human Rights Initiative&apos;s missions tend towards closing the gap between survivors of genocide
            and access to a proper education that promotes a comprehensive understanding of the world coupled with
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row md:flex-wrap lg:grid lg:grid-cols-3 gap-5 lg:gap-6 justify-center w-full"
        >
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            const isDark = isHovered;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col justify-between gap-10 p-8 rounded-3xl border cursor-pointer select-none w-full md:w-[calc(50%-10px)] lg:w-auto"
                style={{
                  backgroundColor: isDark ? HOVER_BG : "#f4f4f5",
                  borderColor: isDark ? "transparent" : "#e4e4e7",
                  boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.25)" : "none",
                  transform: isHovered ? "translateY(-4px)" : "none",
                  transition:
                    "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease",
                  opacity: 1,
                }}
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                    color: isDark ? "#fff" : "#3f3f46",
                    transition: "background-color 0.4s ease, color 0.4s ease",
                  }}
                >
                  {card.icon}
                </div>

                {/* Text content */}
                <div className="flex flex-col gap-4">
                  <h3
                    className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight"
                    style={{
                      color: isDark ? "#fff" : "#18181b",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: isDark ? "rgba(255,255,255,0.55)" : "#71717a",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* CTA button */}
                <div>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                    style={{
                      backgroundColor:
                        card.featured && isHovered
                          ? "#a8d5a2"
                          : isHovered
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(0,0,0,0.07)",
                      color: isDark ? (card.featured ? "#1a1b2e" : "#fff") : "#18181b",
                      border: isHovered ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.12)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    Show more
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
