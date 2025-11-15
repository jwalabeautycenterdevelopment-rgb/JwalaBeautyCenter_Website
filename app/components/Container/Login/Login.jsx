"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputField from "@/app/common/CommonInput";
import Logo from "@/app/assets/navbar_icon.svg";
import Link from "next/link";
import RightImg from "@/app/assets/lipsticks-powder.svg";
import LeftImg from "@/app/assets/powder.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, clearAuthMessage, loginUser } from "@/app/store/slice/authSlice";
import { errorAlert, successAlert } from "@/app/utils/alertService";

const Login = () => {
    const dispatch = useDispatch();
    const { loginLoading, loginError, loginSuccess } = useSelector((state) => state.auth);
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const isFormValid = formData?.email && formData?.password;

    useEffect(() => {
        if (loginSuccess) {
            successAlert(loginSuccess);
            dispatch(clearAuthMessage());
            setFormData({ email: "", password: "" });
            router.push("/")
        }
        if (loginError) {
            errorAlert(loginError);
            dispatch(clearAuthError());
        }
    }, [loginSuccess, loginError, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNavigate = () => {
        router.push("forgotpassword")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };
    return (
        <div className="relative min-h-screen flex justify-center items-center ">
            <div className="relative w-full max-w-[700px] bg-[#A1A1A1] rounded-3xl shadow-xl p-6 md:p-12 overflow-hidden">
                <Image
                    src={LeftImg}
                    alt="left"
                    width={250}
                    height={250}
                    className="absolute top-0 right-0 rotate-8  -translate-y-5 opacity-50 pointer-events-none hidden md:block"
                />
                <Image
                    src={RightImg}
                    alt="right"
                    width={250}
                    height={200}
                    className="absolute bottom-0 left-0  rotate-90   translate-x-[-13px] translate-y-8 opacity-50 pointer-events-none hidden md:block"
                />
                <Link href={"/"}>
                    <div className="flex justify-center mb-3 relative z-10">
                        <Image src={Logo} alt="logo" width={120} height={120} />
                    </div>
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 relative z-10">
                    Welcome Back
                </h2>
                <p className="text-center text-black mb-5 text-sm md:text-base relative z-10">
                    Login in to your beauty account
                </p>
                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData?.email}
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData?.password}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleNavigate} className="text-gray-500 underline cursor-pointer">Forgot Password</button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={!isFormValid || loginLoading}
                            className={`tracking-widest px-10 py-2 bg-red-600/20 backdrop-blur-md 
        text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300
        text-sm md:text-lg
        ${!isFormValid || loginLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loginLoading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                    <p className="text-center text-black text-sm">
                        Don`t have an account?
                        <Link href="/register" className="text-black font-semibold ml-1">
                            Register
                        </Link>
                    </p>
                </form>

            </div>
        </div>
    );
}

export default Login