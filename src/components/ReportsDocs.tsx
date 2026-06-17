"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Report {
  title: string;
  date: string;
}

const reports: Report[] = [
  {
    title: "Annual report 2022-2023: North Iraqi refuge camps of Yazidis",
    date: "25 Dec 2023",
  },
  {
    title: "Report 2022-2023: TUMO project in Northern Iraq region",
    date: "21 Sep 2023",
  },
  {
    title: "Report 2021-2022: Solar panel installation project",
    date: "11 Sep 2022",
  },
  {
    title: "Report 2023: Empowering Yazidi artists",
    date: "24 Oct 2023",
  },
  {
    title: "Report 2021: Empowering Yazidi artists",
    date: "24 May 2021",
  },
  {
    title: "Strategy plan 2022-2027",
    date: "30 Nov 2022",
  },
];

function PdfIcon() {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect x="1" y="1" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5h8M4 8h8M4 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ReportsIcon() {
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
      <path d="M4 6h10M4 9h10M4 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export default function ReportsDocs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards stagger
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children);
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Footer bar
      gsap.fromTo(
        footerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
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
      className="w-full py-16 sm:py-20 px-4 sm:px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "#eef2f6" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 opacity-0"
        >
          Reports &amp; documentation
        </h2>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {reports.map((report, index) => (
            <Link
              key={index}
              href="#"
              className="group flex flex-col justify-between gap-6 p-6 rounded-2xl border transition-all duration-300"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#dde4ec",
                minHeight: "160px",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.10)";
                (e.currentTarget as HTMLElement).style.borderColor = "#c4cfd9";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "#dde4ec";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Top: icon + label */}
              <div className="flex items-center gap-2 text-zinc-400">
                <PdfIcon />
                <span className="text-xs font-medium tracking-wide text-zinc-400">
                  PDF format
                </span>
              </div>

              {/* Middle: title */}
              <p className="text-zinc-900 font-semibold text-base leading-snug group-hover:text-zinc-700 transition-colors duration-200">
                {report.title}
              </p>

              {/* Bottom: date */}
              <span className="text-xs text-zinc-400 font-medium">{report.date}</span>
            </Link>
          ))}
        </div>

        {/* Footer bar */}
        <div
          ref={footerRef}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0 pt-2"
        >
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
            We prioritize transparency as we believe it is crucial to foster
            trust and accountability in our actions and initiatives.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900 transition-colors duration-200 flex-shrink-0"
          >
            <ReportsIcon />
            More reports
          </Link>
        </div>
      </div>
    </section>
  );
}
