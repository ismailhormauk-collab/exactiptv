import Link from "next/link";
import { Tv, Mail, MessageCircle } from "lucide-react";
import type { FooterDict, Locale } from "@/locales/types";
import { localePath } from "@/lib/url";

export default function Footer({ dict, lang }: { dict: FooterDict; lang: Locale }) {
  const footerLinks = [
    { href: localePath(lang, '/pricing'),     label: dict.links.pricing },
    { href: localePath(lang, '/faq'),         label: dict.links.faq },
    { href: localePath(lang, '/installation'),label: dict.links.installation },
    { href: localePath(lang, '/contact'),     label: dict.links.contact },
    { href: localePath(lang, '/privacy'),     label: dict.links.privacy },
    { href: localePath(lang, '/terms'),       label: dict.links.terms },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] bg-black/30 backdrop-blur-sm">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Three-column grid ── */}
        <div className="py-12 sm:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">

          {/* LEFT — Brand */}
          <div className="flex flex-col">
            <Link href={localePath(lang, '/')} className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
                <Tv className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                Exact<span className="text-purple-400">IPTV</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">
              {dict.description}
            </p>
          </div>

          {/* CENTER — Navigation links */}
          <div className="flex flex-col sm:items-center">
            <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-widest mb-4">
              {dict.navigation}
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Contact */}
          <div className="flex flex-col sm:items-start lg:items-end">
            <p className="text-[11px] font-semibold text-gray-600 uppercase tracking-widest mb-4">
              {dict.contactUs}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/447380310123"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors duration-150"
              >
                <span className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors duration-150">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </span>
                <span>+44 7380 310123</span>
              </a>
              <a
                href="mailto:support@exactiptv.com"
                className="group flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors duration-150"
              >
                <span className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors duration-150">
                  <Mail className="w-4 h-4 text-violet-400" />
                </span>
                <span>support@exactiptv.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-white/[0.05] flex items-center justify-center">
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} {dict.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
}
