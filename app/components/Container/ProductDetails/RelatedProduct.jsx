import MainLayout from "@/app/common/MainLayout";
import { ProductCard } from "@/app/common/ProducrCart";
import React from "react";

const RelatedProduct = ({ product }) => {
    return (
        <MainLayout>
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-6 min-w-max pb-2">
                    {product?.map((item) => (
                        <div
                            key={item?._id}
                            className="w-[280px] flex-shrink-0"
                        >
                            <ProductCard product={item} isHover={false} />
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default RelatedProduct;