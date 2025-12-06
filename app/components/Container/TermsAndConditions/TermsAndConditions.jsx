"use client";
import { useState, useEffect } from "react";

export default function PolicyTabs({ slug }) {

    const [activeTab, setActiveTab] = useState("terms");

    useEffect(() => {
        if (slug === "shipping") {
            setActiveTab("shipping");
        } else {
            setActiveTab("terms");
        }
    }, [slug]);

    return (
        <div className="w-full max-w-4xl mx-auto p-4 py-10">
            <div className="flex border-b border-gray-300">
                <button
                    onClick={() => setActiveTab("terms")}
                    className={`px-6 py-3 text-sm font-medium 
            ${activeTab === "terms" ? "border-b-2 border-red-600 text-red-600" : "text-gray-600"}
          `}
                >
                    Terms & Conditions
                </button>

                <button
                    onClick={() => setActiveTab("shipping")}
                    className={`px-6 py-3 text-sm font-medium 
            ${activeTab === "shipping" ? "border-b-2 border-red-600 text-red-600" : "text-gray-600"}
          `}
                >
                    Shipping Policy
                </button>
            </div>
            <div className="mt-6 text-gray-700 space-y-4 leading-relaxed">
                {activeTab === "terms" && (
                    <>
                        <p>
                            The term "we", "us", "our" refers to <strong>PARRYS BEAUTY</strong>,
                            NO 15, Evening Bazaar Road, Park Town, Chennai, Tamil Nadu, 600003.
                        </p>

                        <p>Your use of this website and purchases are governed by the following Terms & Conditions:</p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>Content on this website may change without notice.</li>
                            <li>
                                We do not guarantee accuracy, performance, completeness, or suitability of the information provided.
                            </li>
                            <li>Your use of information/products is entirely at your own risk.</li>
                            <li>Website material (design, layout, graphics) is owned/licensed by us.</li>
                            <li>Unauthorized use can lead to legal action.</li>
                            <li>Links may be provided for convenience.</li>
                            <li>You cannot link to our website without written permission.</li>
                            <li>All disputes fall under Indian jurisdiction.</li>
                        </ul>

                        <p>We are not liable for declined transactions due to bank preset limits.</p>
                    </>
                )}

                {activeTab === "shipping" && (
                    <>
                        <p>
                            For international buyers, shipments are sent via registered international couriers or speed post.
                        </p>

                        <p>
                            For domestic buyers, orders are shipped through registered courier companies or India Post.
                        </p>

                        <p>
                            Orders are shipped within <strong>0–7 days</strong> from order confirmation unless otherwise agreed.
                        </p>

                        <ul className="list-disc pl-5 space-y-2">
                            <li>PARRYS BEAUTY is not responsible for courier/postal delays.</li>
                            <li>Delivery is made to the address provided by the buyer.</li>
                            <li>Delivery confirmation is sent to the registered email ID.</li>
                        </ul>

                        <p className="font-medium">
                            For support:<br />
                            📞 9840690063<br />
                            📧 jwalabeautychennai@gmail.com
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
