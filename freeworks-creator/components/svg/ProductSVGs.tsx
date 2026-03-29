import React from "react";

// ─── Acrylic Keyring ───
export function AcrylicKeyring({ color = "#d4a0c0", size = 200 }: { color?: string; size?: number }) {
  const id = color.slice(1);
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240">
      <defs>
        <linearGradient id={`akS${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.65)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="80%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.55)" />
        </linearGradient>
        <linearGradient id={`akB${id}`} x1="0" y1="0" x2=".5" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".32" />
          <stop offset="100%" stopColor={color} stopOpacity=".1" />
        </linearGradient>
        <filter id={`akD${id}`}>
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="rgba(0,0,0,0.08)" />
        </filter>
      </defs>
      <circle cx="100" cy="22" r="14" fill="none" stroke={color} strokeWidth="3" opacity=".45" />
      <circle cx="100" cy="22" r="14" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" />
      <ellipse cx="100" cy="42" rx="6" ry="8" fill="none" stroke={color} strokeWidth="2.5" opacity=".35" />
      <g filter={`url(#akD${id})`}>
        <rect x="30" y="55" width="140" height="170" rx="20" fill={`url(#akB${id})`} />
        <rect x="30" y="55" width="140" height="170" rx="20" fill={`url(#akS${id})`} />
        <rect x="30" y="55" width="140" height="170" rx="20" fill="none" stroke="rgba(255,255,255,.45)" strokeWidth="1.5" />
      </g>
      <line x1="45" y1="70" x2="45" y2="180" stroke="rgba(255,255,255,.3)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="120" r="30" fill={color} opacity=".32" />
      <circle cx="88" cy="114" r="4" fill="#1a1a1a" />
      <circle cx="112" cy="114" r="4" fill="#1a1a1a" />
      <circle cx="89" cy="113" r="1.5" fill="rgba(255,255,255,.85)" />
      <circle cx="113" cy="113" r="1.5" fill="rgba(255,255,255,.85)" />
      <ellipse cx="100" cy="126" rx="6" ry="4" fill="#1a1a1a" opacity=".45" />
      <ellipse cx="80" cy="122" rx="7" ry="4" fill={color} opacity=".3" />
      <ellipse cx="120" cy="122" rx="7" ry="4" fill={color} opacity=".3" />
      <ellipse cx="82" cy="90" rx="10" ry="18" fill={color} opacity=".25" transform="rotate(-10,82,90)" />
      <ellipse cx="118" cy="90" rx="10" ry="18" fill={color} opacity=".25" transform="rotate(10,118,90)" />
      <rect x="50" y="165" width="100" height="6" rx="3" fill={`${color}15`} />
    </svg>
  );
}

// ─── Acrylic Stand ───
export function AcrylicStand({ color = "#a0b8d4", size = 200, character = "bear" }: { color?: string; size?: number; character?: "bear" | "cat" }) {
  const id = color.slice(1);
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 200 220">
      <defs>
        <linearGradient id={`asB${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".28" />
          <stop offset="50%" stopColor="rgba(255,255,255,.15)" />
          <stop offset="100%" stopColor={color} stopOpacity=".16" />
        </linearGradient>
        <filter id={`asG${id}`}>
          <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="rgba(0,0,0,0.07)" />
        </filter>
      </defs>
      <ellipse cx="100" cy="208" rx="60" ry="10" fill="rgba(0,0,0,.03)" />
      <rect x="60" y="195" width="80" height="16" rx="4" fill="rgba(0,0,0,.03)" stroke={`${color}20`} strokeWidth="1" />
      <rect x="92" y="185" width="16" height="14" rx="2" fill="rgba(0,0,0,.02)" />
      <g filter={`url(#asG${id})`}>
        <rect x="25" y="15" width="150" height="175" rx="18" fill={`url(#asB${id})`} />
        <rect x="25" y="15" width="150" height="175" rx="18" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
      </g>
      <path d="M40 30 L40 160 Q40 175 55 175" stroke="rgba(255,255,255,.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
      {character === "bear" ? (
        <g>
          <circle cx="100" cy="95" r="35" fill={color} opacity=".28" />
          <circle cx="75" cy="65" r="14" fill={color} opacity=".22" />
          <circle cx="125" cy="65" r="14" fill={color} opacity=".22" />
          <circle cx="88" cy="88" r="4.5" fill="#1a1a1a" />
          <circle cx="112" cy="88" r="4.5" fill="#1a1a1a" />
          <circle cx="89.5" cy="87" r="1.5" fill="rgba(255,255,255,.85)" />
          <circle cx="113.5" cy="87" r="1.5" fill="rgba(255,255,255,.85)" />
          <ellipse cx="100" cy="100" rx="5" ry="3.5" fill="#1a1a1a" opacity=".4" />
          <ellipse cx="82" cy="96" rx="6" ry="3.5" fill={color} opacity=".3" />
          <ellipse cx="118" cy="96" rx="6" ry="3.5" fill={color} opacity=".3" />
        </g>
      ) : (
        <g>
          <circle cx="100" cy="100" r="32" fill={color} opacity=".22" />
          <ellipse cx="80" cy="82" rx="12" ry="8" fill={color} opacity=".2" transform="rotate(-20,80,82)" />
          <ellipse cx="120" cy="82" rx="12" ry="8" fill={color} opacity=".2" transform="rotate(20,120,82)" />
          <circle cx="90" cy="94" r="4" fill="#1a1a1a" />
          <circle cx="110" cy="94" r="4" fill="#1a1a1a" />
          <path d="M94 106 Q100 112 106 106" stroke="#1a1a1a" strokeWidth="2" fill="none" opacity=".4" />
        </g>
      )}
      <rect x="55" y="150" width="90" height="20" rx="6" fill={`${color}0a`} />
      <circle cx="160" cy="30" r="2" fill="rgba(255,255,255,.6)" />
    </svg>
  );
}

// ─── Sticker Pack ───
export function StickerPack({ color = "#a0d4b8", size = 180 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 180 207">
      <rect x="10" y="10" width="160" height="187" rx="14" fill="rgba(255,255,255,.45)" stroke={`${color}18`} strokeWidth="1" />
      <g transform="translate(25,25) rotate(-5,50,50)">
        <ellipse cx="50" cy="50" rx="42" ry="38" fill={`${color}20`} stroke={`${color}20`} strokeWidth="1" />
        <circle cx="42" cy="44" r="3" fill="#1a1a1a" />
        <circle cx="58" cy="44" r="3" fill="#1a1a1a" />
        <path d="M46 54 Q50 58 54 54" stroke="#1a1a1a" strokeWidth="1.5" fill="none" opacity=".5" />
      </g>
      <g transform="translate(75,85) rotate(8,40,40)">
        <rect x="5" y="5" width="70" height="65" rx="16" fill={color} opacity=".15" />
        <text x="40" y="45" textAnchor="middle" fontSize="28" fill={color} opacity=".4">♥</text>
      </g>
      <g transform="translate(15,120)">
        <circle cx="35" cy="35" r="28" fill={color} opacity=".1" />
        <text x="35" y="40" textAnchor="middle" fontSize="22" fill={color} opacity=".35">★</text>
      </g>
    </svg>
  );
}

// ─── Product SVG Router ───
export function ProductSVG({ type, color, size }: { type: string; color: string; size: number }) {
  if (type === "keyring") return <AcrylicKeyring color={color} size={size} />;
  if (type === "sticker") return <StickerPack color={color} size={size} />;
  return <AcrylicStand color={color} size={size} />;
}
