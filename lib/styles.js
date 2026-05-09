export function getStyles() {
return `
:root{
--bg:#090909;--bg2:#0d0d0d;--bg3:#111;--bg4:#1a0000;
--border:#222;--border-red:#ff2a00;
--white:#fff;--text:#ddd;--muted:#999;
--gold:#ffcc00;--gold2:#ffb400;--red:#d10000;
--radius:10px;--radius2:30px;
--shadow-red:0 0 20px rgba(255,0,0,.5);
--shadow-gold:0 0 12px rgba(255,180,0,.6);
--font:Arial,sans-serif;
}

body{
margin:0;
background:var(--bg);
font-family:var(--font);
color:var(--white);
line-height:1.4;
overflow-x:hidden
}

a{text-decoration:none;color:var(--white)}

.wrap{
width:100%;
max-width:1000px;
margin:auto;
padding:0 14px;
box-sizing:border-box
}

/* HEADER */
.desktop-header{
width:100%;
background:var(--bg2);
border-bottom:1px solid var(--border);
position:sticky;
top:0;
z-index:999
}

.header-wrap{max-width:1000px;margin:auto}

.top-contact{
display:flex;
justify-content:space-between;
align-items:center;
padding:10px 14px;
border-bottom:1px solid var(--border)
}

.contact-left{display:flex;align-items:center;gap:18px}

.contact-left a{font-size:13px;color:var(--muted)}
.contact-left a:hover{color:var(--white)}

.contact-right{display:flex;gap:10px}

.btn-daftar,.btn-login{
padding:10px 26px;
border-radius:30px;
font-size:13px;
font-weight:700
}

.btn-daftar{background:var(--red)}
.btn-login{background:#555}

.main-nav{
display:flex;
justify-content:space-between;
align-items:center;
padding:18px 14px;
gap:30px
}

.logo{
font-size:34px;
font-weight:900;
color:var(--gold)
}

.nav-menu{
flex:1;
display:flex;
justify-content:flex-end;
gap:36px;
flex-wrap:wrap
}

.nav-menu a{
display:flex;
flex-direction:column;
align-items:center;
gap:6px;
min-width:70px;
font-size:11px;
color:var(--text)
}

.icon{font-size:22px}

/* MOBILE */
.mobile-header{display:none;background:var(--bg2);border-bottom:1px solid var(--border)}

.mobile-top{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px
}

.mobile-logo{
font-size:28px;
font-weight:900;
color:var(--gold)
}

#menu-toggle{display:none}

.hamburger{
width:42px;height:42px;
display:flex;
align-items:center;
justify-content:center;
border:1px solid #333;
border-radius:8px;
background:#151515
}

.hamburger::before{content:"☰"}

#menu-toggle:checked+.hamburger::before{content:"✕"}

.mobile-menu{
display:none;
background:var(--bg3);
border-top:1px solid var(--border);
padding:10px 0
}

.mobile-menu a{
display:flex;
align-items:center;
padding:15px 18px;
border-bottom:1px solid #1d1d1d
}

#menu-toggle:checked~.mobile-menu{display:block}

/* HERO */
.hero{
margin-top:10px;
background:linear-gradient(135deg,#7a0000,#ff0000,#5a0000);
border:2px solid var(--border-red);
border-radius:10px;
padding:40px 20px
}

.hero h1{text-align:center;font-size:58px;margin:0}
.hero h2{text-align:center;font-size:22px;color:var(--gold)}
.hero p{text-align:center;font-size:14px}

/* ARTICLE */
.article h1{text-align:center}

/* FOOTER */
.footer{
margin-top:25px;
padding:20px;
text-align:center;
font-size:11px;
color:#666
}

/* RESPONSIVE */
@media(max-width:900px){
.desktop-header{display:none}
.mobile-header{display:block}
.wrap{padding:0 10px}
.hero h1{font-size:38px}
}
`;
}
