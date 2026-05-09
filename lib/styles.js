// /lib/styles.js

export default `

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
  transition:.2s;
}

.contact-left a:hover{
  color:var(--white);
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
  transition:.2s;
}

.btn-daftar{
  background:var(--red);
}

.btn-login{
  background:#555;
}

.btn-daftar:hover,
.btn-login:hover{
  transform:translateY(-2px);
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
  text-shadow:0 0 10px rgba(255,180,0,.5);
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
  transition:.2s;
}

.nav-menu a:hover{
  color:var(--gold);
  transform:translateY(-2px);
}

.icon{
  font-size:22px;
  line-height:1;
}

.mobile-header{
  display:none;
  width:100%;
  background:var(--bg2);
  border-bottom:1px solid var(--border);
  position:sticky;
  top:0;
  z-index:999;
}

.mobile-top{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:15px;
}

.mobile-logo{
  font-size:28px;
  font-weight:900;
  color:var(--gold);
}

#menu-toggle{
  display:none;
}

.hamburger{
  width:42px;
  height:42px;
  display:flex;
  align-items:center;
  justify-content:center;
  border:1px solid #333;
  border-radius:8px;
  font-size:28px;
  cursor:pointer;
  background:#151515;
  position:relative;
}

.hamburger::before{
  content:"☰";
  position:absolute;
  transition:.2s;
}

#menu-toggle:checked + .hamburger::before{
  content:"✕";
  font-size:24px;
}

.mobile-menu{
  display:none;
  background:var(--bg3);
  border-top:1px solid var(--border);
  padding:10px 0;
  animation:fadeIn .2s ease;
}

.mobile-menu a{
  display:flex;
  align-items:center;
  padding:15px 18px;
  border-bottom:1px solid #1d1d1d;
  font-size:15px;
  transition:.2s;
}

.mobile-menu a:hover{
  background:#181818;
  padding-left:24px;
}

.mobile-buttons{
  display:flex;
  gap:10px;
  padding:18px;
}

.mobile-buttons a{
  flex:1;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:12px;
  border:none;
}

#menu-toggle:checked ~ .mobile-menu{
  display:block;
}

.hero{
  margin-top:10px;
  background:linear-gradient(135deg,#7a0000,#ff0000,#5a0000);
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
  text-shadow:0 0 10px #ff0000,0 0 20px #ff0000;
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

.cta{
  display:flex;
  justify-content:center;
  gap:12px;
  margin-top:20px;
}

.btn{
  padding:12px 22px;
  border-radius:6px;
  font-size:14px;
  font-weight:700;
  background:var(--gold2);
  color:#111;
  box-shadow:var(--shadow-gold);
}

.btn2{
  padding:12px 22px;
  border-radius:6px;
  font-size:14px;
  background:var(--bg3);
  border:1px solid var(--border-red);
}

.jackpot{
  margin-top:18px;
  background:#160000;
  border:2px solid var(--border-red);
  border-radius:var(--radius);
  padding:14px;
  text-align:center;
  box-shadow:0 0 14px rgba(255,0,0,.5);
}

.jackpot span{
  font-size:34px;
  font-weight:900;
  color:var(--gold);
}

.section{
  margin-top:20px;
  background:#110000;
  border:1px solid var(--border-red);
  border-radius:var(--radius);
  padding:15px;
}

.section h3{
  margin:0 0 14px;
  font-size:16px;
  color:var(--gold);
}

.grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:10px;
}

.card{
  background:var(--bg4);
  border:1px solid var(--border-red);
  border-radius:8px;
  overflow:hidden;
  box-shadow:0 0 10px rgba(255,0,0,.3);
}

.card a{
  display:block;
  padding:8px;
  font-size:11px;
  text-align:center;
  font-weight:700;
}

.card span{
  display:block;
  padding-bottom:8px;
  font-size:10px;
  text-align:center;
  color:#ccc;
}

.content{
  margin-top:22px;
  padding:18px;
  font-size:12px;
  color:#aaa;
  text-align:center;
}

.content h2{
  font-size:20px;
  margin:0 0 15px;
  color:var(--gold);
}

.tags{
  display:flex;
  flex-wrap:wrap;
  gap:8px;
  justify-content:center;
  margin-top:18px;
}

.tags a{
  padding:8px 12px;
  background:#111;
  border:1px solid #333;
  border-radius:5px;
  font-size:11px;
}

.provider{
  margin-top:22px;
  background:#111;
  border:1px solid #222;
  padding:20px;
  border-radius:10px;
}

.provider h4{
  margin:0 0 15px;
  font-size:13px;
  color:#999;
  text-align:center;
}

.provider-grid{
  display:grid;
  grid-template-columns:repeat(6,1fr);
  gap:10px;
}

.provider-item{
  background:#181818;
  border:1px solid #222;
  padding:10px;
  text-align:center;
  font-size:11px;
  border-radius:6px;
  color:#bbb;
}

.footer{
  margin-top:25px;
  padding:20px;
  text-align:center;
  font-size:11px;
  color:#666;
}

@keyframes fadeIn{
  from{
    opacity:0;
    transform:translateY(-5px);
  }

  to{
    opacity:1;
    transform:translateY(0);
  }
}

@media(max-width:900px){

  .desktop-header{
    display:none;
  }

  .mobile-header{
    display:block;
  }

  .wrap{
    padding:0 10px;
  }

  .hero h1{
    font-size:38px;
  }

  .grid{
    grid-template-columns:repeat(3,1fr);
  }

  .provider-grid{
    grid-template-columns:repeat(3,1fr);
  }

}
`;
