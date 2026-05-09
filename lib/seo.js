import {
  SITE,
  canonical,
  sanitizeSlug
} from "./config";

export function seo({
  title = SITE.name,
  description = SITE.description,
  post = null,
  slug = "",
  image = "",
  type = "article"
}) {

  // ======================
  // URL HANDLER
  // ======================
  const path = post
    ? "/" + sanitizeSlug(post.slug)
    : (slug ? "/" + sanitizeSlug(slug) : "/");

  const url = canonical(path);
  const ogImage = image || SITE.domain + "/og/default";

  const kategori = post?.kategori
    ? sanitizeSlug(post.kategori)
    : "";

  // ======================
  // BLOG SCHEMA
  // ======================
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: ogImage,
    mainEntityOfPage: url,
    author: {
      "@type": "Organization",
      name: SITE.name
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name
    }
  };

  // ======================
  // BREADCRUMB SCHEMA
  // ======================
  const breadcrumb = post ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.domain + "/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.kategori || "Kategori",
        item: SITE.domain + "/kategori/" + kategori
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url
      }
    ]
  } : null;

  // ======================
  // OUTPUT SEO TAGS
  // ======================
  return `

<title>${escapeHTML(title)}</title>

<meta name="description" content="${escapeHTML(description)}">

<meta name="robots" content="index,follow,max-image-preview:large">

<link rel="canonical" href="${url}">

<meta property="og:type" content="${type}">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${escapeHTML(title)}">
<meta property="og:description" content="${escapeHTML(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHTML(title)}">
<meta name="twitter:description" content="${escapeHTML(description)}">
<meta name="twitter:image" content="${ogImage}">

<script type="application/ld+json">
${JSON.stringify(blogSchema)}
</script>

${breadcrumb ? `
<script type="application/ld+json">
${JSON.stringify(breadcrumb)}
</script>
` : ""}

`;
}

// ======================
// ESCAPE HTML SAFE
// ======================
function escapeHTML(str = "") {
  return String(str).replace(/[&<>"]/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  }[c]));
}
