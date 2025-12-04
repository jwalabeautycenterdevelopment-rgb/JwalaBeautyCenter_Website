"use client";

import CustomImage from "@/app/common/Image";
import { fetchOrder } from "@/app/store/slice/orderSlice";
import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const STATUS_STYLES = {
    Shipped: "bg-orange-100 text-orange-600",
    Processing: "bg-orange-100 text-orange-600",
    Pending: "bg-orange-100 text-orange-600",
    Delivered: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
};

const MyOrderSection = () => {
    const dispatch = useDispatch();
    const { orderData, loadingOrders } = useSelector((state) => state.order);
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const filteredOrders = orderData?.filter((order) => {
        if (activeTab === "All") return true;
        if (activeTab === "In Progress")
            return ["Pending", "Processing", "Shipped"].includes(order.status);
        if (activeTab === "Delivered") return order.status === "Delivered";
        if (activeTab === "Cancelled") return order.status === "Cancelled";
    }) || [];

    return (
        <div className="min-h-screen max-w-4xl mx-auto py-6">
            <div className="flex items-center gap-3 mb-6">
                {["All", "In Progress", "Delivered", "Cancelled"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full border border-gray-300 text-sm ${activeTab === tab
                            ? "bg-red-100 text-red-600 border-red-200"
                            : "bg-white border-gray-300 text-gray-600"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            {!loadingOrders && filteredOrders.length === 0 && (
                <p className="text-center text-gray-500 py-10">No orders found.</p>
            )}
            {loadingOrders && (
                <p className="text-center text-gray-500 py-10">Loading orders...</p>
            )}
            {filteredOrders?.map((order) => {
                const firstItem = order.items[0];
                const image = firstItem?.variant?.variantImages?.[0]
                const itemsCount = order.items.length;
                const badgeColor = STATUS_STYLES[order.status] ||
                    "bg-gray-200 text-gray-600";
                return (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-300 p-3 mb-5 hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
                            >
                                ● {order.status}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {formatDate(order.placedAt)}
                            </span>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="relative">
                                <CustomImage
                                    src={image}
                                    className="w-16 h-16 rounded-md object-cover"
                                    alt="product"
                                />

                                {itemsCount > 1 && (
                                    <span className="absolute bottom-0 right-0 text-xs bg-black text-white px-1 rounded">
                                        +{itemsCount - 1}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-red-600 text-sm font-semibold mb-1">
                                    Order ID: {order.orderId}
                                </h3>
                                <p className="text-gray-700 text-sm">
                                    {firstItem.productId?.name?.slice(0, 45)}...
                                    {itemsCount > 1 && (
                                        <span className="text-red-500">
                                            {" "}
                                            & {itemsCount - 1} more items
                                        </span>
                                    )}
                                </p>
                                <p className="mt-2 text-black font-semibold">
                                    ₹ {order.totalAmount}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MyOrderSection;
