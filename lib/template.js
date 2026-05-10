import { seo } from "./seo.js";
import { ogImage, SITE } from "./config.js";
import { getStyles } from "./styles.js";

export function renderTemplate({
  amp = false,
  title = "",
  description = "",
  slug = "",
  image = "",
  content = "",
  siteName = SITE.name,
  post = null
}) {

  // ======================
  // SEO META
  // ======================
  const meta = seo({
    title,
    description,
    slug,
    image,
    post
  });

  const IMG = amp ? "amp-img" : "img";

  // ======================
  // OG IMAGE (SINGLE SOURCE)
  // ======================
  const og = SITE.url + ogImage(slug || post?.slug || "home");

  return `
<!DOCTYPE html>
<html ${amp ? "amp" : ""} lang="id">
<head>
<meta charset="utf-8">

<title>${title}</title>

<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

${meta}

<meta name="robots" content="index,follow,max-image-preview:large">

${amp ? `<script async src="https://cdn.ampproject.org/v0.js"></script>` : ""}

<style amp-custom>
${getStyles()}
</style>

</head>

<body>

<div class="wrap">

<!-- DESKTOP HEADER -->
<header class="desktop-header">

<div class="header-wrap">

<div class="top-contact">

<div class="contact-left">
<a href="#">Whatsapp</a>
<a href="#">Telegram</a>
<a href="#">Livechat</a>
</div>

<div class="contact-right">
<a href="#" class="btn-daftar">DAFTAR</a>
<a href="#" class="btn-login">LOGIN</a>
</div>

</div>

<div class="main-nav">

<a href="/" class="logo">${siteName}</a>

<div class="nav-menu">
<a href="#"><div class="icon">⌂</div><span>BERANDA</span></a>
<a href="#"><div class="icon">⚙</div><span>AI SEO</span></a>
<a href="#"><div class="icon">✦</div><span>AI CHAT</span></a>
<a href="#"><div class="icon">◉</div><span>AI CONTENT</span></a>
<a href="#"><div class="icon">✪</div><span>AI TOOLS</span></a>
</div>

</div>

</div>

</header>

<!-- MOBILE HEADER -->
<header class="mobile-header">

<div class="mobile-top">

<div class="mobile-logo">${siteName}</div>

<input type="checkbox" id="menu-toggle">
<label for="menu-toggle" class="hamburger"></label>

<div class="mobile-menu">

<a href="#">Beranda</a>
<a href="#">AI SEO</a>
<a href="#">AI Chat</a>
<a href="#">AI Content</a>
<a href="#">AI Tools</a>

<div class="mobile-buttons">
<a href="#" class="btn-daftar">DAFTAR</a>
<a href="#" class="btn-login">LOGIN</a>
</div>

</div>

</div>

</header>

<!-- HERO -->
<div class="hero">

<h2>AI MODERN INDONESIA</h2>

<h1>1000X</h1>

<p>AI SEO • AI CONTENT • AI CHAT • AI GENERATOR</p>

</div>

<!-- SECTION GRID -->
<div class="section">

<h3>🔥 AI TOOLS POPULER</h3>

<div class="grid">

<div class="card">
<${IMG}
  src="https://dummyimage.com/200x140/ff0000/ffffff"
  width="200"
  height="140"
  layout="responsive"
  alt="AI SEO">
</${IMG}>
<a href="#">AI SEO</a>
<span>AI SEO MODERN</span>
</div>

<div class="card">
<${IMG}
  src="https://dummyimage.com/200x140/ff0000/ffffff"
  width="200"
  height="140"
  layout="responsive"
  alt="AI CONTENT">
</${IMG}>
<a href="#">AI CONTENT</a>
<span>AI CONTENT MODERN</span>
</div>

<div class="card">
<${IMG}
  src="https://dummyimage.com/200x140/ff0000/ffffff"
  width="200"
  height="140"
  layout="responsive"
  alt="AI CHAT">
</${IMG}>
<a href="#">AI CHAT</a>
<span>AI CHAT ONLINE</span>
</div>

</div>

</div>

<!-- CONTENT -->
<div class="content">



${og ? `
<${IMG}
  src="${og}"
  width="1200"
  height="630"
  layout="responsive"
  alt="${title}">
</${IMG}>
` : ""}
<h2>${title}</h2>
${content}

</div>

<!-- FOOTER -->
<div class="footer">
© 2026 ${siteName} • AI MODERN INDONESIA
</div>

</div>

</body>
</html>
`;
}
