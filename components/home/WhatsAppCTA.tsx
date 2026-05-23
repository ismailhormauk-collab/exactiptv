import { MessageCircle } from "lucide-react";
import Link from "next/link";
import type { CTADict, Locale } from "@/locales/types";
import { localePath } from "@/lib/url";

export default function WhatsAppCTA({ dict, lang }: { dict: CTADict; lang: Locale }) {
  return (
    <section className="py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(109,40,217,0.12),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/25 to-transparent" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">

        <p className="text-xs font-bold text-violet-400 uppercase tracking-[0.15em] mb-4">
          {dict.badge}
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
          {dict.headline}
        </h2>

        <p className="text-slate-400 text-base sm:text-lg mb-7">
          {dict.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-xs sm:max-w-none mx-auto">
          <a
            href="https://wa.me/447380310123?text=Hi,%20I'd%20like%20to%20subscribe."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#25D366] rounded-xl text-white font-semibold text-sm hover:bg-[#20BA5C] hover:shadow-[0_0_24px_rgba(37,211,102,0.3)] active:scale-95 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 fill-white flex-shrink-0" />
            {dict.chatButton}
          </a>
          <Link
            href={localePath(lang, '/pricing')}
            className="flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/[0.05] hover:text-white active:scale-95 transition-all duration-200"
          >
            {dict.viewPlans}
          </Link>
        </div>

        <p className="text-slate-600 text-xs mt-6">
          {dict.footnote}
        </p>

      </div>
    </section>
  );
}
