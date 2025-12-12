"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ProductCard } from "@/app/common/ProducrCart";
import Arrival1 from "@/app/assets/arrival_img_1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "@/app/store/slice/productsSlice";


const NewArrivals = () => {
    const dispatch = useDispatch();
    const { userProducts } = useSelector(
        (state) => state.products
    );
    const newArrivals = userProducts.filter(product => product.isNewArrival);

    useEffect(() => {
        dispatch(getUserProducts());
    }, [dispatch]);

    const handleAddToCart = (product) => {
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
                            {newArrivals?.slice(0, 8).map((product) => (
                                <ProductCard
                                    key={product._id}
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
