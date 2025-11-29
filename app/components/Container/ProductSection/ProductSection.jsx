"use client"
import { NoProductFound } from "@/app/common/Animation"
import CustomImage from "@/app/common/Image"
import MainLayout from "@/app/common/MainLayout"
import { ProductSkeleton } from "@/app/common/Skeleton"
import { getCategoryProducts } from "@/app/store/slice/productsSlice"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { FaBox, FaStar } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

const formatPrice = (amount) => `₹${Number(amount || 0).toFixed(0)}`;

const ProductSection = ({ slug }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { categoryProducts = [], userCategoryProducts } = useSelector((state) => state.products)

    useEffect(() => {
        if (slug) dispatch(getCategoryProducts(slug))
    }, [slug, dispatch])

    const calculateDiscount = (original, offer) => {
        if (!original || !offer || offer >= original) return 0;
        return Math.round(((original - offer) / original) * 100);
    };


    const renderRating = (rating) => {
        return (
            <div className="flex items-center gap-1 bg-green-700 rounded-full px-2 text-xs py-1 text-white font-semibold">
                <span>{rating}</span>
                <FaStar size={10} />
            </div>
        )
    }
    const handleNavigate = (item) => {
        router.push(`/product/${item?.slug}`)
    }

    return (
        <MainLayout className="px-4 sm:px-6 lg:px-18 py-10 capitalize">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {userCategoryProducts ? (
                    <ProductSkeleton count={8} />
                ) : categoryProducts?.length === 0 ? (
                    <NoProductFound />
                ) : (
                    categoryProducts?.map((product) => {
                        const img =
                            product?.productImages?.[0] ||
                            product?.variants?.[0]?.variantImages?.[0] ||
                            null;
                        const showImage = img && img !== "string";
                        const discountPercent = calculateDiscount(product?.price, product?.offerPrice);
                        const hasDiscount = discountPercent > 0;
                        console.log(hasDiscount);

                        return (
                            <div
                                key={product?._id}
                                className="group relative overflow-hidden transition-all duration-300"
                            >
                                {hasDiscount && (
                                    <div className="absolute top-3 left-3 bg_primary text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                                        {discountPercent}% OFF
                                    </div>
                                )}
                                <div className="relative h-60 bg-gray-50 overflow-hidden group cursor-pointer" onClick={() => handleNavigate(product)}>
                                    {showImage ? (
                                        <CustomImage
                                            src={img}
                                            alt={product?.name || "Product"}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-900"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <FaBox className="text-4xl text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-3 flex flex-col items-end gap-2">
                                        {product?.isBestSeller && (
                                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-md text-xs font-semibold shadow">
                                                Best Seller
                                            </span>
                                        )}
                                        {product?.isNewArrival && (
                                            <span className="inline-block px-3 py-1 text-white text-xs font-semibold
            bg-linear-to-r from-orange-400 to-red-500
            skew-x-[-7deg] shadow-md rounded-sm select-none">
                                                <span className="inline-block ">New</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="px-2 mt-3">
                                    <h3 className="font-normal text-gray-800 line-clamp-2  h-10 text-sm leading-tight">
                                        {product?.name.length > 40 ? product?.name.substring(0, 52) + "…" : product?.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {hasDiscount ? (
                                            <>
                                                <span className="text-lg font-bold text-gray-900">
                                                    {formatPrice(product?.offerPrice)}
                                                </span>
                                                <span className="text-sm text-gray-500 line-through">
                                                    {formatPrice(product?.price)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-bold text-gray-900">
                                                {formatPrice(product?.price)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        {product?.stock > 0 ? (
                                            <span className="text-xs text-green-600 font-medium">
                                                In Stock ({product.stock} left)
                                            </span>
                                        ) : (
                                            <span className="text-xs text-red-600 font-medium">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <div className="flex items-center gap-2">
                                            {renderRating(product?.rating || 4.3)}
                                            <span className="text-xs text-gray-500">({product?.reviewCount || 1145})</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </MainLayout >
    )
}

export default ProductSection