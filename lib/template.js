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

<meta name="viewport"
content="width=device-width,minimum-scale=1,initial-scale=1">

<meta name="description"
content="${description}">

<link rel="canonical"
href="${canonical}">

<meta name="robots"
content="index,follow,max-image-preview:large">

<meta property="og:type"
content="article">

<meta property="og:title"
content="${title}">

<meta property="og:description"
content="${description}">

<meta property="og:url"
content="${canonical}">

<meta property="og:image"
content="${image}">

<meta name="twitter:card"
content="summary_large_image">

${
  amp
    ? `<script async src="https://cdn.ampproject.org/v0.js"></script>`
    : ""
}

<style amp-custom>

/* =========================
ROOT
========================= */

:root{

--bg:#090909;
--bg2:#0d0d0d;
--bg3:#111;
--bg4:#1a0000;

--border:#222;
--border-red:#ff2a00;

--white:#fff;
--text:#ddd;
--muted:#999;

--gold:#ffcc00;
--gold2:#ffb400;

--red:#d10000;

--radius:10px;
--radius2:30px;

--shadow-red:
0 0 20px rgba(255,0,0,.5);

--shadow-gold:
0 0 12px rgba(255,180,0,.6);

--font:Arial,sans-serif;

}

body{
margin:0;
background:var(--bg);
font-family:var(--font);
color:var(--white);
line-height:1.4;
overflow-x:hidden;
}

a{
text-decoration:none;
color:var(--white);
}

.wrap{
width:100%;
max-width:1000px;
margin:auto;
padding:0 14px;
box-sizing:border-box;
}

.desktop-header{
width:100%;
background:var(--bg2);
border-bottom:1px solid var(--border);
position:sticky;
top:0;
z-index:999;
}

.header-wrap{
width:100%;
max-width:1000px;
margin:auto;
box-sizing:border-box;
}

.top-contact{
display:flex;
justify-content:space-between;
align-items:center;
padding:10px 14px;
border-bottom:1px solid var(--border);
}

.contact-left{
display:flex;
align-items:center;
gap:18px;
}

.contact-left a{
font-size:13px;
color:var(--muted);
}

.contact-right{
display:flex;
align-items:center;
gap:10px;
}

.btn-daftar,
.btn-login{
padding:10px 26px;
border-radius:var(--radius2);
font-size:13px;
font-weight:700;
}

.btn-daftar{
background:var(--red);
}

.btn-login{
background:#555;
}

.main-nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:18px 14px;
gap:30px;
}

.logo{
font-size:34px;
font-weight:900;
white-space:nowrap;
color:var(--gold);
}

.nav-menu{
flex:1;
display:flex;
justify-content:flex-end;
align-items:center;
gap:36px;
flex-wrap:wrap;
}

.nav-menu a{
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
gap:6px;
min-width:70px;
font-size:11px;
color:var(--text);
}

.icon{
font-size:22px;
line-height:1;
}

.hero{
margin-top:10px;
background:
linear-gradient(
135deg,
#7a0000,
#ff0000,
#5a0000
);
border:2px solid var(--border-red);
border-radius:var(--radius);
overflow:hidden;
padding:40px 20px;
box-shadow:var(--shadow-red);
}

.hero h1{
font-size:58px;
line-height:1;
margin:0;
font-weight:900;
text-align:center;
color:var(--white);
}

.hero h2{
text-align:center;
font-size:22px;
margin:0 0 15px;
color:var(--gold);
}

.hero p{
text-align:center;
font-size:14px;
color:var(--white);
margin-top:15px;
}

.article{
margin-top:20px;
background:#110000;
border:1px solid var(--border-red);
border-radius:10px;
padding:20px;
}

.article h1{
font-size:28px;
margin:0 0 15px;
color:var(--gold);
}

.article-content{
font-size:15px;
line-height:1.8;
color:#ddd;
}

.article-content p{
margin-bottom:18px;
}

.footer{
margin-top:25px;
padding:20px;
text-align:center;
font-size:11px;
color:#666;
}

@media(max-width:900px){

.hero h1{
font-size:38px;
}

.nav-menu{
gap:15px;
}

}

</style>

</head>

<body>

<div class="wrap">

<header class="desktop-header">

<div class="header-wrap">

<div class="top-contact">

<div class="contact-left">

<a href="#">Whatsapp</a>
<a href="#">Telegram</a>
<a href="#">Livechat</a>

</div>

<div class="contact-right">

<a href="#" class="btn-daftar">
DAFTAR
</a>

<a href="#" class="btn-login">
LOGIN
</a>

</div>

</div>

<div class="main-nav">

<a href="/" class="logo">
${siteName}
</a>

<div class="nav-menu">

<a href="/">
<div class="icon">⌂</div>
<span>BERANDA</span>
</a>

<a href="#">
<div class="icon">⚙</div>
<span>AI SEO</span>
</a>

<a href="#">
<div class="icon">✦</div>
<span>AI CHAT</span>
</a>

<a href="#">
<div class="icon">◉</div>
<span>AI CONTENT</span>
</a>

<a href="#">
<div class="icon">✪</div>
<span>AI TOOLS</span>
</a>

</div>

</div>

</div>

</header>

<div class="hero">

<h2>
AI MODERN INDONESIA
</h2>

<h1>
1000X
</h1>

<p>
AI SEO • AI CONTENT • AI CHAT • AI GENERATOR
</p>

</div>

<div class="article">

<h1>${title}</h1>

${
  image
    ? `<${IMG}
        src="${image}"
        width="1200"
        height="630"
        layout="responsive"
        alt="${title}">
      </${IMG}>`
    : ""
}

<div class="article-content">

${content}

</div>

</div>

<div class="footer">

© 2026 ${siteName} • AI MODERN INDONESIA

</div>

</div>

</body>
</html>`;
}
