import { getPosts } from "../../lib/api";
import { cached, cacheKey } from "../../lib/cache";

export async function onRequest(context) {
  const { env, request } = context;

  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 10;
  const kategori = url.searchParams.get("kategori") || "";

  const key = cacheKey("posts", `${kategori}:${page}:${limit}`);

  const data = await cached(
    env.KV,
    key,
    async () => {

      let posts = await getPosts();

      // ======================
      // FILTER CATEGORY
      // ======================
      if (kategori) {
        posts = posts.filter(
          p => (p.kategori || "").toLowerCase() === kategori.toLowerCase()
        );
      }

      // ======================
      // SORT (latest first)
      // ======================
      posts = posts.reverse();

      // ======================
      // PAGINATION
      // ======================
      const start = (page - 1) * limit;
      const end = start + limit;

      const paginated = posts.slice(start, end);

      return {
        page,
        limit,
        total: posts.length,
        totalPage: Math.ceil(posts.length / limit),
        data: paginated
      };
    },
    300 // cache 5 menit
  );

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public,max-age=60"
    }
  });
}
