"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { openPopup } from "@/app/store/slice/popupSlice";

export default function ResetPasswordPage() {
    const params = useSearchParams();
    const token = params.get("token");
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (token) {
            localStorage.setItem("resetToken", token);
            dispatch(openPopup("newpassowrd"));
            router.replace("/");
        }
    }, [token]);
    return null;
}
