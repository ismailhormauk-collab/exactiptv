export type Locale = 'en' | 'fr' | 'de' | 'es'
export const LOCALES: Locale[] = ['en', 'fr', 'de', 'es']
export const DEFAULT_LOCALE: Locale = 'en'

export type NavDict = {
  home: string; pricing: string; contact: string; blog: string
  faq: string; about: string; freeTrial: string; getStarted: string
  startFreeTrial: string; viewPricing: string
}
export type HeroDict = {
  badge: string; headline: string; tagline: string; description: string; from: string
  subscribeNow: string; onlyPerMonth: string; trustCount: string; trustLabel: string
  liveNow: string; sports: string; movies: string; series: string
  quality4k: string; channels: string; vod: string; support: string
}
export type FeatureItem = { title: string; description: string }
export type FeaturesDict = { badge: string; headline: string; items: FeatureItem[] }
export type PlanDict = { duration: string; period: string; description: string; perMonth: string; features: string[] }
export type PricingDict = { badge: string; headline: string; subheadline: string; footnote: string; getStarted: string; mostPopular: string; plans: PlanDict[] }
export type FAQItem = { q: string; a: string }
export type FAQSectionDict = { badge: string; headline: string; subtext: string; askUs: string; viewAll: string; faqs: FAQItem[] }
export type CTADict = { badge: string; headline: string; subtext: string; chatButton: string; viewPlans: string; footnote: string }
export type FooterDict = { description: string; navigation: string; contactUs: string; copyright: string; links: { pricing: string; faq: string; installation: string; contact: string; privacy: string; terms: string } }
export type TestimonialsDict = { badge: string; headline: string }
export type DevicesDict = { badge: string; headline: string; subheadline: string }
export type CheckoutPlanTranslation = {
  label: string; period: string; savings: string | null; features: string[]
}
export type CheckoutDict = {
  pageTitle: string; pageDescription: string
  backToPricing: string; secureCheckout: string; sslNote: string
  planSelected: string; planWord: string
  paymentMethod: string; creditCard: string; paypal: string; bankTransfer: string; crypto: string
  yourDetails: string; fullName: string; emailAddress: string; whatsappNumber: string
  namePlaceholder: string; emailPlaceholder: string; whatsappPlaceholder: string; credentialsNote: string
  completeOrder: string; processing: string; sslSecured: string; encrypted: string; instantAccess: string
  orderSummary: string; premiumSubscription: string; best: string
  subtotal: string; setupFee: string; free: string; totalDueToday: string
  instantActivation: string; instantActivationSub: string
  securePrivate: string; securePrivateSub: string
  support247: string; support247Sub: string
  errorName: string; errorEmail: string
  plans: { "1month": CheckoutPlanTranslation; "3months": CheckoutPlanTranslation; "6months": CheckoutPlanTranslation; "12months": CheckoutPlanTranslation }
}
export type PageMeta = { title: string; description: string }
export type PagesDict = {
  home: PageMeta
  pricing: PageMeta & { badge: string; hero: string; heroSub: string; trustBadge1: string; trustBadge2: string; trustBadge3: string; footnote: string }
  faq: PageMeta & { hero: string; heroSub: string; askLink: string; allLabel: string; stillHave: string; stillHaveSub: string; askButton: string }
  contact: PageMeta & { hero: string; heroSub: string; helpTitle: string; promiseTitle: string; promiseStat1: string; promiseLabel1: string; promiseStat2: string; promiseLabel2: string; promiseStat3: string; promiseLabel3: string; ctaTitle: string; ctaSub: string; ctaButton: string }
  about: PageMeta & { hero: string; heroSub: string; missionTitle: string; mission1: string; mission2: string; valuesTitle: string; milestoneTitle: string; ctaTitle: string; ctaSub: string; ctaButton: string }
  blog: PageMeta & { hero: string; heroSub: string; readMore: string; allPosts: string; noPosts: string }
  installation: PageMeta & { hero: string; heroSub: string }
  privacy: PageMeta & { hero: string }
  terms: PageMeta & { hero: string }
}
export type Dictionary = {
  nav: NavDict; hero: HeroDict; features: FeaturesDict; pricing: PricingDict
  faqSection: FAQSectionDict; whatsappCTA: CTADict; footer: FooterDict
  testimonials: TestimonialsDict; devices: DevicesDict; pages: PagesDict
  checkout: CheckoutDict
}
