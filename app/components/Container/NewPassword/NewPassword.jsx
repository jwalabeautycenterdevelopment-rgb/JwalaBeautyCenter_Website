"use client";
import { useState } from "react";
import InputField from "@/app/common/CommonInput";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center ">
            <div className="relative w-full max-w-[700px] bg-[#A1A1A1] rounded-3xl shadow-xl p-6 md:p-12 overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 relative z-10">
                    Create New Password
                </h2>

                <p className="text-center text-black mb-5 text-sm md:text-base relative z-10">
                    Set your new password to access your account
                </p>
                <form className="space-y-5 relative z-10">
                    <InputField
                        type="password"
                        name="newPassword"
                        placeholder="Password"
                        value={formData?.password}
                        onChange={handleChange}
                    />
                    <InputField
                        type="Confrim Passowrd"
                        name="confirmPassword"
                        placeholder="Password"
                        value={formData?.password}
                        onChange={handleChange}
                    />
                    <div className="flex justify-center">
                        <button className="tracking-widest px-10 py-2 bg-red-600/20 backdrop-blur-md 
                        text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300
                        text-sm md:text-lg">
                            Send Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword