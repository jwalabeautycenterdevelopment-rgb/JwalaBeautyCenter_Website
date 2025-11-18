"use client";
import { useEffect, useState } from "react";
import InputField from "@/app/common/CommonInput";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearAuthError, clearAuthMessage } from "@/app/store/slice/authSlice";
import { successAlert, errorAlert, warningAlert } from "@/app/utils/alertService";
import { openPopup } from "@/app/store/slice/popupSlice";

const NewPassword = () => {
    const dispatch = useDispatch();
    const { resetPasswordLoading, resetPasswordSucess, resetPasswordError } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (resetPasswordSucess) {
            successAlert(resetPasswordSucess)
            dispatch(clearAuthMessage());
            localStorage.removeItem("resetToken");
            setFormData({ newPassword: "", confirmPassword: "" });
            dispatch(openPopup("login"));
        }

        if (resetPasswordError) {
            errorAlert(resetPasswordError);
            dispatch(clearAuthError());
        }
    }, [resetPasswordSucess, resetPasswordError, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resetToken = localStorage.getItem("resetToken");
        if (!resetToken) {
            warningAlert("Invalid or expired token");
            return;
        }
        dispatch(resetPassword({
            token: resetToken,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword
        }));
    };

    return (
        <div className="flex justify-center items-center">
            <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
                    Create New Password
                </h2>
                <p className="text-center text-black my-2 text-sm md:text-base">
                    Set your new password to access your account
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <InputField
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />

                    <InputField
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={resetPasswordLoading}
                            className={`tracking-widest px-10 py-2 bg-red-600/20 backdrop-blur-md 
                            text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300 cursor-pointer
                            text-sm md:text-lg
                            ${resetPasswordLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {resetPasswordLoading ? "Saving..." : "Reset Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
