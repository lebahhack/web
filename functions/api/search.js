import { searchPosts } from "../../lib/api";
import { cached, cacheKey } from "../../lib/cache";

export async function onRequest(context) {
  const { env, request } = context;

  const url = new URL(request.url);
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();
  const limit = parseInt(url.searchParams.get("limit")) || 10;

  if (!q || q.length < 2) {
    return new Response(
      JSON.stringify({
        query: q,
        total: 0,
        data: []
      }),
      {
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }

  const key = cacheKey("search", `${q}:${limit}`);

  const result = await cached(
    env.KV,
    key,
    async () => {

      const posts = await searchPosts(q);

      const data = posts
        .slice(0, limit)
        .map(p => ({
          title: p.title,
          slug: p.slug,
          kategori: p.kategori,
          snippet: (p.content || "")
            .replace(/<[^>]*>?/gm, "")
            .slice(0, 120)
        }));

      return {
        query: q,
        total: posts.length,
        data
      };
    },
    300 // cache 5 menit
  );

  return new Response(JSON.stringify(result), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public,max-age=60"
    }
  });
}
