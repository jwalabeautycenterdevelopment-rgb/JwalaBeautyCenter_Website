"use client";
import Image from "next/image";
import { useState } from "react";
const IMG_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";

export default function CustomImage({
    src = "",
    alt = "image",
    className = "",
    style = {},
    width = 500,
    height = 500,
}) {
    const [imgSrc, setImgSrc] = useState(
        src.startsWith("http") ? src : `${IMG_URL}${src}`
    );

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            style={style}
            onError={() =>
                setImgSrc(
                    "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
                )
            }
            unoptimized 
        />
    );
}
