export function renderAmp({
  title,
  description,
  image,
  canonical,
  content,
  schema
}) {
  return `<!doctype html>
<html amp lang="id">
<head>
<meta charset="utf-8">
<script async src="https://cdn.ampproject.org/v0.js"></script>

<title>${title}</title>

<meta name="description" content="${description}">

<link rel="canonical" href="${canonical}">

<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- 🔥 INI POSISI WAJIB -->
${schema || ""}

<style amp-custom>
body{font-family:Arial;background:#0b0b0b;color:#fff;margin:0;padding:16px;}
</style>

</head>
<body>

${content}

</body>
</html>`;
}
