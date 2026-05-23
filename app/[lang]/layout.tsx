import { notFound } from "next/navigation";
import { LOCALES } from "@/locales/types";
import type { Locale } from "@/locales/types";
import { getDictionary } from "@/locales/getDictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import FloatingLanguageSwitcher from "@/components/layout/FloatingLanguageSwitcher";

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;
  if (!(LOCALES as readonly string[]).includes(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return (
    <>
      <Navbar dict={dict.nav} lang={lang as Locale} />
      <main>{children}</main>
      <Footer dict={dict.footer} lang={lang as Locale} />
      <WhatsAppButton />
      <FloatingLanguageSwitcher />
    </>
  );
}
