import CategorySection from "@/app/components/Container/CategorySection/CategorySection";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const categoryName = slug
        ?.split("-")
        ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(" ");
    return {
        title: `${categoryName} | Jwala Beauty Center`,
        description: `Shop ${categoryName} products at Jwala Beauty Center. Explore premium beauty and cosmetic products at the best prices.`,
        alternates: {
            canonical: `https://www.jwalabeauty.com/category/${slug}`,
        },
        openGraph: {
            title: `${categoryName} | Jwala Beauty Center`,
            description: `Shop ${categoryName} products at Jwala Beauty Center.`,
            url: `https://www.jwalabeauty.com/category/${slug}`,
            type: "website",
        },
    };
}

export default async function Page({ params }) {
    const { slug } = await params;

    return <CategorySection slug={slug} />;
}