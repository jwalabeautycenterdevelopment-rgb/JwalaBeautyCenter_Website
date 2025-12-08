"use client";

import { EmptyOrders } from "@/app/common/Animation";
import CustomImage from "@/app/common/Image";
import ReviewModal from "@/app/common/ReviewModal";
import { fetchMe } from "@/app/store/slice/authSlice";
import { fetchOrder } from "@/app/store/slice/orderSlice";
import { addReview, clearReviewError, clearReviewMessage } from "@/app/store/slice/review";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
    const { userData } = useSelector((state) => state.auth);
    const { orderData, loadingOrders } = useSelector((state) => state.order);
    const { successMsg, errorMsg } = useSelector((state) => state.review);
    const [activeTab, setActiveTab] = useState("All");
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        dispatch(fetchOrder());
        dispatch(fetchMe());
    }, [dispatch]);

    useEffect(() => {
        if (successMsg) {
            successAlert(successMsg);
            dispatch(clearReviewMessage());
            dispatch(fetchOrder());
            setIsReviewOpen(false);
        }

        if (errorMsg) {
            errorAlert(errorMsg);
            dispatch(clearReviewError());
        }
    }, [successMsg, errorMsg]);

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const filteredOrders =
        orderData?.filter((order) => {
            if (activeTab === "All") return true;
            if (activeTab === "In Progress")
                return ["Pending", "Processing", "Shipped"].includes(order.status);
            if (activeTab === "Delivered") return order.status === "Delivered";
            if (activeTab === "Cancelled") return order.status === "Cancelled";
        }) || [];

    const handleSubmitReview = (reviewData) => {
        dispatch(addReview(reviewData));
    };

    return (
        <div className="bg-linear-to-r from-[#fff5e6] to-[#fff5e6]">
            <div className="min-h-screen max-w-4xl mx-auto py-6 ">
                <div className="relative mb-8">
                    <div className="backdrop-blur-xl bg-white/30 shadow-lg border border-white/40 rounded-2xl p-6 flex items-center gap-4">
                        <CustomImage
                            src={userData?.profileImage || "/default-user.png"}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                            alt="profile"
                        />
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {userData?.firstName || "User"}
                            </h2>
                            <p className="text-gray-600 text-sm">{userData?.email}</p>
                        </div>
                    </div>
                </div>
                {orderData?.length > 0 && (
                    <div className="flex items-center gap-3 mb-6">
                        {["All", "In Progress", "Delivered", "Cancelled"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-full border text-sm transition ${activeTab === tab
                                    ? "bg-red-100 text-red-600 border-red-300"
                                    : "bg-white text-gray-600 border-gray-300"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                )}

                {!loadingOrders && filteredOrders.length === 0 && <EmptyOrders />}
                {loadingOrders && (
                    <p className="text-center text-gray-500 py-10">Loading orders...</p>
                )}
                {filteredOrders?.map((order) => {
                    const firstItem = order.items[0];
                    const image = firstItem?.variant?.variantImages?.[0] || firstItem?.productImages?.[0] || "/placeholder-image.png";
                    const itemsCount = order.items.length;

                    return (
                        <div
                            key={order._id}
                            className="bg-white rounded-xl shadow-sm border border-gray-300 p-3 mb-5 hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status] ||
                                        "bg-gray-200 text-gray-600"
                                        }`}
                                >
                                    ● {order.status}
                                </span>
                                <span className="text-gray-500 text-sm">
                                    {formatDate(order.placedAt)}
                                </span>
                            </div>

                            <div className="flex items-start gap-4">
                                <Link href={`/product/${firstItem?.productId?.slug}`} className="relative">
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
                                </Link>

                                <div className="flex-1">
                                    <h3 className="text-red-600 text-sm font-semibold mb-1">
                                        Order ID: {order.orderId}
                                    </h3>

                                    <p className="text-gray-700 text-sm">
                                        {firstItem.productId?.name?.slice(0, 45)}...
                                        {itemsCount > 1 && (
                                            <span className="text-red-500">
                                                {" "}
                                                & {itemsCount - 1} more
                                            </span>
                                        )}
                                    </p>

                                    <p className="mt-2 text-black font-semibold">
                                        ₹ {order.totalAmount}
                                    </p>

                                    <div className="flex justify-end">
                                        <button
                                            className="px-4 py-2 font-semibold bg-green-600 text-sm text-white rounded-lg hover:bg-green-700 transition"
                                            onClick={() => {
                                                setSelectedItem({
                                                    productId: firstItem?.productId?._id || null,
                                                    sku: firstItem?.variant?.sku || null,
                                                });
                                                setIsReviewOpen(true);
                                            }}
                                        >
                                            Write a Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                OrderData={selectedItem}
                onSubmit={handleSubmitReview}
            />
        </div>
    );
};

export default MyOrderSection;
