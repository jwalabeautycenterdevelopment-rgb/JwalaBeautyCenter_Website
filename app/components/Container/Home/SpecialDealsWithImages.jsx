"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "@/app/store/slice/offerSlice";
import CustomImage from "@/app/common/Image";
import { useRouter } from "next/navigation";

const SpecialDealsWithImages = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { offersList, hasFetched } = useSelector((state) => state.offers);
    useEffect(() => {
        if (!hasFetched) {
            dispatch(getOffers());
        }
    }, [dispatch, hasFetched]);

    const handleNavigate = (offerId) => {
        router.push(`/offers/${offerId}`);
    };

    if (!offersList || offersList.length === 0) {
        return (
            <div className="py-12 text-center text-gray-500">
                No offers available at the moment.
            </div>
        );
    }

    return (
        <div className="py-4 md:py-12 px-4 sm:px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {offersList.slice(0, 2).map((deal, index) => {
                        const bgColor = index % 2 === 0 ? "#41263A" : "#F3BFE5";
                        const buttonColor = index % 2 === 0 ? "#F3BFE5" : "#41263A";
                        const textColor = bgColor === "#41263A" ? "#FFFFFF" : "##FFFFFF";
                        return (
                            <div
                                key={deal._id}
                                className="rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
                                style={{ backgroundColor: bgColor }}
                            >
                                <div className="flex flex-col-reverse md:flex-row items-center">
                                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-white">
                                        <span
                                            className="text-sm font-semibold py-1 px-3 rounded-full w-fit mb-2 md:mb-3"
                                            style={{
                                                backgroundColor: buttonColor,
                                                color: textColor,
                                            }}
                                        >
                                            Flat {deal.percentage}% Discount
                                        </span>
                                        <h3 className="text-2xl md:text-[32px] font-semibold leading-tight mb-2 md:mb-3">
                                            {deal.title}
                                        </h3>
                                        <p className="text-sm md:text-base leading-relaxed opacity-90 mb-4 md:mb-6">
                                            {deal.description}
                                        </p>
                                        <button
                                            onClick={() => handleNavigate(deal._id)}
                                            className="inline-flex items-center cursor-pointer gap-2 font-semibold py-2 px-5 md:px-6 rounded-full transition-colors duration-300 w-fit text-sm md:text-base"
                                            style={{
                                                backgroundColor: buttonColor,
                                                color: textColor,
                                            }}
                                        >
                                            Shop Now
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full md:w-1/2 relative h-48 sm:h-64 md:h-[400px]">
                                        {deal.offerPhoto?.[0] ? (
                                            <CustomImage
                                                src={deal.offerPhoto[0]}
                                                alt={deal.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="bg-gray-200 w-full h-full" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SpecialDealsWithImages;
