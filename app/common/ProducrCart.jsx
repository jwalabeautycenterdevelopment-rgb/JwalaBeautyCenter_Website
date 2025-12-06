"use client";
import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import CustomImage from './Image';
import { useRouter } from 'next/navigation';
import useGuestId from '../utils/useGuestId';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addGuestFavorite, clearFavoriteMessage } from '../store/slice/favoriteSlice';
import { addGuestCartItem, addOrUpdateCartItem, clearMessage } from '../store/slice/cartSlice';
import { errorAlert } from '../utils/alertService';

export const ProductCard = ({ product, isHover = true }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const guestId = useGuestId();
    const { accessToken } = useSelector((state) => state.auth);
    const { addFavoriteError, addFavoriteMsg, favorites } = useSelector((state) => state.myfavourite)
    const { message, error } = useSelector((state) => state.cart)
    const variant = product?.variants?.length > 0 ? product.variants[0] : null;
    const image =
        variant?.variantImages?.[0] ||
        product?.productImages?.[0] ||
        "/no-image.png";

    const price = variant?.offerPrice || product?.offerPrice || product?.price;
    const originalPrice = variant?.price || product?.price;
    const categoryName = product?.category?.name || "Unknown";
    const title = product?.name;

    const isFavourite = favorites?.find(
        fav => fav.productId?._id === product?._id
    )?._id;

    const discount =
        originalPrice && price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

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
    }, [addFavoriteMsg, addFavoriteError, dispatch, error, message]);

    const getProductPayload = (product) => {
        const hasVariant = product?.isVariant && product?.variants?.length > 0;
        const variant = hasVariant ? product.variants[0] : null;
        return {
            productId: product._id,
            ...(variant && {
                variant: {
                    sku: variant.sku
                }
            })
        };
    };

    const handleAddCart = () => {
        const payload = {
            ...getProductPayload(product),
            quantity: 1
        };
        if (accessToken) {
            dispatch(addOrUpdateCartItem(payload));
        } else if (guestId) {
            dispatch(addGuestCartItem({ guestId, item: payload }));
        } else {
            console.warn("Guest ID not available!");
        }
    };


    const handleAddFavourite = () => {
        const payload = getProductPayload(product);
        if (accessToken) {
            dispatch(addFavorite(payload));
        } else if (guestId) {
            dispatch(addGuestFavorite({ guestId, ...payload }));
        } else {
            console.warn("Guest ID not available!");
        }
    };

    const handleNavigate = (item) => {
        router.push(`/product/${item.slug}`);
    }


    return (
        <div className="group relative rounded-2xl overflow-hidden transition-all duration-300">
            {discount > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-[#254226] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {discount}% off
                </div>
            )}
            {
                isHover &&
                <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddFavourite();
                        }}
                        className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
                    >
                        {isFavourite ? (
                            <AiFillHeart className="text-red-500 text-xl" />
                        ) : (
                            <AiOutlineHeart className="text-gray-600 text-xl" />
                        )}
                    </button>
                    <button className="p-2 bg-white text-black rounded-full shadow-md hover:scale-110 transition">
                        <BsCartPlus
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddCart();
                            }}
                            className="text-xl" />
                    </button>
                </div>
            }
            <div className="aspect-square overflow-hidden" onClick={() => handleNavigate(product)}>
                <CustomImage
                    src={image}
                    alt={title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-900 cursor-pointer"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center gap-1">
                    <p className="text-xs text-gray-500 font-medium truncate">
                        {categoryName}
                    </p>
                    <div className="flex items-center gap-1 ">
                        <span className="text-yellow-400 text-sm font-semibold">★</span>
                        <span className="font-medium text-xs text-gray-700">
                            {product?.rating || 4.5}
                        </span>
                    </div>
                </div>
                <h3 className="font-semibold text-md  truncate">{title}</h3>
                <div className="flex items-center gap-2 my-1 text_primary">
                    <span className="text-sm font-bold">₹{price}</span>
                    {originalPrice > price && (
                        <span className="text-xs text-gray-500 line-through font-semibold">
                            ₹{originalPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
