import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Switched from Sky TV and I'm saving over £1,200 a year. The picture quality is incredible — the whole family can't tell the difference. Sky Sports, BT Sport, all there.",
    name: "James Mitchell",
    meta: "London, UK · 12-Month Plan",
    initials: "JM",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote: "Set up in 10 minutes on my Firestick. Support replied instantly on WhatsApp. 50,000+ channels is genuinely mind-blowing value for the price.",
    name: "Sarah Williams",
    meta: "Manchester, UK · 6-Month Plan",
    initials: "SW",
    color: "from-violet-500 to-purple-600",
  },
  {
    quote: "I needed Arabic channels plus UK sports. Exact IPTV has everything — Al Jazeera, MBC, beIN Sports, Sky Sports. Unbelievable value. Highly recommended.",
    name: "Mohammed Al-Rashid",
    meta: "Birmingham, UK · 12-Month Plan",
    initials: "MA",
    color: "from-emerald-500 to-teal-600",
  },
];

import type { TestimonialsDict } from "@/locales/types";

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-bold text-violet-400 uppercase tracking-[0.15em] mb-3">
            {dict.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            {dict.headline}
          </h2>
          <div className="flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-slate-400 text-sm ml-1.5">4.9 / 5 from 10,000+ reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{t.meta}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
