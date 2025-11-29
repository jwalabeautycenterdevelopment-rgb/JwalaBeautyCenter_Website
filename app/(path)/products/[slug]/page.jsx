import ProductSection from "@/app/components/Container/ProductSection/ProductSection";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    return {
        title: `${slug}  Product`,
        description: `Product details for ${slug}`,
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    return <ProductSection slug={slug} />;
}
