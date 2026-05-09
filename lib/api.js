import { SITE } from "./config";

// ======================
// BASE API SOURCE
// ======================
const API_BASE = SITE.api_url || "https://web.lebahhack.workers.dev";

// ======================
// FETCH WRAPPER
// ======================
async function fetchAPI(path) {
  try {
    const res = await fetch(API_BASE + path, {
      headers: {
        "content-type": "application/json"
      }
    });

    if (!res.ok) {
      console.log("API ERROR:", res.status);
      return [];
    }

    return await res.json();

  } catch (e) {
    console.log("FETCH FAIL:", e.message);
    return [];
  }
}

---

# 📦 GET ALL POSTS

export async function getPosts() {
  return await fetchAPI("/posts");
}

---

# 📄 SINGLE POST

export async function getPost(slug) {
  if (!slug) return null;

  return await fetchAPI("/post/" + slug);
}

---

# 📂 CATEGORY FILTER

export async function getByKategori(slug) {
  if (!slug) return [];

  const data = await fetchAPI("/kategori/" + slug);

  return Array.isArray(data) ? data : [];
}

---

# 🔎 SEARCH API

export async function searchPosts(q) {
  if (!q) return [];

  return await fetchAPI("/search?q=" + encodeURIComponent(q));
}

---

# ⚡ OPTIONAL: SAFE NORMALIZER

export function normalizePost(p) {
  return {
    title: p.title || "",
    slug: p.slug || "",
    kategori: p.kategori || "umum",
    content: p.content || "",
    image: p.image || ""
  };
}
