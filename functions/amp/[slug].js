import { getPost } from "../../lib/api";
import { renderAmpPage } from "../../lib/renderAmp";
import { sanitizeSlug, cleanDescription } from "../../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const safeSlug = sanitizeSlug(slug);

  const post = await getPost(safeSlug);

  if (!post) {
    return new Response("404 Not Found", { status: 404 });
  }

  // ======================
  // DESCRIPTION (SEO SAFE)
  // ======================
  const description = cleanDescription(
    post.meta_description ||
    post.content ||
    post.title,
    160
  );

  // ======================
  // AMP CONTENT CLEAN
  // ======================
  const content = cleanAmpContent(post.content);

  return new Response(
    renderAmpPage({
      title: post.title,
      description,
      slug: safeSlug,
      content,
      image: post.image || ""
    }),
    {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "public,max-age=300"
      }
    }
  );
}

// ======================
// AMP CONTENT CLEANER
// ======================
function cleanAmpContent(html = "") {
  return String(html)

    // remove script/style
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")

    // optional: strip dangerous attributes
    .replace(/on\w+="[^"]*"/g, "")

    // fix spacing
    .replace(/\s+/g, " ")

    .trim();
}
