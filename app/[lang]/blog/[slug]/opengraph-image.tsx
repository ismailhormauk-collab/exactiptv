import { ImageResponse } from 'next/og';
import { blogPosts, getBlogPost } from '@/data/blog-posts';
import { LOCALES } from '@/locales/types';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

const categoryColors: Record<string, string> = {
  Guide: '#a78bfa',
  Review: '#38bdf8',
  'Buying Guide': '#fbbf24',
};

export default function BlogPostOGImage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const post = getBlogPost(params.slug);
  const title = post?.title ?? 'Exact IPTV Blog';
  const category = post?.category ?? 'Guide';
  const readTime = post?.readTime ?? '5 min read';
  const catColor = categoryColors[category] ?? '#94a3b8';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '70px 80px',
          background: '#050508',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Violet glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 75% 75% at 5% 90%, rgba(109,40,217,0.6), transparent)',
          }}
        />
        {/* Blue glow top-right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 55% 55% at 95% 5%, rgba(37,99,235,0.35), transparent)',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(124,58,237,0.2)',
            border: '1px solid rgba(124,58,237,0.5)',
            borderRadius: 999,
            padding: '8px 26px',
            fontSize: 20,
            color: catColor,
            fontWeight: 700,
            marginBottom: 26,
            width: 'fit-content',
            position: 'relative',
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 65 ? 42 : title.length > 45 ? 48 : 54,
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: 36,
            maxWidth: 1040,
            position: 'relative',
          }}
        >
          {title}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Logo badge */}
          <div
            style={{
              width: 50,
              height: 50,
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              borderRadius: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 900,
              color: 'white',
              marginRight: 18,
            }}
          >
            E
          </div>
          <span
            style={{ fontSize: 22, color: '#94a3b8', fontWeight: 700, marginRight: 14 }}
          >
            Exact IPTV
          </span>
          <span style={{ fontSize: 22, color: '#334155', marginRight: 14 }}>·</span>
          <span style={{ fontSize: 22, color: '#64748b', marginRight: 14 }}>{readTime}</span>
          <span style={{ fontSize: 22, color: '#334155', marginRight: 14 }}>·</span>
          <span style={{ fontSize: 22, color: '#64748b' }}>exactiptv.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
