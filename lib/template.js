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
${content}

</body>
</html>`;
}
