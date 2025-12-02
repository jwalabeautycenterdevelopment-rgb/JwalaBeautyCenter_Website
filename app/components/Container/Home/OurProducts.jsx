"use client"
import { ProductCard } from "@/app/common/ProducrCart";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { getBestSellers } from "@/app/store/slice/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const OurProducts = () => {
    const dispatch = useDispatch()
    const [active, setActive] = useState('all');
    const { bestSellers = [] } = useSelector((state) => state.products)

    const categoriesFromAPI = bestSellers?.map(item => ({
        id: item?.category?._id,
        label: item?.category?.name
    }));

    const categories = [
        { id: 'all', label: 'All', color: 'bg-red-600 text-white' },
        ...categoriesFromAPI
    ];

    useEffect(() => {
        dispatch(getBestSellers());
    }, [dispatch,]);

    const filterData = active === 'all'
        ? bestSellers
        : bestSellers?.filter((item) => item?.category?._id === active);


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
                                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer border line-clamp-1";
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
                                    {cat?.label.substring(0, 12)}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                    {filterData?.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                    ))}
                </div>
            </div>
        </section>

    );
};

export default OurProducts;