"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LeadingIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect x="1" y="1" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 6h8M5 9h8M5 12h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutPerson() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bodyTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image circle slides in from left
      gsap.fromTo(
        imageRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Name signature wipes in
      if (nameRef.current) {
        gsap.fromTo(
          nameRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.8,
            delay: 0.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Right block slides up
      gsap.fromTo(
        rightRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      // Body text lines stagger (word-level simulation via the paragraph)
      gsap.fromTo(
        bodyTextRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 sm:py-20 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-20">

        {/* LEFT — Circular photo + cursive name */}
        <div ref={imageRef} className="relative flex-shrink-0 opacity-0">
          {/* Circle image */}
          <div
            className="relative overflow-hidden rounded-full"
            style={{ width: "clamp(260px, 35vw, 340px)", height: "clamp(260px, 35vw, 340px)" }}
          >
            <Image
              src="/images/narin-briar.png"
              alt="Narîn Briar"
              fill
              className="object-cover"
              sizes="340px"
            />
            {/* Soft inner shadow overlay */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "inset 0 -60px 80px rgba(255,255,255,0.18)",
              }}
            />
          </div>

          {/* Cursive name overlay */}
          <div
            ref={nameRef}
            className="absolute"
            style={{
              bottom: "-35px",
              left: "40px",
              clipPath: "inset(0 100% 0 0)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dancing), cursive",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "#8ab4d4",
                letterSpacing: "0.01em",
                lineHeight: 1,
                userSelect: "none",
                textShadow: "0 1px 4px rgba(255,255,255,0.6)",
              }}
            >
              Narîn Briar
            </span>
          </div>
        </div>

        {/* RIGHT — Text content */}
        <div ref={rightRef} className="flex flex-col gap-6 opacity-0 pt-4">
          {/* ABOUT label */}
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "#94a3b8" }}
          >
            About
          </span>

          {/* Hero paragraph */}
          <p
            ref={bodyTextRef}
            className="text-zinc-900 font-semibold leading-snug opacity-0"
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Narîn Briar is an academic, human rights advocate, and
            interdisciplinary artist. She amplifies the voices of silenced
            ethnic and religious minorities. Narîn empowers the communities
            supports various projects and is currently involved in installing
            solar panels for Yazidi schools.
          </p>

          {/* Secondary smaller paragraph */}
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
            Her impactful work has gained recognition, with her projects being
            displayed at prestigious institutions such as Harvard, Yale, and
            Boston College. In 2019, Narîn received recognition from Elizabeth
            Warren for her efforts.
          </p>

          {/* CTA link */}
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 transition-colors duration-200 mt-2"
          >
            <LeadingIcon />
            More leading to about us
          </Link>
        </div>
      </div>
    </section>
  );
}
