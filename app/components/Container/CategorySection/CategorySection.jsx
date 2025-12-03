"use client";
import MainLayout from "@/app/common/MainLayout";
import { categoriesBySlug } from "@/app/store/slice/subCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { getCategoryProducts } from "@/app/store/slice/productsSlice";
import { ProductSkeleton } from "@/app/common/Skeleton";
import { NoProductFound } from "@/app/common/Animation";
import CustomImage from "@/app/common/Image";
import { useRouter } from "next/navigation";
import {
    calculateDiscount,
    formatPrice,
    getProductCardPrice,
} from "@/app/utils/priceCalculate";
import { FaBox, FaStar } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const CategorySection = ({ slug }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState(null);

    const { Category } = useSelector((state) => state.subCategory);
    const { categoryProducts, userCategoryLoading } = useSelector(
        (state) => state.products
    );
    const subcategories = Category?.subcategories || [];

    useEffect(() => {
        if (slug) dispatch(categoriesBySlug(slug));
    }, [slug, dispatch]);

    useEffect(() => {
        if (subcategories?.length > 0) {
            setActive(subcategories[0]._id);
        }
    }, [subcategories]);

    useEffect(() => {
        if (active) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [active]);

    useEffect(() => {
        if (!active) return;
        const selected = subcategories.find((item) => item._id === active);
        if (selected) {
            const encodedSlug = encodeURIComponent(selected.slug);
            dispatch(getCategoryProducts(encodedSlug));
        }
    }, [active, subcategories, dispatch]);

    const handleNavigate = (item) => {
        router.push(`/product/${item.slug}`);
    };

    const renderRating = (rating) => (
        <div className="flex items-center gap-1 bg-green-700 rounded-full px-2 text-xs py-1 text-white font-semibold">
            <span>{rating}</span>
            <FaStar size={10} />
        </div>
    );

    return (
        <MainLayout className="py-4 md:py-12 bg-[#FFF4E5] px-4 sm:px-6 lg:px-20 min-h-screen">
            {userCategoryLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    <ProductSkeleton count={8} />
                </div>
            )}

            {!userCategoryLoading && categoryProducts?.length === 0 && (
                <NoProductFound />
            )}
            {!userCategoryLoading && categoryProducts?.length > 0 && (
                <div>
                    <div className="mb-3">
                        <ul className="flex gap-1 items-center text-sm font-medium capitalize">
                            <li>
                                <Link href={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <IoIosArrowForward className="border-gray-300 " />
                            </li>
                            <li>
                                {Category?.category?.name || slug}
                            </li>
                            <li>
                                <IoIosArrowForward className="border-gray-300 " />
                            </li>
                            <li className="text-blue-600">
                                {slug}
                            </li>
                        </ul>
                        <h2 className="text-red-500 font-semibold text-[26px] md:text-[32px]">
                            <span className="text-gray-900">{Category?.category?.name} </span>
                            <span className="text-rose-600">Sub Categories</span>
                        </h2>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 min-w-max">
                            {subcategories?.map((cat) => {
                                const isActive = active === cat._id;
                                return (
                                    <button
                                        key={cat._id}
                                        onClick={() => setActive(cat._id)}
                                        className={clsx(
                                            "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border",
                                            isActive
                                                ? "bg-rose-600 text-white border-rose-600"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600"
                                        )}
                                    >
                                        {cat.name.substring(0, 12)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-4 md:my-12">
                        {categoryProducts?.map((product) => {
                            const img =
                                product?.productImages?.[0] ||
                                product?.variants?.[0]?.variantImages?.[0] ||
                                null;

                            const showImage = img && img !== "string";

                            const { price, offerPrice } = getProductCardPrice(product);
                            const discountPercent = calculateDiscount(price, offerPrice);
                            const hasDiscount = discountPercent >= 0;

                            const stock =
                                product?.stock || product?.variants?.[0]?.stock || 0;

                            return (
                                <div
                                    key={product._id}
                                    className="group relative overflow-hidden transition-all duration-300 cursor-pointer"
                                    onClick={() => handleNavigate(product)}
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
                                        <div className="absolute top-2 right-3 flex flex-col gap-2">
                                            {product?.isBestSeller && (
                                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-md text-xs font-semibold shadow">
                                                    Best Seller
                                                </span>
                                            )}
                                            {product?.isNewArrival && (
                                                <span className="inline-block px-3 py-1 text-white text-xs font-semibold bg-linear-to-r from-orange-400 to-red-500 skew-x-[-7deg] shadow-md rounded-sm">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-2 m-3">
                                        <h3 className="font-normal text-gray-800 line-clamp-2 h-10 text-sm leading-tight">
                                            {product.name.length > 40
                                                ? product.name.substring(0, 52) + "…"
                                                : product.name}
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
                                                    {hasDiscount && (
                                                        <span className="bg_primary px-2 py-1 text-white text-xs rounded-full z-10">
                                                            {discountPercent}% OFF
                                                        </span>
                                                    )}
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
                </div>
            )}
        </MainLayout>
    );
};

export default CategorySection;
