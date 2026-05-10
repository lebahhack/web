import { layout } from "../lib/render";
import { getPosts } from "../lib/api";
import { SITE } from "../lib/config";
import { sanitizeSlug } from "../lib/config";

// ======================
// HOMEPAGE
// ======================
export async function onRequest(context) {
  try {

    const url = new URL(context.request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;

    const posts = await getPosts();

    // ======================
    // PAGINATION CONFIG
    // ======================
    const perPage = 12;
    const totalPage = Math.ceil(posts.length / perPage);

    const start = (page - 1) * perPage;
    const currentPosts = posts.slice(start, start + perPage);

    // ======================
    // GRID POSTS
    // ======================
    const grid = currentPosts.map(post => {
      const slug = sanitizeSlug(post.slug);

      const img = post.image || SITE.domain + "/og/default.jpg";

      return `
      <div class="card">
        <a href="/${slug}">
          <img loading="lazy" src="${img}" alt="${escapeHTML(post.title)}">
          <h3>${escapeHTML(post.title)}</h3>
        </a>
      </div>
      `;
    }).join("");

    // ======================
    // HOMEPAGE SEO
    // ======================
    const title = SITE.name;
    const description = SITE.description;

    const canonical = page > 1
      ? "/?page=" + page
      : "/";

    const image = SITE.domain + "/og/home.jpg";

    const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${SITE.name}",
  "url": "${SITE.domain}",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "${SITE.domain}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>`;

    // ======================
    // CONTENT HOMEPAGE
    // ======================
    const content = `
<div class="hero">
  <h1>${SITE.name}</h1>
  <p>${SITE.description}</p>
</div>

<h2>Artikel Terbaru</h2>

<div class="grid">
  ${grid}
</div>

${pagination(page, totalPage)}
`;

    // ======================
    // RENDER
    // ======================
    return layout({
      title,
      description,
      canonical,
      image,
      schema,
      content
    });

  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}

// ======================
// PAGINATION
// ======================
function pagination(current, total) {
  if (total <= 1) return "";

  let html = `<div class="pagination">`;

  const group = Math.floor((current - 1) / 5);
  const start = group * 5 + 1;
  const end = Math.min(start + 4, total);

  if (start > 1) {
    html += `<a href="/?page=${start - 1}">«</a>`;
  }

  for (let i = start; i <= end; i++) {
    html += `<a href="/?page=${i}" class="${i === current ? "active" : ""}">${i}</a>`;
  }

  if (end < total) {
    html += `<a href="/?page=${end + 1}">»</a>`;
  }

  html += `</div>`;
  return html;
}

// ======================
// SAFE HTML
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
