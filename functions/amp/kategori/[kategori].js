import { renderAmp } from "../../../lib/renderAmp";
import { getPosts } from "../../../lib/api";
import {
SITE,
canonical,
sanitizeSlug,
escapeHTML
} from "../../../lib/config";

export async function onRequest(context){

try{

const { kategori } = context.params;

const posts = await getPosts();

const filtered = posts.filter(
p => sanitizeSlug(p.kategori) === sanitizeSlug(kategori)
);

if(!filtered.length){
return new Response(
"Kategori tidak ditemukan",
{status:404}
);
}

const items = filtered.slice(0,24).map(p=>`
<a class="card" href="/amp/${sanitizeSlug(p.slug)}">

<amp-img
src="/og/${sanitizeSlug(p.slug)}"
width="400"
height="210"
layout="responsive"
alt="${escapeHTML(p.title)}">
</amp-img>

<h3>${escapeHTML(p.title)}</h3>

</a>
`).join("");

return renderAmp({

title:
`${kategori} AMP - ${SITE.name}`,

description:
`Kumpulan artikel AMP kategori ${kategori}`,

canonical:
canonical(
`/kategori/${sanitizeSlug(kategori)}`
),

content:`

<div class="hero">
<h1>${escapeHTML(kategori)}</h1>
<p>${filtered.length} artikel AMP tersedia</p>
</div>

<div class="grid">
${items}
</div>

<div class="section">
<h2>Tentang ${escapeHTML(kategori)}</h2>
<p>
Kumpulan artikel terbaru kategori
${escapeHTML(kategori)}
yang ringan, cepat, dan SEO friendly.
</p>
</div>

`

});

}catch(e){

return new Response(
"Error: "+e.message,
{status:500}
);

}

}
