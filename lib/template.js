import { getStyles } from "./style.js";

export function renderTemplate({
amp = false,
title = "",
description = "",
canonical = "",
content = "",
image = "",
siteName = "AI MR DENNIS"
}) {

const IMG = amp ? "amp-img" : "img";

return `<!DOCTYPE html>
<html ${amp ? "amp" : ""} lang="id">
<head>
<meta charset="utf-8">
<title>${title}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index,follow,max-image-preview:large">

<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">

<meta name="twitter:card" content="summary_large_image">

${amp ? `<script async src="https://cdn.ampproject.org/v0.js"></script>` : ""}

<style amp-custom>
${getStyles()}
</style>

</head>

<body>
<div class="wrap">

<header class="desktop-header">
<div class="header-wrap">
<div class="top-contact">
<div class="contact-left">
<a href="#">Whatsapp</a><a href="#">Telegram</a><a href="#">Livechat</a>
</div>
<div class="contact-right">
<a class="btn-daftar" href="#">DAFTAR</a>
<a class="btn-login" href="#">LOGIN</a>
</div>
</div>

<div class="main-nav">
<a class="logo" href="/">${siteName}</a>
<div class="nav-menu">
<a href="/"><div class="icon">⌂</div><span>BERANDA</span></a>
<a href="#"><div class="icon">⚙</div><span>AI SEO</span></a>
<a href="#"><div class="icon">✦</div><span>AI CHAT</span></a>
<a href="#"><div class="icon">◉</div><span>AI CONTENT</span></a>
<a href="#"><div class="icon">✪</div><span>AI TOOLS</span></a>
</div>
</div>

</div>
</header>

<div class="hero">
<h2>AI MODERN INDONESIA</h2>
<h1>1000X</h1>
<p>AI SEO • AI CONTENT • AI CHAT • AI GENERATOR</p>
</div>

<article class="article">
<h1>${title}</h1>

${image ? `<${IMG} src="${image}" width="1200" height="630" layout="responsive" alt="${title}"></${IMG}>` : ""}

<div class="article-content">
${content}
</div>
</article>

<div class="footer">© 2026 ${siteName} • AI MODERN INDONESIA</div>

</div>
</body>
</html>`;
}
