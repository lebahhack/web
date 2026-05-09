import { getPosts } from "../lib/api";
import { renderTemplate } from "../lib/template";
import {
  cleanDescription,
  SITE
} from "../lib/config";

export async function onRequest() {

  const posts = await getPosts();

  const content = `

<div class="section">

<h3>
🔥 POSTINGAN TERBARU
</h3>

<div class="grid">

${posts.map(post => `

<div class="card">

<a href="/${post.slug}">

${
  post.image
    ? `<img
        src="${post.image}"
        width="200"
        height="140"
        alt="${post.title}">`
    : ""
}

</a>

<a href="/${post.slug}">
${post.title}
</a>

<span>
${cleanDescription(post.content, 60)}
</span>

</div>

`).join("")}

</div>

</div>

`;
  

  const html = renderTemplate({

    amp: false,

    title:
      SITE.name,

    description:
      SITE.description,

    canonical:
      SITE.url,

    content,

    image:
      SITE.logo,

    siteName:
      SITE.name

  });

  return new Response(html, {
    headers: {
      "content-type":
        "text/html;charset=UTF-8"
    }
  });
}
