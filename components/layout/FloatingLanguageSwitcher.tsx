"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, Check } from "lucide-react";

// ── Flag SVGs ──────────────────────────────────────────────────────────────

const FlagGB = () => (
  <svg viewBox="0 0 30 20" className="w-[22px] h-[15px] rounded-[2px] flex-shrink-0" aria-hidden="true">
    <rect width="30" height="20" fill="#012169" />
    <path d="M0,0 L30,20 M30,0 L0,20" stroke="white" strokeWidth="4" />
    <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="2.5" />
    <rect x="12" y="0" width="6" height="20" fill="white" />
    <rect x="0" y="7" width="30" height="6" fill="white" />
    <rect x="13" y="0" width="4" height="20" fill="#C8102E" />
    <rect x="0" y="8" width="30" height="4" fill="#C8102E" />
  </svg>
);

const FlagFR = () => (
  <svg viewBox="0 0 30 20" className="w-[22px] h-[15px] rounded-[2px] flex-shrink-0" aria-hidden="true">
    <rect width="10" height="20" fill="#002395" />
    <rect x="10" width="10" height="20" fill="#EDEDED" />
    <rect x="20" width="10" height="20" fill="#ED2939" />
  </svg>
);

const FlagDE = () => (
  <svg viewBox="0 0 30 20" className="w-[22px] h-[15px] rounded-[2px] flex-shrink-0" aria-hidden="true">
    <rect width="30" height="7" fill="#000000" />
    <rect y="7" width="30" height="6" fill="#DD0000" />
    <rect y="13" width="30" height="7" fill="#FFCE00" />
  </svg>
);

const FlagES = () => (
  <svg viewBox="0 0 30 20" className="w-[22px] h-[15px] rounded-[2px] flex-shrink-0" aria-hidden="true">
    <rect width="30" height="5" fill="#C60B1E" />
    <rect y="5" width="30" height="10" fill="#FFC400" />
    <rect y="15" width="30" height="5" fill="#C60B1E" />
  </svg>
);

// ── Config ─────────────────────────────────────────────────────────────────

const LOCALES = ["en", "fr", "de", "es"] as const;
type Locale = (typeof LOCALES)[number];

const languages: { code: Locale; label: string; Flag: () => JSX.Element }[] = [
  { code: "en", label: "English", Flag: FlagGB },
  { code: "fr", label: "French",  Flag: FlagFR },
  { code: "de", label: "German",  Flag: FlagDE },
  { code: "es", label: "Spanish", Flag: FlagES },
];

const NON_DEFAULT_LOCALES = ["fr", "de", "es"] as const;

function getLocaleFromPath(pathname: string): Locale | null {
  const seg = pathname.split("/")[1];
  return NON_DEFAULT_LOCALES.includes(seg as "fr" | "de" | "es")
    ? (seg as Locale)
    : null;
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const v = localStorage.getItem("NEXT_LOCALE") as Locale | null;
  return v && LOCALES.includes(v) ? v : "en";
}

// ── Component ──────────────────────────────────────────────────────────────

export default function FloatingLanguageSwitcher() {
  const router   = useRouter();
  const pathname = usePathname();
  const ref      = useRef<HTMLDivElement>(null);

  const [open, setOpen]     = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const fromPath = getLocaleFromPath(pathname);
    setLocale(fromPath ?? getStoredLocale());
  }, [pathname]);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onMouse);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onMouse);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const switchLocale = useCallback(
    (next: Locale) => {
      setLocale(next);
      setOpen(false);
      localStorage.setItem("NEXT_LOCALE", next);
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
      const current     = getLocaleFromPath(pathname);
      const stripped    = current ? pathname.slice(current.length + 1) || "/" : pathname;
      const destination = next === "en"
        ? stripped
        : `/${next}${stripped === "/" ? "" : stripped}`;
      router.push(destination);
    },
    [pathname, router]
  );

  const CurrentFlag = languages.find((l) => l.code === locale)?.Flag;

  return (
    <div ref={ref} className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-50">
      {/* Dropdown — opens upward */}
      <div
        role="listbox"
        aria-label="Select language"
        className={`absolute bottom-full left-0 mb-3 w-[162px] rounded-2xl overflow-hidden
          border border-white/[0.09] bg-[#0b0b14]/[0.97] backdrop-blur-2xl
          shadow-[0_-8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(139,92,246,0.10)]
          transition-all duration-200 origin-bottom-left
          ${open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-1 pointer-events-none"
          }`}
      >
        {/* Top accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="p-1.5 space-y-0.5">
          {languages.map((lang) => {
            const active = locale === lang.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={active}
                onClick={() => switchLocale(lang.code)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm
                  transition-all duration-150
                  ${active
                    ? "bg-violet-600/20 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
              >
                <lang.Flag />
                <span className="font-medium flex-1 text-left">{lang.label}</span>
                {active && (
                  <span className="w-4 h-4 rounded-full bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-violet-400" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
          bg-gradient-to-br from-violet-600 to-purple-700
          shadow-[0_4px_20px_rgba(109,40,217,0.45)]
          ring-2 ring-violet-500/30 ring-offset-2 ring-offset-transparent
          hover:shadow-[0_6px_28px_rgba(109,40,217,0.65)] hover:scale-110
          active:scale-95 transition-all duration-300
          ${open ? "scale-105 shadow-[0_6px_28px_rgba(109,40,217,0.65)]" : "animate-float"}`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Shimmer ring on hover */}
        <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,0.15),transparent_70%)]" />

        {/* Show current flag or globe */}
        {locale !== "en" && CurrentFlag ? (
          <span className="relative flex items-center justify-center">
            <CurrentFlag />
          </span>
        ) : (
          <Globe className="relative w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
