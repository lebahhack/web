export function renderAmp({
  title = "",
  description = "",
  canonical = "",
  content = "",
  siteName = ""
}) {

  return `<!DOCTYPE html>
<html amp lang="id">
<head>
<meta charset="utf-8">
<title>${title}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-custom>
body{font-family:Arial,sans-serif;background:#090909;color:#fff;margin:0;padding:20px}
h1{color:#ffcc00}
</style>

</head>

<body>

<h1>${title}</h1>

<article>
${content}
</article>

</body>
</html>`;
}
