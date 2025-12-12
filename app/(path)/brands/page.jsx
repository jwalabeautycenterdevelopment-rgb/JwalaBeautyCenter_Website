import BrandSection from '@/app/components/Container/BrandSection/BrandSection'
import React from 'react'

export const metadata = {
    title: "Top Brands | Best Brand Collections",
    description: "Explore top brand collections with premium quality products. Find trusted and popular brands with the best offers.",
    keywords: [
        "brands",
        "top brands",
        "brand collections",
        "premium brands",
        "best brands"
    ],
    openGraph: {
        title: "Top Brands | Best Brand Collections",
        description: "Explore top brand collections with premium quality products.",
        url: "https://jwalabeautycenter.com/brands",
        siteName: "Your Website Name",
        images: [
            {
                url: "/brand-banner.jpg",
                width: 1200,
                height: 630,
            }
        ],
        type: "website",
    },
    alternates: {
        canonical: "https://jwalabeautycenter.com/brands",
    },
};


function page() {
    return (
        <BrandSection />
    )
}

export default page
