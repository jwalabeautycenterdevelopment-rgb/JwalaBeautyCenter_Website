"use client";

import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const ReviewModal = ({ isOpen, onClose, onSubmit, OrderData }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImagePreview(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        if (rating === 0) return;
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("productId", OrderData?.productId || "");

        if (OrderData?.sku) {
            formData.append("sku", OrderData.sku);
        }
        formData.append("rating", rating);
        formData.append("comment", message);
        if (imageFile) {
            formData.append("reviewImages", imageFile);
        }

        await onSubmit(formData);
        setIsSubmitting(false);
        setRating(0);
        setMessage("");
        setImagePreview(null);
        setImageFile(null);

        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white  p-6 w-[90%] max-w-md shadow-xl"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                >
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                        Write a Review
                    </h2>
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className="cursor-pointer text-2xl"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                {hoverRating >= star || rating >= star ? (
                                    <AiFillStar className="text-yellow-400" />
                                ) : (
                                    <AiOutlineStar className="text-gray-400" />
                                )}
                            </span>
                        ))}
                    </div>
                    <textarea
                        className="w-full border border-gray-300 p-3 text-sm outline-none"
                        rows={4}
                        placeholder="Write your experience..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="mt-4">
                        <label className="text-sm font-medium">Upload Image (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-2"
                            onChange={handleImageChange}
                        />

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="preview"
                                className="w-20 h-20 mt-3 rounded object-cover border"
                            />
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-5">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-60"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Review"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ReviewModal;
