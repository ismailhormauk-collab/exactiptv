import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { faqItems, faqCategories } from "@/data/faq";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Script from "next/script";
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
    title: dict.pages.faq.title,
    description: dict.pages.faq.description,
    alternates: {
      canonical: localeUrl(params.lang, '/faq'),
      languages: {
        en: "https://exactiptv.com/en/faq",
        fr: "https://exactiptv.com/fr/faq",
        de: "https://exactiptv.com/de/faq",
        es: "https://exactiptv.com/es/faq",
        "x-default": "https://exactiptv.com/en/faq",
      },
    },
    openGraph: {
      title: dict.pages.faq.title,
      description: dict.pages.faq.description,
      type: "website",
      url: localeUrl(params.lang, '/faq'),
      siteName: "Exact IPTV",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.faq.title,
      description: dict.pages.faq.description,
    },
  };
}

export default async function FAQPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.pages.faq;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(params.lang, '/') },
      { "@type": "ListItem", position: 2, name: "FAQ", item: localeUrl(params.lang, '/faq') },
    ],
  };

  return (
    <>
      <Script id="faq-page-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="faq-breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen pt-20">
        {/* Header */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
              <Link href={localePath(params.lang, '/')} className="hover:text-purple-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-300">FAQ</span>
            </nav>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              <span className="gradient-text">{p.hero}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {p.heroSub}{" "}
              <a href="https://wa.me/447380310123" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                {p.askLink}
              </a>
              .
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[p.allLabel, ...faqCategories].map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 text-sm font-medium glass rounded-xl border border-white/5 text-gray-300 cursor-pointer hover:border-purple-500/30 hover:text-purple-400 transition-all"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* FAQ by category */}
          {faqCategories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full" />
                {category}
              </h2>
              <FAQAccordion items={faqItems.filter((item) => item.category === category)} />
            </div>
          ))}

          {/* Bottom CTA */}
          <div className="mt-12 glass rounded-2xl p-8 border border-purple-500/20 text-center">
            <h2 className="text-white font-bold text-xl mb-2">{p.stillHave}</h2>
            <p className="text-gray-400 mb-6 text-sm">{p.stillHaveSub}</p>
            <a
              href="https://wa.me/447380310123?text=Hello,%20I%20have%20a%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              {p.askButton}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
