import { getPost } from "../lib/api";
import { sanitizeSlug, cleanDescription } from "../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const post = await getPost(sanitizeSlug(slug));

  if (!post) {
    return new Response("404", { status: 404 });
  }

  const description = cleanDescription(post.content, 160);

  return new Response(`
    <h1>${post.title}</h1>
    <p>${description}</p>
  `, {
    headers: { "content-type": "text/html" }
  });
}
