"use client";
import React from "react";
import Image from "next/image";
import { ProductCard } from "@/app/common/ProducrCart";
import Arrival1 from "@/app/assets/arrival_img_1.jpg";
import Arrival2 from "@/app/assets/arrival_img_2.png";
import Arrival3 from "@/app/assets/arrival_img_3.png";
import Arrival4 from "@/app/assets/arrival_img_4.png";
import Arrival5 from "@/app/assets/arrival_img_5.png";
import Arrival6 from "@/app/assets/arrival_img_6.png";
import Arrival7 from "@/app/assets/arrival_img_7.png";

const products = [
    { id: 2, title: "Body Lotion", category: "Skin Care", price: 350, discount: '20% off', rating: 4.5, image: Arrival2 },
    { id: 3, title: "Gel Cleanser", category: "Skin Care", price: 350, discount: '20% off', rating: 4.5, image: Arrival3 },
    { id: 4, title: "Straightener", category: "Hair Care", price: 350, discount: '20% off', rating: 4.5, image: Arrival4 },
    { id: 5, title: "Moisturizer", category: "Skin Care", price: 350, discount: '20% off', rating: 4.5, image: Arrival5 },
    { id: 6, title: "Bio Body Cream", category: "Skin Care", price: 350, discount: '20% off', rating: 4.5, image: Arrival6 },
    { id: 7, title: "Serum A", category: "Skin Care", price: 350, discount: '20% off', rating: 4.5, image: Arrival7 },
];

const NewArrivals = () => {
    const handleAddToCart = (product) => {
        console.log("Add to cart:", product);
    };

    return (
        <section className="py-8 md:py-16 bg-linear-to-r  from-amber-50 to-pink-50 px-4 sm:px-6 lg:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 text-center md:text-left">
                    <p className="text-sm font-medium text-gray-600">New Arrival</p>
                    <div className="flex flex-col md:flex-row justify-between">
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">
                            <span className="text-rose-600">New Arrival</span> Products
                        </h2>
                        <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto md:mx-0 text-center">
                            Find your ideal combination of in-office treatments & skincare regimens.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4 w-full h-96 md:h-[690px] relative rounded-3xl overflow-hidden">
                        <Image
                            src={Arrival1}
                            alt="Beauty Serum"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="lg:col-span-8">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => handleAddToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;
