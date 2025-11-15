"use client"
import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import Image from 'next/image';

export const ProductCard = ({ product }) => {
    const [wishlisted, setWishlisted] = useState(false);

    const handleAddToCart = () => {
        console.log("jii");

    };

    return (
        <div className="group relative rounded-2xl overflow-hidden transition-all duration-300">
            <div className="absolute top-3 left-3 z-10 bg-[#254226] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {product?.discount}
            </div>

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
                <button
                    onClick={handleAddToCart}
                    className="p-2 bg-white text-black rounded-full shadow-md hover:scale-110 transition"
                >
                    <BsCartPlus className="text-xl" />
                </button>
            </div>
            <div className="aspect-square overflow-hidden">
                <Image
                    src={product?.image}
                    alt={product?.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-900"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 font-medium">{product?.category}</p>
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400 text-sm font-semibold">★</span>
                        <span className="font-semibold text-md text-gray-700">{product?.rating}</span>
                    </div>
                </div>
                <h3 className="font-semibold text-md mt-1 truncate">{product?.title}</h3>
                <div className="flex items-center gap-2 mt-2 text_primary">
                    <span className="text-sm font-bold">Rs.{product?.price}/-</span>
                    {product?.originalPrice &&
                        <span className="text-xs text-gray-500 line-through font-semibold">
                            Rs.{product?.originalPrice}/-
                        </span>
                    }
                </div>
            </div>
        </div>
    );
};
