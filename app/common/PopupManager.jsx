"use client";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@/app/common/CommonModel";
import { closePopup } from "@/app/store/slice/popupSlice";
import Register from "../components/Container/Register/Register";
import Login from "../components/Container/Login/Login";
import { AnimatePresence, motion } from "framer-motion";
import ForgotPassword from "../components/Container/ForgotPassword/ForgotPassword";
import VerifyOtp from "../components/Container/VerifyOtp/VerifyOtp";
import NewPassword from "../components/Container/NewPassword/NewPassword";

const formAnimation = {
    initial: { opacity: 0, x: 60, rotateY: 10, scale: 0.95 },
    animate: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -60, rotateY: -10, scale: 0.95, transition: { duration: 0.3 } },
};

export default function PopupManager() {
    const dispatch = useDispatch();
    const { activePopup } = useSelector((state) => state.popup);

    return (
        <AnimatePresence>
            {activePopup && (
                <Modal isOpen={true} onClose={() => dispatch(closePopup())}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePopup}
                            variants={formAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            {activePopup === "signup" && <Register />}
                            {activePopup === "login" && <Login />}
                            {activePopup === "forgotpassword" && <ForgotPassword />}
                            {activePopup === "verifyotp" && <VerifyOtp />}
                            {activePopup === "newpassowrd" && <NewPassword />}
                        </motion.div>

                    </AnimatePresence>
                </Modal>
            )}
        </AnimatePresence>
    );
}
