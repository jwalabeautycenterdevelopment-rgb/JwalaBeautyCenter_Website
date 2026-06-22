import ProductDetails from "@/app/components/Container/ProductDetails/ProductDetails";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const productName = slug
        ?.split("-")
        ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");

    return {
        title: `${productName} | Jwala Beauty Center`,
        description: `Buy ${productName} online at Jwala Beauty Center.`,
        alternates: {
            canonical: `https://www.jwalabeauty.com/product/${slug}`,
        },
        openGraph: {
            title: `${productName} | Jwala Beauty Center`,
            description: `Buy ${productName} online at Jwala Beauty Center.`,
            url: `https://www.jwalabeauty.com/product/${slug}`,
            type: "website",
        },
    };
}
export default async function Page({ params }) {
    const { slug } = await params;

    return <ProductDetails slug={slug} />;
}