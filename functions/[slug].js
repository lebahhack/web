import { layout } from "../lib/render";
import { getPost } from "../lib/api";
import { SITE } from "../lib/config";

// ======================
// MAIN POST PAGE
// ======================
export async function onRequest(context) {
  try {
    const url = new URL(context.request.url);
    const slug = url.pathname.replace("/", "");

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

    const canonical = "/"+ slug;

    // ======================
    // SIMPLE SEO SCHEMA (BLOGPOST)
    // ======================
    const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${escapeHTML(title)}",
  "description": "${escapeHTML(description)}",
  "image": "${escapeHTML(image)}",
  "url": "${SITE.domain}/${slug}",
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
    // CONTENT WRAPPER
    // ======================
    const content = `
<div class="post">

<h1>${escapeHTML(title)}</h1>

<img src="${escapeHTML(image)}" style="width:100%;border-radius:8px;margin:10px 0;">

<div class="post-content">
${post.content || ""}
</div>

</div>
`;

    // ======================
    // RENDER
    // ======================
    return layout({
      title,
      description,
      canonical,
      image,
      schema,
      content
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
