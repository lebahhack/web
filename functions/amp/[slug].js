import { renderAmp } from "../../lib/renderAmp";
import { getPost } from "../../lib/api";
import { SITE } from "../../lib/config";

// ======================
// AMP POST PAGE
// ======================
export async function onRequest(context) {
  try {

    const url = new URL(context.request.url);
    const slug = url.pathname.replace("/amp/", "");

    const post = await getPost(slug);

    if (!post) {
      return new Response("Not Found", { status: 404 });
    }

    // ======================
    // SAFE DATA
    // ======================
    const title = post.title || SITE.name;

    const description =
      post.meta_description ||
      post.description ||
      post.content?.slice(0, 160) ||
      SITE.description;

    const image =
      post.og_image ||
      post.image ||
      SITE.domain + "/og/default.jpg";

    const canonical = SITE.domain + "/" + slug;

    // ======================
    // AMP SEO SCHEMA
    // ======================
    const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${escapeHTML(title)}",
  "description": "${escapeHTML(description)}",
  "image": "${escapeHTML(image)}",
  "url": "${canonical}",
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
  }
}
</script>`;

    // ======================
    // AMP CONTENT
    // ======================
    const content = `
<article class="amp-post">

<h1>${escapeHTML(title)}</h1>

<amp-img 
  src="${image}" 
 
