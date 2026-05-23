import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050508",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://exactiptv.com"),
  title: {
    default: "Exact IPTV | Premium IPTV Subscription – 50,000+ Channels in HD & 4K",
    template: "%s | Exact IPTV",
  },
  description:
    "Premium IPTV subscription with 50,000+ live channels, 100,000+ VOD titles, 4K streaming quality, and 24/7 support. Starting at €20/month. Instant activation.",
  keywords: [
    "exact iptv",
    "exact iptv subscription",
    "best IPTV service",
    "IPTV subscription",
    "IPTV provider",
    "IPTV streaming",
    "premium IPTV",
    "4K IPTV",
    "IPTV channels",
    "IPTV for Firestick",
    "IPTV Smarters",
    "IPTV service provider",
    "buy IPTV",
    "IPTV UK",
  ],
  authors: [{ name: "Exact IPTV" }],
  creator: "Exact IPTV",
  publisher: "Exact IPTV",
  alternates: {
    canonical: "https://exactiptv.com",
    languages: {
      "en":        "https://exactiptv.com",
      "fr":        "https://exactiptv.com/fr",
      "de":        "https://exactiptv.com/de",
      "es":        "https://exactiptv.com/es",
      "x-default": "https://exactiptv.com",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://exactiptv.com",
    siteName: "Exact IPTV",
    title: "Exact IPTV | Premium IPTV – 50,000+ Channels in HD & 4K",
    description:
      "Premium IPTV subscription with 50,000+ live channels, 100,000+ VOD titles, and 4K streaming. Starting at €20/month.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Exact IPTV - Premium Streaming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exact IPTV | Premium IPTV – 50,000+ Channels",
    description: "Premium IPTV with 50,000+ channels, 4K quality, 24/7 support. From €20/month.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Exact IPTV",
  url: "https://exactiptv.com",
  logo: "https://exactiptv.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7380-310123",
    contactType: "customer service",
    availableLanguage: "English",
    contactOption: "TollFree",
  },
  sameAs: [],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Exact IPTV",
  url: "https://exactiptv.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://exactiptv.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="canonical" href="https://exactiptv.com" />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">

        {/* ── Global ambient background — fixed, GPU-composited, zero scroll cost ── */}
        <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Base dark */}
          <div className="absolute inset-0 bg-[#050508]" />
          {/* Blue glow — right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_85%_45%,rgba(37,99,235,0.10),transparent)]" />
          {/* Violet glow — left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_12%_55%,rgba(109,40,217,0.10),transparent)]" />
          {/* Cyan accent — bottom right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_30%_at_92%_92%,rgba(6,182,212,0.05),transparent)]" />
          {/* Purple bleed — top center */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_25%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />
          {/* Subtle blue grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
          />
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        {children}
      </body>
    </html>
  );
}
