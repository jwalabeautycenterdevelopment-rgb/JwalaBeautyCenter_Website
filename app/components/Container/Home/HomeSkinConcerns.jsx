"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import facialImg from "@/app/assets/facial_img.svg";

const concerns = [
    { title: "Ubtan Facial", img: facialImg },
    { title: "Brightening Facial", img: facialImg },
    { title: "Night Beauty", img: facialImg },
    { title: "Acne Mask", img: facialImg },
    { title: "Hydrating Glow", img: facialImg },
    { title: "Tan Removal", img: facialImg },
    { title: "Acne Mask", img: facialImg },

];

const HomeSkinConcerns = () => {
    return (
        <div className="py-4 md:py-12 bg-[#FFF4E5] px-4 sm:px-6 lg:px-20">
            <h3 className="text-center text-red-500 font-semibold text-[26px] md:text-[32px] mb-8">
                Shop by Skin Concerns
            </h3>
            <div className="max-w-7xl mx-auto">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1.5}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1400: { slidesPerView: 5 },
                    }}
                    className="px-6"
                >
                    {concerns?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative w-[170px] h-[140px] mb-4">
                                    <Image
                                        src={item?.img}
                                        alt={item?.title}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-gray-700 text-[15px] font-medium">
                                    {item?.title}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSkinConcerns;
