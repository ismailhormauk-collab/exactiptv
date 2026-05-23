"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Tv, Sparkles } from "lucide-react";
import type { NavDict, Locale } from "@/locales/types";
import { localePath } from "@/lib/url";

const FREE_TRIAL_URL =
  "https://wa.me/447380310123?text=Hello%2C%20I%20would%20like%20to%20request%20a%20free%20trial.";

export default function Navbar({ dict, lang }: { dict: NavDict; lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: localePath(lang, '/'),            label: dict.home },
    { href: localePath(lang, '/pricing'),     label: dict.pricing },
    { href: localePath(lang, '/contact'),     label: dict.contact },
    { href: localePath(lang, '/blog'),        label: dict.blog },
    { href: localePath(lang, '/faq'),         label: dict.faq },
    { href: localePath(lang, '/about'),       label: dict.about },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">

          {/* Logo */}
          <Link href={localePath(lang, '/')} className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-base sm:text-lg tracking-tight">
              Exact<span className="text-purple-400">IPTV</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Free Trial button */}
            <a
              href={FREE_TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {/* gradient bg */}
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-200 group-hover:from-violet-500 group-hover:to-purple-500" />
              {/* glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-[inset_0_0_20px_rgba(167,139,250,0.15)]" />
              {/* shimmer sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <Sparkles className="relative w-3.5 h-3.5 text-violet-200" />
              <span className="relative">{dict.freeTrial}</span>
            </a>

            {/* Get Started button */}
            <Link
              href={localePath(lang, '/pricing')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-white/[0.06] border border-white/[0.10] rounded-xl hover:bg-white/[0.10] hover:border-white/20 transition-all duration-200 active:scale-95"
            >
              {dict.getStarted}
            </Link>
          </div>

          {/* Mobile right side */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06] active:bg-white/10"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-black/95 backdrop-blur-xl border-b border-white/[0.08]">
          <div className="px-4 pt-2 pb-5">
            {/* Nav links */}
            <div className="space-y-0.5 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all active:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA buttons */}
            <div className="space-y-2.5 pt-3 border-t border-white/[0.08]">
              <a
                href={FREE_TRIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl active:opacity-90 transition-all shadow-lg shadow-purple-500/20"
              >
                <Sparkles className="w-4 h-4 text-violet-200" />
                {dict.startFreeTrial}
              </a>
              <Link
                href={localePath(lang, '/pricing')}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full py-3 text-sm font-semibold text-gray-300 bg-white/[0.04] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] transition-all active:scale-95"
              >
                {dict.viewPricing}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
