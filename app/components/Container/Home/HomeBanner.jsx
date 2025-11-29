'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getBanner } from '@/app/store/slice/bannerSlice';
import CustomImage from '@/app/common/Image';

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
                            <div className="absolute left-5 md:left-30 top-1/2 -translate-y-1/2 flex flex-col gap-1 md:gap-4">
                                <p className="text_primary text-lg sm:text-4xl">
                                    {banner?.description}
                                </p>
                                <h1 className="text-bl text-2xl lg:text-5xl 2xl:text-7xl font-semibold max-w-xl text-white">
                                    {banner?.header}
                                </h1>
                                <button className="px-8 md:px-15 py-2 bg-red-600/20 backdrop-blur-md text-white rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300 w-max text-sm md:text-lg">
                                    View
                                </button>
                            </div>
                        }

                    </SwiperSlide>
                ))}
            </Swiper>

            {banners?.length > 1 && banners[(activeIndex + 1) % banners?.length]?.bannerImage && (
                <div className="hidden md:flex justify-end">
                    <div className="absolute bottom-10 2xl:bottom-30 right-0 md:right-1 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
                        <div className="flex gap-3 z-20">
                            {banners?.map((_, i) => (
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
