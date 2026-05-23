import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, Mail, Clock, ChevronRight, Zap, Shield, Star } from "lucide-react";
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
    title: dict.pages.contact.title,
    description: dict.pages.contact.description,
    alternates: { canonical: localeUrl(params.lang, '/contact') },
  };
}

const supportOptions = [
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Fastest way to reach us. Get a response in under 5 minutes, 24 hours a day.",
    contact: "+44 7380 310123",
    href: "https://wa.me/447380310123?text=Hi,%20I%20need%20some%20help",
    buttonText: "Open WhatsApp Chat",
    buttonClass: "bg-[#25D366] hover:opacity-90 text-white",
    available: "24/7 Available",
    availableColor: "text-green-400",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "For detailed inquiries and non-urgent matters. We respond within 24 hours.",
    contact: "support@exactiptv.com",
    href: "mailto:support@exactiptv.com",
    buttonText: "Send Email",
    buttonClass: "bg-violet-600 hover:bg-violet-500 text-white",
    available: "Response within 24h",
    availableColor: "text-purple-400",
  },
];

const topics = [
  { emoji: "🛒", title: "New Subscription", desc: "Order a new IPTV subscription" },
  { emoji: "🔧", title: "Technical Support", desc: "Buffering, connection, or app issues" },
  { emoji: "📱", title: "Setup Help", desc: "Get help installing on your device" },
  { emoji: "🔄", title: "Renewal", desc: "Renew or upgrade your plan" },
  { emoji: "❓", title: "General Questions", desc: "Ask anything about Exact IPTV" },
  { emoji: "💳", title: "Billing", desc: "Payment and subscription queries" },
];

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.pages.contact;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href={localePath(params.lang, '/')} className="hover:text-purple-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Contact</span>
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
        {/* Support options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.title} className="glass rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10">
                  <Icon className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-white font-bold text-xl mb-2">{option.title}</h2>
                <p className="text-gray-400 text-sm mb-3">{option.description}</p>
                <p className="text-purple-400 font-semibold text-sm mb-1">{option.contact}</p>
                <p className={`text-xs font-medium mb-6 ${option.availableColor}`}>{option.available}</p>
                <a
                  href={option.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 ${option.buttonClass} font-bold rounded-xl transition-all hover:scale-105 shadow-lg`}
                >
                  <Icon className="w-4 h-4" />
                  {option.buttonText}
                </a>
              </div>
            );
          })}
        </div>

        {/* What can we help with */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">{p.helpTitle}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {topics.map((topic) => (
              <a
                key={topic.title}
                href={`https://wa.me/447380310123?text=Hello,%20I%20have%20a%20question%20about:%20${encodeURIComponent(topic.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-5 border border-white/5 hover:border-purple-500/20 transition-all hover:-translate-y-1 group text-center"
              >
                <div className="text-3xl mb-2">{topic.emoji}</div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-gray-500 text-xs">{topic.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Response stats */}
        <div className="glass rounded-2xl p-8 border border-white/5 mb-12">
          <h2 className="text-white font-bold text-xl text-center mb-8">{p.promiseTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Zap, stat: p.promiseStat1, label: p.promiseLabel1, color: "text-yellow-400" },
              { icon: Clock, stat: p.promiseStat2, label: p.promiseLabel2, color: "text-green-400" },
              { icon: Star, stat: p.promiseStat3, label: p.promiseLabel3, color: "text-purple-400" },
            ].map(({ icon: Icon, stat, label, color }) => (
              <div key={label}>
                <Icon className={`w-8 h-8 ${color} mx-auto mb-2`} />
                <div className="text-3xl font-black text-white mb-1">{stat}</div>
                <div className="text-gray-400 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{p.ctaTitle}</h2>
          <p className="text-gray-400 mb-6">{p.ctaSub}</p>
          <a
            href="https://wa.me/447380310123?text=Hi,%20I'm%20interested.%20Can%20you%20help%20me?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] rounded-2xl text-white font-bold text-lg shadow-lg shadow-green-500/20 hover:opacity-90 hover:scale-105 transition-all"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            {p.ctaButton}
          </a>
        </div>
      </div>
    </div>
  );
}
