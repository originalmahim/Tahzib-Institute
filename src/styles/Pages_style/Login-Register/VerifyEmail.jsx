import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from './../../../Components/core/Loading';
import { sendOtp, signUp } from "../../../services/operations/authAPI";
import Skeleton from "react-loading-skeleton"; // Adjust this import based on your skeleton library

function VerifyEmail({ darkTheme }) {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/Login");
    }
  }, [signupData, navigate]);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const { accountType, firstName, lastName, email, password, confirmPassword } = signupData;
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  };

  return (
    <div className={!darkTheme ? "dark" : "light"}>
      <div className="sec-background min-h-[calc(100vh-3.5rem)] grid place-items-center ">
        {loading ? (
          <Loading />
        ) : (
          <div className="sec-background max-w-[500px] p-4 lg:p-8">
            {loading ? (
              <>
                <Skeleton height={40} width="70%" className="mb-4" />
                <Skeleton height={20} width="100%" className="mb-4" />
                <div className="flex justify-between mb-4">
                  <Skeleton height={48} width={48} />
                  <Skeleton height={48} width={48} />
                  <Skeleton height={48} width={48} />
                </div>
              </>
            ) : (
              <>
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] primary-text">Verify Email</h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 primary-text">
                  A verification code has been sent to you. Enter the code below
                </p>
                <form onSubmit={handleVerifyAndSignup}>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        placeholder="-"
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[48px] lg:w-[60px] border-2 bg-transparent rounded-[0.5rem] aspect-square text-center primary-text ring-2"
                      />
                    )}
                    containerStyle={{
                      justifyContent: "space-between",
                      gap: "0 6px",
                    }}
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium primary-text"
                  >
                    Verify Email
                  </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                  <Link to="/Login">
                    <p className="primary-text flex items-center gap-x-2">
                      <BiArrowBack /> Back To Signup
                    </p>
                  </Link>
                  <button
                    className="flex items-center text-blue-100 gap-x-2"
                    onClick={() => dispatch(sendOtp(signupData.email, navigate), setOtp(''))}
                  >
                    <RxCountdownTimer />
                    Resend it
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;
