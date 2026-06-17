"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Heart, Menu, X } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const cursiveRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      gsap.set(
        [
          headerRef.current,
          heading1Ref.current,
          heading2Ref.current,
          cursiveRef.current,
          svgLineRef.current,
        ],
        { opacity: 0 }
      );

      // 1. Background zoom-in
      tl.fromTo(
        bgRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // 2. Header slides down
      tl.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1.4"
      );

      // 3. Headings stagger up
      tl.fromTo(
        [heading1Ref.current, heading2Ref.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power4.out" },
        "-=0.9"
      );

      // 4. SVG decorative line draws
      if (svgLineRef.current) {
        const pathLength = svgLineRef.current.getTotalLength();
        gsap.set(svgLineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1,
        });
        tl.to(
          svgLineRef.current,
          { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
          "-=0.7"
        );
      }

      // 5. Cursive character-by-character writing
      const cursiveChars = cursiveRef.current?.querySelectorAll(".cursive-char");
      if (cursiveChars && cursiveChars.length > 0) {
        gsap.set(cursiveRef.current, { opacity: 1 });
        tl.fromTo(
          cursiveChars,
          { opacity: 0, scale: 0.5, y: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power1.out",
          },
          "-=1.6"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cursiveText = "in charge of future";
  const chars = cursiveText.split("");

  const navLinks = [
    { href: "/how-to-help", label: "How to help" },
    { href: "/about", label: "About us" },
    { href: "/stories", label: "Our stories" },
    { href: "/projects", label: "Our projects" },
    { href: "/map", label: "Map" },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black text-white"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 select-none pointer-events-none opacity-0"
      >
        <Image
          src="/images/hero-bg.png"
          alt="NGO Education Classroom Background"
          fill
          priority
          quality={100}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/10" />
      </div>

      {/* ── Header ── */}
      <header
        ref={headerRef}
        className="relative z-30 w-full border-b border-white/10 bg-black/10 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-12 flex items-center justify-between opacity-0"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent group-hover:to-sky-400 transition-all duration-300">
            GenocideEdu
          </span>
        </Link>

        {/* Desktop nav — only visible on lg+ */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="hidden lg:inline-block text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200"
          >
            Contact us
          </Link>
          <button className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95 group">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 group-hover:scale-110 transition-transform duration-300 fill-sky-400/20" />
            <span>Donate</span>
          </button>

          {/* Hamburger — visible on mobile & tablet (below lg) */}
          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Menu className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile / Tablet drawer */}
      {menuOpen && (
        <div className="absolute top-[57px] inset-x-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10 lg:hidden">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-lg transition-all duration-200 mt-1 border-t border-white/10 pt-3"
            >
              Contact us
            </Link>
          </nav>
        </div>
      )}

      {/* ── Main Hero Content ── */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-10 sm:py-16 w-full">
        <div className="max-w-4xl w-full select-none">

          {/* Heading line 1 */}
          <div className="overflow-hidden pb-1">
            <h1
              ref={heading1Ref}
              className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] opacity-0"
            >
              Genocide education
            </h1>
          </div>

          {/* Heading line 2 */}
          <div className="overflow-hidden pb-1">
            <h1
              ref={heading2Ref}
              className="text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] opacity-0"
            >
              and Human rights initiative
            </h1>
          </div>

          {/* Cursive text — sits BELOW headings on mobile, overlaps on larger screens */}
          <div className="relative h-16 sm:h-0 sm:block">
            <span
              ref={cursiveRef}
              className="
                /* mobile: relative flow below headings */
                sm:absolute
                sm:left-[12%] sm:top-[-10px]
                md:left-[18%] md:top-[0px]
                lg:left-[20%] lg:top-[0px]
                opacity-0 -rotate-3 z-20
                pointer-events-none select-none
                drop-shadow-[0_4px_12px_rgba(147,197,253,0.5)]
                tracking-wide whitespace-nowrap
                mt-1 sm:mt-0
                block sm:block
              "
              style={{
                fontFamily: "var(--font-dancing), cursive",
                fontSize: "clamp(2.6rem, 5.6vw, 6rem)",
                fontWeight: 700,
                color: "#93c5fd",
              }}
            >
              {chars.map((char, index) => (
                <span key={index} className="cursive-char inline-block opacity-0">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
