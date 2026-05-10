import { getPost } from "../../lib/api";
import { sanitizeSlug } from "../../lib/config";


export async function onRequest(context) {

  const { slug } = context.params;

  const safeSlug = sanitizeSlug(slug);

  const post = await getPost(safeSlug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const title = escapeHTML(post.title || "Artikel");
  const kategori = escapeHTML(post.kategori || "");

  // ======================
  // SIMPLE SVG OG IMAGE
  // ======================
  const svg = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0%" stop-color="#4f46e5"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>

    <rect width="1200" height="630" fill="url(#g)"/>

    <text x="60" y="200"
      font-size="48"
      fill="white"
      font-family="Arial"
      font-weight="bold">
      ${truncate(title, 70)} - ${escapeHTML(title)}
    </text>

    <text x="60" y="300"
      font-size="28"
      fill="#cbd5e1"
      font-family="Arial">
      ${kategori}
    </text>

    <text x="60" y="500"
      font-size="22"
      fill="#94a3b8"
      font-family="Arial">
      ${truncate(post.description || "", 100)}
    </text>

  </svg>`;

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public,max-age=86400"
    }
  });
}

// ======================
// HELPERS
// ======================
function escapeHTML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncate(str = "", len = 60) {
  return String(str).length > len
    ? String(str).slice(0, len) + "..."
    : String(str);
}
