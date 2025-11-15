"use client"
import { ProductCard } from "@/app/common/ProducrCart";
import producrImg1 from "@/app/assets/product1.png";
import producrImg2 from "@/app/assets/product2.png";
import producrImg3 from "@/app/assets/product3.png";
import producrImg4 from "@/app/assets/product4.png";
import clsx from 'clsx';
import { useState } from "react";

const products = [
    { id: 1, title: 'SilkSculpt Serum', category: 'Skin Care', price: 350, originalPrice: 350, rating: 4.5, discount: '20% off', image: producrImg1 },
    { id: 2, title: 'Comb', category: 'Hair Care', price: 350, originalPrice: 350, rating: 4.5, discount: '20% off', image: producrImg2 },
    { id: 3, title: 'Lakme Sunscreen', category: 'Skin Care', price: 350, originalPrice: 350, rating: 4.5, discount: '20% off', image: producrImg3 },
    { id: 4, title: 'Hand Lotion', category: 'Skin Care', price: 350, originalPrice: 350, rating: 4.5, discount: '20% off', image: producrImg4 },
];

const categories = [
    { id: 'all', label: 'All', color: 'bg-red-600 text-white' },
    { id: 'skin', label: 'Skin Care' },
    { id: 'makeup', label: 'Make Up' },
    { id: 'hair', label: 'Hair Care' },
    { id: 'fragrance', label: 'Fragrances' },
    { id: 'nail', label: 'Nail Care' },
    { id: 'body', label: 'Body Care' },
    { id: 'accessories', label: 'Accessories' },
];

const OurProducts = () => {
    const [active, setActive] = useState('all');
    return (
        <section className="py-4 md:py-12  px-4 sm:px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <p className="text-sm font-medium text-black">Our Products</p>
                    <h2 className="text-2xl md:text-4xl font-semibold md:mt-2">
                        <span className="text-gray-900">Our </span>
                        <span className="text-rose-600">Best Sellers Products</span>
                    </h2>
                </div>
                <div className="overflow-x-auto py-0 md:py-4 scrollbar-hide">
                    <div className="flex gap-3 min-w-max">
                        {categories?.map((cat) => {
                            const isActive = active === cat?.id;
                            const baseClass =
                                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border"; // added border
                            return (
                                <button
                                    key={cat?.id}
                                    onClick={() => setActive(cat?.id)}
                                    className={clsx(
                                        baseClass,
                                        isActive
                                            ? cat.color || "bg-rose-600 text-white border-rose-600"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-red-500 hover:text-red-600"
                                    )}
                                >
                                    {cat?.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                    {products?.map((product) => (
                        <ProductCard key={product?.id} product={product} />
                    ))}
                </div>
            </div>
        </section>

    );
};

export default OurProducts;