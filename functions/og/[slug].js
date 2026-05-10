import { SITE, sanitizeSlug } from "../../lib/config";
import { getPost } from "../../lib/api";

export async function onRequest(context) {
  try {
    let { slug } = context.params;

    // ======================
    // SANITIZE SLUG
    // ======================
    const cleanSlug = sanitizeSlug(slug);

    // ======================
    // FETCH POST
    // ======================
    let post = null;
    try {
      post = await getPost(cleanSlug);
    } catch {}

    const title =
      post?.title ||
      formatSlug(cleanSlug) ||
      "Artikel";

    const kategori =
      post?.kategori || "Blog";

    // ======================
    // SVG OG IMAGE
    // ======================
    const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">

  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>

    <filter id="blur">
      <feGaussianBlur stdDeviation="80"/>
    </filter>
  </defs>

  <!-- BACKGROUND -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- LIGHT EFFECT -->
  <circle cx="1000" cy="120" r="260"
    fill="#4f46e5" opacity="0.25" filter="url(#blur)"/>

  <circle cx="200" cy="550" r="200"
    fill="#22d3ee" opacity="0.15" filter="url(#blur)"/>

  <!-- CARD -->
  <rect x="50" y="50" width="1100" height="530" rx="24"
    fill="rgba(255,255,255,0.05)"
    stroke="rgba(255,255,255,0.1)"/>

  <!-- CATEGORY -->
  <rect x="100" y="120" rx="10" width="220" height="45"
    fill="#4f46e5"/>

  <text x="130" y="150"
    fill="white"
    font-size="20"
    font-family="sans-serif">
    ${escapeXML(kategori)}
  </text>

  <!-- TITLE -->
  <text x="100" y="270"
    fill="white"
    font-size="58"
    font-weight="bold"
    font-family="sans-serif">
    ${escapeXML(title)}
  </text>

  <!-- LINE -->
  <rect x="100" y="340" width="300" height="4"
    fill="url(#accent)"/>

  <!-- FOOTER -->
  <text x="100" y="500"
    fill="#94a3b8"
    font-size="22">
    ${SITE.domain}
  </text>

  <text x="900" y="560"
    fill="#94a3b8"
    font-size="18">
    ⚡ ${SITE.name}
  </text>

</svg>
`;

    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400"
      }
    });

  } catch (err) {
    return new Response("OG Error: " + err.message, { status: 500 });
  }
}

// ======================
// FORMAT SLUG
// ======================
function formatSlug(slug = "") {
  return decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

// ======================
// ESCAPE XML SAFE
// ======================
function escapeXML(str = "") {
  return String(str).replace(/[<>&'"]/g, c => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;"
  }[c]));
}
