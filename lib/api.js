import { SITE } from "./config";

const API_BASE = SITE.api_url || "";

// ======================
// CORE FETCH WRAPPER
// ======================
async function fetchAPI(path) {
  try {
    if (!API_BASE) {
      console.log("[API] BASE URL kosong");
      return null;
    }

    const res = await fetch(API_BASE + path);

    if (!res.ok) {
      console.log("[API ERROR]", path, res.status);
      return null;
    }

    return await res.json();

  } catch (e) {
    console.log("[FETCH ERROR]", path, e.message);
    return null;
  }
}

// ======================
// GET ALL POSTS
// ======================
export async function getPosts() {
  const data = await fetchAPI("/posts");
  return Array.isArray(data) ? data : [];
}

// ======================
// GET SINGLE POST
// ======================
export async function getPost(slug) {
  if (!slug) return null;

  const data = await fetchAPI("/post/" + encodeURIComponent(slug));
  return data || null;
}

// ======================
// GET CATEGORY
// ======================
export async function getByKategori(slug) {
  if (!slug) return [];

  const data = await fetchAPI("/kategori/" + encodeURIComponent(slug));
  return Array.isArray(data) ? data : [];
}

// ======================
// SEARCH POSTS
// ======================
export async function searchPosts(q) {
  if (!q) return [];

  const data = await fetchAPI("/search?q=" + encodeURIComponent(q));
  return Array.isArray(data) ? data : [];
}

function normalizePost(post) {
  return post?.data?.post ||
         post?.data ||
         post?.post ||
         post ||
         {};
}
