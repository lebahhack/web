export function renderAmp(data) {
  return `<!doctype html>
<html amp lang="id">
<head>
<meta charset="utf-8">
<title>${data.title}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${data.description}">
<link rel="canonical" href="${data.canonical}">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-custom>
body{font-family:Arial,sans-serif;background:#090909;color:#fff;margin:0;padding:20px}
h1{color:#ffcc00}
article{margin-top:20px}
</style>

</head>
<body>

<h1>${data.title}</h1>
<article>${data.content}</article>

</body>
</html>`;
}
