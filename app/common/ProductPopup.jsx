"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CustomImage from "./Image";

export default function ProductPopup({ isOpen, onClose, product }) {
    if (!isOpen || !product) return null;
    const { name, colour, size, mainImage, images = [], description } = product;
    const [currentImage, setCurrentImage] = useState(mainImage || images[0]);

    useEffect(() => {
        setCurrentImage(mainImage || images[0]);
    }, [mainImage, images]);

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="absolute inset-0" onClick={onClose}></div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative bg-white rounded-xl p-6 w-full max-w-xl md:max-w-5xl z-50"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-2xl text-gray-700 hover:text-black"
                >
                    ✕
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CustomImage
                        src={currentImage}
                        className="w-full h-64 md:h-80 lg:h-120 max-h-120 rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-semibold">
                            {name.length > 10 ? name.substring(0, 125) + "…" : name}
                        </h2>
                        {description.length > 40 ? description.substring(0, 460) + "…" : description}
                        {colour && <p className="text-lg">Colour: {colour}</p>}
                        {size && <p className="text-lg">Size: {size}</p>}

                        <div className="flex gap-3 flex-wrap mt-3">
                            {images?.map((img, index) => (
                                <div
                                    key={index}
                                    onClick={() => setCurrentImage(img)}
                                >
                                    <CustomImage
                                        src={img}
                                        className={`w-16 h-16 border rounded-md cursor-pointer ${currentImage === img ? "border-blue-500" : "border-gray-200"
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
