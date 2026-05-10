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
body{
font-family:system-ui;
background:#0b0b0b;
color:#fff;
padding:16px;
}

h1{
font-size:22px;
color:#ffcc00;
}

.desc{
opacity:.8;
font-size:14px;
}

amp-img{
border-radius:10px;
margin:10px 0;
}
</style>

</head>
<body>

${content}

</body>
</html>`;
}
