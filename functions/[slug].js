import { layout } from "../lib/render";
import {
  SITE,
  canonical,
  sanitizeSlug,
  cleanDescription,
  readingTime,
  postImage,
  cardImage
} from "../lib/config";

import { getPost, getPosts } from "../lib/api";

export async function onRequest(context) {

  try {

    // ======================
    // PARAM
    // ======================
    const { slug } = context.params;
    const safeSlug = sanitizeSlug(slug);

    // ======================
    // FETCH DATA
    // ======================
    const post = await getPost(safeSlug);

    if (!post) {
      return new Response("404 Not Found", { status: 404 });
    }

    const posts = await getPosts();

    // ======================
    // RELATED POST
    // ======================
    const related = posts
      .filter(p =>
        sanitizeSlug(p.slug) !== safeSlug
      )
      .slice(0, 6);

    // ======================
    // SEO DATA
    // ======================
    const desc = cleanDescription(post.content || "", 160);
    const read = readingTime(post.content || "");

    const url = "/" + safeSlug;
    const fullUrl = canonical(url);

    const og = "/og/" + safeSlug;

    // ======================
    // INTERNAL LINK SIMPLE BOOST
    // ======================
    let content = post.content || "";

    // simple internal link (safe version)
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
    // SCHEMA (BlogPosting)
    // ======================
    const schema = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${post.title}",
  "description": "${desc}",
  "image": "${og}",
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
          ${cardImage(`/og/${sanitizeSlug(p.slug)}`, p.title)}
          <h4>${p.title}</h4>
        </a>
      </div>
    `).join("");

    // ======================
    // RENDER
    // ======================
    return layout({
      title: post.title,
      description: desc,

      canonical: fullUrl,
      image: og,
      schema,

      content: `
        <link rel="amphtml" href="/amp/${safeSlug}">

        <article class="post">

          ${postImage(og, post.title)}

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
