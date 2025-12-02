import CategorySection from '@/app/components/Container/CategorySection/CategorySection'
import React from 'react'

async function page({ params }) {
    const { slug } = await params;
    return (
        <CategorySection slug={slug} />
    )
}

export default page