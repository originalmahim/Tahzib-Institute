import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

// Load WalletMaxPay script
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

// buyCourse function without token
export async function buyCourse(coursesId, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");

    try {
        // Initiate order without token
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { coursesId });

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        const options = {
            key: 'YOUR_WALLETMAXPAY_KEY',
            currency: orderResponse.data.message.currency,
            amount: orderResponse.data.message.amount,
            order_id: orderResponse.data.message.id,
            name: "Tahzib",
            description: "Thank you for purchasing the course",
            image: '',
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount);
                verifyPayment({ ...response, coursesId }, navigate, dispatch);
            }
        };

        const paymentObject = new window.WalletMaxPay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment failed");
            console.log("Payment failed: ", response.error);
        });

    } catch (error) {
        console.log("Payment API error: ", error);
        toast.error(error.response?.data?.message || "Could not process the payment");
    }

    toast.dismiss(toastId);
}

// Send Payment Success Email without token
async function sendPaymentSuccessEmail(response, amount) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.order_id,
            paymentId: response.payment_id,
            amount,
        });
    } catch (error) {
        console.log("Payment Success Email Error: ", error);
    }
}

// Verify payment without token
async function verifyPayment(bodyData, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successful! You are now enrolled.");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (error) {
        console.log("Payment Verification Error: ", error);
        toast.error("Could not verify payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
