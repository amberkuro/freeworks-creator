"use client";

import React, { useState, useEffect, useRef } from "react";
import { C, PRODUCTS, ARTISTS } from "@/lib/constants";
import { ProductSVG, AcrylicStand, AcrylicKeyring } from "@/components/svg/ProductSVGs";
import { YellowBtn, GhostBtn, TierBadge, Glow } from "@/components/ui/SharedUI";

// ─── Floating Card Wrapper ───
function FloatingCard({
  children,
  top,
  left,
  delay,
  px,
  mousePos,
  anim,
  z,
  loaded,
}: {
  children: React.ReactNode;
  top: string;
  left: string;
  delay: number;
  px: number;
  mousePos: { x: number; y: number };
  anim: string;
  z: number;
  loaded: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const mx = mousePos.x * px;
  const my = mousePos.y * px;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="absolute rounded-2xl"
      style={{
        top,
        left,
        zIndex: z,
        opacity: loaded ? 1 : 0,
        transform: `translate(${mx}px, ${my}px) ${hovered ? "scale(1.05)" : "scale(1)"}`,
        transition: hovered
          ? "transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease, box-shadow 0.35s ease"
          : `transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        animation: loaded ? `${anim} ease-in-out infinite` : "none",
        animationDelay: `${delay * 0.4}s`,
        boxShadow: hovered
          ? "0 24px 56px rgba(0,0,0,0.12)"
          : "0 10px 32px rgba(0,0,0,0.05)",
      }}
    >
      {children}
    </div>
  );
}

// ─── Mini Product Card ───
function MiniProductCard({ product, size = "md" }: { product: typeof PRODUCTS[0]; size?: "lg" | "md" | "sm" }) {
  const s =
    size === "lg"
      ? { w: 200, h: 260, sv: 115, fs: 13, pf: 15 }
      : size === "md"
      ? { w: 168, h: 218, sv: 95, fs: 11, pf: 13 }
      : { w: 136, h: 178, sv: 75, fs: 10, pf: 12 };

  return (
    <div
      className="overflow-hidden"
      style={{
        width: s.w,
        background: "rgba(255,255,255,.85)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
      }}
    >
      <div
        className="flex items-center justify-center relative"
        style={{
          height: s.h * 0.56,
          background: `linear-gradient(160deg, ${product.color}0d, rgba(255,255,255,.4))`,
        }}
      >
        <ProductSVG type={product.type} color={product.color} size={s.sv} />
        {product.tag && (
          <span
            className="absolute top-2 left-2 font-syne font-bold"
            style={{
              padding: "2px 8px",
              borderRadius: 5,
              background: C.yellowSoft,
              fontSize: 8,
              letterSpacing: 1.5,
              color: C.black,
            }}
          >
            {product.tag}
          </span>
        )}
      </div>
      <div style={{ padding: `10px ${s.w * 0.07}px 14px` }}>
        <div
          className="font-pretendard font-semibold line-clamp-2"
          style={{ fontSize: s.fs, color: C.text, lineHeight: 1.35, marginBottom: 3 }}
        >
          {product.name}
        </div>
        <div className="font-pretendard" style={{ fontSize: s.fs - 2, color: C.textDim, marginBottom: 6 }}>
          {product.artist}
        </div>
        <div className="font-num font-bold" style={{ fontSize: s.pf, color: C.black, letterSpacing: "0.01em" }}>
          ₩{product.price.toLocaleString()}
        </div>
      </div>
    </div>
  );
}

// ─── Mini Artist Card ───
function MiniArtistCard({ artist }: { artist: typeof ARTISTS[0] }) {
  return (
    <div
      style={{
        width: 178,
        background: "rgba(255,255,255,.85)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "18px 16px",
      }}
    >
      <div className="flex items-center gap-2.5 mb-2.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ background: `linear-gradient(135deg, ${artist.color}40, ${artist.color}18)` }}
        >
          {artist.avatar}
        </div>
        <div>
          <div className="font-pretendard text-[13px] font-bold" style={{ color: C.text }}>{artist.name}</div>
          <div className="font-syne text-[8px] tracking-[2px] font-semibold" style={{ color: C.textDim }}>{artist.nameEn}</div>
        </div>
      </div>
      <div className="font-pretendard text-[11px] mb-2.5" style={{ color: C.textMuted, lineHeight: 1.5 }}>
        &ldquo;{artist.tagline}&rdquo;
      </div>
      <div className="flex gap-3.5 items-center">
        <div>
          <div className="font-num text-[13px] font-bold" style={{ color: C.black }}>{(artist.followers / 1000).toFixed(1)}k</div>
          <div className="font-pretendard text-[9px]" style={{ color: C.textDim }}>팔로워</div>
        </div>
        <div>
          <div className="font-num text-[13px] font-bold" style={{ color: C.black }}>{artist.products}</div>
          <div className="font-pretendard text-[9px]" style={{ color: C.textDim }}>상품</div>
        </div>
        <div className="ml-auto">
          <TierBadge tier={artist.tier} />
        </div>
      </div>
    </div>
  );
}

// ─── Acrylic Frame ───
function AcrylicFrame({ color, type, size }: { color: string; type: string; size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-2xl"
      style={{
        width: size * 1.1,
        height: size * 1.3,
        background: "rgba(255,255,255,.5)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,.55)",
      }}
    >
      <ProductSVG type={type} color={color} size={size} />
    </div>
  );
}

// ─── Hero Section ───
export default function Hero({ onNavigate }: { onNavigate: (key: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  const [mp, setMp] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);
  const raf = useRef<number>(0);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setTimeout(() => setLoaded(true), 250);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      target.current = {
        x: (e.clientX - r.left - r.width / 2) / (r.width / 2),
        y: (e.clientY - r.top - r.height / 2) / (r.height / 2),
      };
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      cur.current.x += (target.current.x - cur.current.x) * 0.05;
      cur.current.y += (target.current.y - cur.current.y) * 0.05;
      setMp({ x: cur.current.x, y: cur.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const items = [
    { id: "p1", top: "2%", left: "8%", z: 5, px: 10, delay: 0.1, anim: "cf1 7s", content: <MiniProductCard product={PRODUCTS[0]} size="lg" /> },
    { id: "a1", top: "0%", left: "52%", z: 4, px: -7, delay: 0.3, anim: "cf2 9s", content: <MiniArtistCard artist={ARTISTS[0]} /> },
    { id: "p2", top: "50%", left: "56%", z: 3, px: 14, delay: 0.5, anim: "cf3 8s", content: <MiniProductCard product={PRODUCTS[2]} size="sm" /> },
    { id: "ac1", top: "62%", left: "2%", z: 2, px: -9, delay: 0.7, anim: "cf4 10s", content: <AcrylicFrame color="#a0b8d4" type="keyring" size={70} /> },
    { id: "p3", top: "32%", left: "-2%", z: 1, px: -5, delay: 0.9, anim: "cf5 11s", content: <MiniProductCard product={PRODUCTS[3]} size="sm" /> },
    { id: "ac2", top: "36%", left: "78%", z: 2, px: 16, delay: 0.6, anim: "cf2 8.5s", content: <AcrylicFrame color="#d4a8b8" type="stand" size={60} /> },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden flex items-center" style={{ padding: "88px 28px 32px" }}>
      {/* Ambient gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 50% 40% at 75% 50%, ${C.yellow}06, transparent 70%)` }}
      />

      <div className="max-w-[1320px] mx-auto w-full relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-9">
        {/* Left: Text */}
        <div
          className="md:text-left text-center"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg mb-5" style={{ background: C.yellowSoft }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{ background: C.yellow }} />
            <span className="font-syne text-[10px] tracking-[4px] font-bold" style={{ color: C.black }}>
              CURATED CREATOR COLLECTION
            </span>
          </div>

          <h1
            className="font-syne font-extrabold leading-[1.08] mb-[18px]"
            style={{ fontSize: "clamp(36px, 5.5vw, 62px)", color: C.black, letterSpacing: "-0.03em" }}
          >
            크리에이터의 작품을
            <br />
            <span style={{ color: C.yellow, textShadow: "0 2px 20px rgba(242,200,15,0.2)" }}>소장하다.</span>
          </h1>

          <p
            className="font-pretendard mb-8 md:mx-0 mx-auto"
            style={{ fontSize: "clamp(15px, 1.8vw, 17px)", color: C.textMuted, lineHeight: 1.8, maxWidth: 440 }}
          >
            일상의 굿즈가 아닌, 소장 가치 있는 작품을 만나보세요.
            <br />
            엄선된 크리에이터의 세계를, 하나의 컬렉션으로.
          </p>

          <div className="flex gap-3.5 flex-wrap mb-9 md:justify-start justify-center flex-col md:flex-row items-center">
            <YellowBtn onClick={() => onNavigate("products")} className="w-full md:w-auto max-w-[320px]">
              컬렉션 둘러보기
            </YellowBtn>
            <GhostBtn onClick={() => onNavigate("artists")} className="w-full md:w-auto max-w-[320px]">
              크리에이터 보기
            </GhostBtn>
          </div>

          <div className="flex gap-10 md:justify-start justify-center flex-wrap">
            {[
              { n: "32", l: "엄선된 크리에이터" },
              { n: "280+", l: "소장 작품" },
              { n: "100%", l: "직접 검수" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="font-num text-[30px] font-bold" style={{ color: C.black }}>
                  {s.n}
                </div>
                <div className="font-pretendard text-xs mt-1 font-medium" style={{ color: C.textDim }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Floating Cards */}
        <div className="relative min-h-[420px] md:scale-100 scale-[0.6] origin-top mt-2 md:mt-0">
          <Glow color={C.yellow} top="30%" left="30%" size={300} opacity={0.04} />
          {items.map((it) => (
            <FloatingCard
              key={it.id}
              top={it.top}
              left={it.left}
              delay={it.delay}
              px={it.px}
              mousePos={mp}
              anim={it.anim}
              z={it.z}
              loaded={loaded}
            >
              {it.content}
            </FloatingCard>
          ))}
        </div>
      </div>
    </section>
  );
}
