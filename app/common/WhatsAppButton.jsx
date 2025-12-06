"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
const WhatsAppButton = () => {
    return (
        <a
            href="https://wa.me/7339628276?text=Hi,%20Welcome%20to%20JwalaOnlinestore%20store"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50"
        >
            <div className="w-13 h-13 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                <FaWhatsapp size={25} color="#fff" />
            </div>
        </a>
    );
};

export default WhatsAppButton;
