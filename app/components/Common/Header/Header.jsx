"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCartOutline, IoHeartOutline, IoChevronDown } from "react-icons/io5";
import Logo from "@/app/assets/navbar_icon.svg";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "@/app/store/slice/authSlice";
import { successAlert } from "@/app/utils/alertService";
import CustomImage from "@/app/common/Image";
import { FaUserCircle } from "react-icons/fa";
import { openPopup } from "@/app/store/slice/popupSlice";
import { getUserSubCategory } from "@/app/store/slice/subCategorySlice";
import CategoryDropdown from "@/app/common/CategoryDropdown";
import { fetchCart, fetchGuestCart } from "@/app/store/slice/cartSlice";
import useGuestId from "@/app/utils/useGuestId";
import { fetchFavorites, fetchGuestFavorites } from "@/app/store/slice/favoriteSlice";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const guestId = useGuestId();
    const { accessToken, userData } = useSelector((state) => state.auth);
    const { subCategories, hasFetched } = useSelector((state) => state.subCategory);
    const { totalQuantity } = useSelector((state) => state.cart);
    const { favoritesCount } = useSelector((state) => state.myfavourite)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileCategory, setShowMobileCategory] = useState(false);

    useEffect(() => {
        if (accessToken === undefined || guestId === undefined) return;

        if (accessToken) {
            dispatch(fetchMe());
            dispatch(fetchCart());
            dispatch(fetchFavorites());
        } else if (guestId) {
            dispatch(fetchGuestCart({ guestId }));
            dispatch(fetchGuestFavorites(guestId));
        }
    }, [accessToken, guestId]);


    useEffect(() => {
        if (!hasFetched) {
            dispatch(getUserSubCategory());
        }
    }, [hasFetched]);


    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest(".search-container")) {
                setShowSearch(false);
            }
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    }, []);

    const closeCategoryDropdown = () => setShowCategoryDropdown(false);

    const navLinks = [
        { path: "/category", label: "Categories", hasDropdown: true },
        { path: "/brands", label: "Brands" },
        { path: "/offers", label: "Offers" },
    ];

    const mobileLinks = ["/", "/brands", "/offers", "/cart", "/myfavourites"];


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

    const dropdownVariants = {
        hidden: { opacity: 0, y: 10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.95 }
    };

    const handleProfile = () => {
        router.push("/profile");
        setShowDropdown(false);
    };

    const handleOrder = () => {
        router.push("/myorders");
        setShowDropdown(false);

    }
    const handleLogout = () => {
        dispatch(logout())
        successAlert("Logout Successfully")
        window.location.reload()
    };


    return (
        <header className="bg-white shadow-sm px-4 md:px-6 sticky top-0 left-0 w-full z-50 ">
            <nav className="flex justify-between items-center">
                <div className="flex xl:gap-8 items-center">
                    <Link href="/">
                        <Image src={Logo} alt="Company Logo" width={1000} height={1000} className="w-32 h-auto" />
                    </Link>
                    <p className="text_primary font-medium hidden xl:flex">Welcome to Jwala Online store</p>
                </div>
                <div className="hidden lg:flex items-center space-x-10 text-md">
                    {navLinks?.map((item) => {
                        const isCategory = item.hasDropdown;
                        return (
                            <div
                                key={item.path}
                                onMouseEnter={() => isCategory && setShowCategoryDropdown(true)}
                                onMouseLeave={() => isCategory && setShowCategoryDropdown(false)}
                            >
                                {isCategory ? (
                                    <button
                                        className={`text-gray-700 hover:text-green-400 transition font-medium flex items-center gap-1 py-2`}
                                    >
                                        {item.label}
                                        <IoChevronDown className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.path}
                                        className={`text-gray-700 hover:text-green-400 transition font-medium py-2`}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                                {isCategory && (
                                    <AnimatePresence>
                                        {showCategoryDropdown && (
                                            <motion.div
                                                variants={dropdownVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 w-full bg-white shadow-xl border border-gray-200 z-50"
                                                onMouseEnter={() => setShowCategoryDropdown(true)}
                                                onMouseLeave={() => setShowCategoryDropdown(false)}
                                            >
                                                <CategoryDropdown closeDropdown={closeCategoryDropdown} subCategories={subCategories} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        );
                    })}

                    <div className="flex items-center gap-5">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                            <div className="relative search-container">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <IoIosSearch
                                        className="w-6 h-6 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowSearch(!showSearch);
                                        }}
                                    />
                                </motion.div>
                                <AnimatePresence>
                                    {showSearch && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.15 }}
                                            className="
                                            absolute right-0 mt-3 
                                            w-[320px] md:w-[450px]
                                            backdrop-blur-xl bg-white/20
                                            border border-white/10 shadow-2xl
                                            rounded-3xl p-4 z-50
                                        "
                                        >
                                            <div className="flex items-center gap-3">
                                                <IoIosSearch className="w-6 h-6 text-gray-700" />
                                                <input
                                                    type="text"
                                                    placeholder="Search for products..."
                                                    className="bg-transparent w-full outline-none text-gray-800 placeholder-gray-500"
                                                    autoFocus
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                            <Link href="/myfavourites">
                                <IoHeartOutline className="w-6 h-6 text-gray-700 hover:text-pink-500 transition-colors duration-200" />
                            </Link>
                            {favoritesCount > 0 && (
                                <motion.span
                                    key={favoritesCount}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow"
                                >
                                    {favoritesCount}
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
                        {accessToken ? (
                            <div
                                className="relative"
                                onMouseEnter={() => setShowDropdown(true)}
                                onMouseLeave={() => setShowDropdown(false)}
                            >
                                {userData?.profileImage ? (
                                    <CustomImage
                                        src={userData?.profileImage}
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
                                                onClick={handleOrder}
                                                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                My order
                                            </button>
                                            {/* <button
                                                onClick={handleProfile}
                                                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile
                                            </button> */}
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
                            <div className="flex items-center">
                                <button
                                    onClick={() => dispatch(openPopup("login"))}
                                    className=" py-1.5  rounded-full text-md font-medium text-gray-700 transition-colors duration-200 hover:text-green-500 cursor-pointer hover:border-green-500"
                                >
                                    Login /
                                </button>

                                <button
                                    onClick={() => dispatch(openPopup("signup"))}
                                    className=" py-1.5  rounded-full text-md font-medium text-gray-700 transition-colors duration-200 hover:text-red-500 cursor-pointer hover:border-red-500"
                                >
                                    Register
                                </button>
                            </div>
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
                                            {userData?.firstName}
                                        </span>
                                    </div>
                                ) : (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => {
                                                    closeMenu();
                                                    dispatch(openPopup("login"));
                                                }}
                                                className="py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-green-500 hover:border-green-500 transition"
                                            >
                                                Login /
                                            </button>

                                            <button
                                                onClick={() => {
                                                    closeMenu();
                                                    dispatch(openPopup("signup"));
                                                }}
                                                className="py-1.5 rounded-full text-sm font-medium text-gray-700 hover:text-red-500 hover:border-red-500 transition"
                                            >
                                                Register
                                            </button>
                                        </div>
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
                                    <div className="border-b border-gray-200 pb-2">
                                        <button
                                            onClick={() => setShowMobileCategory(!showMobileCategory)}
                                            className="w-full flex justify-between items-center text-md font-medium text-gray-700 py-2"
                                        >
                                            Categories
                                            <IoChevronDown
                                                className={`transition-transform ${showMobileCategory ? "rotate-180" : ""}`}
                                            />
                                        </button>

                                        <AnimatePresence>
                                            {showMobileCategory && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="pl-4 mt-2 space-y-3"
                                                >
                                                    {subCategories?.map((cat) => (
                                                        <Link
                                                            key={cat._id}
                                                            href={`/products/${cat.slug}`}
                                                            onClick={closeMenu}
                                                            className="text-gray-600 text-sm block hover:text-green-600"
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

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
                )
                }
            </AnimatePresence >
        </header >
    );
};

export default Header;