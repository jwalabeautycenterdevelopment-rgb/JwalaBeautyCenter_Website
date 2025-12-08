"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupManager from "../common/PopupManager";
import WhatsAppButton from "../common/WhatsAppButton";
import { setupTokenRefresh } from "../utils/setupTokenRefresh";
import { logout, refreshToken } from "../store/slice/authSlice";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const segments = useSelectedLayoutSegments();

  const isNotFound = segments.includes("not-found");

  useEffect(() => {
    if (accessToken) {
      setupTokenRefresh(dispatch, logout, refreshToken);
    }
  }, [accessToken]);

  return (
    <>
      {!isNotFound && <Header />}
      <PopupManager />
      <main>{children}</main>
      {!isNotFound && <Footer />}
      {!isNotFound && <WhatsAppButton />}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}
