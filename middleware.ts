import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const NON_DEFAULT_LOCALES = ['fr', 'de', 'es'] as const

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Pass through Next.js internals, API routes, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect /en and /en/* → remove prefix (301 canonical redirect)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === '/en' ? '/' : pathname.slice(3)
    return NextResponse.redirect(url, 301)
  }

  // Non-default locale paths (/fr, /de, /es): pass through to [lang] route
  const hasNonDefaultLocale = NON_DEFAULT_LOCALES.some(
    l => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  )
  if (hasNonDefaultLocale) return NextResponse.next()

  // Default locale (English): internally rewrite to /en/… without changing the URL
  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)', '/'],
}
