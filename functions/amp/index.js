import { layout } from "../../lib/render";
import { getPosts } from "../../lib/api";
import { SITE } from "../../lib/config";

export async function onRequest() {
  const posts = await getPosts();

  const grid = posts.slice(0, 12).map(p => `
    <div class="card">
      <a href="/amp/${p.slug}">
        <img src="${p.image || SITE.domain + "/og/default.jpg"}">
        <h3>${p.title}</h3>
      </a>
    </div>
  `).join("");

  const content = `
<h1>${SITE.name} AMP</h1>

<div class="grid">
${grid}
</div>
`;

  return layout({
    title: SITE.name + " AMP",
    description: SITE.description,
    canonical: SITE.domain,
    content
  });
}
