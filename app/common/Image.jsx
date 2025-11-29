"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const IMG_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL || "";
export default function CustomImage({
    src = null,
    alt = "image",
    className = "",
    style = {},
    width = 500,
    height = 500,
    fill = false,
    priority = false,
}) {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        if (typeof src === "string" && src.trim() !== "") {
            setImgSrc(src.startsWith("http") ? src : `${IMG_URL}${src}`);
        } else {
            setImgSrc(
                "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg"
            );
        }
    }, [src]);

    if (!imgSrc) return null;

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={className}
            style={style}
            unoptimized
            priority={priority}
        />
    );
}
