# FREEWORKS CREATOR

크리에이터의 작품을 소장하다. — 프리미엄 크리에이터 작품 소장 플랫폼

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Fonts**: Syne (headings) + Pretendard (body) + Manrope (numbers)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

## Project Structure

```
freeworks-creator/
├── app/
│   ├── globals.css          # Tailwind + custom styles
│   ├── layout.tsx           # Root layout + metadata
│   └── page.tsx             # Home page assembly
├── components/
│   ├── Header.tsx           # Navigation + CTA
│   ├── Hero.tsx             # Hero with floating parallax cards
│   ├── Footer.tsx           # Site footer
│   ├── sections/
│   │   └── HomeSections.tsx # EditorsPick, Artists, Best, Categories, Quality, Reviews, CTA
│   ├── svg/
│   │   └── ProductSVGs.tsx  # AcrylicStand, AcrylicKeyring, StickerPack
│   └── ui/
│       └── SharedUI.tsx     # Card, YellowBtn, GhostBtn, SectionTitle, TierBadge, Glow
├── lib/
│   └── constants.ts         # Colors, types, mock data
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Brand Colors

| Token   | Value     | Usage                |
|---------|-----------|----------------------|
| Black   | `#0A0A0A` | Text, headings       |
| Yellow  | `#F2C80F` | CTA, accents (포인트) |
| Ivory   | `#F8F6F1` | Background           |
| Muted   | `#5C5C5C` | Secondary text       |
| Dim     | `#9E9E9E` | Tertiary text        |
