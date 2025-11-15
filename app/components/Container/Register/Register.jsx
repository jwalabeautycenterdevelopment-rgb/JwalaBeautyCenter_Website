"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import LeftImg from "@/app/assets/powder.svg";
import RightImg from "@/app/assets/lipsticks-powder.svg";
import Logo from "@/app/assets/navbar_icon.svg";
import InputField from "@/app/common/CommonInput";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError, clearMessage } from "@/app/store/slice/register";
import { successAlert, errorAlert } from "@/app/utils/alertService";
import { useRouter } from "next/navigation";

const Register = () => {
    const dispatch = useDispatch();
    const { message, error, loading } = useSelector((state) => state.register);
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (message) {
            successAlert(message);
            setFormData({ firstName: "", lastName: "", mobile: "", email: "", password: "" });
            dispatch(clearMessage());
            router.push("/verifyotp")
        }
        if (error) {
            errorAlert(error);
            dispatch(clearError());
        }
    }, [message, error, dispatch]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className="relative min-h-screen flex justify-center items-center py-4">
            <div className="relative w-full max-w-[700px] bg-[#A1A1A1] rounded-3xl shadow-xl p-6 md:p-12 overflow-hidden">
                <Image
                    src={LeftImg}
                    alt="left"
                    width={250}
                    priority
                    height={250}
                    className="absolute top-0 left-10 rotate-270 -translate-x-10 -translate-y-7 opacity-50 pointer-events-none hidden md:block"
                />
                <Image
                    src={RightImg}
                    alt="right"
                    width={250}
                    height={200}
                    className="absolute bottom-0 right-0 translate-x-10 translate-y-5 opacity-50 pointer-events-none hidden md:block"
                />
                <Link href={"/"}>
                    <div className="flex justify-center mb-3 relative z-10">
                        <Image src={Logo} alt="logo" width={120} height={120} />
                    </div>
                </Link>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 relative z-10">
                    Get Started Now
                </h2>
                <p className="text-center text-black mb-5 text-sm md:text-base relative z-10">
                    Create your beauty account
                </p>
                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            name="firstName"
                            placeholder="First Name"
                            value={formData?.firstName}
                            onChange={handleChange}
                        />
                        <InputField
                            name="lastName"
                            placeholder="Last Name"
                            value={formData?.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <InputField
                        name="mobile"
                        placeholder="Phone Number"
                        value={formData?.mobile}
                        onChange={handleChange}

                    />

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

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="tracking-widest px-10 py-2 bg-red-600/20 backdrop-blur-md 
                            text-black rounded-full hover:bg-[#FBBBBC]/30 transition-all duration-300
                            text-sm md:text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                    <p className="text-center text-black text-sm">
                        Already have an account?
                        <Link href="/login" className="text-black font-semibold ml-1">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
