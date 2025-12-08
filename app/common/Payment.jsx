import { forwardRef, useImperativeHandle, useEffect } from "react";
import { verifyOrder } from "../store/slice/orderSlice";

const Payment = forwardRef(({ totalAmount, dispatch, userData }, ref) => {
    useEffect(() => {
        if (!window.Razorpay) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => console.log("Razorpay SDK loaded");
            script.onerror = () => console.log("Failed to load Razorpay SDK");
            document.body.appendChild(script);
        }
    }, []);

    const initiatePayment = async (razorpayOrderId) => {
        if (!razorpayOrderId) return errorAlert("Invalid order ID");
        const options = {
            key: process.env.NEXT_PUBLIC_RZ_KEY,
            amount: totalAmount * 100,
            currency: "INR",
            name: "JBC",
            description: "Payment for your order",
            order_id: razorpayOrderId,
            theme: { color: "#0C8040" },
            method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true,
            },
            handler: async (response) => {
                const verifyPayload = {
                    razorpayOrderId: response?.razorpay_order_id,
                    razorpayPaymentId: response?.razorpay_payment_id,
                    razorpaySignature: response?.razorpay_signature,
                };
                try {
                    await dispatch(verifyOrder(verifyPayload));
                } catch (err) {
                    console.error("Verification error:", err);
                }
            },
            prefill: {
                name: userData?.firstName,
                email: userData?.email,
                contact: userData?.mobile,
            },
        };

        const razor = new window.Razorpay(options);
        razor.on("payment.failed", (response) =>
            errorAlert(response.error.description || "Payment failed")
        );

        razor.open();
    };

    useImperativeHandle(ref, () => ({
        initiatePayment
    }));

    return null;
});

export default Payment;
