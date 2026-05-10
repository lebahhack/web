import { getPosts } from "../lib/api";
import { sanitizeSlug } from "../lib/config";

export async function onRequest(context) {

  const url = new URL(context.request.url);
  const q = (url.searchParams.get("q") || "").toLowerCase().trim();

  if (!q) {
    return json([]);
  }

  const posts = await getPosts();

  // ======================
  // SIMPLE SEARCH ENGINE
  // ======================
  const results = posts.filter(p => {

    const title = (p.title || "").toLowerCase();
    const content = (p.content || "").toLowerCase();
    const kategori = (p.kategori || "").toLowerCase();

    return (
      title.includes(q) ||
      content.includes(q) ||
      kategori.includes(q)
    );
  });

  // ======================
  // LIMIT RESULTS
  // ======================
  const limited = results.slice(0, 10).map(p => ({
    title: p.title,
    url: `/${sanitizeSlug(p.kategori)}/${sanitizeSlug(p.slug)}`,
    kategori: p.kategori
  }));

  return json(limited);
}

// ======================
// JSON RESPONSE
// ======================
function json(data) {
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "cache-control": "public,max-age=60"
    }
  });
}
