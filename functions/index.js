import { getPosts } from "../lib/api";
import { renderTemplate } from "../lib/template";
import {
  cleanDescription,
  SITE
} from "../lib/config";

export async function onRequest() {

  const posts = await getPosts();

  const content = posts.map(post => `

    <div class="card">

      <a href="/${post.slug}">

        ${
          post.image
            ? `<img
                src="${post.image}"
                alt="${post.title}"
                width="300">`
            : ""
        }

        <h2>
          ${post.title}
        </h2>

      </a>

      <p>
        ${cleanDescription(
          post.content,
          120
        )}
      </p>

    </div>

  `).join("");

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
