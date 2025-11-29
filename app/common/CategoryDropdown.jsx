"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

const CategoryDropdown = ({ subCategories = [], closeDropdown }) => {
    const [activeCategory, setActiveCategory] = useState(null);
    const grouped = subCategories.reduce((acc, item) => {
        const key = item.categoryName || "Others";
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {});

    const dropdownVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.95 },
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 w-full h-[500px] overflow-y-scroll bg-white shadow-xl border border-gray-200 z-50"
            >
                <div className="p-6 grid grid-cols-3 gap-8">

                    <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-300 pb-2">
                            CATEGORIES
                        </h3>

                        {Object.keys(grouped)?.map((cat) => (
                            <button
                                key={cat}
                                className={`w-full text-left text-gray-700 hover:text-green-500 font-medium transition-colors py-2 flex justify-between items-center ${activeCategory === cat ? "text-green-600" : ""
                                    }`}
                                onMouseEnter={() => setActiveCategory(cat)}
                            >
                                {cat}
                                <IoChevronDown
                                    className={`w-3 h-3 transform transition-transform ${activeCategory === cat ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-300 pb-2">
                            {activeCategory || "Browse"}
                        </h3>
                        {activeCategory && (
                            <div className="space-y-3">
                                {grouped[activeCategory]?.map((sub) => (
                                    <Link
                                        onClick={closeDropdown}
                                        key={sub?._id}
                                        href={`/products/${sub?.slug}`}
                                        className="block text-sm text-gray-600 hover:text-green-500 transition-colors"
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-300 pb-2">
                            Featured
                        </h3>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 text-sm mb-2">
                                Special Offers
                            </h4>
                            <p className="text-xs text-gray-600 mb-3">
                                Up to 50% off on selected items
                            </p>
                            <Link
                                href="/offers"
                                className="text-xs text-green-600 hover:text-green-700 font-medium"
                            >
                                View All Offers →
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CategoryDropdown;
