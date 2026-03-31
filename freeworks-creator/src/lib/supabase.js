/**
 * Supabase 클라이언트 (fetch 기반, SDK 불필요)
 *
 * 브라우저: NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
 * 서버: 위 + SUPABASE_SERVICE_ROLE_KEY (있으면 RLS 우회)
 */

// ─── 브라우저용 (신청 insert 등 공개 작업) ───
export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "";
}

export function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

// ─── 서버용 (관리자 조회/수정) ───
export function getServerKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
}

/**
 * Supabase REST API 호출 헬퍼 (서버용)
 */
export async function supabaseQuery(method, table, options = {}) {
  const url = getSupabaseUrl();
  const key = getServerKey();

  if (!url || !key) {
    console.error("[Supabase] 환경변수 미설정 — URL:", !!url, "KEY:", !!key);
    return { data: null, error: { message: "Supabase 환경변수가 설정되지 않았습니다." } };
  }

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  let endpoint = `${url}/rest/v1/${table}`;

  // SELECT
  if (method === "GET") {
    const params = new URLSearchParams();
    if (options.select) params.set("select", options.select);
    if (options.order) params.set("order", options.order);
    if (options.eq) {
      for (const [col, val] of Object.entries(options.eq)) {
        params.set(col, `eq.${val}`);
      }
    }
    endpoint += `?${params.toString()}`;
  }

  // UPDATE — eq 조건 필수
  if (method === "PATCH" && options.eq) {
    const params = Object.entries(options.eq).map(([c, v]) => `${c}=eq.${v}`).join("&");
    endpoint += `?${params}`;
  }

  try {
    const res = await fetch(endpoint, {
      method,
      headers,
      cache: "no-store",
      ...(options.body ? { body: JSON.stringify(options.body) } : {}),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error(`[Supabase ${method} 에러] ${res.status}:`, text);
      return { data: null, error: { message: text, status: res.status } };
    }

    const data = text ? JSON.parse(text) : null;
    return { data, error: null };
  } catch (err) {
    console.error(`[Supabase ${method} 예외]`, err.message);
    return { data: null, error: { message: err.message } };
  }
}

export const STORAGE_BUCKET = "portfolios";
