import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, MessageCircle, ChevronRight } from "lucide-react";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/data/blog-posts";
import Script from "next/script";
import { LOCALES } from "@/locales/types";
import { localePath, localeUrl, hreflangAlternates } from "@/lib/url";

interface Props {
  params: { lang: string; slug: string };
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  const ogImageUrl = post.coverImage.includes('?')
    ? post.coverImage.replace(/&?w=\d+/, '&w=1200').replace(/&?h=\d+/, '') + '&h=630&fit=crop'
    : post.coverImage + '?w=1200&h=630&fit=crop&auto=format&q=85';
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: localeUrl(params.lang, `/blog/${post.slug}`),
      languages: hreflangAlternates(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: ["Exact IPTV"],
      section: post.category,
      url: localeUrl(params.lang, `/blog/${post.slug}`),
      siteName: "Exact IPTV",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [ogImageUrl],
    },
  };
}

const categoryStyle: Record<string, string> = {
  "Guide":        "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Review":       "text-sky-400   bg-sky-500/10   border-sky-500/20",
  "Buying Guide": "text-amber-400 bg-amber-500/10 border-amber-500/20",
};
const defaultCategoryStyle = "text-slate-400 bg-slate-500/10 border-slate-500/20";

function renderContent(md: string, lang: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="text-white font-black text-xl mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-white font-bold text-base mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="text-violet-300 bg-violet-500/10 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^\- (.+)$/gm, '<li class="text-slate-300 text-sm leading-relaxed pl-1">$1</li>')
    .replace(/(<li[\s\S]+?<\/li>)/g, '<ul class="list-disc list-inside space-y-1.5 my-3 ml-2">$1</ul>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      const href = url.startsWith('/') ? localePath(lang, url) : url;
      return `<a href="${href}" class="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors">${text}</a>`;
    })
    .replace(/\n\n/g, '</p><p class="text-slate-300 text-[15px] leading-relaxed my-4">')
    .replace(/\n/g, ' ');
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Exact IPTV" },
    publisher: { "@type": "Organization", name: "Exact IPTV", logo: { "@type": "ImageObject", url: "https://exactiptv.com/logo.png" } },
    mainEntityOfPage: { "@type": "WebPage", "@id": localeUrl(params.lang, `/blog/${post.slug}`) },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localeUrl(params.lang, '/') },
      { "@type": "ListItem", position: 2, name: "Blog", item: localeUrl(params.lang, '/blog') },
      { "@type": "ListItem", position: 3, name: post.title, item: localeUrl(params.lang, `/blog/${post.slug}`) },
    ],
  };

  return (
    <>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen pt-20 pb-24">

        {/* ── Cover image hero ──────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden bg-slate-950" style={{ paddingTop: 'clamp(220px, 34vw, 480px)' }}>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
          {/* Breadcrumb overlay */}
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <Link href={localePath(params.lang, '/')} className="hover:text-violet-400 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href={localePath(params.lang, '/blog')} className="hover:text-violet-400 transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-300 truncate max-w-[240px]">{post.title}</span>
            </nav>
            <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full border mb-4 ${categoryStyle[post.category] ?? defaultCategoryStyle}`}>
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* ── Meta row ─────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.07] py-4">
          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />{post.readTime}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <span className="text-violet-400 font-semibold">By Exact IPTV</span>
          </div>
        </div>

        {/* ── Content + sidebar ─────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 lg:items-start">

            {/* Article */}
            <article>
              <div
                className="text-slate-300 text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: `<p class="text-slate-300 text-[15px] leading-relaxed my-4">${renderContent(post.content.trim(), params.lang)}</p>` }}
              />

              {/* CTA box */}
              <div className="mt-12 rounded-2xl p-8 border border-violet-500/20 bg-violet-600/[0.06] text-center">
                <h3 className="text-white font-bold text-xl mb-2">Ready to Start Streaming?</h3>
                <p className="text-slate-400 text-sm mb-6">
                  Get access to 50,000+ channels and 100,000+ movies & series. Instant activation after payment.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={localePath(params.lang, '/pricing')}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/20 text-sm"
                  >
                    View Pricing Plans
                  </Link>
                  <a
                    href="https://wa.me/447380310123?text=Hi,%20I%20read%20your%20blog%20and%20want%20to%20subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-green-500/20 text-green-400 font-semibold rounded-xl hover:bg-[#25D366]/20 transition-all text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order via WhatsApp
                  </a>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link
                  href={localePath(params.lang, '/blog')}
                  className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* Quick order */}
              <div className="glass rounded-2xl p-6 border border-violet-500/20">
                <h3 className="text-white font-bold text-sm mb-4">Get Started Today</h3>
                <div className="space-y-2 mb-5">
                  {[
                    { plan: "1 Month",  price: "€20" },
                    { plan: "3 Months", price: "€35" },
                    { plan: "6 Months", price: "€45", popular: true },
                    { plan: "12 Months",price: "€65" },
                  ].map(item => (
                    <a
                      key={item.plan}
                      href={`https://wa.me/447380310123?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(item.plan)}%20plan`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                        item.popular
                          ? "bg-violet-600/20 border border-violet-500/30 text-white"
                          : "glass border border-white/[0.06] text-slate-300 hover:border-violet-500/20"
                      }`}
                    >
                      <span className="font-medium">{item.plan}{item.popular ? " ★" : ""}</span>
                      <span className="font-bold text-violet-400">{item.price}</span>
                    </a>
                  ))}
                </div>
                <a
                  href="https://wa.me/447380310123?text=Hi,%20I'm%20interested%20in%20subscribing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  WhatsApp Us Now
                </a>
              </div>

              {/* Related articles */}
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Related Articles</p>
                <div className="space-y-2">
                  {related.map(rel => (
                    <Link
                      key={rel.slug}
                      href={localePath(params.lang, `/blog/${rel.slug}`)}
                      className="group flex gap-3 items-start rounded-xl p-3 border border-white/[0.05] hover:border-violet-500/25 bg-white/[0.02] transition-all"
                    >
                      {/* Fixed-size thumbnail, absolute-fill */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          sizes="56px"
                          loading="lazy"
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.08]"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-slate-300 text-xs font-medium group-hover:text-violet-300 transition-colors line-clamp-2 leading-snug">
                          {rel.title}
                        </p>
                        <p className="text-slate-600 text-[10px] mt-1">{rel.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
