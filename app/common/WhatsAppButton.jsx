"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/9551222201?text=Hi,%20Welcome%20to%20JwalaOnlinestore%20store"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-4 z-50"
        >
            <div
                className="
                    w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg
                    transition-transform duration-600 hover:scale-110
                "
            >
                <FaWhatsapp size={25} color="#fff" />
            </div>
        </a>
    );
};

export default WhatsAppButton;
