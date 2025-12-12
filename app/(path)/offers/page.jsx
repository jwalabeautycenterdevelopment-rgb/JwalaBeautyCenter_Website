import GetallOfferSection from "@/app/components/Container/OfferSection/GetallOfferSection";
export const metadata = {
    title: "Latest Offers | Best Deals & Discounts",
    description: "Explore the latest offers, exclusive deals, and top discounts available right now.",
    keywords: [
        "offers",
        "best offers",
        "discounts",
        "deals",
        "exclusive offers",
        "special discounts",
        "latest offers"
    ],
    metadataBase: new URL("https://jwalabeautycenter.com"),
    openGraph: {
        title: "Latest Offers | Best Deals & Discounts",
        description: "Discover amazing deals and special discounts.",
        url: "https://jwalabeautycenter.com/offers",
        images: [
            {
                url: "/offer-banner.jpg",
                width: 1200,
                height: 630,
            }
        ],
        type: "website",
    },
    alternates: {
        canonical: "/offers",
    },
};

function Page() {
    return (
        <GetallOfferSection />
    );
}

export default Page;
