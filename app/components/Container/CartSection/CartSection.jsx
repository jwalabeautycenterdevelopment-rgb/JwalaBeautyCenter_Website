"use client";
import React, { useEffect, useRef, useState } from "react";
import { Check, Truck, Heart, Trash2, ChevronRight } from "lucide-react";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    fetchGuestCart,
    removeCartItem,
    removeGuestCartItem,
    updateGuestCartItem,
    updateQuantity,
} from "@/app/store/slice/cartSlice";
import CustomImage from "@/app/common/Image";
import { errorAlert, successAlert, warningAlert } from "@/app/utils/alertService";
import { clearMessage } from "@/app/store/slice/cartSlice";
import { EmptyCart } from "@/app/common/Animation";
import useGuestId from "@/app/utils/useGuestId";
import MainLayout from "@/app/common/MainLayout";
import { addFavorite, addGuestFavorite } from "@/app/store/slice/favoriteSlice";
import { clearAuthError, clearAuthMessage, fetchMe } from "@/app/store/slice/authSlice";
import { clearOrderError, clearOrderMessage, placeOrder } from "@/app/store/slice/orderSlice";
import { useRouter } from "next/navigation";
import { openPopup } from "@/app/store/slice/popupSlice";
import Payment from "@/app/common/Payment";

