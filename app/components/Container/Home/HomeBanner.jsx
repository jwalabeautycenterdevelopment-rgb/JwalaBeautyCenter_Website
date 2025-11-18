'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
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
                                src={slide?.bg}
                                alt={slide?.alt}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="hidden md:flex justify-end">
                <div className="absolute bottom-10 2xl:bottom-30 right-0 md:right-1 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
                    <div className="flex gap-3 z-20">
                        {slides?.map((_, i) => (
                            <div key={i} className="w-20 h-1 bg-white/40 overflow-hidden rounded-full">
                                <div
                                    className={clsx(
                                        "h-full bg-white transition-all duration-[4s]",
                                        i === activeIndex ? "w-full" : "w-0"
                                    )}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="w-20 h-auto overflow-hidden rounded-lg border-2 border-white">
                        <Image
                            src={slides[(activeIndex + 1) % slides.length].bg}
                            alt="Next slide"
                            className="object-contain w-full h-full"
                            width={100}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
