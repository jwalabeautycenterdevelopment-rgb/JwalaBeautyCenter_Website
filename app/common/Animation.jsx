"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaBox, FaSearch, FaExclamationTriangle, FaSync } from "react-icons/fa";

export const NoProductFound = () => {
    const icons = [
        { icon: FaSearch, color: "text-blue-500" },
        { icon: FaBox, color: "text-gray-500" },
        { icon: FaExclamationTriangle, color: "text-yellow-500" },
        { icon: FaSync, color: "text-purple-500" }
    ];

    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center min-h-[60vh] relative overflow-hidden">
            <div className="relative h-32 w-full max-w-md mb-8">
                <motion.div
                    initial={{ x: -200, y: 0, scale: 0.5, opacity: 0 }}
                    animate={{
                        x: [-200, 0, 200, 0],
                        y: [0, -50, 0, 0],
                        scale: [0.5, 1.2, 0.8, 1],
                        opacity: [0, 1, 0.7, 1],
                        rotate: [-180, 0, 180, 0]
                    }}
                    transition={{
                        duration: 6,
                        ease: "easeInOut",
                        times: [0, 0.3, 0.7, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="search"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{
                                scale: 1,
                                rotate: 0,
                                transition: { duration: 0.5 }
                            }}
                            exit={{
                                scale: 0,
                                rotate: 180,
                                transition: { duration: 0.3 }
                            }}
                            className={`bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-200 ${icons[0].color
                                }`}
                        >
                            <FaSearch className="text-4xl" />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
                <motion.div
                    initial={{ x: -200, y: 0, scale: 0.5, opacity: 0 }}
                    animate={{
                        x: [-200, 0, 200, 0],
                        y: [0, 50, 0, 0],
                        scale: [0.5, 0.8, 1.2, 1],
                        opacity: [0, 0.7, 1, 1],
                        rotate: [180, 0, -180, 0]
                    }}
                    transition={{
                        duration: 6,
                        ease: "easeInOut",
                        times: [0, 0.3, 0.7, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: 1.5
                    }}
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="box"
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{
                                scale: 1,
                                rotate: 0,
                                transition: { duration: 0.5 }
                            }}
                            exit={{
                                scale: 0,
                                rotate: -180,
                                transition: { duration: 0.3 }
                            }}
                            className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200 text-gray-500"
                        >
                            <FaBox className="text-4xl" />
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
            <motion.div className="relative h-24 w-24 mb-8">
                <motion.div
                    animate={{
                        x: [-100, 0, 100, 0],
                        scale: [0.8, 1.2, 0.8, 1],
                        rotate: [0, 180, 360, 0],
                    }}
                    transition={{
                        duration: 8,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.75, 1],
                        repeat: Infinity,
                    }}
                    className="absolute inset-0"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="icon-cycle"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-linear-to-br from-blue-100 to-purple-100 p-5 rounded-xl shadow-lg border"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            >
                                <FaSearch className="text-3xl text-blue-600" />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </motion.div>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.3
                        }
                    }
                }}
                className="text-center"
            >
                <motion.h2
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 30,
                            filter: "blur(10px)"
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                                duration: 0.8,
                                ease: [0.6, -0.05, 0.01, 0.99]
                            }
                        }
                    }}
                    className="text-3xl font-bold text-gray-800 mb-4"
                >
                    No Products Found
                </motion.h2>

                <motion.p
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: 20
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                ease: "easeOut"
                            }
                        }
                    }}
                    className="text-gray-600 font-medium max-w-md  text-md leading-relaxed"
                >
                    We're searching high and low but couldn't find any products matching your criteria.
                </motion.p>
            </motion.div>
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-200 rounded-full opacity-30"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-200 rounded-full opacity-30"
                />
            </div>
        </div>
    );
};