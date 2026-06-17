"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const curveRef = useRef<SVGPathElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Quote text
      gsap.fromTo(
        quoteRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.35,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Author
      gsap.fromTo(
        authorRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Curve draw
      if (curveRef.current) {
        const length = curveRef.current.getTotalLength();
        gsap.set(curveRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(curveRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          delay: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
      }

      // Handwritten text wipe reveal
      if (textRevealRef.current) {
        gsap.fromTo(
          textRevealRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 2.2,
            delay: 1.1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main quote card */}
        <div
          ref={cardRef}
          className="relative w-full rounded-3xl overflow-hidden opacity-0"
          style={{
            backgroundColor: "#1d4f6e",
            minHeight: "clamp(300px, 55vw, 480px)",
          }}
        >
          {/* Left content */}
          <div className="relative z-10 flex flex-col justify-between p-5 sm:p-10 md:p-14 lg:p-16 min-h-[300px] sm:min-h-[440px] w-full sm:max-w-[60%]">
            {/* Avatar */}
            <div>
              <div
                className="w-12 h-12 rounded-md overflow-hidden"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
              >
                <Image
                  src="/images/avatar-laszlo.png"
                  alt="László Cintia"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Quote */}
            <p
              ref={quoteRef}
              className="opacity-0 text-white font-medium leading-snug mt-6 sm:mt-10"
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 2rem)",
                letterSpacing: "-0.01em",
              }}
            >
              &ldquo;The purpose of education is to give to the body and to the
              soul all the beauty and all the perfection of which they are
              capable&rdquo;
            </p>

            {/* Author */}
            <div ref={authorRef} className="opacity-0 mt-10">
              <span
                className="text-xs tracking-widest uppercase font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                — László Cintia
              </span>
            </div>
          </div>

          {/* Right side decorative layer */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Flowing curve SVG — hidden on mobile */}
            <svg
              className="absolute top-0 right-0 h-full hidden sm:block"
              style={{ width: "60%" }}
              viewBox="0 0 520 440"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref={curveRef}
                d="M 420 -30 C 390 80, 460 130, 420 220 C 380 310, 280 330, 260 400 C 248 440, 268 470, 255 500"
                stroke="#a8d5a2"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Handwritten "Path to Empowerment" — hidden on mobile to prevent overlap */}
            <div
              ref={textRevealRef}
              className="absolute hidden sm:block"
              style={{
                bottom: "5%",
                right: "4%",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-dancing), cursive",
                  color: "#a8d5a2",
                  lineHeight: 1.1,
                  userSelect: "none",
                }}
              >
                <div style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 700 }}>
                  Path to
                </div>
                <div style={{ fontSize: "clamp(2.4rem, 5vw, 4.4rem)", fontWeight: 700 }}>
                  Empowerment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
