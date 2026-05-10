import { getPost } from "../../lib/api";
import { cached, cacheKey } from "../../lib/cache";

export async function onRequest(context) {
  const { env, request } = context;

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response(
      JSON.stringify({ error: "slug required" }),
      {
        status: 400,
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }

  const key = cacheKey("post", slug);

  const data = await cached(
    env.KV,
    key,
    async () => {

      const post = await getPost(slug);

      if (!post) {
        return null;
      }

      return {
        title: post.title,
        slug: post.slug,
        kategori: post.kategori,
        content: post.content,
        image: post.image || "",
        date: post.date || ""
      };
    },
    600 // cache 10 menit (lebih lama karena single post)
  );

  if (!data) {
    return new Response(
      JSON.stringify({ error: "not found" }),
      {
        status: 404,
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public,max-age=120"
    }
  });
}
