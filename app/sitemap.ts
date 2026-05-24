import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { localeUrl } from "@/lib/url";

const LOCALES = ["en", "fr", "de", "es"] as const;

const STATIC_PATHS = [
  { path: "/",            changeFrequency: "daily"   as const, priority: 1.0 },
  { path: "/pricing",     changeFrequency: "weekly"  as const, priority: 0.9 },
  { path: "/blog",        changeFrequency: "daily"   as const, priority: 0.8 },
  { path: "/installation",changeFrequency: "weekly"  as const, priority: 0.8 },
  { path: "/faq",         changeFrequency: "weekly"  as const, priority: 0.7 },
  { path: "/about",       changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact",     changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/privacy",     changeFrequency: "yearly"  as const, priority: 0.3 },
  { path: "/terms",       changeFrequency: "yearly"  as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static pages — all locales
  for (const { path, changeFrequency, priority } of STATIC_PATHS) {
    for (const lang of LOCALES) {
      entries.push({
        url: localeUrl(lang, path),
        lastModified: now,
        changeFrequency,
        priority: lang === "en" ? priority : priority * 0.9,
      });
    }
  }

  // Blog posts — all locales
  for (const post of blogPosts) {
    for (const lang of LOCALES) {
      entries.push({
        url: localeUrl(lang, `/blog/${post.slug}`),
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: lang === "en"
          ? (post.featured ? 0.9 : 0.7)
          : (post.featured ? 0.8 : 0.6),
      });
    }
  }

  return entries;
}
