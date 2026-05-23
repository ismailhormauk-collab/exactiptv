import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";
import Script from "next/script";
import { getDictionary } from "@/locales/getDictionary";
import { LOCALES } from "@/locales/types";
import type { Locale } from "@/locales/types";

export function generateStaticParams() {
  return LOCALES.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.pages.blog.title,
    description: dict.pages.blog.description,
    alternates: {
      canonical: `https://exactiptv.com/${params.lang}/blog`,
      languages: {
        en: "https://exactiptv.com/en/blog",
        fr: "https://exactiptv.com/fr/blog",
        de: "https://exactiptv.com/de/blog",
        es: "https://exactiptv.com/es/blog",
        "x-default": "https://exactiptv.com/en/blog",
      },
    },
    openGraph: {
      title: dict.pages.blog.title,
      description: dict.pages.blog.description,
      type: "website",
      url: `https://exactiptv.com/${params.lang}/blog`,
      siteName: "Exact IPTV",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.blog.title,
      description: dict.pages.blog.description,
    },
  };
}

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Exact IPTV Blog",
  description: "IPTV guides, reviews, and buying advice",
  url: "https://exactiptv.com/blog",
};

const categoryStyle: Record<string, string> = {
  "Guide":        "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Review":       "text-sky-400   bg-sky-500/10   border-sky-500/20",
  "Buying Guide": "text-amber-400 bg-amber-500/10 border-amber-500/20",
};

const defaultCategoryStyle = "text-slate-400 bg-slate-500/10 border-slate-500/20";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
}

export default async function BlogPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as Locale);
  const p = dict.pages.blog;

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <div className="min-h-screen pt-20 pb-24">

        {/* Page header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <p className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{p.hero}</h1>
          <p className="text-slate-400 text-base max-w-xl">{p.heroSub}</p>
        </div>

        {/* Articles grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <p className="text-slate-500 text-sm">{p.noPosts}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/${params.lang}/blog/${post.slug}`}
                  className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-slate-950 hover:border-violet-500/40 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_4px_28px_rgba(109,40,217,0.14)] hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Thumbnail — padding-top 16:9 trick */}
                  <div className="relative w-full overflow-hidden bg-slate-900" style={{ paddingTop: '56.25%' }}>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-violet-900/0 group-hover:bg-violet-900/10 transition-colors duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${categoryStyle[post.category] ?? defaultCategoryStyle}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                      <span className="text-slate-700 mx-1">·</span>
                      {formatDate(post.publishedAt)}
                    </div>
                    <h3 className="text-white font-bold text-[15px] leading-snug mb-2.5 group-hover:text-violet-200 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-2 flex-1 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-violet-400 text-xs font-semibold group-hover:gap-2.5 transition-all mt-auto">
                      {p.readMore} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}
