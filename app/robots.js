export default function robots() {
  const isProd = process.env.NEXT_PUBLIC_NODE_ENV === "production";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: isProd ? "/admin/" : "",
      },
    ],
    sitemap: "https://www.jwalabeautycenter.com/sitemap.xml",
  };
}
