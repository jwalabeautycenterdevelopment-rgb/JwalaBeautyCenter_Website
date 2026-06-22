export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://www.jwalabeauty.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is missing");
    return [];
  }

  const staticUrls = [
    "",
    "brands",
    "offers",
    "cart",
    "wishlist",
    "my-orders",
    "profile",
    "policy/terms",
    "policy/shipping",
  ].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: new Date(),
    changeFrequency: page === "" ? "daily" : "weekly",
    priority: page === "" ? 1 : 0.8,
  }));

  try {
    const productsRes = await fetch(`${apiUrl}/user/products`, {
      next: { revalidate: 3600 },
    });
    const productData = productsRes.ok ? await productsRes.json() : null;
    const products = productData?.data?.products || [];

    const productUrls = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: new Date(
        product.updatedAt || product.createdAt || Date.now(),
      ),
      changeFrequency: "weekly",
      priority: 0.9,
    }));
    return [...staticUrls, ...productUrls];
  } catch (error) {
    console.error("SITEMAP ERROR:", error);

    return staticUrls;
  }
}
