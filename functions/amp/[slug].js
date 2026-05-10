import { getPost } from "../../lib/api";
import { renderAmp } from "../../lib/renderAmp";
import { sanitizeSlug, cleanDescription, SITE } from "../../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const cleanSlug = sanitizeSlug(slug);
  const post = await getPost(cleanSlug);

  if (!post) {
    return new Response("404", { status: 404 });
  }

  const title = post.title || SITE.name;

  const description =
    post.meta_description ||
    cleanDescription(post.content, 160) ||
    SITE.description;

  const image =
    post.image ||
    post.og_image ||
    SITE.domain + "/og/default.jpg";

  return new Response(
    renderAmp({
      title,
      description,
      image,
      canonical: SITE.domain + "/" + cleanSlug,
      content: post.content || ""
    }),
    {
      headers: {
        "content-type": "text/html;charset=UTF-8"
      }
    }
  );
}
