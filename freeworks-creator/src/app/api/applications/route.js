import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getCurrentUser, isAdmin } from "@/lib/auth";

/**
 * POST /api/applications — 크리에이터 신청 (공개)
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { artist_name, email, instagram, twitter, product_category, product_description, portfolio_files, agreements } = body;

    if (!artist_name || !email || !product_category || !product_description) {
      return NextResponse.json({ error: "필수 항목을 입력해 주세요." }, { status: 400 });
    }

    if (!instagram && !twitter) {
      return NextResponse.json({ error: "SNS 계정을 1개 이상 입력해 주세요." }, { status: 400 });
    }

    // portfolio_files 배열 → URL 문자열 (JSON)
    const portfolioUrls = portfolio_files && portfolio_files.length > 0
      ? JSON.stringify(portfolio_files)
      : null;

    const supabase = getSupabase();

    if (!supabase) {
      // 개발 모드: 콘솔에만 출력
      console.log("📋 [개발모드] 신청 데이터:", { artist_name, email, instagram, twitter, product_category, product_description, portfolioUrls });
      return NextResponse.json({ success: true, dev: true, id: Date.now() });
    }

    const row = {
      name: artist_name,
      email,
      instagram: instagram || null,
      twitter: twitter || null,
      category: product_category,
      description: product_description,
      portfolio_urls: portfolioUrls,
      status: "pending",
    };

    const { data, error } = await supabase.from("applications").insert(row);

    if (error) {
      console.error("[Supabase insert 에러]", error);
      return NextResponse.json({ error: "신청 저장에 실패했습니다." }, { status: 500 });
    }

    console.log("✅ 신청 저장 완료:", data);
    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("[신청 API 에러]", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

/**
 * GET /api/applications — 신청 목록 조회 (관리자 전용)
 */
export async function GET(request) {
  try {
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const supabase = getSupabase();

    if (!supabase) {
      // 개발 모드: mock 데이터 반환
      const { MOCK_APPS } = await import("@/lib/mock-data");
      return NextResponse.json({ data: MOCK_APPS, dev: true });
    }

    const { data, error } = await supabase.from("applications").select("*", {
      order: "created_at.desc",
    });

    if (error) {
      console.error("[Supabase select 에러]", error);
      return NextResponse.json({ error: "데이터 조회에 실패했습니다." }, { status: 500 });
    }

    // DB 컬럼 → 프론트 형식 변환
    const apps = (data || []).map((row) => ({
      id: String(row.id),
      artist_name: row.name || "",
      email: row.email || "",
      instagram: row.instagram || "",
      twitter: row.twitter || "",
      product_category: row.category || "",
      product_description: row.description || "",
      status: row.status || "pending",
      created_at: row.created_at ? new Date(row.created_at).toLocaleDateString("ko-KR") : "",
      portfolio_files: parsePortfolioUrls(row.portfolio_urls),
      // 관리자 전용 필드
      isVipCreator: row.vip || false,
      adminMemo: row.vip_icon || "",
      // 배송 관련
      shipping: row.shipping_name ? {
        recipient: row.shipping_name,
        phone: row.shipping_phone || "",
        zipcode: row.shipping_zipcode || "",
        address: row.shipping_address1 || "",
        address_detail: row.shipping_address2 || "",
      } : null,
      promo_online_status: row.promo_online_status || null,
      promo_event_status: row.promo_event_status || null,
    }));

    return NextResponse.json({ data: apps });
  } catch (err) {
    console.error("[신청 목록 API 에러]", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

/**
 * PATCH /api/applications — 신청 상태 변경 (관리자 전용)
 */
export async function PATCH(request) {
  try {
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
      return NextResponse.json({ error: "권한이 없습니다." }, { status: 403 });
    }

    const body = await request.json();
    const { id, updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID가 필요합니다." }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ success: true, dev: true });
    }

    // 프론트 필드 → DB 컬럼 변환
    const dbUpdates = {};
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.isVipCreator !== undefined) dbUpdates.vip = updates.isVipCreator;
    if (updates.adminMemo !== undefined) dbUpdates.vip_icon = updates.adminMemo;

    const { data, error } = await supabase.from("applications").update(dbUpdates, {
      eq: { id: Number(id) },
    });

    if (error) {
      console.error("[Supabase update 에러]", error);
      return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[신청 수정 API 에러]", err);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}

function parsePortfolioUrls(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    // 쉼표 구분 URL 문자열
    return raw.split(",").map((url) => ({
      name: url.trim().split("/").pop() || "file",
      url: url.trim(),
      type: guessType(url.trim()),
    }));
  }
}

function guessType(url) {
  const ext = url.split(".").pop().toLowerCase();
  const map = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", pdf: "application/pdf", svg: "image/svg+xml" };
  return map[ext] || "application/octet-stream";
}
