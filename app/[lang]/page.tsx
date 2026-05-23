import type { Metadata } from "next";
import { getDictionary } from "@/locales/getDictionary";
import { LOCALES } from "@/locales/types";
import type { Locale } from "@/locales/types";
import { localeUrl, hreflangAlternates } from "@/lib/url";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PricingSection from "@/components/home/PricingSection";
import Devices from "@/components/home/Devices";
import Testimonials from "@/components/home/Testimonials";
import FAQSection from "@/components/home/FAQSection";
import WhatsAppCTA from "@/components/home/WhatsAppCTA";
import Script from "next/script";

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.pages.home.title,
    description: dict.pages.home.description,
    alternates: {
      canonical: localeUrl(params.lang, '/'),
      languages: hreflangAlternates('/'),
    },
  };
}

export default async function HomePage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const homeSchema = { "@context": "https://schema.org", "@type": "Product", name: "Exact IPTV Subscription", description: "Premium IPTV subscription with 50,000+ live channels, 100,000+ VOD, 4K streaming quality", brand: { "@type": "Brand", name: "Exact IPTV" }, offers: [{ "@type": "Offer", name: "1 Month Plan", price: "20", priceCurrency: "EUR", availability: "https://schema.org/InStock" }, { "@type": "Offer", name: "3 Month Plan", price: "35", priceCurrency: "EUR", availability: "https://schema.org/InStock" }, { "@type": "Offer", name: "6 Month Plan", price: "45", priceCurrency: "EUR", availability: "https://schema.org/InStock" }, { "@type": "Offer", name: "12 Month Plan", price: "65", priceCurrency: "EUR", availability: "https://schema.org/InStock" }] };
  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faqSection.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return (
    <>
      <Script id="home-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }} />
      <Script id="home-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
      <Hero dict={dict.hero} lang={params.lang as Locale} />
      <Features dict={dict.features} />
      <PricingSection dict={dict.pricing} lang={params.lang as Locale} />
      <Devices dict={dict.devices} />
      <Testimonials dict={dict.testimonials} />
      <FAQSection dict={dict.faqSection} lang={params.lang as Locale} />
      <WhatsAppCTA dict={dict.whatsappCTA} lang={params.lang as Locale} />
    </>
  );
}
