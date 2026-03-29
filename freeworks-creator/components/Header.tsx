"use client";

import React, { useState, useEffect } from "react";
import { C, NAV_ITEMS } from "@/lib/constants";

const regularNav = NAV_ITEMS.filter((i) => i.key !== "apply");

export default function Header({
  page,
  onNavigate,
}: {
  page: string;
  onNavigate: (key: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);
  const [applyHover, setApplyHover] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
      style={{
        background: scrolled ? "rgba(248,246,241,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-7 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <div
          onClick={() => onNavigate("home")}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base font-extrabold font-syne"
            style={{ background: C.black, color: C.yellow }}
          >
            F
          </div>
          <div>
            <div className="font-syne text-sm font-extrabold tracking-[3px] leading-none" style={{ color: C.black }}>
              FREEWORKS
            </div>
            <div className="font-syne text-[7px] tracking-[5px] mt-0.5 font-semibold" style={{ color: C.textDim }}>
              CREATOR
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-0.5 items-center">
          {regularNav.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="font-pretendard text-[13px] px-[18px] py-2 rounded-lg border-none cursor-pointer transition-all duration-300"
              style={{
                background: page === item.key ? C.yellowSoft : "transparent",
                color: page === item.key ? C.black : C.textMuted,
                fontWeight: page === item.key ? 700 : 500,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right: CTA + Login */}
        <div className="flex items-center gap-3">
          <button
            className="hidden md:block rounded-full border-none cursor-pointer transition-all duration-300 font-pretendard text-xs font-bold tracking-wide"
            onClick={() => onNavigate("apply")}
            onMouseEnter={() => setApplyHover(true)}
            onMouseLeave={() => setApplyHover(false)}
            style={{
              background: applyHover ? C.yellowHover : C.yellow,
              padding: "9px 22px",
              color: C.black,
              boxShadow: applyHover
                ? `0 6px 20px ${C.yellowGlow}, 0 2px 8px rgba(242,200,15,0.15)`
                : "0 2px 10px rgba(242,200,15,0.12)",
              transform: applyHover ? "translateY(-1px)" : "none",
            }}
          >
            크리에이터 모집
          </button>
          <button
            className="hidden md:block rounded-lg border-none px-[22px] py-[9px] text-white text-xs font-semibold font-pretendard cursor-pointer"
            style={{ background: C.black }}
          >
            로그인
          </button>
          <button
            className="md:hidden bg-transparent border-none text-2xl cursor-pointer"
            onClick={() => setMOpen(!mOpen)}
            style={{ color: C.black }}
          >
            {mOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mOpen && (
        <div
          className="absolute top-[72px] left-0 right-0 px-7 pb-5 pt-3"
          style={{
            background: "rgba(248,246,241,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          {regularNav.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key);
                setMOpen(false);
              }}
              className="block w-full text-left bg-transparent border-none py-3.5 font-pretendard text-base cursor-pointer"
              style={{
                color: page === item.key ? C.black : C.textMuted,
                fontWeight: page === item.key ? 700 : 400,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate("apply");
              setMOpen(false);
            }}
            className="block w-full mt-4 py-3.5 rounded-xl border-none font-pretendard text-[15px] font-bold cursor-pointer tracking-wide"
            style={{
              background: C.yellow,
              color: C.black,
              boxShadow: `0 2px 12px ${C.yellowGlow}`,
            }}
          >
            크리에이터 모집
          </button>
        </div>
      )}
    </header>
  );
}
