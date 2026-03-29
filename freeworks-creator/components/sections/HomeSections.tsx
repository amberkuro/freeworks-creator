"use client";

import React from "react";
import { C, PRODUCTS, ARTISTS, CATEGORIES, REVIEWS } from "@/lib/constants";
import { ProductSVG, AcrylicStand, AcrylicKeyring } from "@/components/svg/ProductSVGs";
import { Card, YellowBtn, GhostBtn, SectionTitle, TierBadge, Glow } from "@/components/ui/SharedUI";

// ═══════════════════════════════════
// Editor's Pick
// ═══════════════════════════════════
export function EditorsPick({ onNavigate }: { onNavigate: (key: string) => void }) {
  const featured = [
    { ...PRODUCTS[0], desc: "모찌하루 작가의 시그니처 캐릭터 '몽이'를 고급 아크릴로 제작. 투명한 질감과 섬세한 디테일이 빛나는 소장할수록 빛나는 컬렉터블 작품." },
    { ...PRODUCTS[1], desc: "밤하늘을 한 장에 담은 수채화 아트 프린트 컬렉션." },
    { ...PRODUCTS[2], desc: "코코냥의 고양이 세계를 손안에 담은 아크릴 피스." },
  ];

  return (
    <section className="relative" style={{ padding: "64px 28px 72px" }}>
      <div className="max-w-[1320px] mx-auto relative">
        <SectionTitle sub="Editor's Pick" align="center">에디터 픽</SectionTitle>

        {/* Main featured */}
        <Card onClick={() => onNavigate("productDetail")} className="mb-6" style={{ padding: 0, borderRadius: 22, boxShadow: C.shadowDeep }}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] min-h-[360px]">
            <div className="relative flex items-center justify-center p-10 overflow-hidden" style={{ background: `linear-gradient(160deg, ${featured[0].color}0c, rgba(255,255,255,.4))`, borderRadius: "22px 0 0 22px" }}>
              <AcrylicStand color={featured[0].color} size={220} />
            </div>
            <div className="p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-[18px]">
                <span className="font-syne text-[10px] font-bold tracking-[3px] px-3.5 py-1.5 rounded-md" style={{ background: C.yellowSoft, color: C.black }}>
                  EDITOR&apos;S PICK
                </span>
                <TierBadge tier="gold" />
              </div>
              <h3 className="font-syne text-[26px] font-extrabold leading-[1.25] mb-2" style={{ color: C.black, letterSpacing: "-0.02em" }}>
                {featured[0].name}
              </h3>
              <div className="font-pretendard text-[13px] mb-4" style={{ color: C.textDim }}>by {featured[0].artist}</div>
              <p className="font-pretendard text-sm leading-[1.8] mb-[30px]" style={{ color: C.textMuted }}>{featured[0].desc}</p>
              <div className="flex items-center justify-between">
                <div className="font-num text-[28px] font-bold" style={{ color: C.black, letterSpacing: "0.01em" }}>
                  ₩{featured[0].price.toLocaleString()}
                </div>
                <YellowBtn style={{ padding: "12px 28px", fontSize: 13 }}>자세히 보기</YellowBtn>
              </div>
            </div>
          </div>
        </Card>

        {/* Sub picks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featured.slice(1).map((p) => (
            <Card key={p.id} onClick={() => onNavigate("productDetail")} style={{ padding: 0, borderRadius: 18 }}>
              <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] min-h-[180px]">
                <div className="flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(160deg, ${p.color}0c, #fff)`, borderRadius: "18px 0 0 18px" }}>
                  <ProductSVG type={p.type} color={p.color} size={85} />
                </div>
                <div className="p-7 flex flex-col justify-center">
                  {p.tag && (
                    <span className="self-start font-syne text-[9px] font-bold tracking-[1.5px] px-2.5 py-0.5 rounded mb-2.5" style={{ background: C.yellowSoft, color: C.black }}>
                      {p.tag}
                    </span>
                  )}
                  <div className="font-pretendard text-[15px] font-bold leading-[1.4] mb-1" style={{ color: C.text }}>{p.name}</div>
                  <div className="font-pretendard text-xs mb-3" style={{ color: C.textDim }}>{p.artist}</div>
                  <div className="font-num text-xl font-bold" style={{ color: C.black, letterSpacing: "0.01em" }}>₩{p.price.toLocaleString()}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════
// Featured Artists
// ═══════════════════════════════════
export function FeaturedArtists({ onNavigate }: { onNavigate: (key: string) => void }) {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <SectionTitle sub="Curated Creators">큐레이티드 크리에이터</SectionTitle>
          <GhostBtn onClick={() => onNavigate("artists")} style={{ padding: "10px 24px", fontSize: 12 }}>모든 작가 →</GhostBtn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTISTS.slice(0, 4).map((a, i) => (
            <Card key={a.id} onClick={() => onNavigate("artistDetail")} style={{ padding: 0, borderRadius: 20 }}>
              <div className="h-[120px] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${a.color}12, ${a.color}04, #fff)`, borderRadius: "20px 20px 0 0" }}>
                <div className="absolute right-3.5 -bottom-3 opacity-50" style={{ transform: "scale(0.55)" }}>
                  {i % 2 === 0 ? <AcrylicKeyring color={a.color} size={100} /> : <AcrylicStand color={a.color} size={85} character="cat" />}
                </div>
                <div className="absolute top-3.5 left-4"><TierBadge tier={a.tier} /></div>
              </div>
              <div className="px-[26px] pt-[22px] pb-[26px]">
                <div className="flex items-center gap-3.5 -mt-[38px]">
                  <div className="w-[54px] h-[54px] rounded-2xl flex items-center justify-center text-2xl border-[3px] border-white" style={{ background: `linear-gradient(135deg, ${a.color}45, ${a.color}20)`, boxShadow: C.shadow }}>
                    {a.avatar}
                  </div>
                </div>
                <div className="mt-3.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-pretendard text-[17px] font-extrabold" style={{ color: C.black }}>{a.name}</span>
                    <span className="font-syne text-[9px] tracking-[2px] font-semibold" style={{ color: C.textDim }}>{a.nameEn}</span>
                  </div>
                  <p className="font-pretendard text-[13px] mt-2 leading-[1.6]" style={{ color: C.textMuted }}>&ldquo;{a.tagline}&rdquo;</p>
                </div>
                <div className="flex gap-5 mt-[18px] pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
                  <div>
                    <div className="font-num text-[16px] font-bold" style={{ color: C.black }}>{(a.followers / 1000).toFixed(1)}k</div>
                    <div className="font-pretendard text-[10px]" style={{ color: C.textDim }}>팔로워</div>
                  </div>
                  <div>
                    <div className="font-num text-[16px] font-bold" style={{ color: C.black }}>{a.products}</div>
                    <div className="font-pretendard text-[10px]" style={{ color: C.textDim }}>상품</div>
                  </div>
                  <div className="ml-auto">
                    <button className="font-pretendard text-[11px] font-bold px-[18px] py-[7px] rounded-lg cursor-pointer" style={{ background: C.yellowSoft, border: `1px solid ${C.yellow}20`, color: C.black }}>
                      작가 보기
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════
// Best Collection
// ═══════════════════════════════════
export function BestCollection({ onNavigate }: { onNavigate: (key: string) => void }) {
  const sorted = [...PRODUCTS].sort((a, b) => b.sold - a.sold);
  const rankColors = [C.gold, C.silver, C.bronze];

  return (
    <section className="py-20 px-7">
      <div className="max-w-[1320px] mx-auto">
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <SectionTitle sub="Best Collection">베스트 컬렉션</SectionTitle>
          <GhostBtn onClick={() => onNavigate("products")} style={{ padding: "10px 24px", fontSize: 12 }}>전체 보기 →</GhostBtn>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[18px]">
          {sorted.map((p, i) => (
            <Card key={p.id} onClick={() => onNavigate("productDetail")} style={{ padding: 0, borderRadius: 18 }}>
              <div className="h-[190px] relative flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(160deg, ${p.color}0a, #fff)`, borderRadius: "18px 18px 0 0" }}>
                <ProductSVG type={p.type} color={p.color} size={110} />
                <div
                  className="absolute top-3 left-3 w-7 h-7 rounded-lg flex items-center justify-center font-num text-[13px] font-bold"
                  style={{
                    background: i < 3 ? `${rankColors[i]}18` : "rgba(0,0,0,.03)",
                    border: i < 3 ? `1.5px solid ${rankColors[i]}30` : `1px solid ${C.border}`,
                    color: i < 3 ? C.black : C.textDim,
                  }}
                >
                  {i + 1}
                </div>
                {p.tag && (
                  <span className="absolute top-3 right-3 font-syne text-[8px] font-bold tracking-[1.5px] px-2.5 py-0.5 rounded" style={{ background: C.yellowSoft, color: C.black }}>
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-[16px_20px_20px]">
                <div className="font-pretendard text-sm font-bold leading-[1.4] mb-1" style={{ color: C.text }}>{p.name}</div>
                <div className="font-pretendard text-[11px] mb-2" style={{ color: C.textDim }}>{p.artist}</div>
                <div className="flex justify-between items-center">
                  <div className="font-num text-[17px] font-bold" style={{ color: C.black, letterSpacing: "0.01em" }}>₩{p.price.toLocaleString()}</div>
                  <div className="font-num text-[11px] font-medium" style={{ color: C.textDim }}>{p.sold.toLocaleString()}개</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════
// Categories
// ═══════════════════════════════════
export function CategoriesSection({ onNavigate }: { onNavigate: (key: string) => void }) {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1100px] mx-auto">
        <SectionTitle sub="Categories" align="center">카테고리</SectionTitle>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3.5">
          {CATEGORIES.map((cat, i) => (
            <Card key={i} onClick={() => onNavigate("products")} style={{ padding: "28px 20px", textAlign: "center", borderRadius: 14 }}>
              <div className="w-12 h-12 rounded-[14px] mx-auto mb-3.5 flex items-center justify-center text-xl" style={{ background: C.yellowSoft, color: C.black }}>
                {cat.icon}
              </div>
              <div className="font-pretendard text-sm font-bold mb-1" style={{ color: C.text }}>{cat.name}</div>
              <div className="font-num text-xs font-semibold" style={{ color: C.textDim }}>{cat.count}개</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════
// Quality
// ═══════════════════════════════════
export function QualitySection() {
  const items = [
    { icon: "✦", title: "큐레이션된 작품만", desc: "오픈 마켓이 아닙니다. 프리웍스가 직접 큐레이션한 크리에이터의 작품만 만나볼 수 있습니다." },
    { icon: "◈", title: "작품 하나하나, 직접 검수", desc: "대량 생산이 아닙니다. 모든 작품은 제작 후 프리웍스 팀이 직접 퀄리티를 검증합니다." },
    { icon: "⬡", title: "소장을 위한 패키징", desc: "언박싱 순간부터 특별해야 합니다. 소장 가치에 걸맞은 프리미엄 패키징을 경험하세요." },
  ];

  return (
    <section className="py-[100px] px-7" style={{ background: C.bgWarm }}>
      <div className="max-w-[1320px] mx-auto">
        <SectionTitle sub="Our Commitment" align="center">프리웍스의 약속</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((v, i) => (
            <Card key={i} hover={false} style={{ padding: 0, borderRadius: 20 }}>
              <div className="h-[120px] flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.yellow}06, #fff)`, borderRadius: "20px 20px 0 0" }}>
                <div className="text-[44px] opacity-30" style={{ color: C.black }}>{v.icon}</div>
              </div>
              <div className="p-[28px_28px_32px]">
                <h3 className="font-syne text-lg font-extrabold mb-2.5" style={{ color: C.black, letterSpacing: "-0.01em" }}>{v.title}</h3>
                <p className="font-pretendard text-sm leading-[1.8]" style={{ color: C.textMuted }}>{v.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════
// Reviews
// ═══════════════════════════════════
export function ReviewsSection() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1320px] mx-auto">
        <SectionTitle sub="Collector's Voice" align="center">컬렉터 후기</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {REVIEWS.map((r, i) => (
            <Card key={i} hover={false} style={{ padding: "28px 26px", borderRadius: 18 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-lg" style={{ background: C.yellowSoft }}>{r.avatar}</div>
                <div>
                  <div className="font-pretendard text-sm font-bold" style={{ color: C.text }}>{r.user}</div>
                  <div className="font-syne text-xs font-bold tracking-[2px]" style={{ color: C.gold }}>★★★★★</div>
                </div>
              </div>
              <p className="font-pretendard text-sm leading-[1.75] mb-3.5" style={{ color: C.textMuted }}>&ldquo;{r.text}&rdquo;</p>
              <div className="font-pretendard text-[11px] pt-3.5" style={{ color: C.textDim, borderTop: `1px solid ${C.border}` }}>{r.product}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════
// Shopping CTA
// ═══════════════════════════════════
export function ShoppingCTA({ onNavigate }: { onNavigate: (key: string) => void }) {
  return (
    <section className="py-20 px-7 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card onClick={() => onNavigate("products")} style={{ padding: 0, borderRadius: 22, boxShadow: C.shadowDeep }}>
          <div className="relative p-12 min-h-[220px] flex flex-col justify-end overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.yellow}05, #fff)`, borderRadius: 22 }}>
            <div className="absolute right-4 top-4 opacity-20" style={{ transform: "rotate(8deg)" }}>
              <AcrylicStand color={C.textDim} size={110} />
            </div>
            <div className="font-syne text-[10px] tracking-[5px] font-bold mb-3.5 relative" style={{ color: C.textDim }}>EXPLORE COLLECTION</div>
            <h3 className="font-syne text-2xl font-extrabold mb-2.5 relative leading-[1.3]" style={{ color: C.black, letterSpacing: "-0.02em" }}>컬렉션 둘러보기</h3>
            <p className="font-pretendard text-[13px] mb-[22px] relative" style={{ color: C.textMuted }}>280개 이상의 소장 가치 있는 작품을 만나보세요.</p>
            <YellowBtn onClick={() => onNavigate("products")} style={{ alignSelf: "flex-start", padding: "12px 28px", fontSize: 13, position: "relative" }}>
              컬렉션 보기
            </YellowBtn>
          </div>
        </Card>
        <Card onClick={() => onNavigate("artists")} style={{ padding: 0, borderRadius: 22, boxShadow: C.shadowDeep }}>
          <div className="relative p-12 min-h-[220px] flex flex-col justify-end overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,0,0,.02), #fff)", borderRadius: 22 }}>
            <div className="absolute right-5 top-5 opacity-20">
              <AcrylicKeyring color={C.textDim} size={95} />
            </div>
            <div className="font-syne text-[10px] tracking-[5px] font-bold mb-3.5 relative" style={{ color: C.textDim }}>MEET CREATORS</div>
            <h3 className="font-syne text-2xl font-extrabold mb-2.5 relative leading-[1.3]" style={{ color: C.black, letterSpacing: "-0.02em" }}>크리에이터를 만나보세요</h3>
            <p className="font-pretendard text-[13px] mb-[22px] relative" style={{ color: C.textMuted }}>32명의 엄선된 크리에이터, 그들의 작품 세계를 탐험하세요.</p>
            <GhostBtn onClick={() => onNavigate("artists")} style={{ alignSelf: "flex-start", padding: "12px 28px", fontSize: 13, position: "relative" }}>
              작가관 가기
            </GhostBtn>
          </div>
        </Card>
      </div>
    </section>
  );
}
