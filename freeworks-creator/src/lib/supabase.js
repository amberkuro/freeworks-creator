/**
 * Supabase 서버 클라이언트
 * - Storage: 파일 업로드 (로컬 fallback API용)
 * - DB: PostgREST API로 테이블 CRUD
 *
 * 환경변수:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY (서버 전용, 모든 테이블 접근)
 */

let instance = null;

export function getSupabase() {
  if (instance) return instance;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.log("[Supabase] 환경변수 없음 — 개발 모드");
    return null;
  }

  instance = {
    url,
    key,

    // ─── Storage ───
    storage: {
      from: (bucket) => ({
        upload: async (path, file, options) => {
          const res = await fetch(`${url}/storage/v1/object/${bucket}/${path}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              ...(options?.contentType ? { "Content-Type": options.contentType } : {}),
            },
            body: file,
          });
          if (!res.ok) {
            const err = await res.json();
            return { data: null, error: err };
          }
          return { data: { path }, error: null };
        },
        getPublicUrl: (path) => ({
          data: { publicUrl: `${url}/storage/v1/object/public/${bucket}/${path}` },
        }),
      }),
    },

    // ─── DB (PostgREST) ───
    from: (table) => {
      const headers = {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      };

      return {
        // SELECT
        select: async (columns = "*", options = {}) => {
          let queryUrl = `${url}/rest/v1/${table}?select=${columns}`;
          if (options.eq) {
            for (const [col, val] of Object.entries(options.eq)) {
              queryUrl += `&${col}=eq.${val}`;
            }
          }
          if (options.order) {
            queryUrl += `&order=${options.order}`;
          }
          if (options.limit) {
            queryUrl += `&limit=${options.limit}`;
          }
          try {
            const res = await fetch(queryUrl, { headers, cache: "no-store" });
            if (!res.ok) {
              const err = await res.json();
              return { data: null, error: err };
            }
            const data = await res.json();
            return { data, error: null };
          } catch (err) {
            return { data: null, error: { message: err.message } };
          }
        },

        // INSERT
        insert: async (row) => {
          try {
            const res = await fetch(`${url}/rest/v1/${table}`, {
              method: "POST",
              headers,
              body: JSON.stringify(row),
            });
            if (!res.ok) {
              const err = await res.json();
              return { data: null, error: err };
            }
            const data = await res.json();
            return { data: Array.isArray(data) ? data[0] : data, error: null };
          } catch (err) {
            return { data: null, error: { message: err.message } };
          }
        },

        // UPDATE
        update: async (updates, options = {}) => {
          let queryUrl = `${url}/rest/v1/${table}`;
          if (options.eq) {
            const params = Object.entries(options.eq)
              .map(([col, val]) => `${col}=eq.${val}`)
              .join("&");
            queryUrl += `?${params}`;
          }
          try {
            const res = await fetch(queryUrl, {
              method: "PATCH",
              headers,
              body: JSON.stringify(updates),
            });
            if (!res.ok) {
              const err = await res.json();
              return { data: null, error: err };
            }
            const data = await res.json();
            return { data: Array.isArray(data) ? data[0] : data, error: null };
          } catch (err) {
            return { data: null, error: { message: err.message } };
          }
        },
      };
    },
  };

  return instance;
}

export const STORAGE_BUCKET = "portfolios";
