"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StoryItem {
  author: {
    name: string;
    avatar: string;
  };
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  isGrayscale?: boolean;
}

export default function OurStories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Left column elements slide-up and fade-in
      gsap.fromTo(
        leftColRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Right column stories stagger slide-up and fade-in
      if (storiesRef.current) {
        const stories = storiesRef.current.children;
        gsap.fromTo(
          stories,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: storiesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stories: StoryItem[] = [
    {
      author: {
        name: "Lee Fischman",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
      },
      title: "Illuminating Change: Solar Panels",
      excerpt:
        "Elegance is a fundamental concept that is deeply embedded in our lives and work. Is there a universal definition of elegance? Deploying clean energy solutions to schools and communities, ensuring kids have access to light and power to study.",
      date: "May 4",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=500&auto=format&fit=crop",
    },
    {
      author: {
        name: "Lee Fischman",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
      },
      title: "On the nature of elegance",
      excerpt:
        "Elegance is a fundamental concept that is deeply embedded in our lives and work. Is there a universal definition of elegance? Exploring how simple, thoughtful design can transform educational materials and classroom environments for children.",
      date: "May 4",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500&auto=format&fit=crop",
      isGrayscale: true,
    },
    {
      author: {
        name: "Lee Fischman",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
      },
      title: "Open TUMO centers in Slemani and Erbil",
      excerpt:
        "Elegance is a fundamental concept that is deeply embedded in our lives and work. Is there a universal definition of elegance? Providing free, state-of-the-art digital media education for young people in Erbil and Slemani through community hubs.",
      date: "May 4",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=500&auto=format&fit=crop",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white text-zinc-950 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 md:px-16 lg:px-24 overflow-hidden border-t border-zinc-100"
    >
      <div className="max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        {/* Left Column: Heading and CTA */}
        <div
          ref={leftColRef}
          className="lg:col-span-5 flex flex-col justify-between items-start gap-12 lg:h-full lg:sticky lg:top-24 opacity-0"
        >
          <div className="flex flex-col gap-6">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Our Stories
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-semibold tracking-tight text-zinc-900 leading-snug lg:leading-[1.15]">
              Through my collections of stories and photos here, I hope to preserve the stories and
              artistic creations of the phenomenal individuals
            </h2>
          </div>

          <Link
            href="#"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-zinc-200 hover:border-zinc-400 text-zinc-800 hover:text-black font-semibold text-sm sm:text-base hover:bg-zinc-50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
          >
            Show all stories
          </Link>
        </div>

        {/* Right Column: Stories List */}
        <div
          ref={storiesRef}
          className="lg:col-span-7 flex flex-col gap-10 md:gap-12"
        >
          {stories.map((story, index) => (
            <div
              key={index}
              className="group flex flex-row items-start justify-between gap-6 md:gap-8 pb-10 border-b border-zinc-100 last:border-b-0 last:pb-0 p-4 -m-4 rounded-3xl transition-all duration-300 story-card"
            >
              {/* Content area */}
              <div className="flex-1 flex flex-col gap-3 md:gap-4">

                {/* Author Info */}
                <div className="flex items-center gap-2">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 border border-zinc-200">
                    <Image
                      src={story.author.avatar}
                      alt={story.author.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-zinc-600">
                    {story.author.name}
                  </span>
                </div>

                {/* Story Title */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 tracking-tight leading-snug group-hover:text-sky-600 transition-colors duration-300 cursor-pointer">
                  {story.title}
                </h3>

                {/* Excerpt */}
                <p className="text-zinc-500 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3">
                  {story.excerpt}
                </p>

                {/* Metadata */}
                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-400 font-medium mt-1">
                  <span>{story.date}</span>
                  <span className="text-zinc-300">•</span>
                  <span>{story.readTime}</span>
                </div>

              </div>

              {/* Thumbnail Image */}
              <div className="relative w-24 h-20 sm:w-36 sm:h-28 md:w-44 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-zinc-100 shadow-sm border border-zinc-100 cursor-pointer">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 144px, 176px"
                  className={`object-cover ${story.isGrayscale ? "story-thumbnail-grayscale" : "story-thumbnail"
                    }`}
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
