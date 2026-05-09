import { seo } from "./seo.js";

export function renderTemplate({ title = "" }) {

return `
<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
</head>
<body>
<h1>${title}</h1>
</body>
</html>
`;
}
