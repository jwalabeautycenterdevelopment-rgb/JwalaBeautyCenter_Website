'use client';
import { useState, useEffect } from "react";
import InputField from "@/app/common/CommonInput";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError, clearAuthMessage } from "@/app/store/slice/authSlice";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { openPopup } from "@/app/store/slice/popupSlice";

const ForgotPassword = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { forgotLoading, forgotPasswordError, forgotPasswordSuccess } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
    });

    const isFormValid = formData?.email;

    useEffect(() => {
        if (forgotPasswordSuccess) {
            successAlert(forgotPasswordSuccess);
            dispatch(clearAuthMessage());
            setFormData({ email: "" });
            dispatch(openPopup("verifyotp"))
        }
        if (forgotPasswordError) {
            errorAlert(forgotPasswordError);
            dispatch(clearAuthError());
        }
    }, [forgotPasswordSuccess, forgotPasswordError, dispatch, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        dispatch(forgotPassword(formData));
    };

    return (
        <div className="flex justify-center items-center ">
            <div className="relative 
    rounded-3xl p-8 md:p-12 overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 relative z-10">
                    Forgot Password
                </h2>
                <p className="text-center text-black mb-5 text-sm md:text-base relative z-10">
                    Verify your email to reset your password
                </p>
                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData?.email}
                        onChange={handleChange}
                    />
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={forgotLoading}
                            className={`tracking-widest px-10 py-2 bg-red-600/20 backdrop-blur-md 
                            text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300 cursor-pointer
                            text-sm md:text-lg
                            ${forgotLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {forgotLoading ? "Sending..." : "Send Email"}
                        </button>
                    </div>
                    <div className="text-center text-black text-sm">
                        Remembered your password?
                        <button
                            type="button"
                            onClick={() => dispatch(openPopup("login"))}
                            className="text-black font-semibold ml-1 cursor-pointer">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
