"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaBox, FaSearch, FaExclamationTriangle, FaSync } from "react-icons/fa";
import { Sparkles, ShoppingCart } from "lucide-react";
import { ShoppingBag, Heart } from "lucide-react";
import Link from "next/link";


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



export const EmptyCart = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const sparkleVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: {
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
            }
        }
    };

    return (
        <motion.div
            className="min-h-screen  flex items-center justify-center bg-linear-to-r from-[#fff5e6] to-[#fff5e6] px-5 md:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-md w-full">
                <motion.div className="relative">
                    <motion.div
                        className="absolute -top-20 -left-20 w-40 h-40 bg-linear-to-r from-rose-100 to-pink-100 rounded-full blur-3xl opacity-60"
                        animate={{
                            x: [0, 20, 0],
                            y: [0, 15, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.div
                        className="absolute -bottom-20 -right-20 w-40 h-40 bg-linear-to-r from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-60"
                        animate={{
                            x: [0, -15, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-2xl">
                        <motion.div
                            className="absolute -top-2 -right-2"
                            variants={sparkleVariants}
                            animate="animate"
                        >
                            <Sparkles className="w-6 h-6 text-rose-400" />
                        </motion.div>

                        <motion.div
                            className="absolute -bottom-2 -left-2"
                            variants={sparkleVariants}
                            animate="animate"
                            transition={{ delay: 1 }}
                        >
                            <Sparkles className="w-6 h-6 text-blue-400" />
                        </motion.div>
                        <motion.div
                            className="flex justify-center mb-6"
                            variants={itemVariants}
                        >
                        </motion.div>
                        <div className="min-h-[300px] flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <ShoppingCart className="w-20 h-20 text-gray-300" />
                                <h3 className="text-lg font-medium text-gray-700">
                                    No items in cart
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Browse products to add items
                                </p>
                                <Link href={"/"} className=" cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                                    View Products →
                                </Link>
                            </motion.div>
                        </div>

                        <div className="absolute -top-6 left-6">
                            <motion.div
                                className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center"
                                animate={{
                                    y: [0, -20, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <span className="text-2xl">👕</span>
                            </motion.div>
                        </div>

                        <div className="absolute -bottom-6 right-6">
                            <motion.div
                                className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center"
                                animate={{
                                    y: [0, 20, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1.5
                                }}
                            >
                                <span className="text-2xl">👟</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};


export const FavoritesLoading = () => {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <p className="text-gray-600">Loading your favorites...</p>
            </div>
        </div>
    );
};


export const EmptyFavorites = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10 md:py-20 px-4 from-[#fff5e6] to-[#fff5e6]">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                }}
                className="relative mb-8"
            >
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative z-10"
                >
                    <motion.div
                        className="absolute -top-2 -right-2"
                        animate={{
                            y: [0, -15, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                        }}
                    >
                        <Heart className="w-10 h-10 text-pink-400 fill-pink-400" />
                    </motion.div>

                    <motion.div
                        className="absolute -bottom-2 -left-2"
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.2
                        }}
                    >
                        <Heart className="w-5 h-5 text-purple-300 fill-purple-300" />
                    </motion.div>
                </motion.div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-1 max-w-md"
            >
                <h3 className="text-2xl font-bold text-gray-800">
                    Your wishlist is empty
                </h3>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-lg"
                >
                    Looks like you haven't added any favorites yet
                </motion.p>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2"
            >
                <Link href={"/"} className=" cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                    Start Shopping →
                </Link>
            </motion.div>
        </div >
    );
};


export const DotPulseLoader = () => {
    const dotVariants = {
        initial: { y: 0 },
        animate: { y: -10 }
    };

    return (
        <div className="flex justify-center items-center space-x-2">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    className="w-3 h-3 bg-blue-500 rounded-full"
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.1
                    }}
                />
            ))}
        </div>
    );
};
