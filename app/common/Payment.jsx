import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { verifyOrder } from "../store/slice/orderSlice";
import { errorAlert } from "../utils/alertService";

const Payment = forwardRef(({ totalAmount, dispatch, userData }, ref) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (window.Razorpay) {
            setReady(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            console.log("Razorpay SDK loaded");
            setReady(true);
        };
        script.onerror = () => console.error("Failed to load Razorpay SDK");
        document.body.appendChild(script);
    }, []);

    const initiatePayment = (razorpayOrderId) => {
        if (!ready) {
            errorAlert("Payment system is loading. Please try again.");
            return;
        }

        if (!razorpayOrderId) {
            errorAlert("Invalid order ID");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RZ_KEY,
            amount: totalAmount * 100,
            currency: "INR",
            name: "JBC",
            description: "Payment for your order",
            order_id: razorpayOrderId,
            theme: { color: "#0C8040" },
            handler: async (response) => {
                const payload = {
                    razorpayOrderId: response.razorpay_order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpaySignature: response.razorpay_signature,
                };
                await dispatch(verifyOrder(payload));
            },
            prefill: {
                name: userData?.firstName,
                email: userData?.email,
                contact: userData?.mobile,
            },
        };

        const razor = new window.Razorpay(options);

        razor.on("payment.failed", (res) => {
            errorAlert(res.error.description || "Payment failed");
        });
        razor.open();
    };

    useImperativeHandle(ref, () => ({ initiatePayment }));

    return null;
});

export default Payment;
