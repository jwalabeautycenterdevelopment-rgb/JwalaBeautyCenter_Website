"use client"
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { useRouter } from "next/navigation";
import { clearError, clearMessage, resendOtp } from "@/app/store/slice/register";
import { verifyUser } from "@/app/store/slice/authSlice";
import { closePopup } from "@/app/store/slice/popupSlice";

export default function Register() {
    const length = 6;
    const dispatch = useDispatch();
    const router = useRouter();
    const inputsRef = useRef([]);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(30);
    const { email } = useSelector((state) => state.register);
    const { otpLoading, otpError, otpSuccess, resendLoading, resendSuccess, resendError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (resendSuccess) {
            successAlert(resendSuccess);
            dispatch(clearMessage());
            setOtp("");
        }
        if (otpSuccess) {
            successAlert(otpSuccess);
            setOtp("");
            router.push("/");
            dispatch(closePopup())
            dispatch(clearMessage());
        }
        if (otpError) {
            errorAlert(otpError);
            dispatch(clearError());
        }
        if (resendError) {
            errorAlert(resendError);
            dispatch(clearError());
        }
    }, [otpSuccess, otpError, resendSuccess, resendError, router, dispatch]);


    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        dispatch(resendOtp({ email, purpose: "register" }));
        setTimer(30);
    };

    const getOtp = () => inputsRef.current.map((i) => (i ? i.value : "")).join("");

    const handleInput = (e, index) => {
        const value = e.target.value.replace(/\D/g, "").slice(-1);
        e.target.value = value;
        if (value && index < length - 1) inputsRef.current[index + 1]?.focus();
        setOtp(getOtp());
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) inputsRef.current[index - 1]?.focus();
        if (e.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus();
        if (e.key === "ArrowRight" && index < length - 1) inputsRef.current[index + 1]?.focus();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData("text").trim().slice(0, length);
        pasteData.split("").forEach((digit, i) => {
            if (inputsRef.current[i]) inputsRef.current[i].value = digit;
        });
        inputsRef.current[Math.min(pasteData.length - 1, length - 1)]?.focus();
        setOtp(getOtp());
    };

    const handleSubmit = () => {
        dispatch(verifyUser({ email, otp }));
    };

    const inputClass =
        "w-12 h-12 md:w-14 md:h-14 text-center text-xl bg-white rounded-lg border border-gray-400 focus:outline-none";
    return (
        <div className="flex justify-center items-center px-4">
            <div className="relative 
    rounded-3xl  p-8 md:p-12 overflow-hidden">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Verify OTP</h2>
                <p className="text-center text-black mb-5 text-sm md:text-base">Enter the OTP sent to your email</p>
                <form className="space-y-5">
                    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
                        {Array.from({ length })?.map((_, i) => (
                            <input
                                key={i}
                                ref={(el) => (inputsRef.current[i] = el)}
                                type="tel"
                                maxLength={1}
                                inputMode="numeric"
                                onChange={(e) => handleInput(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                className={inputClass}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={otpLoading || otp?.length !== 6}
                            className={`tracking-widest px-10 py-2 bg-red-600/20 backdrop-blur-md text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300 text-sm md:text-lg ${(otpLoading || otp?.length !== 6) ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {otpLoading ? "Verifying..." : "Enter OTP"}
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <button
                            type="button"
                            disabled={timer > 0 || resendLoading}
                            onClick={handleResend}
                            className={`text-sm md:text-base text-blue-700 hover:underline ${timer > 0 || resendLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {resendLoading ? "Resending..." : timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
