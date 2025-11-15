"use client";
import React from "react";
import Image from "next/image";
import hairCareImage from "@/app/assets/hair-care-img.png";

const SpecialDealsWithImages = () => {
    const deals = [
        {
            id: 1,
            title: "Special Hair Care Deals",
            description: "Lorem ipsum dolor sit amet",
            discount: "Flat 25% Discount",
            image: hairCareImage,
            bgColor: "#41263A",
            buttonColor: "#F3BFE5",
        },
        {
            id: 2,
            title: "Save Big on Care Deals",
            description: "Lorem ipsum dolor sit amet",
            discount: "Flat 25% Discount",
            image: hairCareImage,
            bgColor: "#F3BFE5",
            buttonColor: "#41263A",
        },
    ];

    return (
        <div className="py-4 md:py-12 px-4 sm:px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {deals?.map((deal) => (
                        <div
                            key={deal?.id}
                            className="rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
                            style={{ backgroundColor: deal?.bgColor }}
                        >
                            <div className="flex flex-col-reverse md:flex-row items-center">
                                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center text-white">
                                    <span
                                        className="text-sm font-semibold py-1 px-3 rounded-full w-fit mb-2 md:mb-3"
                                        style={{
                                            backgroundColor: deal?.bgColor === "#41263A" ? "#F3BFE5" : "#41263A",
                                            color: deal.bgColor === "#41263A" ? "#41263A" : "#F3BFE5",
                                        }}
                                    >
                                        {deal?.discount}
                                    </span>

                                    <h3 className="text-2xl md:text-[32px] font-semibold leading-tight mb-2 md:mb-3">
                                        {deal?.title}
                                    </h3>
                                    <p className="text-sm md:text-base leading-relaxed opacity-90 mb-4 md:mb-6">
                                        {deal?.description}
                                    </p>

                                    <button
                                        className="inline-flex items-center gap-2 font-semibold py-2 px-5 md:px-6 rounded-full transition-colors duration-300 w-fit text-sm md:text-base"
                                        style={{
                                            backgroundColor: deal.buttonColor,
                                            color: deal.bgColor === "#41263A" ? "#41263A" : "#FFFFFF",
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
                                    <Image
                                        src={deal?.image}
                                        alt={deal?.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SpecialDealsWithImages;
