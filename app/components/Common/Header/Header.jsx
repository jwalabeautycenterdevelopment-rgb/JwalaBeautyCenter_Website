"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import Logo from "@/app/assets/navbar_icon.svg";

const Header = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const userData = null;
    const totalQuantity = 10;
    const favorite = 3;
    const IMG_URL = "/uploads/";
    const navLinks = ["/", "/category", "/brands", "/offers",];
    const mobileLinks = ["/", "/category", "/brands", "/offers", "/cart", "/favorite"];

    const handleProfile = () => {
        router.push("/profile");
        setShowDropdown(false);
    };

    const handleLogout = () => {
        console.log("Logout clicked");
    };

    const menuVariants = {
        closed: {
            x: "100%",
            transition: { type: "spring", stiffness: 400, damping: 40 },
        },
        open: {
            x: 0,
            transition: { type: "spring", stiffness: 400, damping: 40 },
        },
    };

    const menuItemVariants = {
        closed: { opacity: 0, x: 50 },
        open: { opacity: 1, x: 0 },
    };

    const overlayVariants = { closed: { opacity: 0 }, open: { opacity: 1 } };

    return (
        <header className="bg-white shadow-sm py-1 px-4 md:px-6 sticky top-0 left-0 w-full z-50">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src={Logo} alt="Company Logo" width={1000} height={1000} className="w-32 h-auto" />
                </Link>
                <p className="text_primary font-medium hidden md:flex">Welcome to Jwala Online store</p>
                <div className="hidden lg:flex items-center space-x-12">
                    {navLinks?.map((path) => {
                        const label =
                            path === "/"
                                ? "Home"
                                : path
                                    .replace("/", "")
                                    .replace("-", " ")
                                    .replace(/\b\w/g, (l) => l.toUpperCase());
                        return (
                            <Link
                                key={path}
                                href={path}
                                className={`text-gray-700 hover:text-green-400 transition font-medium`}
                            >
                                {label}
                            </Link>
                        );
                    })}

                    <div className="flex items-center gap-6">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                            <Link href="/favorite">
                                <IoHeartOutline className="w-6 h-6 text-gray-700 hover:text-pink-500 transition-colors duration-200" />
                            </Link>
                            {favorite > 0 && (
                                <motion.span
                                    key={favorite}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow"
                                >
                                    {favorite}
                                </motion.span>
                            )}
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                            <Link href="/cart" className="relative">
                                <IoCartOutline className="w-6 h-6 text-gray-700 hover:text-green-600 transition-colors duration-200" />
                                {totalQuantity > 0 && (
                                    <motion.span
                                        key={totalQuantity}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                        className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow"
                                    >
                                        {totalQuantity}
                                    </motion.span>
                                )}
                            </Link>
                        </motion.div>
                        {userData ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                {userData?.profileImage ? (
                                    <Image
                                        src={IMG_URL + userData.profileImage}
                                        alt="Profile"
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-300 cursor-pointer"
                                    />
                                ) : (
                                    <FaUserCircle className="w-8 h-8 text-gray-600 cursor-pointer" />
                                )}
                                <AnimatePresence>
                                    {showDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                                        >
                                            <button
                                                onClick={handleProfile}
                                                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/signup"
                                className="px-5 py-1.5 border rounded-full text-sm font-medium text-gray-700  transition-colors duration-200"
                            >
                                Sign Up
                            </Link>
                        )}
                    </div>
                </div>
                <motion.button
                    className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 relative z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.span
                        className="block h-0.5 w-6 bg-gray-700"
                        animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="block h-0.5 w-6 bg-gray-700"
                        animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.span
                        className="block h-0.5 w-6 bg-gray-700"
                        animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/30 z-40"
                            variants={overlayVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            onClick={closeMenu}
                        />
                        <motion.div
                            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 shadow-xl"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="flex flex-col p-8 space-y-6 pt-20 relative">
                                <motion.button
                                    className="absolute top-6 right-6 text-gray-700 p-2"
                                    onClick={closeMenu}
                                    aria-label="Close menu"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ✕
                                </motion.button>

                                {userData ? (
                                    <div className="flex items-center space-x-3 mb-6">
                                        <FaUserCircle
                                            className="w-10 h-10 text-gray-600 cursor-pointer"
                                            onClick={() => {
                                                handleProfile();
                                                closeMenu();
                                            }}
                                        />
                                        <span className="font-medium text-gray-700">
                                            {userData.firstName}
                                        </span>
                                    </div>
                                ) : (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            href="/signup"
                                            onClick={closeMenu}
                                            className="px-6 py-2 border rounded-full text-black  hover:text-white transition-colors duration-200 text-center mb-6 block"
                                        >
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                )}

                                <motion.div
                                    className="flex flex-col space-y-6"
                                    variants={{
                                        open: {
                                            transition: {
                                                staggerChildren: 0.1,
                                                delayChildren: 0.2,
                                            },
                                        },
                                        closed: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                staggerDirection: -1,
                                            },
                                        },
                                    }}
                                >
                                    {mobileLinks?.map((path) => {
                                        const label =
                                            path === "/"
                                                ? "Home"
                                                : path
                                                    .replace("/", "")
                                                    .replace("-", " ")
                                                    .replace(/\b\w/g, (l) => l.toUpperCase());
                                        return (
                                            <motion.div key={path} variants={menuItemVariants} whileHover={{ x: 10 }}>
                                                <Link
                                                    href={path}
                                                    onClick={closeMenu}
                                                    className="text-md border-b border-gray-100 text-gray-700 font-medium hover:text-green-600 transition-colors block"
                                                >
                                                    {label}
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                    {userData && (
                                        <button
                                            onClick={handleLogout}
                                            className="text-left text-red-600 font-medium hover:bg-red-50 px-4 py-2 rounded-md"
                                        >
                                            Logout
                                        </button>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
