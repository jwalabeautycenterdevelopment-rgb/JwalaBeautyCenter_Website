"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomImage from "@/app/common/Image";
import OfferImg from "@/app/assets/offersvg.svg";
import { formatPrice, } from "@/app/utils/priceCalculate";
import { FaBox, FaStar } from "react-icons/fa";
import { discountOffers } from "@/app/store/slice/offerSlice";
import OfferMarquee from "@/app/common/OfferMarquee";

const GetallOfferSection = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { discountoffersList, hasFetched } = useSelector((state) => state.offers);
    useEffect(() => {
        if (!hasFetched) {
            dispatch(discountOffers());
        }
    }, [dispatch, hasFetched]);

    const handleNavigate = (id) => {
        router.push(`/product/${id}`);
    };

    const renderRating = (rating) => (
        <div className="flex items-center gap-1 bg-green-700 rounded-full px-2 text-xs py-1 text-white font-semibold">
            <span>{rating}</span>
            <FaStar size={10} />
        </div>
    );

    const marqueeText = discountoffersList.slice(0, 2)
        ?.map((offer) => `Save Big on Care Deals — Up to ${offer?.discount}% OFF! Limited Time Offer!`)
        .join("   ⚡   ");
    return (
        <div>
            <div className="relative w-full h-[100px] lg:h-[300px] overflow-hidden">
                <Image
                    src={OfferImg}
                    alt="Offer Banner"
                    fill
                    className="object-cover"
                />
            </div>
            <OfferMarquee text={marqueeText} />
            <div className="px-4 md:px-20  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-10">
                {discountoffersList?.map((offer) => {
                    const product = offer || {};
                    const variant = product?.variants?.length > 0 ? product.variants[0] : null;
                    const price = variant?.price ?? product?.price ?? 0;
                    const img =
                        product?.productImages?.[0] ||
                        variant?.variantImages?.[0] ||
                        null;
                    const showImage = img && img !== "string";
                    const discountPercent = offer?.discount || 0;
                    const offerPriceFinal = price - (price * discountPercent) / 100;
                    return (
                        <div
                            key={offer._id}
                            className="group relative overflow-hidden transition-all duration-300 cursor-pointer"
                            onClick={() => handleNavigate(product.slug)}
                        >
                            <div className="relative h-60 bg-gray-50 overflow-hidden rounded-2xl">
                                {showImage ? (
                                    <CustomImage
                                        src={img}
                                        alt={offer?.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <FaBox className="text-4xl text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="px-2 mt-3">
                                <h3 className=" text-gray-900 text-sm line-clamp-2">
                                    {offer?.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-lg font-bold text-gray-900">
                                        {formatPrice(offerPriceFinal)}
                                    </span>
                                    {price > 0 && (
                                        <span className="text-sm text-gray-500 line-through">
                                            {formatPrice(price)}
                                        </span>
                                    )}
                                    <span className="bg_primary px-2 py-1 text-white text-xs rounded-full">
                                        {discountPercent}% OFF
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <div className="flex items-center gap-2">
                                        {renderRating(product?.rating || 4.3)}
                                        <span className="text-xs text-gray-500">
                                            ({product?.reviewCount || 1145})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default GetallOfferSection;
