"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getParentCategory } from "@/app/store/slice/parentCategorySlice";
import { useEffect } from "react";
import CustomImage from "@/app/common/Image";
import { useRouter } from "next/navigation";

const HomeSkinConcerns = () => {
    const dispatch = useDispatch();
    const router = useRouter()
    const { getAllCategories, hasFetched } = useSelector((state) => state.parentcategory);

    useEffect(() => {
        if (!hasFetched) {
            dispatch(getParentCategory());
        }
    }, [dispatch, hasFetched]);

    const handleNavigate = (item) => {
        router.push(`/category/${item?.slug}`)
    }

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
                        1200: { slidesPerView: 4 },
                        1400: { slidesPerView: 5 },
                    }}
                    className="px-6"
                >
                    {getAllCategories?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleNavigate(item)}>
                                <div className="relative w-[170px] h-[140px] mb-4">
                                    <CustomImage
                                        src={item?.image}
                                        alt={item?.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-gray-700 text-[15px] font-medium">
                                    {item?.name}
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
