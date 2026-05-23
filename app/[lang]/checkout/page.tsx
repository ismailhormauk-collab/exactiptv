import type { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";
import { getDictionary } from "@/locales/getDictionary";
import type { Locale } from "@/locales/types";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.checkout.pageTitle,
    description: dict.checkout.pageDescription,
  };
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { plan?: string };
}) {
  const dict = await getDictionary(params.lang as Locale);
  const plan = searchParams?.plan ?? "1month";
  return <CheckoutClient plan={plan} lang={params.lang as Locale} dict={dict.checkout} />;
}
