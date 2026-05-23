import type { Locale, Dictionary } from './types'
const dicts: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import('./en'),
  fr: () => import('./fr'),
  de: () => import('./de'),
  es: () => import('./es'),
}
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await dicts[locale]()).default
}
