import { layout } from "../lib/render";
import {
  SITE,
  canonical,
  sanitizeSlug,
  stripHTML,
  readingTime,
  postImage,
  cardImage
} from "../lib/config";

import { getPost, getPosts } from "../lib/api";

export async function onRequest(context) {

  try {

    let { slug } = context.params;
    slug = sanitizeSlug(slug);

    const post = await getPost(slug);

    if (!post) {
      return new Response("404 Not Found", { status: 404 });
    }

    const posts = await getPosts();

    // ======================
    // RELATED POST (PORTAL STYLE)
    // ======================
    const related = posts
      .filter(p => sanitizeSlug(p.slug) !== slug)
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    const read = readingTime(post.content || "");

    const desc = stripHTML(post.content || "").slice(0, 160);

    const url = "/" + sanitizeSlug(post.slug);

    const og = SITE.domain + "/og/" + sanitizeSlug(post.slug);

    // ======================
    // BREADCRUMB STYLE TEMPLATE
    // ======================
    const breadcrumb = `
<div style="font-size:11px;color:#999;margin-bottom:10px">
<a href="/" style="color:#ffcc00">Home</a> ›
<span>${post.title}</span>
</div>
`;

    // ======================
    // SCHEMA (SEO SAFE)
    // ======================
    const schema = `
<script type="application/ld+json">
{
"@context":"https://schema.org",
"@type":"BlogPosting",
"headline":"${escapeHTML(post.title)}",
"description":"${escapeHTML(desc)}",
"image":"${og}",
"mainEntityOfPage":"${canonical(url)}",
"author":{"@type":"Organization","name":"${SITE.name}"},
"publisher":{"@type":"Organization","name":"${SITE.name}"}
}
</script>
`;

    // ======================
    // CONTENT TEMPLATE (SESUAI STYLE KAMU)
    // ======================
    return layout({
      title: post.title,
      description: desc,
      canonical: canonical(url),
      schema,

      content: `

${breadcrumb}

<article class="post">

${postImage(og, post.title)}

<h1 style="color:#ffcc00">${post.title}</h1>

<p style="font-size:12px;color:#999">
⏱ ${read} min read
</p>

<div class="post-content">

${post.content}

</div>

</article>

<!-- RELATED SECTION (STYLE TEMPLATE KAMU) -->

<div class="section">

<h3 style="color:#ffcc00">🔥 Artikel Terkait</h3>

<div class="grid">

${related.map(p => `
<div class="card">

<a href="/${sanitizeSlug(p.slug)}">

${cardImage("/og/" + sanitizeSlug(p.slug), p.title)}

<h4>${p.title}</h4>

</a>

</div>
`).join("")}

</div>

</div>

`
    });

  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
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
