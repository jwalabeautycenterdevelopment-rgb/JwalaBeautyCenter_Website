"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setupTokenRefresh } from "../utils/setupTokenRefresh";
import PopupManager from "../common/PopupManager";

export default function AppWrapper({ children }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const segments = useSelectedLayoutSegments();

  const isNotFound = segments.includes("not-found");

  useEffect(() => {
    if (accessToken) setupTokenRefresh();
  }, [accessToken]);

  return (
    <>
      {!isNotFound && <Header />}
      <PopupManager />
      <main>{children}</main>
      {!isNotFound && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
