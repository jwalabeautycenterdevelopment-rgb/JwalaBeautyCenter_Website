"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import CustomImage from "@/app/common/Image";
import { getUserSubCategory } from "@/app/store/slice/subCategorySlice";
import Link from "next/link";

const HomeShopCategories = () => {
    const dispatch = useDispatch();
    const { subCategories, hasFetched } = useSelector((state) => state.subCategory);

    useEffect(() => {
        if (!hasFetched) {
            dispatch(getUserSubCategory());
        }
    }, [dispatch, hasFetched]);

    const repeatedCategories = [...subCategories, ...subCategories];

    return (
        <div className="relative overflow-hidden py-4 md:py-6">
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
            <div className="overflow-x-auto md:overflow-hidden scrollbar-hide">
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
                        <Link
                            key={index}
                            href={`/products/${category?.slug}`}>
                            <div
                                className="rounded-lg text-center flex flex-col items-center p-4 min-w-[180px] md:min-w-[200px]"
                            >
                                <div className="group w-[150px] aspect-square mb-3">
                                    <div
                                        className="relative w-full h-full block overflow-hidden rounded-full"
                                    >
                                        <CustomImage
                                            src={category?.image || "/placeholder.png"}
                                            alt={category?.name || "Category"}
                                            fill
                                            priority={index === 0}
                                            className="object-contain transform transition-transform duration-600 ease-out group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                <h4 className="text-gray-700 text-[15px] font-medium mb-1">
                                    {category?.name?.length > 10
                                        ? category?.name.substring(0, 16) + "…"
                                        : category?.name}
                                </h4>

                                <p className="text-gray-500 font-medium text-xs md:text-sm">
                                    ({category?.productCount} Products)
                                </p>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default HomeShopCategories;
