import { layout } from "../lib/render";
import {
  SITE,
  canonical,
  sanitizeSlug,
  cleanDescription,
  readingTime
} from "../lib/config";

import { getPost, getPosts } from "../lib/api";

export async function onRequest(context) {

  try {

    // ======================
    // PARAM SLUG
    // ======================
    const { slug } = context.params;
    const safeSlug = sanitizeSlug(slug);

    // ======================
    // GET DATA
    // ======================
    const post = await getPost(safeSlug);

    if (!post) {
      return new Response("404 Not Found", { status: 404 });
    }

    const posts = await getPosts();

    // ======================
    // RELATED POSTS
    // ======================
    const related = posts
      .filter(p => sanitizeSlug(p.slug) !== safeSlug)
      .slice(0, 6);

    // ======================
    // SEO DATA
    // ======================
    const desc = cleanDescription(post.content || "", 160);
    const read = readingTime(post.content || "");

    const url = "/" + safeSlug;
    const fullUrl = canonical(url);

    const ogImage = "/og/" + safeSlug;

    // ======================
    // SIMPLE INTERNAL LINK
    // ======================
    let content = post.content || "";

    related.forEach(p => {

      const title = p.title || "";
      if (!title) return;

      const keyword = title.split(" ").slice(0, 2).join(" ");
      if (keyword.length < 4) return;

      const regex = new RegExp(`\\b${keyword}\\b`, "i");

      content = content.replace(
        regex,
        `<a href="/${sanitizeSlug(p.slug)}">${keyword}</a>`
      );

    });

    // ======================
    // SCHEMA BLOGPOSTING
    // ======================
    const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${post.title}",
  "description": "${desc}",
  "image": "${ogImage}",
  "mainEntityOfPage": "${fullUrl}",
  "author": {
    "@type": "Organization",
    "name": "${SITE.name}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${SITE.name}"
  }
}
</script>
`;

    // ======================
    // RELATED GRID
    // ======================
    const relatedGrid = related.map(p => `
      <div class="card">
        <a href="/${sanitizeSlug(p.slug)}">
          <h4>${p.title}</h4>
        </a>
      </div>
    `).join("");

    // ======================
    // RENDER OUTPUT
    // ======================
    return layout({
      title: post.title,
      description: desc,
      canonical: fullUrl,
      image: ogImage,
      schema,

      content: `
        <link rel="amphtml" href="/amp/${safeSlug}">

        <article class="post">

          <h1>${post.title}</h1>

          <p>⏱ ${read} min read</p>

          <div class="post-content">
            ${content}
          </div>

        </article>

        <h3>Artikel Terkait</h3>

        <div class="grid">
          ${relatedGrid}
        </div>
      `
    });

  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
