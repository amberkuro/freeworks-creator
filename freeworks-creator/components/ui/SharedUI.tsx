"use client";

import React, { useState, ReactNode, CSSProperties } from "react";
import { C, TIER_CONFIG, TierType } from "@/lib/constants";

// ─── Glass Card ───
export function Card({
  children,
  hover = true,
  onClick,
  className = "",
  style,
}: {
  children: ReactNode;
  hover?: boolean;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      className={`glass-card ${hover ? "glass-card-hover" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// ─── Yellow CTA Button ───
export function YellowBtn({
  children,
  onClick,
  full,
  className = "",
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className={`btn-yellow ${className}`}
      style={{
        padding: "16px 40px",
        borderRadius: 12,
        border: "none",
        background: C.yellow,
        color: C.black,
        fontFamily: "'Pretendard', sans-serif",
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: `0 4px 20px ${C.yellowGlow}`,
        transition: "all 0.3s ease",
        width: full ? "100%" : "auto",
        letterSpacing: "0.02em",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Ghost Button ───
export function GhostBtn({
  children,
  onClick,
  full,
  className = "",
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  full?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className={`btn-ghost ${className}`}
      style={{
        padding: "16px 40px",
        borderRadius: 12,
        border: `1.5px solid ${C.black}`,
        background: "transparent",
        color: C.black,
        fontFamily: "'Pretendard', sans-serif",
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: full ? "100%" : "auto",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ─── Section Title ───
export function SectionTitle({
  sub,
  children,
  align = "left",
}: {
  sub: string;
  children: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className="mb-12" style={{ textAlign: align }}>
      <div className="section-sub mb-2.5">{sub}</div>
      <h2
        className="section-heading"
        style={{ fontSize: "clamp(26px, 3.5vw, 40px)", margin: 0 }}
      >
        {children}
      </h2>
    </div>
  );
}

// ─── Tier Badge ───
export function TierBadge({ tier }: { tier: TierType }) {
  const t = TIER_CONFIG[tier];
  return (
    <span
      className="font-syne"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        fontSize: 9,
        padding: "3px 9px",
        borderRadius: 20,
        background: t.bg,
        color: t.color,
        fontWeight: 700,
        letterSpacing: 2,
        border: `1px solid ${t.color}15`,
      }}
    >
      {t.label}
    </span>
  );
}

// ─── Ambient Glow ───
export function Glow({
  color,
  top,
  left,
  size = 200,
  opacity = 0.08,
}: {
  color: string;
  top: string;
  left: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: "blur(50px)",
      }}
    />
  );
}
