import { getPosts } from "../lib/api";
import { SITE, sanitizeSlug } from "../lib/config";

export async function onRequest() {

  const posts = await getPosts();

  // ======================
  // SORT NEWEST FIRST
  // ======================
  const sorted = posts.reverse();

  const items = sorted.slice(0, 50).map(p => {

    const title = escapeXML(p.title || "");
    const slug = sanitizeSlug(p.slug);
    const kategori = sanitizeSlug(p.kategori);

    const url = `${SITE.domain}/${kategori}/${slug}`;

    const description = escapeXML(
      (p.content || "")
        .replace(/<[^>]*>?/gm, "")
        .slice(0, 200)
    );

    const pubDate = new Date().toUTCString();

    return `
<item>
  <title>${title}</title>
  <link>${url}</link>
  <guid>${url}</guid>
  <description>${description}</description>
  <pubDate>${pubDate}</pubDate>
</item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${SITE.name}</title>
  <link>${SITE.domain}</link>
  <description>${SITE.description}</description>
  <language>id-ID</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>

  ${items}

</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
      "cache-control": "public,max-age=1800"
    }
  });
}

// ======================
// XML ESCAPE SAFE
// ======================
function escapeXML(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
