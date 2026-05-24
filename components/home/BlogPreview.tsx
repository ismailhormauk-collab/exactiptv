import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { getFeaturedPosts } from "@/data/blog-posts";
import { localePath } from "@/lib/url";

const categoryStyle: Record<string, string> = {
  "Guide":        "text-violet-400 bg-violet-500/10 border-violet-500/20",
  "Review":       "text-sky-400   bg-sky-500/10   border-sky-500/20",
  "Buying Guide": "text-amber-400 bg-amber-500/10 border-amber-500/20",
};
const defaultCategoryStyle = "text-slate-400 bg-slate-500/10 border-slate-500/20";

export default function BlogPreview({ lang = "en" }: { lang?: string }) {
  const posts = getFeaturedPosts().slice(0, 3);

  return (
    <section className="py-14 sm:py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-purple-400 text-xs font-medium mb-3">
              From the Blog
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Guides &{" "}
              <span className="gradient-text">Reviews</span>
            </h2>
          </div>
          <Link
            href={localePath(lang, '/blog')}
            className="flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors glass px-4 py-2.5 rounded-xl border border-purple-500/20 hover:bg-purple-500/10 flex-shrink-0"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={localePath(lang, `/blog/${post.slug}`)}
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-slate-950 hover:border-violet-500/40 hover:shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_4px_28px_rgba(109,40,217,0.14)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-violet-900/0 group-hover:bg-violet-900/10 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${categoryStyle[post.category] ?? defaultCategoryStyle}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
                <h3 className="text-white font-bold text-sm leading-snug mb-2.5 group-hover:text-violet-200 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1.5 text-violet-400 text-xs font-semibold group-hover:gap-2.5 transition-all mt-auto">
                  Read Article <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