const CartSection = () => {
    const dispatch = useDispatch();
    const guestId = useGuestId();
    const router = useRouter()
    const [isFavourite, setIsFavourite] = useState(null)
    const { accessToken } = useSelector((state) => state.auth);
    const { items, message, error } = useSelector((state) => state.cart);
    const { favorites } = useSelector((state) => state.myfavourite);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const cartItems = items?.items || [];
    const { checkoutError, checkoutMsg, placeOrderData, errorMsg, loadingPlaceOrder } = useSelector((state) => state.order)
    const paymentRef = useRef();
    const { shippingAddress, updateLoading, updateError, updateSuccess } = useSelector(
        (state) => state.auth
    );


    useEffect(() => {
        if (placeOrderData?.razorpayOrderId && paymentRef.current) {
            paymentRef.current.initiatePayment(placeOrderData.razorpayOrderId);
        }
    }, [placeOrderData]);


    useEffect(() => {
        if (updateSuccess) {
            successAlert(updateSuccess);
            dispatch(clearAuthMessage());
            dispatch(fetchMe())
            setIsAddressModalOpen(false)
        }
        if (updateError) {
            errorAlert(updateError);
            dispatch(clearAuthError());
        }
        if (errorMsg) {
            errorAlert(errorMsg);
            dispatch(clearOrderError());
        }
    }, [updateSuccess, updateError, errorMsg]);

    useEffect(() => {
        if (checkoutMsg) {
            dispatch(clearOrderMessage());
        }
        if (checkoutError) {
            errorAlert(checkoutError);
            dispatch(clearOrderError());
        }
    }, [updateSuccess, checkoutError]);


    useEffect(() => {
        if (!cartItems || !favorites) return;
        const favouriteMatches = cartItems?.map((item) =>
            favorites?.some((fav) => fav.productId?._id === item.productId?._id)
        );
        setIsFavourite(prev => {
            if (JSON.stringify(prev) !== JSON.stringify(favouriteMatches)) {
                return favouriteMatches;
            }
            return prev;
        });
    }, [cartItems, favorites]);


    useEffect(() => {
        if (accessToken) {
            dispatch(fetchCart());
        } else if (guestId) {
            dispatch(fetchGuestCart({ guestId }));
        }
    }, [dispatch, accessToken, guestId]);

    useEffect(() => {
        if (message) dispatch(clearMessage());
        if (error) {
            errorAlert(error);
            dispatch(clearMessage());
        }
    }, [message, error, dispatch]);

    const getItemKey = (item) => `${item.productId._id}-${item.variant?.sku}`;

    const toggleItemSelection = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (cartItems.length > 0 && selectedIds.length === 0) {
            const allKeys = cartItems.map((item) => getItemKey(item));
            setSelectedIds(allKeys);
        }
    }, [cartItems]);


    const handleSelectAll = () => {
        const allKeys = cartItems.map((item) => getItemKey(item));
        if (selectedIds.length === cartItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(allKeys);
        }
    };

    const removeItem = (item) => {
        const selectedVariant = item?.productId?.variants?.find(
            (v) => v.sku === item?.variant?.sku
        );
        const sku = selectedVariant?.sku || null;

        if (accessToken) {
            dispatch(
                removeCartItem({
                    productId: item?.productId?._id,
                    variant: { sku },
                })
            );
        } else {
            dispatch(
                removeGuestCartItem({
                    guestId,
                    productId: item?.productId?._id,
                    variant: { sku },
                })
            );
        }
    };

    const updateQty = (item, type) => {
        const selectedVariant = item?.productId?.variants?.find(
            (v) => v.sku === item?.variant?.sku
        );
        const sku = selectedVariant?.sku || null;
        const change = type === "increase" ? 1 : -1;

        if (accessToken) {
            dispatch(
                updateQuantity({
                    productId: item?.productId?._id,
                    variant: { sku },
                    quantity: change,
                })
            );
        } else {
            dispatch(
                updateGuestCartItem({
                    guestId,
                    productId: item?.productId?._id,
                    variant: { sku },
                    quantity: change,
                })
            );
        }
    };


    const handleAddFavourite = (item) => {
        if (!item) return;

        const payload = {
            productId: item?.productId?._id,
            ...(item?.variant?.sku && { sku: item.variant.sku })
        };
        if (accessToken) {
            dispatch(addFavorite(payload));
        } else if (guestId) {
            dispatch(addGuestFavorite({ guestId, ...payload }));
        } else {
            console.warn("Guest ID not available");
        }
    };

    const handlePlaceOrder = async () => {
        if (!accessToken) {
            dispatch(openPopup("login"));
            return;
        }
        if (!shippingAddress || shippingAddress.length === 0) {
            errorAlert("Please add a shipping address first.");
            return;
        }
        const selectedShipping = shippingAddress[0];
        const paymentMethod = "RAZORPAY";
        if (selectedItems?.length === 0) {
            warningAlert("Please select at least one item to place order.");
            return;
        }
        const cartPayload = selectedItems?.map(item => {
            const base = {
                productId: item.productId._id,
                quantity: item.quantity,
            };
            if (item.variant?.sku) {
                base.variant = { sku: item.variant.sku };
            }
            return base;
        });
        const subtotal = selectedItems.reduce(
            (sum, item) =>
                sum + (item.variant?.offerPrice || item.offerPrice) * item.quantity,
            0
        );
        try {
            const payload = {
                shippingAddress: selectedShipping,
                paymentMethod,
                items: cartPayload,
                amount: subtotal
            };
            dispatch(placeOrder(payload));
        } catch (err) {
            errorAlert("Failed to place order. Please try again.");
        }
    };

    const selectedItems = cartItems.filter((item) =>
        selectedIds.includes(getItemKey(item))
    );

    const subtotal = selectedItems.reduce(
        (sum, item) =>
            sum + (item.variant?.offerPrice || item.offerPrice) * item.quantity,
        0
    );
    if (cartItems?.length === 0) return <EmptyCart />;

    return (
        <MainLayout>
            <Payment ref={paymentRef}
                dispatch={dispatch}
                navigate={router.push}
                userData={placeOrderData}
                totalAmount={placeOrderData?.amount || 0} />
            <div className="min-h-screen bg-gray-50 p-2 md:p-4">
                <h1 className="text-3xl mb-5 font-bold text-gray-900 text-center">My Cart</h1>

                <div className="max-w-6xl mx-auto">
                    {
                        accessToken &&
                        <div className="bg-white border border-gray-300 p-6 rounded-2xl mb-6">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-bold">Delivery Address</h2>
                                {
                                    !shippingAddress || shippingAddress?.length == 0 &&
                                    < button
                                        onClick={() => setIsAddressModalOpen(true)}
                                        className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm cursor-pointer"
                                    >
                                        Add New Address
                                    </button>
                                }
                            </div>
                            <div className="space-y-3 mt-4">
                                {shippingAddress?.map((addr) => (
                                    <div
                                        key={addr?._id}
                                        className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-900">{addr?.fullName}</p>
                                            <p className="text-gray-600 text-sm">{addr?.phone}</p>
                                            <p className="text-gray-600 text-sm">
                                                {addr?.address}, {addr?.city}, {addr?.state} - {addr?.zipCode}, {addr?.country}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="text-red-600 text-sm hover:underline cursor-pointer"
                                        >
                                            Change
                                        </button>
                                    </div>
                                ))}
                                {!shippingAddress?.length && (
                                    <p className="text-gray-500 text-center">No addresses found</p>
                                )}
                            </div>
                        </div>
                    }
                    <div>
                        <button
                            onClick={handleSelectAll}
                            className="px-4 py-2 my-3  text-sm bg-rose-600 text-white rounded-lg"
                        >
                            {selectedIds.length === cartItems.length ? "Deselect All" : "Select All"}
                        </button>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:flex-1 bg-white  border-gray-300 rounded-2xl shadow-sm overflow-hidden">
                            <div className=" max-h-[600px] overflow-y-auto">
                                {cartItems?.map((item, index) => {
                                    const fav = isFavourite?.[index];
                                    const id = getItemKey(item);
                                    const selected = selectedIds.includes(id);
                                    const price = item.variant?.offerPrice || item.offerPrice
                                    const originalPrice = item.variant?.price || item.price;
                                    const image =
                                        item.variant?.variantImages?.[0] ||
                                        item.productId.productImages?.[0];
                                    return (
                                        <div
                                            key={id}
                                            className={`p-6 border-b border-gray-300 ${selected
                                                ? "bg-rose-50 border-l-4 border-rose-500"
                                                : "bg-white"
                                                }`}
                                        >
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <button
                                                    onClick={() => toggleItemSelection(id)}
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${selected
                                                        ? "bg-rose-500 border-rose-500"
                                                        : "border-gray-300"
                                                        }`}
                                                >
                                                    {selected && (
                                                        <Check className="w-3 h-3 text-white" />
                                                    )}
                                                </button>
                                                <div className="w-28 h-28 rounded-xl bg-gray-100 overflow-hidden">
                                                    <CustomImage
                                                        src={image}
                                                        alt={item?.productId?.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg line-clamp-2">
                                                        {item.productId.name}
                                                    </h3>

                                                    <p className="text-gray-600 text-sm mt-1">
                                                        Sold by:{" "}
                                                        <span className="font-medium">
                                                            {item.productId.brand?.name}
                                                        </span>
                                                    </p>

                                                    <div className="flex justify-between">
                                                        <div>
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <span className="text-2xl font-bold">
                                                                    ₹{price}
                                                                </span>
                                                                {originalPrice !== price && (
                                                                    <span className="line-through text-gray-500">
                                                                        ₹{originalPrice}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <div className="mt-1 text-green-600 text-sm flex">
                                                                <Truck className="w-4 h-4 mr-1" />{" "}
                                                                Standard Delivery
                                                            </div>
                                                        </div>

                                                        <div className="flex w-30 justify-center bg-gray-200 mt-4 rounded-lg items-center gap-4">
                                                            <button
                                                                onClick={() => updateQty(item, "decrease")}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span>{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQty(item, "increase")}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-between mt-3 text-sm">
                                                        <button
                                                            onClick={() => handleAddFavourite(item)}
                                                            className="flex items-center gap-2 text-gray-600 hover:text-rose-600">
                                                            <Heart className={`w-4 h-4 ${fav ? "text-rose-600 fill-rose-600" : ""}`} />
                                                            Wishlist
                                                        </button>
                                                        <button
                                                            onClick={() => removeItem(item)}
                                                            className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Remove
                                                        </button>
                                                        <button
                                                            onClick={() => toggleItemSelection(id)}
                                                            className={`px-5 py-2 text-sm rounded-lg font-medium ${selected
                                                                ? "bg-rose-600 text-white"
                                                                : "bg-gray-100"
                                                                }`}
                                                        >
                                                            {selected ? "Selected" : "Select"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="lg:w-96 sticky top-6">
                            <div className="bg-white border border-gray-300  shadow-lg overflow-hidden">
                                <div className="bg-rose-600 text-white py-4 text-center font-bold text-xl">
                                    Order Summary
                                </div>
                                <div className="p-6">
                                    {selectedItems?.map((item) => (
                                        <div
                                            key={getItemKey(item)}
                                            className="flex justify-between items-center gap-3 mb-3 border-b pb-2"
                                        >
                                            <span className="line-clamp-2">
                                                {item.quantity} × {item.productId.name}
                                            </span>
                                            <span className="font-bold">
                                                ₹
                                                {
                                                    (item.variant?.offerPrice || item?.offerPrice)
                                                }
                                            </span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-lg font-bold mt-4">
                                        <span>Total Amount</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <p className="text-gray-500 mt-3 text-sm text-end">
                                        Free delivery •
                                    </p>
                                    <button
                                        disabled={loadingPlaceOrder}
                                        onClick={handlePlaceOrder}
                                        className={`w-full mt-2 py-3 rounded-xl font-bold flex justify-center items-center gap-2
    ${loadingPlaceOrder
                                                ? "bg-rose-400 cursor-not-allowed opacity-70"
                                                : "bg-rose-600 hover:bg-rose-700 cursor-pointer text-white"
                                            }
  `}
                                    >
                                        {loadingPlaceOrder ? "Placing Order..." : "Place Order"}
                                        <ChevronRight />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isAddressModalOpen && (
                    <AddressForm
                        onClose={() => setIsAddressModalOpen(false)}
                        setIsAddressModalOpen={setIsAddressModalOpen}
                        loading={updateLoading}
                        shippingAddress={placeOrderData?.shippingAddress[0]}
                    />
                )}
            </div>
        </MainLayout >
    );
};

export default CartSection;

