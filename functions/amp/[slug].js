import { getPost } from "../lib/api";
import { renderAmp } from "../lib/renderAmp";
import { sanitizeSlug, cleanDescription } from "../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const post = await getPost(sanitizeSlug(slug));

  if (!post) {
    return new Response("404", { status: 404 });
  }

  return new Response(
    renderAmp({
      title: post.title,
      description: cleanDescription(post.content, 160),
      canonical: "/" + slug,
      content: post.content
    }),
    {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    }
  );
}
