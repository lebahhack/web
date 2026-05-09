export function renderTemplate({
amp = false,
seo = "",
content = "",
siteName = "AI MR DENNIS"
}) {

const html = `<!DOCTYPE html>
<html ${amp ? "amp" : ""} lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">

${seo}

${amp ? `<script async src="https://cdn.ampproject.org/v0.js"></script>` : ""}
</head>

<body>
${content}
</body>
</html>`;

return html;
}
