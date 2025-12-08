"use client"
import MainLayout from "@/app/common/MainLayout"
import { getSingleProduct } from "@/app/store/slice/productsSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaStar } from "react-icons/fa"
import CustomImage from "@/app/common/Image"
import ProductPopup from "@/app/common/ProductPopup"
import { formatPrice } from "@/app/utils/priceCalculate"
import { addGuestCartItem, addOrUpdateCartItem } from "@/app/store/slice/cartSlice"
import useGuestId from "@/app/utils/useGuestId"
import { Heart } from "lucide-react"
import { addFavorite, addGuestFavorite, clearFavoriteMessage } from "@/app/store/slice/favoriteSlice"
import { errorAlert } from "@/app/utils/alertService"
import { clearMessage } from "@/app/store/slice/register"
import ProductTabs from "@/app/utils/ProductTabs"
import RelatedProduct from "./RelatedProduct"

const ProductDetails = ({ slug }) => {
    const dispatch = useDispatch()
    const guestId = useGuestId();
    const { singleProduct = {}, relatedProducts } = useSelector((state) => state.products)
    const { accessToken } = useSelector((state) => state.auth);
    const { addFavoriteError, addFavoriteMsg, favorites } = useSelector((state) => state.myfavourite)
    const { message, error } = useSelector((state) => state.cart)
    const [selectedVariant, setSelectedVariant] = useState(0)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [popupProduct, setPopupProduct] = useState(null)

    const isFavourite = favorites?.find(
        fav => fav.productId?._id === singleProduct?._id
    )?._id;


    useEffect(() => {
        if (slug) dispatch(getSingleProduct(slug))
    }, [slug, dispatch])

    useEffect(() => {
        if (singleProduct?.variants?.length > 0) setSelectedVariant(0)
        setSelectedImage(0)
    }, [singleProduct])

    useEffect(() => {
        if (addFavoriteMsg) {
            dispatch(clearFavoriteMessage());
        }
        if (addFavoriteError) {
            errorAlert(addFavoriteError);
            dispatch(clearFavoriteMessage());
        }
        if (message) {
            dispatch(clearMessage())
        }
        if (error) {
            dispatch(errorAlert(error))
            dispatch(clearMessage())
        }
    }, [addFavoriteMsg, addFavoriteError, dispatch]);

    const currentVariant = singleProduct?.variants?.[selectedVariant]

    const productImages =
        currentVariant?.variantImages?.length > 0
            ? currentVariant.variantImages
            : singleProduct?.productImages || []

    const displayName = currentVariant?.name
        ? `${singleProduct?.name} | ${currentVariant.name}`
        : singleProduct?.name

    const displayPriceValue =
        currentVariant?.offerPrice ?? currentVariant?.price ?? singleProduct?.offerPrice ?? singleProduct?.price
    const originalPrice = currentVariant?.price ?? singleProduct?.price
    const hasDiscount = displayPriceValue < originalPrice
    const discountPercent = hasDiscount ? Math.round(((originalPrice - displayPriceValue) / originalPrice) * 100) : 0
    const currentStock = currentVariant?.stock ?? singleProduct?.stock

    const handleVariantSelect = (index) => {
        setSelectedVariant(index)
        setSelectedImage(0)
    }

    const openPopup = (productOrVariant) => {
        setPopupProduct(productOrVariant)
        setIsPopupOpen(true)
    }

    const closePopup = () => {
        setIsPopupOpen(false)
        setPopupProduct(null)
    }

    const handleAddCart = () => {
        if (!singleProduct) return;
        const itemToAdd = {
            productId: singleProduct._id,
            quantity: 1,
            ...(currentVariant && {
                variant: {
                    sku: currentVariant.sku,
                }
            }),
        };
        if (accessToken) {
            dispatch(addOrUpdateCartItem(itemToAdd));
        } else if (guestId) {
            dispatch(addGuestCartItem({ guestId, item: itemToAdd }));
        } else {
            console.warn("Guest ID not available yet!");
        }
    };


    const handleAddFavourtie = () => {
        if (!singleProduct) return;
        const payload = {
            productId: singleProduct._id,
            ...(currentVariant && { sku: currentVariant.sku })
        };
        if (accessToken) {
            dispatch(addFavorite(payload));
        } else if (guestId) {
            dispatch(addGuestFavorite({ guestId, ...payload }));
        } else {
            console.warn("Guest ID not available yet!");
        }
    };


    return (
        <MainLayout className="px-4 sm:px-6 lg:px-18 py-10">
            {
                isPopupOpen && popupProduct && (
                    <ProductPopup isOpen={isPopupOpen} onClose={closePopup} product={popupProduct} />
                )
            }
            <div className="max-w-7xl mx-auto">
                {
                    singleProduct &&
                    <div className="text-sm text-gray-500 mb-6  line-clamp-2">

                        {singleProduct?.category?.name} / {singleProduct?.brand?.name} /{" "}
                        <span className="text-gray-900">{displayName}</span>
                    </div>
                }
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                            {productImages?.length > 0 ? (
                                <button
                                    className="cursor-pointer"
                                    onClick={() =>
                                        openPopup({
                                            name: displayName,
                                            mainImage: productImages[selectedImage],
                                            images: productImages,
                                            description: singleProduct?.description,
                                            colour: currentVariant?.colour,
                                            size: currentVariant?.size,
                                        })
                                    }
                                >
                                    <CustomImage
                                        src={productImages[selectedImage]}
                                        alt={displayName}
                                        className="max-h-80 object-contain"
                                        width={320}
                                        height={320}
                                    />
                                </button>
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <p>No Image Available</p>
                                </div>
                            )}
                        </div>
                        {productImages?.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {productImages?.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`w-20 h-20 border-2  rounded-lg overflow-hidden ${selectedImage === index ? "border-blue-500" : "border-gray-200"
                                            }`}
                                    >
                                        <CustomImage
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            width={80}
                                            height={80}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900  line-clamp-4">{displayName}</h1>
                        <p className="text-gray-700 text-sm capitalize md:text-md font-normal whitespace-pre-line line-clamp-3">{singleProduct?.description}</p>
                        <div className="flex gap-2">
                            {singleProduct?.isNewArrival && (
                                <span className="inline-block px-3 py-1 text-white text-xs font-semibold bg-linear-to-r from-orange-400 to-red-500 skew-x-[-7deg] shadow-md rounded-sm">
                                    <span className="inline-block skew-x-[7deg]">New Arrival</span>
                                </span>
                            )}
                            {singleProduct?.isBestSeller && (
                                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-xs font-semibold">
                                    Best Seller
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-green-700 rounded-full px-3 py-1 text-white">
                                <span className="text-sm font-semibold">{singleProduct?.rating || currentVariant?.rating || 5}</span>
                                <FaStar size={12} />
                            </div>
                            <span className="text-gray-600 text-sm">
                                ({singleProduct?.reviewCount || currentVariant?.reviewCount || 10} ratings)
                            </span>
                        </div>
                        <div className="space-y-2 flex items-center  gap-2">
                            <div className="text-3xl font-bold text-gray-900">{formatPrice(displayPriceValue)}</div>
                            {hasDiscount && (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg text-gray-500 line-through">{formatPrice(originalPrice)}</span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                                        Save  {discountPercent}% Off
                                    </span>
                                </div>
                            )}
                        </div>
                        {singleProduct?.variants?.length > 0 && (
                            <div className="space-y-2  border-t border-gray-300 pt-4">
                                <h3 className="font-semibold text-gray-900">Select Variant:</h3>
                                <div className="flex flex-wrap gap-3">
                                    {singleProduct?.variants?.map((variant, index) => (
                                        <button
                                            key={variant._id}
                                            onClick={() => handleVariantSelect(index)}
                                            className={`flex flex-col items-center px-4 py-2 border-2 rounded-lg transition-all ${selectedVariant === index
                                                ? "border-red-500"
                                                : "border-gray-300 hover:border-gray-400"
                                                }`}
                                        >
                                            <CustomImage
                                                src={variant?.variantImages[0]}
                                                alt={variant.name}
                                                className="w-10 h-10 object-cover rounded"
                                            />
                                            {variant.type && (
                                                <div className="mt-2 inline-block px-2 py-1 h-4 w-4 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">

                                                </div>
                                            )}
                                            {variant.weight > 0 && (
                                                <div className="mt-1 text-gray-700 text-sm">
                                                    {variant.weight}
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="text-sm">
                            {currentStock > 0 ? (
                                <span className="text-green-600 font-medium">In Stock ({currentStock} left)</span>
                            ) : (
                                <span className="text-red-600 font-medium">Out of Stock</span>
                            )}
                        </div>
                        <div className="flex my-5 gap-4">
                            <button
                                onClick={handleAddCart}
                                disabled={currentStock === 0}
                                className={`flex-1 font-semibold cursor-pointer py-3 px-6 rounded-lg transition-colors ${currentStock > 0 ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                {currentStock > 0 ? "Add to Cart" : "Out of Stock"}
                            </button>
                            <button
                                onClick={handleAddFavourtie}
                                className="flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 px-6
        rounded-xl border border-gray-300 bg-white
        text-gray-800 font-semibold transition-all hover:bg-gray-50"
                            >
                                <Heart
                                    size={18}
                                    strokeWidth={2}
                                    className={isFavourite ? "text-rose-600 fill-rose-600" : "text-gray-700"}
                                />
                                {isFavourite ? "Wishlisted" : "Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
                <ProductTabs />
                <div id="details" className="mt-2">
                    <h2 className="text-md font-medium text-gray-900 mb-2">Product Description</h2>
                    <div className="rounded-lg">
                        <p className="text-gray-700 text-sm capitalize md:text-md font-normal whitespace-pre-line">
                            {singleProduct?.description || currentVariant?.description || "No description available for this product."}
                        </p>
                    </div>
                </div>
                <div id="reviews" className="mt-10 space-y-10">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Reviews</h2>

                    {currentVariant?.reviews?.length > 0 ? (
                        currentVariant?.reviews?.slice(0, 5)?.map((review) => (
                            <div key={review._id} className="">
                                <div className="flex items-start gap-4">
                                    {review.user?.profileImage ? (
                                        <CustomImage
                                            src={review.user.profileImage}
                                            className="w-14 h-14 rounded-full object-cover"
                                            alt="User"
                                        />
                                    ) : (
                                        <>
                                            <img
                                                src="/profile1.png"
                                                alt="User"
                                                className="w-14 h-14 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = "none";
                                                    e.target.nextSibling.style.display = "flex";
                                                }}
                                            />
                                            <div
                                                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600"
                                            >
                                                {review.user?.name?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                        </>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-lg font-semibold">
                                                {review.user?.name || "User"}
                                            </h3>
                                            <div className="flex text-yellow-400 text-xl">
                                                {"★".repeat(review.rating)}
                                                <span className="text-gray-400 ml-1">
                                                    {"★".repeat(5 - review.rating)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mt-1">{review.comment}</p>
                                        {review.images?.length > 0 && (
                                            <div className="flex gap-4 mt-4">
                                                {review.images.map((img, index) => (
                                                    <CustomImage
                                                        key={index}
                                                        src={img}
                                                        className="w-32 h-24 rounded-xl object-cover"
                                                        alt={`review-img-${index}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-6 border-b border-gray-300" />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews available for this product.</p>
                    )}
                </div>
                <div id="related" className="mt-10">
                    <RelatedProduct product={relatedProducts} />
                </div>
            </div>
        </MainLayout >
    )
}

export default ProductDetails
