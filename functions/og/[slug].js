import { getPost } from "../../lib/api";
import { sanitizeSlug, SITE } from "../../lib/config";

export async function onRequest(context) {
  const { slug } = context.params;

  const cleanSlug = sanitizeSlug(slug);
  const post = await getPost(cleanSlug);

  const title = post?.title || "Artikel";
  const subtitle = post?.meta_description || "Baca artikel terbaru";

  const width = 1200;
  const height = 630;

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // ======================
  // BACKGROUND
  // ======================
  ctx.fillStyle = "#0b0b0b";
  ctx.fillRect(0, 0, width, height);

  // ======================
  // BORDER ACCENT
  // ======================
  ctx.strokeStyle = "#ff2a00";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, width, height);

  // ======================
  // TITLE
  // ======================
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 60px Arial";

  wrapText(ctx, title, 80, 200, 1000, 70);

  // ======================
  // SUBTITLE
  // ======================
  ctx.fillStyle = "#cccccc";
  ctx.font = "30px Arial";
  ctx.fillText(subtitle, 80, 500);

  // ======================
  // BRAND
  // ======================
  ctx.fillStyle = "#ffcc00";
  ctx.font = "bold 28px Arial";
  ctx.fillText(SITE.name, 80, 580);

  const png = await canvas.convertToBlob();

  return new Response(png, {
    headers: {
      "content-type": "image/png",
      "cache-control": "public,max-age=86400"
    }
  });
}

// ======================
// TEXT WRAP HELPER
// ======================
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y);
}
