const DEFAULT_LOCALE = 'en';

/**
 * Returns the locale-aware path for a given lang + path.
 * English (default) has no prefix: /pricing, /blog, etc.
 * Other locales have a prefix: /fr/pricing, /de/blog, etc.
 */
export function localePath(lang: string, path: string = '/'): string {
  const p = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (lang === DEFAULT_LOCALE) return p;
  if (p === '/') return `/${lang}`;
  return `/${lang}${p}`;
}

/**
 * Returns the full canonical URL for a given lang + path.
 * English home → https://exactiptv.com  (no trailing slash)
 */
export function localeUrl(lang: string, path: string = '/'): string {
  const p = localePath(lang, path);
  return `https://exactiptv.com${p === '/' ? '' : p}`;
}

/**
 * Returns hreflang alternates for all four locales + x-default.
 * path should start with '/' (page path without locale prefix).
 */
export function hreflangAlternates(path: string = '/') {
  const p = path.startsWith('/') ? path : `/${path}`;
  const root = p === '/' ? '' : p;
  return {
    en:          `https://exactiptv.com${root}`,
    fr:          `https://exactiptv.com/fr${root}`,
    de:          `https://exactiptv.com/de${root}`,
    es:          `https://exactiptv.com/es${root}`,
    'x-default': `https://exactiptv.com${root}`,
  };
}
