"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa";
import Logo from "@/app/assets/navbar_icon.svg";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Footer = () => {
    const router = useRouter()
    const { getAllCategories, } = useSelector((state) => state.parentcategory);

    const handleNavigate = (item) => {
        router.push(`/category/${item?.slug}`)
    }
    return (
        <footer className="bg-[#ffff] px-4 md:px-6 text-gray-800 border-t border-gray-200">
            <div className="mx-auto py-3 md:pt-8 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 space-y-4">
                        <Image
                            src={Logo}
                            alt="JBC Logo"
                            className="w-32 h-auto"
                            width={1000} height={1000}
                        />
                    </div>
                    <div className="col-span-1 md:col-span-10 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/brands" className="hover:underline">Brands</Link></li>
                                <li><Link href="/offers" className="hover:underline">Offers</Link></li>
                                <li><Link href="/cart" className="hover:underline">Cart</Link></li>
                                <li><Link href="/myfavourites" className="hover:underline">Wishlist</Link></li>
                                <li><Link href="/myorders" className="hover:underline">My Orders</Link></li>
                                <li><Link href="/myorders" className="hover:underline">Profile</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Categories</h3>
                            <ul className="space-y-2 text-sm">
                                {getAllCategories?.map((item) => (
                                    <li
                                        key={item._id}
                                        onClick={() => handleNavigate(item)}
                                        className="hover:underline cursor-pointer"
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Contact Us</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <span className="font-medium">Mobile Number:</span>{" "}
                                    <a href="tel:04425350303" className="text_primary hover:underline">044-2535 0303</a>
                                </li>
                                <li>
                                    <a href="tel:+919551222201" className="text_primary hover:underline">+91 95512 22201</a>
                                </li>
                                <li>
                                    <a href="tel:+918925066671" className="text_primary hover:underline">+91 89250 66671</a>
                                </li>
                                <li>
                                    <span className="font-medium">Email</span>{" "}
                                    <a href="mailto:parrysbeauty2023@gmail.com" className="text_primary  lg:text-xs xl:text-sm hover:underline">
                                        parrysbeauty2023@gmail.com
                                    </a>
                                </li>
                                <li>
                                    <span className="font-medium">Address:</span>{" "}
                                    <span className="text_primary">#15, Evening Bazzar Road, Park Town, Chennai - 03</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-300 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 px-4 md:px-6">
                    <p className="text-center md:text-left font-semibold text-black">
                        © 2025. JWALA BEAUTY CENTER  All Right Reserved  {" "}
                        {/* <Link target="_blank" href={"https://www.webdads2u.com/"}>WEBDADS2U PRIVATE LIMITED</Link> */}
                    </p>
                    <div className="flex space-x-4 text-sm justify-center md:justify-start font-medium text-gray-600">
                        <Link href="/policy/terms" className="hover:underline">Privacy Policy</Link>
                        <Link href="/policy/shipping" className="hover:underline">Terms & Conditions</Link>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0 md:px-10">
                        <div className="flex space-x-4 text-xl text-black">
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
            bg-[#E1306C] p-2 rounded-full text-white 
            transition-transform duration-300 hover:scale-110
        "
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
            bg-[#1877F2] p-2 rounded-full text-white
            transition-transform duration-300 hover:scale-110
        "
                            >
                                <FaFacebookF />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
