import { getPosts } from "../lib/api";
import { SITE, sanitizeSlug } from "../lib/config";

export async function onRequest() {

  const posts = await getPosts();

  // ======================
  // UNIQUE CATEGORY LIST
  // ======================
  const categories = [...new Set(
    posts.map(p => sanitizeSlug(p.kategori))
  )];

  const now = new Date().toISOString();

  // ======================
  // POSTS URL
  // ======================
  const postUrls = posts.map(p => {
    const slug = sanitizeSlug(p.slug);
    const cat = sanitizeSlug(p.kategori);

    return `
<url>
  <loc>${SITE.domain}/${cat}/${slug}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>`;
  }).join("");

  // ======================
  // CATEGORY URL
  // ======================
  const categoryUrls = categories.map(c => `
<url>
  <loc>${SITE.domain}/kategori/${c}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.7</priority>
</url>`).join("");

  // ======================
  // HOME URL
  // ======================
  const homeUrl = `
<url>
  <loc>${SITE.domain}/</loc>
  <lastmod>${now}</lastmod>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>`;

  // ======================
  // FINAL XML
  // ======================
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${homeUrl}

${categoryUrls}

${postUrls}

</urlset>`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml;charset=UTF-8",
      "cache-control": "public,max-age=3600"
    }
  });
}
