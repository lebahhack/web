import { SITE } from "./config";

// ======================
// BASE SOURCE (Google Sheets CSV / endpoint)
// ======================

// kamu bisa ganti ini ke Google Sheets CSV publish link
const DATA_SOURCE = SITE.data_url || "https://example.com/data.csv";

// ======================
// FETCH RAW DATA
// ======================
async function fetchCSV() {
  try {
    const res = await fetch(DATA_SOURCE);
    const text = await res.text();
    return parseCSV(text);
  } catch (e) {
    return [];
  }
}

// ======================
// SIMPLE CSV PARSER
// ======================
function parseCSV(csv = "") {
  const lines = csv.split("\n").filter(Boolean);

  const headers = lines[0]?.split(",") || [];

  return lines.slice(1).map(line => {
    const values = line.split(",");

    let obj = {};

    headers.forEach((h, i) => {
      obj[h.trim()] = (values[i] || "").trim();
    });

    return obj;
  });
}

// ======================
// GET ALL POSTS
// ======================
export async function getPosts() {
  const data = await fetchCSV();

  return data.map(p => ({
    title: p.title,
    slug: p.slug,
    kategori: p.kategori,
    content: p.content || "",
    date: p.date || "",
    image: p.image || ""
  }));
}

// ======================
// GET SINGLE POST
// ======================
export async function getPost(slug = "") {
  const posts = await getPosts();

  return posts.find(p => p.slug === slug) || null;
}

// ======================
// FILTER BY CATEGORY
// ======================
export async function getByKategori(kategori = "") {
  const posts = await getPosts();

  return posts.filter(
    p => (p.kategori || "").toLowerCase() === kategori.toLowerCase()
  );
}

// ======================
// SEARCH SIMPLE (TITLE + CONTENT)
// ======================
export async function searchPosts(keyword = "") {
  const posts = await getPosts();

  const q = keyword.toLowerCase();

  return posts.filter(p =>
    (p.title || "").toLowerCase().includes(q) ||
    (p.content || "").toLowerCase().includes(q)
  );
}
