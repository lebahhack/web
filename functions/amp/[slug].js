import { getPost } from "../../lib/api";
import { renderAmp } from "../../lib/renderAmp";
import { sanitizeSlug, cleanDescription } from "../../lib/config";

export async function onRequest(context) {

  const { slug } = context.params;

  const safeSlug = sanitizeSlug(slug);

  const post = await getPost(safeSlug);

  if (!post) {
    return new Response("404 Not Found", { status: 404 });
  }

  // ======================
  // SEO DESCRIPTION
  // ======================
  const description = cleanDescription(
    post.meta_description ||
    post.content ||
    post.title,
    160
  );

  // ======================
  // AMP CLEAN CONTENT
  // ======================
  const content = cleanAmpContent(post.content);

  // ======================
  // RENDER AMP
  // ======================
  const html = renderAmp({
    title: post.title,
    description,
    canonical: "/" + safeSlug,
    content,
    siteName: "AI MR DENNIS"
  });

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "cache-control": "public,max-age=300"
    }
  });
}

// ======================
// AMP CLEANER
// ======================
function cleanAmpContent(html = "") {
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/on\w+="[^"]*"/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
