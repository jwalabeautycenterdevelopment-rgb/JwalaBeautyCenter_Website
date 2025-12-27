'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner } from '@/app/store/slice/bannerSlice';
import CustomImage from '@/app/common/Image';
import Link from 'next/link';

export default function HomeBanner() {
    const dispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const { allBanners, hasFetched } = useSelector((state) => state.banner);

    useEffect(() => {
        if (!hasFetched) {
            dispatch(getBanner());
        }
    }, [dispatch, hasFetched]);

    const banners = Array.isArray(allBanners) ? allBanners : [];

    return (
        <section className="relative w-full">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={banners.length > 1}
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
                {banners?.map((banner, idx) => (
                    <SwiperSlide key={banner?._id}>
                        <div className="relative h-[300px] sm:h-[450px] md:h-[520px] 2xl:h-screen w-full">
                            <CustomImage
                                src={banner?.bannerImage || ""}
                                alt={banner?.header || `Slide ${idx + 1}`}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                        </div>
                        {
                            banner?.header &&
                            <div className="
        absolute left-1/2 top-1/2 
        -translate-x-1/2 -translate-y-1/2 
        flex flex-col items-center text-center 
        gap-2 sm:gap-3 md:gap-4 px-4 w-full
    ">
                                <h1
                                    className="
        font-bold leading-tight
        text-2xl sm:text-3xl md:text-5xl lg:text-6xl 2xl:text-7xl
        drop-shadow-xl max-w-[90%] sm:max-w-[80%] md:max-w-4xl lg:max-w-5xl
    "
                                    style={{ color: banner?.colourCode || "#ffffff" }}
                                >
                                    {banner?.header}
                                </h1>
                                <Link href={"/brands"}
                                    className="
                px-6 sm:px-10 md:px-14 py-2 sm:py-3
                bg-red-600/40 backdrop-blur-md text-white rounded-full
                hover:bg-[#FBBBBC]/40 transition-all duration-300
                text-sm sm:text-base md:text-xl
            "
                                >
                                    View
                                </Link>
                            </div>
                        }
                    </SwiperSlide>
                ))}
            </Swiper>

            {banners?.length > 1 && banners[(activeIndex + 1) % banners?.length]?.bannerImage && (
                <div className="hidden md:flex justify-end">
                    <div className="absolute bottom-10 2xl:bottom-30 right-0 md:right-1 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
                        <div className="flex gap-3 z-20">
                            {Array.from({ length: 3 }).map((_, i) => {
                                const visibleIndex = (activeIndex + i) % banners.length;

                                return (
                                    <div
                                        key={i}
                                        className="w-20 h-1 bg-white/40 overflow-hidden rounded-full"
                                    >
                                        <div
                                            className={clsx(
                                                "h-full bg-white transition-all duration-[4s]",
                                                i === 0 ? "w-full" : "w-0"
                                            )}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="w-20 h-auto overflow-hidden rounded-lg border-2 border-white">
                            <CustomImage
                                src={banners[(activeIndex + 1) % banners?.length]?.bannerImage || ""}
                                alt="Next slide"
                                className="object-contain w-full h-full"
                                width={100}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
