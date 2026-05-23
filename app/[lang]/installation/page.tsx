import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink } from "lucide-react";
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
    title: dict.pages.installation.title,
    description: dict.pages.installation.description,
    alternates: { canonical: localeUrl(params.lang, '/installation') },
  };
}

const guides = [
  {
    emoji: "🔥",
    title: "Amazon Firestick",
    subtitle: "Recommended Device",
    steps: [
      "Enable Apps from Unknown Sources in Developer Options",
      "Install Downloader app from Amazon App Store",
      "Download and install IPTV Smarters Pro or TiviMate",
      "Enter your Exact IPTV Xtream Codes credentials",
      "Browse 50,000+ channels and start watching",
    ],
    apps: ["TiviMate (Best)", "IPTV Smarters Pro"],
    blogLink: "/blog/how-to-setup-iptv-on-firestick",
    difficulty: "Easy",
    difficultyColor: "text-green-400 bg-green-500/10 border-green-500/20",
    time: "5-10 min",
  },
  {
    emoji: "🤖",
    title: "Android Phone & Tablet",
    subtitle: "Google Play Store",
    steps: [
      "Open Google Play Store on your Android device",
      "Search for and install 'IPTV Smarters Pro'",
      "Open the app and select 'Login with Xtream Codes API'",
      "Enter your Exact IPTV username and password",
      "Enjoy 50,000+ channels on the go",
    ],
    apps: ["IPTV Smarters Pro", "OTT Navigator"],
    blogLink: "/blog/iptv-on-android-complete-setup-guide",
    difficulty: "Easy",
    difficultyColor: "text-green-400 bg-green-500/10 border-green-500/20",
    time: "5 min",
  },
  {
    emoji: "🍎",
    title: "iPhone & iPad",
    subtitle: "iOS / iPadOS",
    steps: [
      "Open the App Store on your iPhone or iPad",
      "Search for 'GSE Smart IPTV' (free) or 'IPTV Smarters Pro'",
      "Download and open the app",
      "Tap '+' and select Xtream Codes or M3U URL",
      "Enter your Exact IPTV credentials and start streaming",
    ],
    apps: ["GSE Smart IPTV", "IPTV Smarters Pro"],
    blogLink: "/blog/iptv-on-iphone-apple-tv-guide",
    difficulty: "Easy",
    difficultyColor: "text-green-400 bg-green-500/10 border-green-500/20",
    time: "5-10 min",
  },
  {
    emoji: "📺",
    title: "Samsung Smart TV",
    subtitle: "Tizen OS",
    steps: [
      "Open the Samsung App Store (Apps section)",
      "Search for 'SS IPTV' or 'Smart IPTV'",
      "Install and open the app",
      "Configure with your Exact IPTV M3U URL",
      "Or use a Firestick for best experience",
    ],
    apps: ["SS IPTV", "Smart IPTV"],
    blogLink: "/blog/iptv-for-smart-tv-complete-guide",
    difficulty: "Medium",
    difficultyColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    time: "10-15 min",
  },
  {
    emoji: "📺",
    title: "LG Smart TV",
    subtitle: "webOS",
    steps: [
      "Open the LG Content Store",
      "Search for 'SS IPTV' or 'Smart IPTV'",
      "Install and launch the app",
      "Enter your Exact IPTV M3U URL",
      "Channels will load automatically",
    ],
    apps: ["SS IPTV", "Smart IPTV"],
    blogLink: "/blog/iptv-for-smart-tv-complete-guide",
    difficulty: "Medium",
    difficultyColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    time: "10-15 min",
  },
  {
    emoji: "🍏",
    title: "Apple TV",
    subtitle: "tvOS 4th Gen+",
    steps: [
      "Open the App Store on Apple TV",
      "Search for 'Flex IPTV' or 'GSE Smart IPTV'",
      "Download and install the app",
      "Enter your Exact IPTV credentials",
      "Stream 4K content on your Apple TV",
    ],
    apps: ["Flex IPTV", "GSE Smart IPTV"],
    blogLink: "/blog/iptv-on-iphone-apple-tv-guide",
    difficulty: "Easy",
    difficultyColor: "text-green-400 bg-green-500/10 border-green-500/20",
    time: "5-10 min",
  },
  {
    emoji: "💻",
    title: "Windows PC",
    subtitle: "Windows 10/11",
    steps: [
      "Download IPTV Smarters for Windows",
      "Install and open the application",
      "Click 'Add User' > 'Login with Xtream Codes'",
      "Enter your Exact IPTV credentials",
      "Browse channels and start watching",
    ],
    apps: ["IPTV Smarters", "VLC Player"],
    blogLink: "/blog/iptv-installation-guide-all-devices",
    difficulty: "Easy",
    difficultyColor: "text-green-400 bg-green-500/10 border-green-500/20",
    time: "5 min",
  },
  {
    emoji: "📦",
    title: "Android TV Box",
    subtitle: "Best IPTV Experience",
    steps: [
      "Open Google Play Store on your Android TV box",
      "Install 'TiviMate IPTV Player' (recommended)",
      "Open TiviMate and tap 'Add Playlist'",
      "Select 'Xtream Codes' and enter credentials",
      "Enjoy the best IPTV player interface available",
    ],
    apps: ["TiviMate (Best)", "IPTV Smarters Pro"],
    blogLink: "/blog/tivimate-iptv-player-setup-guide",
    difficulty: "Easy",
    difficultyColor: "text-green-400 bg-green-500/10 border-green-500/20",
    time: "5-10 min",
  },
];

export default async function InstallationPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.pages.installation;

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href={localePath(params.lang, '/')} className="hover:text-purple-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-300">Installation Guides</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            <span className="gradient-text">{p.hero}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {p.heroSub}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Guides grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {guides.map((guide) => (
            <div key={guide.title} className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{guide.emoji}</span>
                  <div>
                    <h2 className="text-white font-bold text-lg">{guide.title}</h2>
                    <p className="text-gray-500 text-xs">{guide.subtitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${guide.difficultyColor}`}>
                    {guide.difficulty}
                  </span>
                  <p className="text-xs text-gray-600 mt-1">{guide.time}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2.5 mb-4">
                {guide.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>

              {/* Recommended apps */}
              <div className="flex flex-wrap gap-2 mb-4">
                {guide.apps.map((app) => (
                  <span key={app} className="text-xs px-2.5 py-1 glass rounded-lg border border-white/5 text-gray-400">
                    {app}
                  </span>
                ))}
              </div>

              {/* Link to detailed guide */}
              <Link
                href={localePath(params.lang, guide.blogLink)}
                className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                View Full Guide
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 glass rounded-2xl p-8 border border-purple-500/20 text-center">
          <h2 className="text-white font-bold text-xl mb-2">Need Personal Setup Help?</h2>
          <p className="text-gray-400 text-sm mb-6">
            Our team sets up IPTV for you via WhatsApp. Just message us and we&apos;ll walk you through every step live.
          </p>
          <a
            href="https://wa.me/447380310123?text=Hi,%20I%20need%20help%20setting%20up%20my%20device"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-green-500/20"
          >
            Get Setup Help — WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
