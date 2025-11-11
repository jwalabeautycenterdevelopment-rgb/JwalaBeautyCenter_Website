'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { BsDashLg } from 'react-icons/bs';
import clsx from 'clsx';

import Bg1 from '@/app/assets/banner.jpg';
import Bg2 from '@/app/assets/banner.jpg';
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
                        <div className="relative h-[300px] sm:h-[450px] md:h-[520px] 2xl:h-[620px]">
                            <Image
                                src={slide.bg}
                                alt={slide.alt}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 max-w-xs">
                                <p className="text_primary text-lg sm:text-xl">
                                    Complete Cosmetic Solutions
                                </p>
                                <h1 className=" text-bl text-2xl sm:text-3xl font-semibold">
                                    Face Moisturers to Blushes
                                </h1>
                                <button className="px-8 py-2 bg-red-600/20 backdrop-blur-md text-white rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300 w-max text-sm md:text-md">
                                    View
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='flex justify-end'>
                <div className="absolute bottom-10 right-0 md:right-1 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                    <div className="custom-pagination flex gap-4">
                        {slides.map((_, i) => (
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
                            className="object-cover w-full h-full"
                            width={80}
                            height={80}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
