import ProductSection from "@/app/components/Container/ProductSection/ProductSection";
export function generateMetadata({ params }) {
    const { slug } = params;
    return {
        title: `${slug} Product`,
        description: `Product details for ${slug}`,
        keywords: ["product", "details"],
        alternates: {
            canonical: `/products/${slug}`,
        }
    };
}


export default async function Page({ params }) {
    const { slug } = params;
    return <ProductSection slug={slug} />;
}
