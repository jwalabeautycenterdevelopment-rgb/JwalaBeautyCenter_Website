"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAdBanners } from "@/app/store/slice/adBanner";
import CustomImage from "@/app/common/Image";

const HomeNaturalSkin = () => {
    const dispatch = useDispatch()
    const { allBanners, hasFetched } = useSelector((state) => state.adBanner);
    const firstBanner = allBanners[0]

    useEffect(() => {
        if (!hasFetched) {
            dispatch(getUserAdBanners());
        }
    }, [dispatch, hasFetched]);

    return (
        <div className="w-full h-auto ">
            <CustomImage
                src={firstBanner?.adImage}
                alt="Natural Skin Banner"
                width={1000}
                height={1000}
                className="object-cover w-full h-auto rounded-md"
            />
        </div>
    );
};

export default HomeNaturalSkin;
