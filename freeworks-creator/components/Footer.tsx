import React from "react";
import { C } from "@/lib/constants";

export default function Footer() {
  const columns = [
    { title: "컬렉션", links: ["전체 작품", "베스트 컬렉션", "작가관"] },
    { title: "고객 지원", links: ["자주 묻는 질문", "1:1 문의", "교환/반품"] },
    { title: "정보", links: ["크리에이터 모집", "이용약관", "개인정보처리방침"] },
  ];

  return (
    <footer className="mt-10 px-7 pt-[52px] pb-9" style={{ borderTop: `1px solid ${C.border}`, background: C.bgWarm }}>
      <div className="max-w-[1320px] mx-auto flex flex-wrap gap-10 justify-between">
        {/* Brand */}
        <div className="flex-[1_1_260px]">
          <div className="flex items-center gap-2 mb-3.5">
            <div
              className="w-7 h-7 rounded-[7px] flex items-center justify-center text-xs font-extrabold font-syne"
              style={{ background: C.black, color: C.yellow }}
            >
              F
            </div>
            <span className="font-syne text-sm font-extrabold tracking-[3px]" style={{ color: C.black }}>
              FREEWORKS
            </span>
          </div>
          <p className="font-pretendard text-xs leading-[1.8]" style={{ color: C.textDim }}>
            선별된 크리에이터와 함께하는
            <br />
            크리에이터 작품 소장 플랫폼
          </p>
        </div>

        {/* Link columns */}
        {columns.map((col, i) => (
          <div key={i}>
            <div className="font-pretendard text-xs font-bold mb-3.5" style={{ color: C.textMuted }}>
              {col.title}
            </div>
            {col.links.map((link, j) => (
              <div
                key={j}
                className="font-pretendard text-xs py-[5px] cursor-pointer hover:opacity-70 transition-opacity"
                style={{ color: C.textDim }}
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        className="max-w-[1320px] mx-auto mt-9 pt-6 font-syne text-[11px] tracking-[1px]"
        style={{ borderTop: `1px solid ${C.border}`, color: C.textDim }}
      >
        © 2026 Freeworks Creator. All rights reserved.
      </div>
    </footer>
  );
}
