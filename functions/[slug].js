import { getPost } from "../lib/api";
import { renderTemplate } from "../lib/template";
import {
  sanitizeSlug,
  cleanDescription,
  SITE
} from "../lib/config";

export async function onRequest(context) {

  const slug = sanitizeSlug(
    context.params.slug
  );

  const post = await getPost(slug);

  if (!post) {
    return new Response("404", {
      status: 404
    });
  }

  const html = renderTemplate({
    amp: false,

    title: post.title,

    description: cleanDescription(
      post.content,
      160
    ),

    canonical:
      SITE.url + "/" + post.slug,

    content: post.content,

    image: post.image || "",

    siteName: SITE.name
  });

  return new Response(html, {
    headers: {
      "content-type":
        "text/html;charset=UTF-8"
    }
  });
}
