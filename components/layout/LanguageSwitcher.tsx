"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";

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

// ── Language config ────────────────────────────────────────────────────────

const LOCALES = ["en", "fr", "de", "es"] as const;
type Locale = (typeof LOCALES)[number];

const languages: { code: Locale; label: string; Flag: () => JSX.Element }[] = [
  { code: "en", label: "English",  Flag: FlagGB },
  { code: "fr", label: "French",   Flag: FlagFR },
  { code: "de", label: "German",   Flag: FlagDE },
  { code: "es", label: "Spanish",  Flag: FlagES },
];

const NON_DEFAULT_LOCALES = ["fr", "de", "es"] as const;

function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return NON_DEFAULT_LOCALES.includes(segment as "fr" | "de" | "es")
    ? (segment as Locale)
    : null;
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("NEXT_LOCALE") as Locale | null;
  return stored && LOCALES.includes(stored) ? stored : "en";
}

// ── Component ──────────────────────────────────────────────────────────────

export default function LanguageSwitcher() {
  const router   = useRouter();
  const pathname = usePathname();
  const ref      = useRef<HTMLDivElement>(null);

  const [open, setOpen]     = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  // Hydrate locale from URL or localStorage after mount
  useEffect(() => {
    const fromPath = getLocaleFromPath(pathname);
    setLocale(fromPath ?? getStoredLocale());
  }, [pathname]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
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

      // Strip existing locale prefix (if any) and navigate to new locale path.
      // English (default) has no prefix; other locales use /${locale}/...
      const current     = getLocaleFromPath(pathname);
      const stripped    = current ? pathname.slice(current.length + 1) || "/" : pathname;
      const destination = next === "en"
        ? stripped
        : `/${next}${stripped === "/" ? "" : stripped}`;
      router.push(destination);
    },
    [pathname, router]
  );

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/[0.14] transition-all duration-150"
      >
        <current.Flag />
        <span className="text-[11px] font-bold uppercase tracking-widest">{current.code}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        role="listbox"
        aria-label="Language options"
        className={`absolute top-full right-0 mt-2 w-[168px] rounded-2xl overflow-hidden
          border border-white/[0.09] bg-[#0b0b14]/[0.97] backdrop-blur-2xl
          shadow-[0_16px_48px_rgba(0,0,0,0.7),0_0_0_1px_rgba(139,92,246,0.08)]
          transition-all duration-200 origin-top-right z-50
          ${open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
          }`}
      >
        {/* Top accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="p-1.5 space-y-0.5">
          {languages.map((lang) => {
            const active = locale === lang.code;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={active}
                onClick={() => switchLocale(lang.code)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm
                  transition-all duration-150 group
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

        {/* Bottom accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>
    </div>
  );
}
