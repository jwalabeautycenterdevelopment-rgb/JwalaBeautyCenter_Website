import Image from "next/image";
import React from "react";
import naturalBanner from "@/app/assets/natural_banner_img.jpg";

const HomeNaturalSkin = () => {
    return (
        <div className="w-full h-auto ">
            <Image
                src={naturalBanner}
                alt="Natural Skin Banner"
                width={1000}
                height={1000}
                className="object-cover w-full h-[500px] rounded-md"
            />
        </div>
    );
};

export default HomeNaturalSkin;
