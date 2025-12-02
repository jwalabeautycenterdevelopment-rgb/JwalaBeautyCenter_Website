'use client';
import React, { useEffect } from 'react';
import { DealCard } from '@/app/common/DealCard';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveDailyDeals } from '@/app/store/slice/dealsSlice';


const HomeDealsDay = () => {
    const dispatch = useDispatch()
    const { deals, hasFetched } = useSelector((state) => state.deals);

    useEffect(() => {
        if (!hasFetched) {
            dispatch(getActiveDailyDeals());
        }
    }, [dispatch, hasFetched]);

    return (
        <section className="py-4 md:py-12 px-4 sm:px-6 lg:px-20 ">
            <div className="text-center mb-4 md:mb-12">
                <h2 className="text-4xl font-semibold">
                    <span className="text-rose-600">Deals</span> of the Day
                </h2>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {deals?.map((deal) => (
                    <DealCard key={deal?._id} deal={deal} />
                ))}
            </div>
        </section>
    );
};

export default HomeDealsDay;