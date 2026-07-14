"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Menu, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);
  const cursiveRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGPathElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Initial States for Load Animations ──
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

      const loadTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Background image zoom-in
      loadTl.fromTo(
        bgRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // 2. Header nav slides down
      loadTl.fromTo(
        headerRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=1.4"
      );

      // 3. Headings stagger slide up
      loadTl.fromTo(
        [heading1Ref.current, heading2Ref.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power4.out" },
        "-=0.9"
      );

      // 4. SVG decorative line animation (if exists)
      if (svgLineRef.current) {
        const pathLength = svgLineRef.current.getTotalLength();
        gsap.set(svgLineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
          opacity: 1,
        });
        loadTl.to(
          svgLineRef.current,
          { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
          "-=0.7"
        );
      }

      // 5. Cursive writing effect character-by-character
      const cursiveChars = cursiveRef.current?.querySelectorAll(".cursive-char");
      if (cursiveChars && cursiveChars.length > 0) {
        gsap.set(cursiveRef.current, { opacity: 1 });
        loadTl.fromTo(
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

      // ── Infinite Autoplay Marquees (Move continuously without scroll) ──

      // Marquee 1: Slides Left to Right (translates from -50% to 0% continuously)
      gsap.set(marquee1Ref.current, { xPercent: -50 });
      gsap.to(marquee1Ref.current, {
        xPercent: 0,
        ease: "none",
        duration: 10,
        repeat: -1,
      });

      // Marquee 2: Slides Right to Left (translates from 0% to -50% continuously)
      gsap.set(marquee2Ref.current, { xPercent: 0 });
      gsap.to(marquee2Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: 10,
        repeat: -1,
      });

      // ── Scroll-Triggered Zoom-Out & Color Transitions ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      // Animate card zoom-out (shrinks visual container card to 0.52)
      scrollTl.to(
        heroCardRef.current,
        {
          scale: 0.52,
          borderRadius: 32,
          // border: "1px solid rgba(0, 0, 0, 0.08)"
          boxShadow: "0 35px 80px -20px rgba(0, 0, 0, 0.3)",
          ease: "power1.inOut",
        },
        0
      );

      // Animate background of sticky container from black to white
      scrollTl.to(
        stickyRef.current,
        {
          backgroundColor: "#ffffff",
          ease: "power1.inOut",
        },
        0
      );

      // Fade in Marquee Row 1 to readable sky blue watermark
      scrollTl.to(
        marquee1Ref.current,
        {
          opacity: 0.55,
          ease: "power1.inOut",
        },
        0
      );

      // Fade in Marquee Row 2 to readable white text with sky blue outline
      scrollTl.to(
        marquee2Ref.current,
        {
          opacity: 0.75,
          ease: "power1.inOut",
        },
        0
      );

      // Animate Header Navigation text & border colors to remain readable on white bg
      scrollTl.to(
        headerRef.current,
        {
          borderBottomColor: "rgba(0, 0, 0, 0.06)",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".logo-text",
        {
          color: "#09090b",
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".nav-link-item",
        {
          color: "#27272a",
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".donate-btn-item",
        {
          borderColor: "rgba(0, 0, 0, 0.15)",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".donate-text-item",
        {
          color: "#09090b",
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".hamburger-btn-item",
        {
          borderColor: "rgba(0, 0, 0, 0.15)",
          backgroundColor: "rgba(0, 0, 0, 0.03)",
          ease: "power1.inOut",
        },
        0
      );

      scrollTl.to(
        ".hamburger-icon-item",
        {
          color: "#09090b",
          ease: "power1.inOut",
        },
        0
      );
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
      className="relative w-full bg-zinc-950 overflow-hidden select-none"
      style={{ height: "180vh" }}
    >
      {/* Sticky viewport pinning container */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-zinc-950 z-10"
      >
        {/* Background Scrolling Marquees behind the Hero Card */}
        <div className="absolute inset-0 flex flex-col justify-center gap-10 md:gap-16 pointer-events-none z-0 select-none overflow-hidden bg-transparent">

          {/* Row 1: Solid Sky Blue text sliding Left to Right (duplicated spans for seamless wrapping) */}
          <div
            ref={marquee1Ref}
            className="flex whitespace-nowrap text-[8vw] md:text-[9.5vw] font-black uppercase tracking-tighter text-[#93c5fd] font-sans leading-none opacity-0 select-none"
            style={{ transform: "translateX(-50%)" }}
          >
            <span>GENOCIDE EDUCATION • HUMAN RIGHTS INITIATIVE • EDUCATION FOR ALL • EMPOWERING COMMUNITIES •&nbsp;</span>
            <span>GENOCIDE EDUCATION • HUMAN RIGHTS INITIATIVE • EDUCATION FOR ALL • EMPOWERING COMMUNITIES •&nbsp;</span>
          </div>

          {/* Row 2: White filled text with Sky Blue outline sliding Right to Left (duplicated spans) */}
          <div
            ref={marquee2Ref}
            className="flex whitespace-nowrap text-[8vw] md:text-[9.5vw] font-black uppercase tracking-tighter text-white font-sans leading-none opacity-0 select-none"
            style={{
              transform: "translateX(0%)",
              WebkitTextStroke: "1.5px #93c5fd",
            }}
          >
            <span>EMPOWERING SURVIVORS • SECURING FUTURE • LIGHT & SOLUTIONS • CREATING HOPE •&nbsp;</span>
            <span>EMPOWERING SURVIVORS • SECURING FUTURE • LIGHT & SOLUTIONS • CREATING HOPE •&nbsp;</span>
          </div>
        </div>

        {/* ── Header Nav (Stays full width at top, z-30) ── */}
        <header
          ref={headerRef}
          className="relative z-30 w-full border-b border-white/10 bg-black/10 backdrop-blur-md px-4 py-3 sm:px-6 lg:px-12 flex items-center justify-between opacity-0"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <span className="logo-text text-lg sm:text-xl font-extrabold tracking-tight text-white transition-all duration-300">
              GenocideEdu
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-item hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="nav-link-item hidden lg:inline-block text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200"
            >
              Contact us
            </Link>
            <button className="donate-btn-item flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-95 group">
              <Heart className="donate-heart-item w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 group-hover:scale-110 transition-transform duration-300 fill-sky-400/20" />
              <span className="donate-text-item text-white transition-all duration-300">Donate</span>
            </button>

            {/* Hamburger (Mobile/Tablet) */}
            <button
              className="hamburger-btn-item lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="hamburger-icon-item w-4 h-4 text-white" />
              ) : (
                <Menu className="hamburger-icon-item w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
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

        {/* ── Morphing Hero Content Card (z-10, scales down on scroll) ── */}
        <div
          ref={heroCardRef}
          className="relative flex-1 w-full flex flex-col justify-center overflow-hidden bg-black z-10"
        >
          {/* Background Image of classroom */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/10" />
          </div>

          {/* Main Content inside the Card */}
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

              {/* Cursive text */}
              <div className="relative h-16 sm:h-0 sm:block">
                <span
                  ref={cursiveRef}
                  className="
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
      </div>
    </div>
  );
}
