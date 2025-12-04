import MainLayout from '@/app/common/MainLayout'
import { ProductCard } from '@/app/common/ProducrCart'
import React from 'react'

const RelatedProduct = ({ product }) => {
    return (
        <MainLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {
                    product?.map((item) =>
                        <div key={item?._id}>
                            <ProductCard product={item} isHover={false} />
                        </div>
                    )
                }
            </div>

        </MainLayout>
    )
}

export default RelatedProduct