import { ImageResponse } from 'next/og';

export const alt = 'Exact IPTV — Premium IPTV Service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050508',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Violet glow left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 70% at 15% 65%, rgba(109,40,217,0.55), transparent)',
          }}
        />
        {/* Blue glow right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 60% at 85% 30%, rgba(37,99,235,0.35), transparent)',
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 40,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: 48,
              color: 'white',
            }}
          >
            E
          </div>
          <span style={{ fontSize: 44, fontWeight: 900, color: 'white' }}>
            Exact IPTV
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 28,
            maxWidth: 960,
            position: 'relative',
          }}
        >
          Premium IPTV — 50,000+ Channels in HD & 4K
        </div>

        {/* Subtext */}
        <div
          style={{
            fontSize: 26,
            color: '#a78bfa',
            textAlign: 'center',
            fontWeight: 600,
            position: 'relative',
            marginBottom: 44,
          }}
        >
          Starting from €20/month · Instant Activation · 24/7 Support
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            position: 'relative',
          }}
        >
          {['50,000+ Channels', '100K+ VOD', '4K Quality', '24/7 Support'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: '10px 24px',
                  background: 'rgba(124,58,237,0.18)',
                  border: '1px solid rgba(124,58,237,0.45)',
                  borderRadius: 999,
                  fontSize: 19,
                  color: '#c4b5fd',
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
