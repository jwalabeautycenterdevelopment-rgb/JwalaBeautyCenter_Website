"use client";
import MainLayout from "@/app/common/MainLayout";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfferById } from "@/app/store/slice/offerSlice";
import { calculateDiscount, formatPrice } from "@/app/utils/priceCalculate";
import { FaBox, FaStar } from "react-icons/fa";
import CustomImage from "@/app/common/Image";
import OfferImg from "@/app/assets/offersvg.svg";
import OfferMarquee from "@/app/common/OfferMarquee";
import { useRouter } from "next/navigation";
const OfferSection = ({ slug }) => {
    const { singleOffer } = useSelector((state) => state.offers)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        if (slug) dispatch(fetchOfferById(slug))
    }, [slug, dispatch])

    const handleNavigate = (id) => {
        router.push(`/product/${id}`);
    };

    const renderRating = (rating) => (
        <div className="flex items-center gap-1 bg-green-700 rounded-full px-2 text-xs py-1 text-white font-semibold">
            <span>{rating}</span>
            <FaStar size={10} />
        </div>
    );
    return (
        <MainLayout>
            <div className="relative w-full h-[100px] lg:h-[300px] overflow-hidden">
                <Image
                    src={OfferImg}
                    alt="Offer Banner"
                    fill
                    className="object-cover"
                />
            </div>
            <OfferMarquee text={`Save Big on Care Deals — Up to ${singleOffer?.percentage}% OFF! Limited Time Offer!`} />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  px-5 md:px-20">
                {singleOffer?.products?.map((item, index) => {
                    const product = item?.product || {};
                    const variant = product?.variants?.[0];
                    const img =
                        product?.productImages?.[0] ||
                        variant?.variantImages?.[0] ||
                        null;
                    const showImage = img && img !== "string";
                    const price = variant?.price ?? product?.price ?? 0;
                    const offerPrice = variant?.offerPrice ?? product?.offerPrice ?? 0;
                    const discountPercent = calculateDiscount(price, offerPrice);
                    const hasDiscount = discountPercent > 0;
                    const stock = variant?.stock ?? 0;

                    return (
                        <div
                            key={index}
                            className="group relative overflow-hidden transition-all duration-300 cursor-pointer"
                            onClick={() => handleNavigate(product?.slug)}
                        >
                            <div className="relative h-60 bg-gray-50 overflow-hidden rounded-2xl">
                                {showImage ? (
                                    <CustomImage
                                        src={img}
                                        alt={product?.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <FaBox className="text-4xl text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="px-2 m-3">
                                <h3 className="font-normal text-gray-800 line-clamp-2 h-10 text-sm leading-tight">
                                    {product?.name?.length > 40
                                        ? product?.name.substring(0, 52) + "…"
                                        : product?.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    {hasDiscount ? (
                                        <>
                                            <span className="text-lg font-bold text-gray-900">
                                                {formatPrice(offerPrice)}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                {formatPrice(price)}
                                            </span>

                                            <span className="bg_primary px-2 py-1 text-white text-xs rounded-full z-10">
                                                {discountPercent}% OFF
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-lg font-bold text-gray-900">
                                            {formatPrice(price)}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    {stock > 0 ? (
                                        <span className="text-xs text-green-600 font-medium">
                                            In Stock ({stock} left)
                                        </span>
                                    ) : (
                                        <span className="text-xs text-red-600 font-medium">
                                            Out of Stock
                                        </span>
                                    )}
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
        </MainLayout>
    );
};

export default OfferSection;
