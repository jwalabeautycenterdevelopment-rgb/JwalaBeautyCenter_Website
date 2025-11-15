'use client';
import React from 'react';
import lipstick_img from "@/app/assets/lipstick_img.png";
import mascara_img from "@/app/assets/mascara_img.png";
import { DealCard } from '@/app/common/DealCard';

const deals = [
    {
        id: 1,
        title: 'Matte Lipstick',
        category: 'Make Up',
        price: 350,
        originalPrice: 350,
        rating: 4.5,
        discount: '20% off',
        image: lipstick_img,
        description: 'Lorem ipsum dolor sit amet consectetur. Tellus platea ipsum suspendisse risus sed ac at enim.',
    },
    {
        id: 2,
        title: 'Mascara',
        category: 'Make Up',
        price: 350,
        originalPrice: 350,
        rating: 4.5,
        discount: '20% off',
        image: mascara_img,
        description: 'Lorem ipsum dolor sit amet consectetur. Tellus platea ipsum suspendisse risus sed ac at enim.',
    },
];



const HomeDealsDay = () => {
    return (
        <section className="py-4 md:py-12 px-4 sm:px-6 lg:px-20 ">
            <div className="text-center mb-4 md:mb-12">
                <h2 className="text-4xl font-semibold">
                    <span className="text-rose-600">Deals</span> of the Day
                </h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {deals?.map((deal) => (
                    <DealCard key={deal?.id} deal={deal} />
                ))}
            </div>
        </section>
    );
};

export default HomeDealsDay;