import { renderAmp } from "../../lib/renderAmp";
import { getPost } from "../../lib/api";
import { SITE } from "../../lib/config";

export async function onRequest(context) {
  try {

    const url = new URL(context.request.url);
    const slug = url.pathname.replace("/amp/", "");

    const post = await getPost(slug);

    if (!post) {
      return new Response("Not Found", { status: 404 });
    }

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

    const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${escapeHTML(title)}",
  "description": "${escapeHTML(description)}",
  "image": "${escapeHTML(image)}",
  "url": "${canonical}"
}
</script>`;

    const content = `
<article class="amp-post">

<h1>${escapeHTML(title)}</h1>

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

    return renderAmp({
      title,
      description,
      image,
      canonical,
      schema,
      content
    });

  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}

function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
