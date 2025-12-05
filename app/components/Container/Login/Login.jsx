"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputField from "@/app/common/CommonInput";
import Logo from "@/app/assets/navbar_icon.svg";
import RightImg from "@/app/assets/lipsticks-powder.svg";
import LeftImg from "@/app/assets/powder.svg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, clearAuthMessage, loginUser } from "@/app/store/slice/authSlice";
import { errorAlert, successAlert } from "@/app/utils/alertService";
import { closePopup, openPopup } from "@/app/store/slice/popupSlice";
import { usePathname } from "next/navigation";

const Login = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { loginLoading, loginError, loginSuccess } = useSelector((state) => state.auth);

    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (loginSuccess) {
            successAlert(loginSuccess);
            dispatch(clearAuthMessage());
            setFormData({ email: "", password: "" });
            dispatch(closePopup())
            if (pathname !== "/cart") {
                router.push("/")
            }
        }
        if (loginError) {
            errorAlert(loginError);
            dispatch(clearAuthError());
        }
    }, [loginSuccess, loginError]);

    return (
        <div className="relative 
    rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden">
            <Image src={LeftImg} alt="left" width={250} height={250}
                className="absolute top-0 right-0 rotate-5    -translate-y-12 opacity-50 hidden md:block"
            />
            <Image src={RightImg} alt="right" width={250} height={250}
                loading="eager"
                className="absolute bottom-0 left-0 rotate-100  -translate-x-10 opacity-50 hidden md:block"
            />
            <div className="flex justify-center mb-3 relative z-10">
                <Image src={Logo} alt="logo" width={120} height={120} loading="eager" />
            </div>
            <h2 className="text-3xl font-bold text-center relative z-10">Welcome Back</h2>
            <p className="text-center text-black mb-3 relative z-10">
                Login to your beauty account
            </p>
            <form className="space-y-5 relative z-10" onSubmit={(e) => {
                e.preventDefault();
                dispatch(loginUser(formData));
            }}>
                <InputField name="email" placeholder="Email" value={formData?.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                <InputField name="password" type="password" placeholder="Password"
                    value={formData?.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                <div className="flex justify-end">
                    <button type="button" className="underline text-gray-600 cursor-pointer"
                        onClick={() => dispatch(openPopup("forgotpassword"))}>
                        Forgot Password
                    </button>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={loginLoading}
                        className="px-8 py-2 bg-red-600/20 rounded-full tracking-widest text-black cursor-pointer
                        hover:bg-[#FBBBBC]/30 transition disabled:opacity-50"
                    >
                        {loginLoading ? "Logging in..." : "Login"}
                    </button>
                </div>
                <p className="text-center text-black text-sm">
                    Don't have an account?
                    <button
                        type="button"
                        onClick={() => dispatch(openPopup("signup"))}
                        className="ml-1 font-semibold  cursor-pointer "
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
