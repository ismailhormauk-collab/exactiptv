"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import dynamic from "next/dynamic";
import type { HeroDict, Locale } from "@/locales/types";
import { localePath } from "@/lib/url";

// Only loaded on desktop (lg:) — keeps framer-motion out of mobile bundles
const LaptopMockup = dynamic(() => import("./LaptopMockup"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({ dict, lang }: { dict: HeroDict; lang: Locale }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">

      {/* ══ BACKGROUND ══ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mobile: minimal dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />
        {/* Desktop only: richer gradients — display:none prevents GPU paint on mobile */}
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_65%_70%_at_90%_60%,rgba(37,99,235,0.22),transparent)]" />
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_100%_100%,rgba(6,182,212,0.1),transparent)]" />
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_0%_50%,rgba(109,40,217,0.22),transparent)]" />
        <div className="hidden sm:block absolute inset-0 bg-[radial-gradient(ellipse_35%_25%_at_35%_0%,rgba(139,92,246,0.12),transparent)]" />
        <div
          className="hidden sm:block absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.035) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="hidden sm:block absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>

      {/* ══ CONTENT ══ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 xl:px-20 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-24 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left order-1">

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/[0.08] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-blue-300 tracking-wide">{dict.badge}</span>
            </div>

            <h1 className="text-[2.5rem] sm:text-[3.2rem] lg:text-[3rem] xl:text-[3.6rem] font-black text-white leading-[1.04] tracking-tight mb-4">
              {dict.headline.split('\n').map((line, i) =>
                i === 1 ? (
                  <span key={i} className="bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    {line}<br />
                  </span>
                ) : (
                  <span key={i}>{line}{i < 2 && <br />}</span>
                )
              )}
            </h1>

            <p className="text-slate-200/90 text-base sm:text-[17px] font-medium leading-snug mb-3 max-w-md mx-auto lg:mx-0">
              {dict.tagline}
            </p>

            <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed mb-8 max-w-[420px] mx-auto lg:mx-0">
              {dict.description} {dict.from}{" "}
              <span className="text-white font-bold">€20/month</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-9 w-full sm:w-auto">
              <Link
                href={localePath(lang, '/pricing')}
                className="group relative flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm overflow-hidden transition-all duration-200 hover:scale-[1.04] active:scale-95 hover:shadow-[0_0_36px_rgba(59,130,246,0.5)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 group-hover:from-blue-500 group-hover:to-violet-500 transition-colors duration-200" />
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <Sparkles className="relative w-4 h-4 text-blue-200" />
                <span className="relative">{dict.subscribeNow}</span>
              </Link>
              <Link
                href={localePath(lang, '/pricing')}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white border border-white/15 bg-white/[0.05] backdrop-blur-sm hover:bg-white/[0.1] hover:border-white/25 active:scale-95 transition-all duration-200"
              >
                {dict.onlyPerMonth}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust bar */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-2.5">
                {[
                  { src: "https://randomuser.me/api/portraits/thumb/women/44.jpg", alt: "Customer" },
                  { src: "https://randomuser.me/api/portraits/thumb/men/32.jpg",   alt: "Customer" },
                  { src: "https://randomuser.me/api/portraits/thumb/women/68.jpg", alt: "Customer" },
                  { src: "https://randomuser.me/api/portraits/thumb/men/55.jpg",   alt: "Customer" },
                  { src: "https://randomuser.me/api/portraits/thumb/women/25.jpg", alt: "Customer" },
                ].map((avatar, i) => (
                  <div
                    key={i}
                    className="relative w-8 h-8 rounded-full border-2 border-[#050508] shadow-md overflow-hidden ring-1 ring-violet-500/20"
                  >
                    <Image
                      src={avatar.src}
                      alt={avatar.alt}
                      fill
                      sizes="32px"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-white font-bold">{dict.trustCount}</span> {dict.trustLabel}
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT — desktop only ── */}
          <div className="hidden lg:flex relative order-2 items-center justify-end lg:pl-6">
            {isDesktop && <LaptopMockup dict={dict} />}
          </div>

        </div>
      </div>
    </section>
  );
}
