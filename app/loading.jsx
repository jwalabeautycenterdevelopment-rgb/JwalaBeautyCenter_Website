"use client";
import Image from "next/image";
import fire from "@/app/assets/fire.png";

export default function Loading() {
    return (
        <div className="text-center py-12 h-screen flex items-center flex-col justify-center">
            <Image
                src={fire}
                width={1000}
                height={1000}
                alt="Loading"
                className="w-20 h-20 mb-4 animate-pulse"
            />
        </div>
    );
}
