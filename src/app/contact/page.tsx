"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Reset scroll to top immediately when Lenis becomes active on route mount
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  useEffect(() => {
    // Scroll window to top on page mount to ensure proper visual entry
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Part the theater curtains (slide left & right)
      tl.to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      );

      tl.to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 1.2,
          ease: "power3.inOut",
        },
        0
      );

      // 2. Stagger slide down the Header Nav items
      tl.fromTo(
        ".contact-nav-item",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
        0.5 // starts mid-way through curtain opening
      );

      // 3. Slide up and fade in Banner typography
      tl.fromTo(
        ".contact-banner-content",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        0.6
      );

      // 4. Stagger reveal main form section elements (Left column detail blocks and Form fields)
      tl.fromTo(
        ".contact-reveal-element",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        0.7
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry. Our team will review your submission and respond shortly.");
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans relative overflow-hidden">

      {/* ── THEATER CURTAIN OVERLAYS (Part left & right on mount) ── */}
      <div
        ref={leftCurtainRef}
        className="fixed inset-y-0 left-0 w-1/2 bg-[#14233c] z-50 pointer-events-none"
      />
      <div
        ref={rightCurtainRef}
        className="fixed inset-y-0 right-0 w-1/2 bg-[#14233c] z-50 pointer-events-none"
      />

      {/* ── TOP HEADER BANNER (Blue-White Gradient + Grid) ── */}
      <section className="relative w-full h-[60vh] sm:h-[65vh] flex items-center px-4 sm:px-6 md:px-16 lg:px-24 bg-gradient-to-br from-blue-300 via-blue-400 to-sky-200 overflow-hidden select-none">

        {/* Abstract collaboration light overlay */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-0" />
        <div className="absolute right-0 top-0 w-full h-full bg-radial-gradient from-white/30 via-white/10 to-transparent blur-3xl pointer-events-none z-0" />

        {/* World Map Background overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.22] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/world-map.png')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Minimalist Navigation Bar (Inside the banner) */}
        <header className="absolute top-0 left-0 w-full z-20 px-6 py-6 md:px-16 lg:px-24 flex items-center justify-between">
          <Link href="/" className="contact-nav-item font-bold text-xl tracking-tight text-white hover:opacity-90 transition-opacity whitespace-nowrap">
            GenocideEdu
          </Link>
          <nav className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <Link
              href="/#how-to-help"
              className="contact-nav-item hidden sm:inline-block text-white/80 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              How to help
            </Link>
            <Link
              href="/#about"
              className="contact-nav-item hidden sm:inline-block text-white/80 hover:text-white text-sm font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              About us
            </Link>
            <Link
              href="/"
              className="contact-nav-item text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 backdrop-blur-xs flex items-center gap-1 whitespace-nowrap"
            >
              <span>Back Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </nav>
        </header>

        {/* Banner Content */}
        <div className="contact-banner-content relative z-10 max-w-7xl mx-auto w-full mt-10 sm:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none">
              Contact Us
            </h1>
            <p className="text-white/80 max-w-xl text-base sm:text-lg leading-relaxed mt-2">
              For general inquiries and partnership discussions, please submit your details below.
            </p>
          </div>
          <div className="flex-shrink-0 md:mb-2 self-start md:self-end">
            <a
              href="#form-section"
              className="inline-flex items-center gap-2 text-white/85 hover:text-white font-semibold text-sm tracking-wider uppercase transition-colors"
            >
              <span>Find out more</span>
              <span className="text-lg animate-bounce mt-1">↓</span>
            </a>
          </div>
        </div>

      </section>

      {/* ── TWO-COLUMN FORM SECTION ── */}
      <section id="form-section" className="w-full bg-[#f8f9fa] border-b border-zinc-100">
        <div className="max-w-7xl mx-auto w-full px-6 py-16 sm:py-24 md:px-16 lg:px-24 flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column: Let Us Know How We Can Help */}
          <div className="contact-reveal-element flex-1 flex flex-col justify-between gap-12">
            <div className="flex flex-col">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="h-[2px] w-6 bg-blue-600" />
                <span className="text-xs uppercase tracking-widest font-extrabold font-mono text-blue-600">
                  Get in Touch
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                Let Us Know How We Can Help
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mt-6 max-w-md">
                Genocide Education and Human Rights Initiative maintains a focused and selective approach to communication. Our team reviews all submissions and responds where appropriate.
              </p>
            </div>

            <div className="text-xs text-zinc-400 font-mono tracking-wider">
              GENOCIDEEU STRATEGIC COMMUNICATIONS © 2026
            </div>
          </div>

          {/* Right Column: Underline Form */}
          <div className="contact-reveal-element flex-1 max-w-2xl w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Row 1: Name fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative flex flex-col gap-1">
                  <input
                    id="firstName"
                    type="text"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-zinc-300 focus:border-blue-600 py-3 text-sm sm:text-base text-zinc-900 placeholder-transparent outline-none transition-all duration-300"
                    required
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute left-0 top-3 text-sm sm:text-base text-zinc-400 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-400"
                  >
                    First Name*
                  </label>
                </div>

                <div className="relative flex flex-col gap-1">
                  <input
                    id="lastName"
                    type="text"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-zinc-300 focus:border-blue-600 py-3 text-sm sm:text-base text-zinc-900 placeholder-transparent outline-none transition-all duration-300"
                    required
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute left-0 top-3 text-sm sm:text-base text-zinc-400 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-400"
                  >
                    Last Name*
                  </label>
                </div>
              </div>

              {/* Row 2: Email & Organization fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="relative flex flex-col gap-1">
                  <input
                    id="email"
                    type="email"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-zinc-300 focus:border-blue-600 py-3 text-sm sm:text-base text-zinc-900 placeholder-transparent outline-none transition-all duration-300"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-3 text-sm sm:text-base text-zinc-400 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-400"
                  >
                    Email Address*
                  </label>
                </div>

                <div className="relative flex flex-col gap-1">
                  <input
                    id="organization"
                    type="text"
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-zinc-300 focus:border-blue-600 py-3 text-sm sm:text-base text-zinc-900 placeholder-transparent outline-none transition-all duration-300"
                  />
                  <label
                    htmlFor="organization"
                    className="absolute left-0 top-3 text-sm sm:text-base text-zinc-400 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-400"
                  >
                    Company (optional)
                  </label>
                </div>
              </div>

              {/* Row 3: Phone Number field */}
              <div className="relative flex flex-col gap-1">
                <input
                  id="phone"
                  type="tel"
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-zinc-300 focus:border-blue-600 py-3 text-sm sm:text-base text-zinc-900 placeholder-transparent outline-none transition-all duration-300"
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 top-3 text-sm sm:text-base text-zinc-400 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-400"
                >
                  Phone Number*
                </label>
              </div>

              {/* Row 4: Programs/Services select dropdown */}
              <div className="relative flex flex-col gap-2 border-b border-zinc-300 focus-within:border-blue-600 transition-colors duration-300">
                <label htmlFor="service" className="text-xs font-semibold text-zinc-400 tracking-wider">
                  What services/programs are you interested in?
                </label>
                <div className="relative w-full flex items-center">
                  <select
                    id="service"
                    className="w-full bg-transparent py-3 text-sm sm:text-base text-zinc-800 outline-none appearance-none cursor-pointer pr-8 font-medium"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select an option</option>
                    <option value="education">Education Programs & Care</option>
                    <option value="solar">Solar Energy Solutions</option>
                    <option value="advocacy">Human Rights & Legal Advocacy</option>
                    <option value="partnership">Sponsorship & Partnership</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  <ChevronDown className="absolute right-0 w-4 h-4 text-zinc-500 pointer-events-none" />
                </div>
              </div>

              {/* Row 5: Describe Text Area */}
              <div className="relative flex flex-col gap-1 mt-2">
                <textarea
                  id="describe"
                  rows={3}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-zinc-300 focus:border-blue-600 py-3 text-sm sm:text-base text-zinc-900 placeholder-transparent outline-none transition-all duration-300 resize-none"
                  required
                />
                <label
                  htmlFor="describe"
                  className="absolute left-0 top-3 text-sm sm:text-base text-zinc-400 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-zinc-400 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-400"
                >
                  Describe
                </label>
              </div>

              {/* Row 6: Consent checkbox */}
              <div className="mt-4 flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded-sm border-zinc-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  required
                />
                <label htmlFor="consent" className="text-xs sm:text-sm text-zinc-500 cursor-pointer select-none leading-relaxed">
                  By clicking submit, I agree to the <span className="underline font-semibold hover:text-blue-600 transition-colors">processing of personal data</span>.
                </label>
              </div>

              {/* Row 7: Solid dark blue submit button with bullet */}
              <button
                type="submit"
                className="mt-4 px-8 py-3.5 bg-[#14233c] hover:bg-[#1f375c] text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer self-start"
              >
                <span>Submit Inquiry</span>
                <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  );
}
