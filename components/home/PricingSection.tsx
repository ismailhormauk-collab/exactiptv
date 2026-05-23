import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";
import type { PricingDict, Locale } from "@/locales/types";
import { localePath } from "@/lib/url";

const prices = ["€20", "€35", "€65", "€45"];
const planKeys = ["1month", "3months", "12months", "6months"];

export default function PricingSection({ dict, lang }: { dict: PricingDict; lang: Locale }) {
  return (
    <section id="pricing" className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(109,40,217,0.07),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
            <Zap className="w-3.5 h-3.5" />
            {dict.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
            {dict.headline}
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            {dict.subheadline}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 items-stretch">
          {dict.plans.map((plan, index) => {
            const popular = index === 2;
            const price = prices[index] ?? "€20";
            return (
              <div
                key={plan.duration}
                className={`relative flex flex-col rounded-2xl ${
                  popular
                    ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#050508]"
                    : ""
                }`}
              >
                {/* Popular badge */}
                {popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white text-xs font-bold shadow-lg shadow-violet-900/50">
                      <Star className="w-3 h-3 fill-white" />
                      {dict.mostPopular}
                    </div>
                  </div>
                )}

                <div
                  className={`glass rounded-2xl p-5 sm:p-6 flex flex-col flex-1 ${
                    popular
                      ? "border-purple-500/30 bg-purple-950/20"
                      : "border-white/[0.06]"
                  }`}
                >
                  {/* Plan title + description */}
                  <div className="mb-1">
                    <h3 className="text-white font-bold text-xl sm:text-2xl">{plan.duration}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="my-5 pb-5 border-b border-white/[0.06]">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                      <span className="text-slate-400 text-sm mb-1.5">/{plan.period}</span>
                    </div>
                    <p className="text-violet-400 text-sm font-semibold mt-1">{plan.perMonth}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-400" />
                        </span>
                        <span className="text-sm text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`${localePath(lang, '/checkout')}?plan=${planKeys[index]}`}
                    className={`block w-full py-3.5 text-center text-sm font-bold text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] ${
                      popular
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-900/40 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-900/60"
                        : "bg-gradient-to-r from-violet-700/80 to-purple-700/80 border border-purple-500/20 hover:from-violet-600 hover:to-purple-600 hover:border-purple-500/40 hover:shadow-lg hover:shadow-violet-900/30"
                    }`}
                  >
                    {dict.getStarted}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-slate-500 text-xs">
          {dict.footnote}
        </p>

      </div>
    </section>
  );
}
