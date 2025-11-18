"use client";
import { motion } from "framer-motion";
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <motion.div
                className="w-16 h-16 rounded-full border-4 border-t-transparent border-blue-500"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                }}
            />

            <motion.p
                className="ml-4 text-xl font-semibold text-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                Loading...
            </motion.p>
        </div>
    );
}
