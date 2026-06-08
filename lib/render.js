import {
  SITE,
  url as buildUrl,
  amphtml,
  escapeHTML
} from "./config";

import { head } from "./templates/head.js";
import { header } from "./templates/header.js";
import { footer } from "./templates/footer.js";

export function layout({

  title = SITE.name,
  description = SITE.description,
  canonical = "",
  image = "",
  schema = "",
  robots = "",
  content = ""

}) {

  const canonicalUrl =
    canonical || SITE.domain;

  const ampUrl =
    amphtml(
      canonicalUrl.replace(
        SITE.domain,
        ""
      )
    );

  const ogImage =
    image ||
    buildUrl(
      SITE.defaultImage
    );

  const page = {
    SITE,
    title,
    description,
    canonical,
    canonicalUrl,
    ampUrl,
    image,
    ogImage,
    schema,
    robots,
    content,
    escapeHTML
  };

return new Response(`
<!DOCTYPE html>
<html lang="id">
<head>
${head(page)}
</head>
<body>

${header(page)}

<main class="container">
${content}
</main>

${footer(page)}

</body>
</html>
`,{
  headers:{
    "content-type":"text/html; charset=UTF-8"
  }
});
