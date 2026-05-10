import { SITE } from "./config";

// ======================
// CACHE TTL DEFAULT
// ======================
const DEFAULT_TTL = 300; // 5 menit

// ======================
// GENERATE CACHE KEY
// ======================
export function cacheKey(prefix = "page", id = "") {
  return `${prefix}:${id}`;
}

// ======================
// GET FROM CACHE (KV)
// ======================
export async function getCache(kv, key) {
  try {
    const data = await kv.get(key);
    if (!data) return null;

    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

// ======================
// SET CACHE (KV)
// ======================
export async function setCache(kv, key, value, ttl = DEFAULT_TTL) {
  try {
    await kv.put(
      key,
      JSON.stringify(value),
      {
        expirationTtl: ttl
      }
    );
  } catch (e) {
    // silent fail biar tidak ganggu request
  }
}

// ======================
// CACHE WRAPPER (SMART GET)
// ======================
export async function cached(kv, key, fetcher, ttl = DEFAULT_TTL) {

  // 1. cek cache dulu
  const cachedData = await getCache(kv, key);

  if (cachedData) {
    return cachedData;
  }

  // 2. kalau tidak ada, fetch baru
  const fresh = await fetcher();

  // 3. simpan ke cache
  await setCache(kv, key, fresh, ttl);

  return fresh;
}

// ======================
// CLEAR CACHE PATTERN
// ======================
export async function clearCache(kv, prefix = "") {
  // NOTE: KV tidak support delete all by prefix native
  // ini optional (kalau kamu nanti upgrade ke Durable Object / R2 index)
  return true;
}
