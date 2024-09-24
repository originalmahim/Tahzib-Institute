import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { fetchCourseDetails } from "./../../services/operations/courseDetailsAPI";

const Checkout = ({darkTheme}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  // const [inputCouponCode, setInputCouponCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const [payOption, setPayOption] = useState("uddoktapay");

  const { user } = useSelector((state) => state.profile);
  // console.log(user.firstName);
  const { token } = useSelector((state) => state.auth);

  // Getting courseId from the URL parameter
  const { courseId } = useParams();

  // Fetching course details on component mount
  useEffect(() => {
    const fetchCourseDetailsData = async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setCourseDetails(res.data.courseDetails);
      } catch (error) {
        console.error("Could not fetch Course Details", error);
      }
    };
    fetchCourseDetailsData();
  }, [courseId]);

  // Update the total price once course details are fetched
  useEffect(() => {
    calculateTotalPrice();
  }, [courseDetails]);


  // Calculate total price
  const calculateTotalPrice = () => {
    const price = parseFloat(courseDetails?.price || 0);
    const deliveryCharge = 0; // Assuming no delivery charge for digital products
    let totalAmount = price + deliveryCharge;
    setTotalPrice(totalAmount.toFixed(0));
  };

  // Submit form to process payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payInfo = {
          fullName: fullName || user?.firstName + " " + user?.lastName,
          phoneNumber,
          email: email || user?.email,
          PaymentStatus: "Paid",
          productName: courseDetails?.courseName,
          productPrice: courseDetails?.price,
          invoiceDate: moment().format("Do MMM YYYY"),
          address,
          totalPrice,
          discountedPrice,
      };

      console.log(payInfo);

      if (payOption === "uddoktapay") {
        const response = await axios.post(
          "https://task-backend-sigma.vercel.app/payment",
          payInfo
        );
        if (response.data.payment_url) {
          window.location.href = response.data.payment_url;
        } else {
          toast.error("Please Select Another Payment Gateway");
        }
      } else {
        toast.error("Please select a payment option");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something Went Wrong, Try Again");
    }
  };

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background">
        <div className="h-10"></div>
        <div className="flex items-center justify-around 2xl:container 2xl:mx-auto lg:py-16 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
  <div className="flex w-full sm:w-9/12 flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
    {/* Left side: Order Information Form */}
    <div className="flex w-full flex-col justify-start items-start rounded-lg p-6 primary-text">
      <div className="mt-6">
        <h2 className="text-3xl font-bold leading-5">Order Information</h2>
      </div>
      <div className="mt-8 flex flex-col justify-start items-start w-full space-y-4">
        { token === 'null' && <input
          required
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border rounded-lg  border-gray-300 bg-transparent text-base placeholder-gray-600 py-3 w-full"
          type="text"
          placeholder="Your Full Name *"
        />}
        <input
          type="number"
          required
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border rounded-lg  border-gray-300 text-base placeholder-gray-600 py-3 w-full"
          placeholder="Your Mobile Number *"
        />
        { token === 'null' && <input
          type="email"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent border rounded-lg  border-gray-300 text-base placeholder-gray-600 py-3 w-full"
          placeholder="Your Email Address *"
        />}
      </div>
      <input
        required
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="px-4 focus:outline-none mt-3 focus:ring-2 focus:ring-blue-500 bg-transparent border rounded-lg  border-gray-300 text-base placeholder-gray-600 py-3 w-full"
        type="text"
        placeholder="Your Full Address *"
      />

      {/* Payment Options */}
      <div className="lg:hidden flex flex-col justify-start items-start  w-full p-6 md:p-8 rounded-lg mt-6 ">
        <h3 className="text-xl font-semibold leading-6 ">Order Details</h3>
        <div className="flex mt-7 flex-col items-end w-full space-y-6">
          <div className="flex items-center w-full space-x-2">
            <img
              src={courseDetails?.thumbnail}
              alt="Product Image"
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <p className="text-lg font-semibold leading-4 ">
                {courseDetails?.courseName} x 1
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full items-center mt-3">
            <p className="text-xl font-semibold leading-4 ">Total</p>
            <p className="text-lg font-semibold leading-4 ">{totalPrice} TK</p>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <h4 className="my-2 text-lg font-semibold ">Pay Online (Credit/Debit Card/bKash)</h4>
          <input
            type="radio"
            id="uddoktapay"
            name="paymentOption"
            value="uddoktapay"
            className="hidden peer"
            onChange={(e) => setPayOption(e.target.value)}
            required
          />
          <label
            htmlFor="uddoktapay"
            className="inline-flex bg-white items-center justify-between w-full p-5  border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg"
          >
            <div className="block">
              <img
                className="w-72 lg:w-96"
                src="https://i.ibb.co/ccmZMSv/Online.jpg"
                alt="Payment"
              />
            </div>
          </label>
          { token === 'null' ? <button
            type="submit"
            disabled={!fullName || !phoneNumber || !email || !address}
            className="mt-8 bg-blue-600 text-white py-3 w-full rounded-lg  hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 disabled:bg-red-600"
          >
            Place Order
          </button> : <button
            type="submit"
            disabled={!phoneNumber|| !address}
            className="mt-8 bg-blue-600 text-white py-3 w-full rounded-lg  hover:bg-blue-700 transition-all focus:ring-2 focus:ring-blue-500 disabled:bg-red-600"
          >
            Place Order
          </button>}
        </form>
      </div>

      <div className="lg:hidden text-green-500 mt-5 text-center">
        <p>Call 01585753020 for help with your order.</p>
      </div>
    </div>
  </div>

  {/* Right side: Order Summary */}
  <div className="hidden primary-text lg:flex flex-col justify-start items-start  lg:w-3/6 p-6 md:p-14  ">
    <h3 className="text-2xl font-semibold leading-6 ">Order Details</h3>
    <div className="flex mt-7 flex-col items-end w-full space-y-6">
      <div className="flex flex-col gap-4 items-center w-full space-x-4">
        <img
          src={courseDetails?.thumbnail}
          alt="Product Image"
          className="w-96 h-60 object-cover rounded-lg"
        />
        <div>
          <p className="text-lg font-semibold leading-4 ">
            {courseDetails?.courseName}
          </p>
        </div>
      </div>
      <div className="flex justify-between w-full items-center mt-3">
        <p className="text-xl font-semibold leading-4 ">Total</p>
        <p className="text-lg font-semibold leading-4 ">{totalPrice} TK</p>
      </div>
    </div>
  </div>
</div>


      </div>
    </div>
  );
};

export default Checkout;
