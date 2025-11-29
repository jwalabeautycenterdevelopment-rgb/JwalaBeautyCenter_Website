"use client";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import Image from 'next/image';
import { BsCart2 } from 'react-icons/bs';
import { IoIosArrowRoundForward } from "react-icons/io";
export const DealCard = ({ deal }) => {
    const [wishlisted, setWishlisted] = useState(false);

    const handleAddToCart = () => {

    };

    return (
        <div className="group bg-white rounded-3xl py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row items-center gap-6 border border-gray-100">
            <div className="relative w-full md:w-1/2 h-64 md:h-50">
                <div className="absolute top-2 md:top-1  left-15 md:left-10 bg-[#254226] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    {deal?.discount}
                </div>
                <div className="absolute right-15 md:right-9 top-5  flex items-center flex-col justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button
                        onClick={handleAddToCart}
                        className="bg-white text-black p-2.5 rounded-full flex items-center gap-1 shadow hover:bg-gray-200 transition"
                    >
                        <BsCart2 />
                    </button>
                    <button
                        onClick={() => setWishlisted(!wishlisted)}
                        className="p-2.5 bg-white rounded-full shadow hover:bg-gray-200 transition"
                    >
                        {wishlisted ? (
                            <AiFillHeart className="text-red-500 text-xl" />
                        ) : (
                            <AiOutlineHeart className="text-gray-600 text-xl" />
                        )}
                    </button>
                </div>
                <Image
                    src={deal?.image}
                    alt={deal?.title}
                    fill
                    className="object-contain drop-shadow-md"
                />
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className='flex justify-center md:justify-between items-center'>
                    <p className="text-xs text-gray-500 font-medium">{deal?.category}</p>
                    <div className="flex items-center gap-1 pe-5">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm font-medium text-gray-700">{deal?.rating}</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold mt-1">{deal?.title}</h3>
                <p className="text-sm text-gray-600 mt-3 line-clamp-2">{deal?.description}</p>
                <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                    <span className="text-2xl font-bold text-rose-600">Rs.{deal?.price}/-</span>
                    <span className="text-sm text-gray-500 font-medium line-through">Rs.{deal?.originalPrice}/-</span>
                </div>
                <div className='flex justify-center md:justify-start '>
                    <button className='font-semibold pt-2 flex items-center'>Shop Now
                        <IoIosArrowRoundForward size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};
