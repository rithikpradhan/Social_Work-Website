"use client";

import Link from "next/link";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-zinc-100 py-4 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: copyright + privacy */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
          <span>GenocideEdu, 2023 All rights reserved</span>
          <Link
            href="/privacy"
            className="hover:text-zinc-700 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </Link>
          <Link
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
            aria-label="X (Twitter)"
          >
            <XIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}
