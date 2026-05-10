import { layout } from "../../lib/render";
import { getByKategori } from "../../lib/api";
import { canonical, sanitizeSlug, cleanDescription } from "../../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const safeSlug = sanitizeSlug(slug);

  const url = new URL(context.request.url);
  const page = parseInt(url.searchParams.get("page")) || 1;

  const perPage = 12;

  // ======================
  // DATA
  // ======================
  const posts = await getByKategori(safeSlug);

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
  // SEO DESCRIPTION
  // ======================
  const description = cleanDescription(
    `Kumpulan artikel kategori ${safeSlug}. Update tutorial, tips, dan insight terbaru dalam topik ini.`
  );

  // ======================
  // RENDER
  // ======================
  return layout({
    title: `Kategori: ${safeSlug} - LebahHack`,
    description,
    canonical: page > 1
      ? `/kategori/${safeSlug}?page=${page}`
      : `/kategori/${safeSlug}`,
    content: `
      <h1>Kategori: ${safeSlug}</h1>

      <p style="color:#666">
        Semua artikel dalam kategori ini
      </p>

      <div class="grid">
        ${grid}
      </div>

      ${pagination(page, totalPage, safeSlug)}
    `
  });
}

// ======================
// PAGINATION
// ======================
function pagination(current, total, slug) {
  if (total <= 1) return "";

  let html = `<div class="pagination">`;

  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);

  if (current > 1) {
    html += `<a href="/kategori/${slug}?page=${current - 1}">« Prev</a>`;
  }

  for (let i = start; i <= end; i++) {
    html += `
      <a href="/kategori/${slug}?page=${i}" class="${i === current ? "active" : ""}">
        ${i}
      </a>
    `;
  }

  if (current < total) {
    html += `<a href="/kategori/${slug}?page=${current + 1}">Next »</a>`;
  }

  html += `</div>`;

  return html;
}
