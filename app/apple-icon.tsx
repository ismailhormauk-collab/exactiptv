import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
          borderRadius: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderTop: '40px solid transparent',
            borderBottom: '40px solid transparent',
            borderLeft: '68px solid white',
            marginLeft: 14,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
