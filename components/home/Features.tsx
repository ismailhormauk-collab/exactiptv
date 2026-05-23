import { Tv2, Wifi, Smartphone, Zap, Film, Headphones } from "lucide-react";
import type { FeaturesDict } from "@/locales/types";

const icons = [Tv2, Film, Zap, Smartphone, Wifi, Headphones];
const colors = [
  "bg-violet-500/10 text-violet-400",
  "bg-blue-500/10 text-blue-400",
  "bg-amber-500/10 text-amber-400",
  "bg-pink-500/10 text-pink-400",
  "bg-emerald-500/10 text-emerald-400",
  "bg-purple-500/10 text-purple-400",
];

export default function Features({ dict }: { dict: FeaturesDict }) {
  return (
    <section className="py-12 lg:py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs font-bold text-violet-400 uppercase tracking-[0.15em] mb-3">
            {dict.badge}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {dict.headline}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dict.items.map((f, idx) => {
            const Icon = icons[idx] ?? Tv2;
            const color = colors[idx] ?? colors[0];
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 hover:border-white/[0.14] hover:bg-white/[0.03] transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
