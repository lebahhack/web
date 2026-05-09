export function buildLayout({ siteName = "AI MR DENNIS", IMG = "img" }) {
return `
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
<a href="#">AI Online</a>
<a href="#">SEO Tools</a>

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

<div class="cta">
<a href="#" class="btn">MULAI AI</a>
<a href="#" class="btn2">AI TOOLS</a>
</div>
</div>

<!-- JACKPOT -->
<div class="jackpot">
<span>IDR 6,487,193,254</span>
</div>

<!-- SECTION -->
<div class="section">
<h3>🔥 AI TOOLS POPULER</h3>

<div class="grid">

<div class="card">
<${IMG} src="https://dummyimage.com/200x140/ff0000/ffffff"
width="200" height="140" layout="responsive" alt="AI SEO"></${IMG}>
<a href="#">AI SEO</a>
<span>AI SEO MODERN</span>
</div>

<div class="card">
<${IMG} src="https://dummyimage.com/200x140/ff0000/ffffff"
width="200" height="140" layout="responsive" alt="AI CONTENT"></${IMG}>
<a href="#">AI CONTENT</a>
<span>AI CONTENT MODERN</span>
</div>

<div class="card">
<${IMG} src="https://dummyimage.com/200x140/ff0000/ffffff"
width="200" height="140" layout="responsive" alt="AI CHAT"></${IMG}>
<a href="#">AI CHAT</a>
<span>AI CHAT ONLINE</span>
</div>

<div class="card">
<${IMG} src="https://dummyimage.com/200x140/ff0000/ffffff"
width="200" height="140" layout="responsive" alt="AI GENERATOR"></${IMG}>
<a href="#">AI GENERATOR</a>
<span>AI GENERATOR</span>
</div>

<div class="card">
<${IMG} src="https://dummyimage.com/200x140/ff0000/ffffff"
width="200" height="140" layout="responsive" alt="SEO TOOLS"></${IMG}>
<a href="#">SEO TOOLS</a>
<span>SEO TOOLS AI</span>
</div>

</div>
</div>

<!-- CONTENT -->
<div class="content">
<h2>AI Modern Ringan dan Cepat</h2>

<p>
AI MR DENNIS menghadirkan AI modern Indonesia untuk AI SEO, AI Content,
AI Chat, AI Generator, AI Online, dan AI Tools modern.
</p>

<p>
AI modern membantu SEO website, content generation, AI marketing,
dan kebutuhan digital modern Indonesia.
</p>

<div class="tags">
<a href="#">AI SEO</a>
<a href="#">AI CONTENT</a>
<a href="#">AI CHAT</a>
<a href="#">AI ONLINE</a>
<a href="#">AI TOOLS</a>
<a href="#">AI WRITER</a>
<a href="#">SEO AI</a>
<a href="#">AI MODERN</a>
<a href="#">AI DIGITAL</a>
<a href="#">AI INDONESIA</a>
</div>
</div>

<!-- PROVIDER -->
<div class="provider">
<h4>POPULAR AI PLATFORM</h4>

<div class="provider-grid">
<div class="provider-item">AI SEO</div>
<div class="provider-item">AI CHAT</div>
<div class="provider-item">AI CONTENT</div>
<div class="provider-item">AI WRITER</div>
<div class="provider-item">AI SEARCH</div>
<div class="provider-item">AI ONLINE</div>
</div>
</div>

<!-- FOOTER -->
<div class="footer">
© 2026 ${siteName} • AI MODERN INDONESIA
</div>

</div>
`;
}
