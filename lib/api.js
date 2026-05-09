import { SITE } from "./config";

// ======================
// BASE API
// ======================
const API_BASE = SITE.api_url || "";

// ======================
// SAFE FETCH
// ======================
async function fetchAPI(path) {
  try {

    if (!API_BASE) {
      console.log("API BASE NOT SET");
      return [];
    }

    const res = await fetch(API_BASE + path);

    if (!res.ok) {
      console.log("API ERROR:", res.status);
      return [];
    }

    return await res.json();

  } catch (e) {
    console.log("FETCH ERROR:", e.message);
    return [];
  }
}

---

# 📄 GET POSTS

export async function getPosts() {
  return await fetchAPI("/posts");
}

---

# 📄 GET SINGLE POST

export async function getPost(slug) {
  if (!slug) return null;
  return await fetchAPI("/post/" + slug);
}

---

# 📂 CATEGORY

export async function getByKategori(slug) {
  if (!slug) return [];
  return await fetchAPI("/kategori/" + slug);
}

---

# 🔎 SEARCH

export async function searchPosts(q) {
  if (!q) return [];
  return await fetchAPI("/search?q=" + encodeURIComponent(q));
}
