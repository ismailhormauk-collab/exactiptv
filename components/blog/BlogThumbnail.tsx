import {
  Tv2, Trophy, Server, Play, CreditCard, BarChart2, Globe, Star,
  Layers, Monitor, Film, MapPin, Sparkles, Rocket, Crown, Network,
  Receipt, Cable, Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Variant = "card" | "hero" | "sidebar";

interface Props {
  slug: string;
  category: string;
  variant?: Variant;
}

type CatKey = "Guide" | "Review" | "Buying Guide";

const CAT: Record<CatKey, { r: number; g: number; b: number; accent: string }> = {
  "Guide":        { r: 59,  g: 130, b: 246, accent: "#60a5fa" },
  "Review":       { r: 139, g: 92,  b: 246, accent: "#a78bfa" },
  "Buying Guide": { r: 245, g: 158, b: 11,  accent: "#fbbf24" },
};

const ICONS: Record<string, LucideIcon> = {
  "iptv-service-explained":            Tv2,
  "best-iptv-2025":                    Trophy,
  "iptv-providers-guide-2025":         Server,
  "iptv-free-trial-guide":             Play,
  "iptv-subscription-guide":           CreditCard,
  "best-iptv-service-comparison-2025": BarChart2,
  "iptv-org-explained":                Globe,
  "guru-iptv-review-2025":             Star,
  "marinios-iptv-review":              Globe,
  "iptv-suppliers-guide":              Network,
  "naxatv-iptv-review":                Monitor,
  "top-rated-iptv-2025":               Trophy,
  "abonnement-iptv-guide":             Receipt,
  "best-iptv-services-2025":           Layers,
  "epix-iptv-review":                  Film,
  "iptv-usa-guide":                    MapPin,
  "lux-iptv-review":                   Sparkles,
  "apollo-iptv-review":                Rocket,
  "boss-iptv-review":                  Crown,
  "hdmi-iptv-setup-guide":             Cable,
};

const SZ = {
  icon:  { card: "w-10 h-10",  hero: "w-16 h-16",  sidebar: "w-5 h-5"   },
  inner: { card: "w-24 h-24",  hero: "w-44 h-44",  sidebar: "w-12 h-12" },
  outer: { card: "w-40 h-40",  hero: "w-72 h-72",  sidebar: "w-16 h-16" },
};

const DOTS = [
  { top: "12%", left: "8%",   size: 2, opacity: 0.35 },
  { top: "20%", left: "88%",  size: 2, opacity: 0.25 },
  { top: "72%", left: "12%",  size: 3, opacity: 0.20 },
  { top: "80%", left: "82%",  size: 2, opacity: 0.30 },
  { top: "45%", left: "94%",  size: 2, opacity: 0.20 },
  { top: "8%",  left: "55%",  size: 2, opacity: 0.18 },
];

export default function BlogThumbnail({ slug, category, variant = "card" }: Props) {
  const cfg  = CAT[category as CatKey] ?? CAT["Review"];
  const { r, g, b, accent } = cfg;
  const Icon = ICONS[slug] ?? Tv2;
  const rgb  = `${r},${g},${b}`;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">

      {/* ── Base ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#050810]" />

      {/* ── Atmospheric glow — top-right ───────── */}
      <div
        className="absolute -top-1/3 -right-1/3 w-4/5 h-4/5 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 60% 40%, rgba(${rgb},0.30) 0%, transparent 60%)` }}
      />

      {/* ── Secondary glow — bottom-left ─────────  */}
      <div
        className="absolute -bottom-1/3 -left-1/4 w-3/5 h-3/5 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.12) 0%, transparent 65%)` }}
      />

      {/* ── Deep center vignette ─────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)" }}
      />

      {/* ── Grid ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(${rgb},0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${rgb},0.06) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      {/* ── Top edge line ────────────────────────── */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 5%, rgba(${rgb},0.65) 40%, rgba(${rgb},0.65) 60%, transparent 95%)` }}
      />

      {/* ── Side edge lines (subtle) ─────────────── */}
      <div
        className="absolute top-0 bottom-0 left-0 w-px pointer-events-none"
        style={{ background: `linear-gradient(180deg, rgba(${rgb},0.4) 0%, transparent 50%)` }}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-px pointer-events-none"
        style={{ background: `linear-gradient(180deg, rgba(${rgb},0.4) 0%, transparent 50%)` }}
      />

      {/* ── Floating particles ───────────────────── */}
      {variant !== "sidebar" && DOTS.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: d.top, left: d.left,
            width:  d.size,
            height: d.size,
            backgroundColor: accent,
            opacity: d.opacity,
            boxShadow: `0 0 ${d.size * 3}px ${accent}`,
          }}
        />
      ))}

      {/* ── Icon + glow ──────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer diffuse glow */}
        <div
          className={`absolute ${SZ.outer[variant]} rounded-full pointer-events-none`}
          style={{
            background: `radial-gradient(ellipse, rgba(${rgb},0.16) 0%, transparent 65%)`,
            filter: "blur(20px)",
          }}
        />
        {/* Crisp inner ring */}
        <div
          className={`absolute ${SZ.inner[variant]} rounded-full pointer-events-none`}
          style={{ background: `radial-gradient(ellipse, rgba(${rgb},0.10) 0%, transparent 70%)` }}
        />
        {/* Icon */}
        <Icon
          className={`relative z-10 drop-shadow-lg ${SZ.icon[variant]}`}
          style={{ color: accent, filter: `drop-shadow(0 0 10px rgba(${rgb},0.6))` }}
          strokeWidth={1.4}
        />
      </div>

      {/* ── Bottom gradient for branding legibility ─ */}
      {variant !== "sidebar" && (
        <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(5,8,16,0.75), transparent)" }}
        />
      )}

      {/* ── Exact IPTV branding ──────────────────── */}
      {variant !== "sidebar" && (
        <div className="absolute bottom-0 inset-x-0 px-3 py-2 flex items-center justify-between z-10">
          {/* Logo mark + wordmark */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-[3px] flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #3b82f6, #7c3aed)" }}
            >
              <Tv2 className="w-2.5 h-2.5 text-white" strokeWidth={2} />
            </div>
            <span
              className="text-[9px] font-black tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Exact<span style={{ color: accent, opacity: 0.8 }}>IPTV</span>
            </span>
          </div>
          {/* Signal strength decoration */}
          <div className="flex items-end gap-[2.5px]">
            {[3, 5, 7, 9, 7].map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-[1.5px]"
                style={{
                  height:          `${h}px`,
                  backgroundColor: accent,
                  opacity:         0.15 + i * 0.18,
                }}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
