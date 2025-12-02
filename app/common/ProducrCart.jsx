"use client";
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import CustomImage from './Image';

export const ProductCard = ({ product, isHover = true }) => {
    const [wishlisted, setWishlisted] = useState(false);
    const variant = product?.variants?.length > 0 ? product.variants[0] : null;
    const image =
        variant?.variantImages?.[0] ||
        product?.productImages?.[0] ||
        "/no-image.png";

    const price = variant?.offerPrice || product?.offerPrice || product?.price;
    const originalPrice = variant?.price || product?.price;
    const categoryName = product?.category?.name || "Unknown";
    const title = product?.name;

    const discount =
        originalPrice && price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

    return (
        <div className="group relative rounded-2xl overflow-hidden transition-all duration-300">
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-[#254226] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {discount}% off
                </div>
            )}
            {
                isHover &&
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setWishlisted(!wishlisted)}
                        className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
                    >
                        {wishlisted ? (
                            <AiFillHeart className="text-red-500 text-xl" />
                        ) : (
                            <AiOutlineHeart className="text-gray-600 text-xl" />
                        )}
                    </button>

                    <button className="p-2 bg-white text-black rounded-full shadow-md hover:scale-110 transition">
                        <BsCartPlus className="text-xl" />
                    </button>
                </div>
            }
            <div className="aspect-square overflow-hidden">
                <CustomImage
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-900"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center gap-1">
                    <p className="text-xs text-gray-500 font-medium truncate">
                        {categoryName}
                    </p>
                    <div className="flex items-center gap-1 ">
                        <span className="text-yellow-400 text-sm font-semibold">★</span>
                        <span className="font-medium text-xs text-gray-700">
                            {product?.rating || 4.5}
                        </span>
                    </div>
                </div>
                <h3 className="font-semibold text-md  truncate">{title}</h3>
                <div className="flex items-center gap-2 my-1 text_primary">
                    <span className="text-sm font-bold">₹{price}</span>
                    {originalPrice > price && (
                        <span className="text-xs text-gray-500 line-through font-semibold">
                            ₹{originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
