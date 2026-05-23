import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Tv, Users, Globe, Star, MessageCircle } from "lucide-react";
import { getDictionary } from "@/locales/getDictionary";
import { LOCALES } from "@/locales/types";
import type { Locale } from "@/locales/types";
import { localePath, localeUrl } from "@/lib/url";

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.pages.about.title,
    description: dict.pages.about.description,
    alternates: { canonical: localeUrl(params.lang, '/about') },
  };
}

const milestones = [
  { year: "2019", event: "Exact IPTV founded with a mission to provide affordable premium TV" },
  { year: "2020", event: "Expanded to 20,000+ channels and launched 24/7 WhatsApp support" },
  { year: "2021", event: "Reached 50,000 active subscribers across 30 countries" },
  { year: "2022", event: "Launched 4K Ultra HD streaming and expanded VOD to 50,000+ titles" },
  { year: "2023", event: "Surpassed 100,000 subscribers and expanded to 50,000+ channels" },
  { year: "2024", event: "Launched premium 4K sports package and international channel expansions" },
];

const values = [
  { icon: Star,  title: "Premium Quality",  desc: "We never compromise on streaming quality. 99.9% uptime, HD/4K streams, and enterprise-grade servers." },
  { icon: Users, title: "Customer First",   desc: "Every decision we make starts with the customer. 24/7 WhatsApp support reflects our commitment to you." },
  { icon: Globe, title: "Global Access",    desc: "We believe great TV should be accessible to everyone, everywhere, at a fair price." },
  { icon: Tv,    title: "Innovation",       desc: "Continuously adding channels, improving quality, and adopting new technologies like 4K and HDR streaming." },
];

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.pages.about;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href={localePath(params.lang, '/')} className="hover:text-purple-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">About Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="gradient-text">{p.hero}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {p.heroSub}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Mission */}
        <div className="glass rounded-2xl p-8 lg:p-12 border border-white/5 mb-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Tv className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">{p.missionTitle}</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            {p.mission1}
          </p>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed">
            {p.mission2}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "100,000+", label: "Happy Subscribers", color: "from-purple-500 to-violet-600" },
            { value: "50,000+", label: "Live Channels", color: "from-blue-500 to-cyan-600" },
            { value: "50+", label: "Countries", color: "from-green-500 to-emerald-600" },
            { value: "5+", label: "Years Experience", color: "from-orange-500 to-red-600" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center border border-white/5">
              <div className={`text-3xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">{p.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="glass rounded-2xl p-6 border border-white/5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white text-center mb-8">{p.milestoneTitle}</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-transparent" />
            <div className="space-y-6">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="flex gap-5 pl-2">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-purple-500/20">
                      {milestone.year.slice(2)}
                    </div>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/5 flex-1">
                    <span className="text-purple-400 font-bold text-sm">{milestone.year}</span>
                    <p className="text-gray-300 text-sm mt-1">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl p-8 border border-purple-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{p.ctaTitle}</h2>
          <p className="text-gray-400 mb-6">{p.ctaSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={localePath(params.lang, '/pricing')}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all shadow-lg shadow-purple-500/20"
            >
              View Our Plans
            </Link>
            <a
              href="https://wa.me/447380310123"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 glass border border-green-500/20 text-green-400 font-semibold rounded-xl hover:bg-green-500/10 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              {p.ctaButton}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
