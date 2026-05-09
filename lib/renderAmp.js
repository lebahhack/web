import { SITE } from "./config";

export function renderAmp({ title, description, canonical, content }) {

  const url = canonical || SITE.domain;

  return `<!DOCTYPE html>
<html amp lang="id">
<head>

<meta charset="utf-8">
<title>${escapeHTML(title || SITE.name)}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

<meta name="description" content="${escapeHTML(description || SITE.description)}">

<link rel="canonical" href="${url}">

<script async src="https://cdn.ampproject.org/v0.js"></script>

<style amp-custom>
body{margin:0;font-family:Arial;background:#090909;color:#fff}
.wrap{max-width:1000px;margin:auto;padding:14px}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.card{border:1px solid #ff2a00;background:#1a0000}
</style>

</head>

<body>

<div class="wrap">

${content || ""}

</div>

</body>
</html>`;
}

// SAFE ESCAPE (WAJIB BIAR JSON-LD & TITLE AMAN)
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
