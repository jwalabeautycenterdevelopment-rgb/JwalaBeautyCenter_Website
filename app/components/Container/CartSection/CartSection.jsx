"use client";
import React, { useEffect, useState } from "react";
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
import { errorAlert } from "@/app/utils/alertService";
import { clearMessage } from "@/app/store/slice/cartSlice";
import { EmptyCart } from "@/app/common/Animation";
import useGuestId from "@/app/utils/useGuestId";
import MainLayout from "@/app/common/MainLayout";

const CartSection = () => {
    const dispatch = useDispatch();
    const guestId = useGuestId();
    const { accessToken } = useSelector((state) => state.auth);
    const { items, message, error, GetCartloading } = useSelector(
        (state) => state.cart
    );

    const cartItems = items?.items || [];

    const [selectedIds, setSelectedIds] = useState([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [newAddressFields, setNewAddressFields] = useState({ name: "", details: "" });
    const [addresses, setAddresses] = useState([
        { id: 1, name: "Home", details: "123 Main Street, City, Country" },
    ]);

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

    const addAddress = () => {
        const newAddr = {
            id: Date.now(),
            name: newAddressFields.name,
            details: newAddressFields.details,
        };
        setAddresses((prev) => [...prev, newAddr]);
        setNewAddressFields({ name: "", details: "" });
        setIsAddressModalOpen(false);
    };

    const handleAddressFieldChange = (e) => {
        setNewAddressFields({ ...newAddressFields, [e.target.name]: e.target.value });
    };

    const removeAddress = (id) => {
        setAddresses(addresses.filter((a) => a.id !== id));
    };

    const toggleItemSelection = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
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

        if (accessToken) {
            dispatch(
                updateQuantity({
                    productId: item?.productId?._id,
                    variant: { sku },
                    quantity: type === "increase" ? item.quantity + 1 : item.quantity - 1,
                })
            );
        } else {
            dispatch(
                updateGuestCartItem({
                    guestId,
                    productId: item?.productId?._id,
                    variant: { sku },
                    quantity: type === "increase" ? item.quantity + 1 : item.quantity - 1,
                })
            );
        }
    };

    const selectedItems = cartItems.filter((item) =>
        selectedIds.includes(item.productId._id)
    );

    const subtotal = selectedItems.reduce(
        (sum, item) => sum + (item.variant?.offerPrice || item.price) * item.quantity,
        0
    );

    if (cartItems.length === 0) return <EmptyCart />;

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 p-4">
                <h1 className="text-3xl mb-5 font-bold text-gray-900 text-center">My Cart</h1>
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white border border-gray-300 p-6 rounded-2xl mb-6">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold">Delivery Address</h2>
                            <button
                                onClick={() => setIsAddressModalOpen(true)}
                                className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm"
                            >
                                Add New Address
                            </button>
                        </div>

                        <div className="space-y-3 mt-4">
                            {addresses?.map((addr) => (
                                <div
                                    key={addr.id}
                                    className="flex justify-between bg-gray-50 p-3 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium">{addr.name}</p>
                                        <p className="text-gray-600 text-sm">{addr.details}</p>
                                    </div>
                                    <button
                                        onClick={() => removeAddress(addr.id)}
                                        className="text-red-600 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:flex-1 bg-white border border-gray-300 rounded-2xl shadow-sm overflow-hidden">
                            <div className="divide-y max-h-[600px] overflow-y-auto">
                                {cartItems.map((item) => {
                                    const id = item.productId._id;
                                    const selected = selectedIds.includes(id);
                                    const price = item.variant?.offerPrice || item.price;
                                    const originalPrice = item.variant?.price || item.price;
                                    const image =
                                        item.variant?.variantImages?.[0] || item.productId.productImages?.[0];

                                    return (
                                        <div
                                            key={id}
                                            className={`p-6 ${selected ? "bg-rose-50 border-l-4 border-rose-500" : "bg-white"
                                                }`}
                                        >
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => toggleItemSelection(id)}
                                                    className={`w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center ${selected ? "bg-rose-500 border-rose-500" : "border-gray-300"
                                                        }`}
                                                >
                                                    {selected && <Check className="w-3 h-3 text-white" />}
                                                </button>

                                                <div className="w-28 h-28 rounded-xl bg-gray-100 overflow-hidden ">
                                                    <CustomImage
                                                        src={image}
                                                        alt={item.productId.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg line-clamp-2">{item.productId.name}</h3>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        Sold by: <span className="font-medium">{item.productId.brand?.name}</span>
                                                    </p>

                                                    <div className="flex justify-between">
                                                        <div>
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <span className="text-2xl font-bold">${price}</span>
                                                                {originalPrice !== price && (
                                                                    <span className="line-through text-gray-500">${originalPrice}</span>
                                                                )}
                                                            </div>
                                                            <div className="mt-1 text-green-600 text-sm flex">
                                                                <Truck className="w-4 h-4 mr-1" /> Standard Delivery
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
                                                            <button onClick={() => updateQty(item, "increase")}>+</button>
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-between mt-3 text-sm">
                                                        <button className="flex items-center gap-2 text-gray-600 hover:text-rose-600">
                                                            <Heart className="w-4 h-4" /> Wishlist
                                                        </button>
                                                        <button
                                                            onClick={() => removeItem(item)}
                                                            className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Remove
                                                        </button>
                                                        <button
                                                            onClick={() => toggleItemSelection(id)}
                                                            className={`px-5 py-2 text-sm rounded-lg font-medium ${selected ? "bg-rose-600 text-white" : "bg-gray-100"
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
                            <div className="bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
                                <div className="bg-rose-600 text-white py-4 text-center font-bold text-xl">
                                    Order Summary
                                </div>
                                <div className="p-6">
                                    {selectedItems.map((item) => (
                                        <div
                                            key={item.productId._id}
                                            className="flex justify-between items-center mb-3 border-b pb-2"
                                        >
                                            <span className="line-clamp-3">
                                                {item.quantity} × {item.productId.name}
                                            </span>
                                            <span className="font-bold">
                                                ${(item.variant?.offerPrice || item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="flex justify-between text-lg font-bold mt-4">
                                        <span>Total Amount</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>

                                    <button className="w-full bg-rose-600 text-white mt-6 py-3 rounded-xl font-bold flex justify-center gap-2">
                                        Place Order <ChevronRight />
                                    </button>

                                    <p className="text-center text-gray-500 mt-3 text-sm">
                                        Free delivery • 30-day returns • Secure payment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isAddressModalOpen && (
                    <AddressForm
                        setIsAddressModalOpen={setIsAddressModalOpen}
                        newAddressFields={newAddressFields}
                        addAddress={addAddress}
                        handleAddressFieldChange={handleAddressFieldChange}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default CartSection;
