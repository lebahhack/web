import { getPost } from "../../lib/api";
import { renderAmp } from "../../lib/renderAmp";
import { sanitizeSlug, cleanDescription, SITE } from "../../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const cleanSlug = sanitizeSlug(slug);
  const post = await getPost(cleanSlug);

  if (!post) {
    return new Response("404 Not Found", { status: 404 });
  }

  // ======================
  // SEO CORE DATA
  // ======================
  const title = post.title || SITE.name;

  const description =
    post.meta_description ||
    cleanDescription(post.content, 160) ||
    SITE.description;

  const image =
    post.og_image ||
    post.image ||
    SITE.domain + "/og/default.jpg";

  const canonical = `${SITE.domain}/${cleanSlug}`;

  // ======================
  // FULL SEO SCHEMA (BLOGPOST)
  // ======================
  const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${canonical}"
  },
  "headline": "${escapeHTML(title)}",
  "description": "${escapeHTML(description)}",
  "image": "${escapeHTML(image)}",
  "author": {
    "@type": "Organization",
    "name": "${SITE.name}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${SITE.name}",
    "logo": {
      "@type": "ImageObject",
      "url": "${SITE.domain}/logo.png"
    }
  },
  "datePublished": "${post.date || new Date().toISOString()}",
  "dateModified": "${post.updated_at || post.date || new Date().toISOString()}"
}
</script>`;

  // ======================
  // AMP CONTENT
  // ======================
  const content = `
<article class="amp-post">

<h1>${escapeHTML(title)}</h1>

<p class="desc">${escapeHTML(description)}</p>

<amp-img
  src="${image}"
  width="800"
  height="450"
  layout="responsive"
  alt="${escapeHTML(title)}">
</amp-img>

<div class="content">
${post.content || ""}
</div>

</article>
`;

  // ======================
  // RENDER AMP
  // ======================
  return renderAmp({
    title,
    description,
    canonical,
    image,
    schema,
    content
  });
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
