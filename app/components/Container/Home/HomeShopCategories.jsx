"use client";
import React from "react";
import Image from "next/image";
import { motion, } from "framer-motion";

import CategoryImg2 from "@/app/assets/category_img2.svg";
import CategoryImg3 from "@/app/assets/category_img3.svg";
import CategoryImg4 from "@/app/assets/category_img4.svg";
import CategoryImg5 from "@/app/assets/category_img5.svg";

const HomeShopCategories = () => {
    const categories = [
        { name: "Toners", count: 23, image: CategoryImg2 },
        { name: "Serums", count: 23, image: CategoryImg3 },
        { name: "Moisturizer", count: 28, image: CategoryImg4 },
        { name: "Acne treatment", count: 28, image: CategoryImg5 },
        { name: "Sun screen", count: 28, image: CategoryImg2 },
        { name: "Face wash", count: 18, image: CategoryImg3 },
        { name: "Essence", count: 12, image: CategoryImg4 },
    ];

    const repeatedCategories = [...categories, ...categories];

    return (
        <div className="relative overflow-hidden py-4 md:py-6 ">
            <div className="flex justify-center items-center mb-8">
                <motion.h3
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-red-500 font-semibold text-[26px] md:text-[32px]"
                >
                    Shop by Categories
                </motion.h3>
            </div>
            <div className="overflow-hidden">
                <motion.div
                    className="flex gap-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                    }}
                >
                    {repeatedCategories?.map((category, index) => (
                        <div
                            key={index}
                            className="rounded-lg text-center flex flex-col items-center p-4 min-w-[180px] md:min-w-[200px]"
                        >
                            <div className="relative w-[150px] aspect-square mb-3">
                                <Image
                                    src={category?.image}
                                    alt={category?.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h4 className="text-gray-700 text-[15px] font-medium mb-1">
                                {category?.name}
                            </h4>
                            <p className="text-gray-500 font-medium text-xs md:text-sm">
                                ({category?.count} Products)
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="flex justify-end">
                <button className="text-[#BF6159]  px-5  py-4 text-sm font-medium duration-300 cursor-pointer">
                    View All
                </button>
            </div>
        </div>
    );
};

export default HomeShopCategories;
