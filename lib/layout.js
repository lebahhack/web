export function buildLayout({ siteName = "AI MR DENNIS", IMG = "img" }) {

return `
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
<a href="#" class="btn-daftar">DAFTAR</a>
<a href="#" class="btn-login">LOGIN</a>
</div>
</div>

<div class="main-nav">
<a href="#" class="logo">${siteName}</a>

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

<div class="hero">
<h2>AI MODERN INDONESIA</h2>
<h1>1000X</h1>
<p>AI SEO • AI CONTENT • AI CHAT • AI GENERATOR</p>
</div>

<div class="footer">
© 2026 ${siteName} • AI MODERN INDONESIA
</div>

</div>
`;
}
