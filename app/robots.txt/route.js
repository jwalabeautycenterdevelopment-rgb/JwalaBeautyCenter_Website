export async function GET() {
  const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";
  const robots = `
User-agent: *
${isProd ? "Disallow: /admin/" : "Disallow:"}
Allow: /

Sitemap: https://www.jwalabeautycenter.com/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
