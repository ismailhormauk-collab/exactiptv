import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, Zap, Shield, Clock, ChevronRight } from "lucide-react";

const pricingPlanKeys = ["1month", "3months", "12months", "6months"];
import Script from "next/script";
import { getDictionary } from "@/locales/getDictionary";
import { LOCALES } from "@/locales/types";
import type { Locale } from "@/locales/types";
import { localePath, localeUrl, hreflangAlternates } from "@/lib/url";

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.pages.pricing.title,
    description: dict.pages.pricing.description,
    alternates: {
      canonical: localeUrl(params.lang, '/pricing'),
      languages: hreflangAlternates('/pricing'),
    },
    openGraph: {
      title: dict.pages.pricing.title,
      description: dict.pages.pricing.description,
      type: "website",
      url: localeUrl(params.lang, '/pricing'),
      siteName: "Exact IPTV",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.pricing.title,
      description: dict.pages.pricing.description,
    },
  };
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const prices = ["€20", "€35", "€65", "€45"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is included in the IPTV subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All plans include 50,000+ live channels, 100,000+ VOD (movies & series), HD and 4K streaming, EPG TV guide, all devices support, and 24/7 WhatsApp customer support.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get started with Exact IPTV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choose your plan, contact us via WhatsApp at +44 7380 310123, complete your payment, and receive your login credentials within minutes. You'll be streaming in under 10 minutes.",
      },
    },
  ],
};

export default async function PricingPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.pages.pricing;
  const plans = dict.pricing.plans;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(params.lang, '/') },
      { "@type": "ListItem", position: 2, name: "Pricing", item: localeUrl(params.lang, '/pricing') },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen pt-20">
        {/* Hero */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-900/20 rounded-full blur-3xl" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
              <Link href={localePath(params.lang, '/')} className="hover:text-purple-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-300">Pricing</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
              <Zap className="w-3.5 h-3.5" />
              {p.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
              <span className="gradient-text">{p.hero}</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              {p.heroSub}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                {p.trustBadge1}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-purple-400" />
                {p.trustBadge2}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="w-4 h-4 text-yellow-400" />
                {p.trustBadge3}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6 items-stretch">
            {plans.map((plan, index) => {
              const popular = index === 2;
              const price = prices[index] ?? "€20";
              return (
                <div
                  key={plan.duration}
                  className={`relative rounded-2xl flex flex-col ${
                    popular
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#050508]"
                      : ""
                  }`}
                >
                  {popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white text-xs font-bold shadow-lg shadow-violet-900/50">
                        <Star className="w-3 h-3 fill-white" />
                        {dict.pricing.mostPopular}
                      </div>
                    </div>
                  )}

                  <div className={`glass rounded-2xl p-5 sm:p-6 flex flex-col flex-1 ${popular ? "border-purple-500/30 bg-purple-950/20" : "border-white/[0.06]"}`}>
                    <div className="mb-1">
                      <h2 className="text-white font-bold text-xl sm:text-2xl">{plan.duration}</h2>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-snug">{plan.description}</p>
                    </div>

                    <div className="my-5 pb-5 border-b border-white/[0.06]">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl sm:text-5xl font-black text-white">{price}</span>
                        <span className="text-slate-400 text-sm mb-1.5">/{plan.period}</span>
                      </div>
                      <p className="text-violet-400 text-sm font-semibold mt-1">{plan.perMonth}</p>
                    </div>

                    <ul className="space-y-2.5 flex-1 mb-7">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`${localePath(params.lang, '/checkout')}?plan=${pricingPlanKeys[index]}`}
                      className={`block w-full py-3.5 text-center text-sm font-bold text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.99] ${
                        popular
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg shadow-violet-900/40 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-900/60"
                          : "bg-gradient-to-r from-violet-700/80 to-purple-700/80 border border-purple-500/20 hover:from-violet-600 hover:to-purple-600 hover:border-purple-500/40 hover:shadow-lg hover:shadow-violet-900/30"
                      }`}
                    >
                      {dict.pricing.getStarted}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "⚡", title: "Instant Activation", desc: "Receive your credentials via WhatsApp within minutes of payment. Start streaming immediately." },
              { icon: "🔐", title: "Secure & Private", desc: "Your personal information is protected. We use secure payment methods and never share your data." },
              { icon: "💬", title: "24/7 Expert Support", desc: "Our team is available on WhatsApp around the clock for setup help and technical support." },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 border border-white/5 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">{p.footnote}</p>
            <a
              href="https://wa.me/447380310123?text=Hi,%20I%20need%20help%20choosing%20a%20plan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#25D366] to-[#1db954] rounded-xl text-white font-bold transition-all duration-300 hover:from-[#2EE574] hover:to-[#25D366] hover:shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:scale-[1.02] active:scale-[0.99]"
            >
              <WhatsAppIcon className="w-5 h-5 text-white transition-transform duration-300 group-hover:scale-110" />
              Chat on WhatsApp — Get Help Choosing
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
