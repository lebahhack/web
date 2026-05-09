import { renderAmp } from "../../lib/renderAmp";
import { getPost } from "../../lib/api";
import { sanitizeSlug, stripHTML } from "../../lib/config";

export async function onRequest(context) {
  try {

    let { slug } = context.params;
    slug = sanitizeSlug(slug);

    const post = await getPost(slug);

    if (!post) {
      return new Response("Not Found", { status: 404 });
    }

    const desc = stripHTML(post.content || "").slice(0, 160);

    const html = renderAmp({
      title: post.title,
      description: desc,
      canonical: "/" + slug,
      siteName: "AI MR DENNIS",
      content: `
<div class="post">

<h1>${post.title}</h1>

<div class="post-content">
${post.content}
</div>

</div>
`
    });

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "public,max-age=300"
      }
    });

  } catch (e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
