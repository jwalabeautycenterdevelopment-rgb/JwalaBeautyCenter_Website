import OfferSection from '@/app/components/Container/OfferSection/OfferSection';
import React from 'react';
export default async function Page({ params }) {
    const { slug } = await params;
    return <OfferSection slug={slug} />;
}
