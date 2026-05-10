import { layout } from "../lib/render";
import { getPosts } from "../lib/api";
import { SITE, sanitizeSlug } from "../lib/config";

export async function onRequest(context) {
  try {

    const reqUrl = new URL(context.request.url);
    const page = parseInt(reqUrl.searchParams.get("page")) || 1;

    const posts = await getPosts();

    // DEBUG
    console.log("POSTS:", posts);

    const safePosts = Array.isArray(posts) ? posts : [];

    const perPage = 12;
    const totalPage = Math.ceil(safePosts.length / perPage);

    const start = (page - 1) * perPage;
    const currentPosts = safePosts.slice(start, start + perPage);

    const grid = currentPosts.map(p => `
      <a class="card" href="/${sanitizeSlug(p.slug)}">
        <img loading="lazy" src="${p.image || SITE.domain + "/og/default.jpg"}">
        <h3>${p.title || "No Title"}</h3>
      </a>
    `).join("");

    return layout({
      title: SITE.name,
      description: SITE.description,
      canonical: "/",

      content: `
        <div class="hero">
          <h1>${SITE.name}</h1>
          <p>${SITE.description}</p>
        </div>

        <h2>Artikel Terbaru</h2>

        <div class="grid">
          ${grid || "<p>No posts found</p>"}
        </div>
      `
    });

  } catch (e) {
    return new Response("ERROR: " + e.message, { status: 500 });
  }
}
