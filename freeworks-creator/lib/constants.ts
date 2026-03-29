// ─── Brand Colors ───
export const C = {
  bg: "#F8F6F1",
  bgWarm: "#F5F0EB",
  bgCard: "rgba(255,255,255,0.80)",
  bgCardHover: "rgba(255,255,255,0.95)",
  border: "rgba(0,0,0,0.06)",
  borderHover: "rgba(0,0,0,0.12)",
  shadow: "0 2px 16px rgba(0,0,0,0.04)",
  shadowHover: "0 12px 40px rgba(0,0,0,0.08)",
  shadowDeep: "0 20px 60px rgba(0,0,0,0.10)",
  black: "#0A0A0A",
  text: "#1A1A1A",
  textMuted: "#5C5C5C",
  textDim: "#9E9E9E",
  yellow: "#F2C80F",
  yellowHover: "#E0B800",
  yellowSoft: "rgba(242,200,15,0.10)",
  yellowGlow: "rgba(242,200,15,0.25)",
  gold: "#C4A24E",
  silver: "#8E9AAA",
  bronze: "#B08456",
} as const;

// ─── Types ───
export type TierType = "gold" | "silver" | "bronze";

export interface Artist {
  id: number;
  name: string;
  nameEn: string;
  tier: TierType;
  avatar: string;
  followers: number;
  desc: string;
  products: number;
  color: string;
  tagline: string;
}

export interface Product {
  id: number;
  name: string;
  artist: string;
  price: number;
  tag: string;
  color: string;
  type: "stand" | "keyring" | "sticker";
  sold: number;
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

export interface Review {
  user: string;
  text: string;
  product: string;
  avatar: string;
}

// ─── Tier Config ───
export const TIER_CONFIG = {
  gold: { color: C.gold, label: "GOLD", bg: "#C4A24E12" },
  silver: { color: C.silver, label: "SILVER", bg: "#8E9AAA12" },
  bronze: { color: C.bronze, label: "BRONZE", bg: "#B0845612" },
} as const;

// ─── Data ───
export const ARTISTS: Artist[] = [
  { id: 1, name: "모찌하루", nameEn: "MOCHIHAL", tier: "gold", avatar: "🐰", followers: 12400, desc: "몽글몽글 토끼 캐릭터 작가", products: 24, color: "#d4a0c0", tagline: "따뜻한 일상을 담은 몽글 유니버스" },
  { id: 2, name: "별빛수채", nameEn: "STARWC", tier: "gold", avatar: "🌙", followers: 9800, desc: "감성 수채화 일러스트레이터", products: 18, color: "#a0b8d4", tagline: "밤하늘 아래 수채화로 그린 감성" },
  { id: 3, name: "코코냥", nameEn: "COCONYANG", tier: "silver", avatar: "🐱", followers: 7200, desc: "고양이 캐릭터 전문 작가", products: 15, color: "#a0d4b8", tagline: "귀여운 고양이들의 소소한 하루" },
  { id: 4, name: "핑쿠베어", nameEn: "PINKUBEAR", tier: "silver", avatar: "🧸", followers: 5600, desc: "핑크 곰돌이 유니버스", products: 12, color: "#d4a8b8", tagline: "핑크빛 곰돌이와 달콤한 세계" },
  { id: 5, name: "두부달", nameEn: "TOFUMOON", tier: "bronze", avatar: "🌕", followers: 3200, desc: "미니멀 감성 드로잉", products: 8, color: "#d4cca0", tagline: "달빛처럼 부드러운 미니멀 감성" },
  { id: 6, name: "젤리팜", nameEn: "JELLYFARM", tier: "bronze", avatar: "🍓", followers: 2800, desc: "과일 젤리 캐릭터 작가", products: 6, color: "#d4a8a0", tagline: "톡톡 튀는 과일 젤리 친구들" },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "몽글 토끼 아크릴 스탠드 세트", artist: "모찌하루", price: 38000, tag: "NEW", color: "#d4a0c0", type: "stand", sold: 1240 },
  { id: 2, name: "별빛 수채 포스터 컬렉션", artist: "별빛수채", price: 45000, tag: "BEST", color: "#a0b8d4", type: "stand", sold: 2100 },
  { id: 3, name: "코코냥 키링 패키지", artist: "코코냥", price: 28000, tag: "NEW", color: "#a0d4b8", type: "keyring", sold: 890 },
  { id: 4, name: "핑쿠베어 스티커 북", artist: "핑쿠베어", price: 22000, tag: "", color: "#d4a8b8", type: "sticker", sold: 1560 },
  { id: 5, name: "달빛 노트 세트", artist: "두부달", price: 32000, tag: "LIMITED", color: "#d4cca0", type: "stand", sold: 670 },
  { id: 6, name: "젤리팜 마스킹테이프 세트", artist: "젤리팜", price: 18000, tag: "", color: "#d4a8a0", type: "sticker", sold: 430 },
];

export const CATEGORIES: Category[] = [
  { name: "아크릴 스탠드", icon: "◇", count: 86 },
  { name: "키링", icon: "○", count: 52 },
  { name: "포스터", icon: "▭", count: 34 },
  { name: "스티커", icon: "✦", count: 71 },
  { name: "노트 · 다이어리", icon: "▢", count: 28 },
  { name: "마스킹테이프", icon: "≡", count: 19 },
];

export const REVIEWS: Review[] = [
  { user: "하늘소녀", text: "패키징이 진짜 선물 받은 것 같아요. 아크릴 퀄리티가 다른 곳과 확실히 다릅니다.", product: "몽글 토끼 아크릴 스탠드", avatar: "🌸" },
  { user: "민트초코", text: "별빛수채 작가님 포스터 색감이 실물이 더 예뻐요. 액자에 넣으니 진짜 작품 같아요.", product: "별빛 수채 포스터 컬렉션", avatar: "🍃" },
  { user: "캣러버22", text: "키링 디테일이 놀라워요. 가방에 달고 다니는데 다들 어디서 샀냐고 물어봅니다.", product: "코코냥 키링 패키지", avatar: "💛" },
  { user: "토끼사랑", text: "포장 열자마자 감동이에요. 상품이 아니라 작품을 소장하는 느낌이에요.", product: "핑쿠베어 스티커 북", avatar: "🎀" },
];

export const NAV_ITEMS = [
  { label: "홈", key: "home" },
  { label: "전체 상품", key: "products" },
  { label: "작가관", key: "artists" },
  { label: "크리에이터 모집", key: "apply" },
  { label: "고객센터", key: "support" },
] as const;
