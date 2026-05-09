export function renderAmp({
  title = "",
  description = "",
  canonical = "",
  content = "",
  siteName = ""
}) {
  return `<!doctype html>
<html amp lang="id">
<head>
<meta charset="utf-8">

<title>${title}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">

<meta name="robots" content="index,follow">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-custom>
body{font-family:Arial,sans-serif;background:#090909;color:#fff;margin:0;padding:20px}
h1{color:#ffcc00}
article{margin-top:20px;line-height:1.6}
</style>

</head>

<body>

<header>
<h1>${title}</h1>
<p>${siteName}</p>
</header>

<article>
${content}
</article>

</body>
</html>`;
}
