import { layout } from "../lib/render";
import { getPosts } from "../lib/api";
import { canonical, sanitizeSlug, cleanDescription } from "../lib/config";

export async function onRequest(context) {
  const { request } = context;

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;

  const perPage = 12;

  const posts = await getPosts();

  // ======================
  // SORT (NEWEST FIRST)
  // ======================
  const sorted = posts.reverse();

  // ======================
  // PAGINATION
  // ======================
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const current = sorted.slice(start, end);

  const totalPage = Math.ceil(sorted.length / perPage);

  // ======================
  // GRID HTML
  // ======================
  const grid = current.map(p => `
    <div class="card">
      <a href="/${sanitizeSlug(p.kategori)}/${sanitizeSlug(p.slug)}">
        <img src="/og/${sanitizeSlug(p.slug)}" alt="${p.title}" loading="lazy">
        <h3>${p.title}</h3>
      </a>
    </div>
  `).join("");

  // ======================
  // DESCRIPTION SEO
  // ======================
  const description = cleanDescription(
    "Portal artikel SEO, teknologi, dan tutorial modern Indonesia. Update artikel terbaru setiap hari."
  );

  // ======================
  // RENDER PAGE
  // ======================
  return layout({
    title: "Beranda - LebahHack",
    description,
    canonical: page > 1
      ? "/?page=" + page
      : "/",
    content: `
      <div class="hero">
        <h1>LebahHack</h1>
        <p>Artikel SEO • Teknologi • Tutorial • Insight Digital</p>
      </div>

      <h2>Artikel Terbaru</h2>

      <div class="grid">
        ${grid}
      </div>

      ${pagination(page, totalPage)}
    `
  });
}

// ======================
// PAGINATION
// ======================
function pagination(current, total) {
  if (total <= 1) return "";

  let html = `<div class="pagination">`;

  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);

  if (current > 1) {
    html += `<a href="/?page=${current - 1}">« Prev</a>`;
  }

  for (let i = start; i <= end; i++) {
    html += `
      <a href="/?page=${i}" class="${i === current ? "active" : ""}">
        ${i}
      </a>
    `;
  }

  if (current < total) {
    html += `<a href="/?page=${current + 1}">Next »</a>`;
  }

  html += `</div>`;

  return html;
}
