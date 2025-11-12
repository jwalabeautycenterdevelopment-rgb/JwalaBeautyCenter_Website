'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { BsDashLg } from 'react-icons/bs';
import clsx from 'clsx';

import Bg1 from '@/app/assets/banner.jpg';
import Bg2 from '@/app/assets/banner2.jpg';
import Bg3 from '@/app/assets/banner.jpg';

const slides = [
    { bg: Bg1, alt: 'Slide 1' },
    { bg: Bg2, alt: 'Slide 2' },
    { bg: Bg3, alt: 'Slide 3' },
];

export default function HomeBanner() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="relative w-full">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                navigation={false}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    bulletClass: 'custom-bullet',
                    bulletActiveClass: 'custom-bullet-active',
                    renderBullet: () => '',
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides?.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative h-[300px] sm:h-[450px] md:h-[520px] 2xl:h-screen w-full">
                            <Image
                                src={slide.bg}
                                alt={slide.alt}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                            <div className="absolute left-5 md:left-32 top-1/2 -translate-y-1/2 flex flex-col gap-1 md:gap-4 ">
                                <p className="text_primary text-lg sm:text-4xl">
                                    Complete Cosmetic Solutions
                                </p>
                                <h1 className="text-bl text-2xl sm:text-7xl font-medium max-w-2xl">
                                    Face Moisturers to Blushes
                                </h1>
                                <button className="px-8 md:px-15 py-2 bg-red-600/20 backdrop-blur-md text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300 w-max text-sm md:text-xl">
                                    View
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className=' hidden md:flex justify-end'>
                <div className="absolute bottom-10 2xl:bottom-30 right-0 md:right-1 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                    <div className="custom-pagination flex gap-4">
                        {slides?.map((_, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    'custom-bullet flex items-center justify-center transition-all duration-300 w-10 h-10',
                                    'custom-bullet-active:scale-150'
                                )}
                            >
                                <BsDashLg
                                    className={clsx(
                                        'text-white text-lg',
                                        'custom-bullet-active:text-white custom-bullet-active:scale-150'
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-20 h-20 overflow-hidden rounded-lg border-2 border-white">
                        <Image
                            src={slides[(activeIndex + 1) % slides.length].bg}
                            alt="Next slide"
                            className="object-contain w-full h-full"
                            width={100}
                            height={300}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
