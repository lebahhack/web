import { getPost } from "../../lib/api";
import { sanitizeSlug } from "../../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const safeSlug = sanitizeSlug(decodeURIComponent(slug));

  let post = await getPost(safeSlug);

  // ======================
  // NORMALIZE API RESPONSE
  // ======================
  post = post?.data || post?.post || post || {};

  if (!post || !post.title) {
    return new Response("Not found", { status: 404 });
  }

  const title = escapeHTML(post.title);
  const kategori = escapeHTML(post.kategori || "Blog");

  const description =
    post.meta_description ||
    post.content ||
    "";

  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#g)"/>

  <!-- TITLE -->
  <text x="60" y="200"
    font-size="52"
    fill="white"
    font-family="Arial"
    font-weight="bold">
    ${truncate(title, 60)}
  </text>

  <!-- CATEGORY -->
  <text x="60" y="280"
    font-size="28"
    fill="#cbd5e1"
    font-family="Arial">
    ${kategori}
  </text>

  <!-- DESCRIPTION -->
  <text x="60" y="420"
    font-size="22"
    fill="#94a3b8"
    font-family="Arial">
    ${truncate(description, 120)}
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
