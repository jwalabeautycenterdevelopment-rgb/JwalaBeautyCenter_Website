"use client";
import React, { useEffect } from "react";
import MainLayout from "@/app/common/MainLayout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useGuestId from "@/app/utils/useGuestId";
import { addFavorite, addGuestFavorite, clearFavoriteMessage, fetchFavorites, fetchGuestFavorites, } from "@/app/store/slice/favoriteSlice";
import { EmptyFavorites, FavoritesLoading } from "@/app/common/Animation";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import CustomImage from "@/app/common/Image";
import { addGuestCartItem, addOrUpdateCartItem } from "@/app/store/slice/cartSlice";

const FavouritesSection = () => {
    const dispatch = useDispatch();
    const guestId = useGuestId();
    const { accessToken } = useSelector((state) => state.auth);
    const { message, error, getLoading, favorites } = useSelector((state) => state.myfavourite)
    const isEmpty = favorites?.length === 0;

    useEffect(() => {
        if (accessToken) {
            dispatch(fetchFavorites());
        } else if (guestId) {
            dispatch(fetchGuestFavorites(guestId))
        }
    }, [dispatch, accessToken, guestId]);


    useEffect(() => {
        if (message) {
            successAlert(message)
            dispatch(clearFavoriteMessage());
        }
        if (error) {
            errorAlert(error);
            dispatch(clearFavoriteMessage());
        }
    }, [message, error, dispatch]);



    const handleAddCart = (product) => {
        if (!product) return;
        const selectedVariant = product?.variants?.[0];
        const itemToAdd = {
            productId: product._id,
            quantity: 1,
            ...(selectedVariant && {
                variant: {
                    sku: selectedVariant.sku,
                }
            })
        };

        if (accessToken) {
            dispatch(addOrUpdateCartItem(itemToAdd));
        } else if (guestId) {
            dispatch(addGuestCartItem({ guestId, item: itemToAdd }));
        } else {
            console.warn("Guest ID not available yet!");
        }
    };


    const handleRemove = (product, sku) => {
        if (!product) return;

        const payload = {
            productId: product._id,
            ...(sku && { sku })
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
        <MainLayout className={"mx-8 md:mx-18 my-5 md:pb-5"}>
            {getLoading && <FavoritesLoading />}
            {isEmpty && <EmptyFavorites />}
            {!getLoading && !isEmpty && (
                <div className="w-full bg-white border border-gray-200  shadow-sm">
                    <div className="p-4 border-b border-gray-300">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                            <Link href={"/"} className="text-gray-700">
                                ←
                            </Link>
                            My Favourites
                        </h2>
                    </div>
                    {favorites?.map((item) => {
                        const product = item?.productId;
                        const image =
                            product?.variants?.[0]?.variantImages?.[0] ||
                            product?.productImages?.[0] ||
                            "/no-image.png";

                        return (
                            <div
                                key={item?._id}
                                className="flex gap-4 p-4 border-b border-gray-300 last:border-none"
                            >
                                <div className="w-28 h-28 rounded-xl overflow-hidden border border-gray-300 bg-white">
                                    <CustomImage
                                        src={image}
                                        alt={product?.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-semibold leading-5 line-clamp-2">
                                        {product?.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2 text-[15px]">
                                        <span className="font-semibold text-green-600">
                                            ₹{product?.price || product?.variants.price}
                                        </span>
                                        <span className="line-through text-gray-400">
                                            ₹{product?.offerPrice}
                                        </span>
                                        <span className="text-green-600 text-sm font-medium">
                                            {Math.floor(
                                                ((product?.price - product?.offerPrice) /
                                                    product?.price) *
                                                100
                                            )}
                                            % off
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                                            <span>{product?.rating || 0}</span>
                                            <span>★</span>
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            {product?.reviewCount || 0} Ratings
                                        </span>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-2 mt-4">
                                        <button
                                            onClick={() => handleRemove(product, product?.variants?.[0]?.sku)}
                                            className="px-4 cursor-pointer py-2 text-sm rounded-lg border border-gray-300"
                                        >
                                            Remove
                                        </button>
                                        <button
                                            onClick={() => handleAddCart(product)}
                                            className="px-4 cursor-pointer py-2 text-sm rounded-lg bg-purple-600 text-white"> Add to cart </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {
                        favorites?.length >= 1 &&
                        < p className="py-5 text-center text-gray-500">
                            Uh-oh! No more products in your wishlists
                        </p>
                    }
                </div>
            )}
        </MainLayout >
    );
};

export default FavouritesSection;
