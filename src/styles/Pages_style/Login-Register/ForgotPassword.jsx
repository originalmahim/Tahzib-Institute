import  { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "./../../../services/operations/authAPI"



function ForgotPassword({darkTheme}) {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
          <div className={!darkTheme ? "dark" : "light"}>
    <div className="sec-background grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div><p>Loading...</p></div>
      ) : (
        <div className="sec-background max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] primary-text">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <div className="my-4 text-[1.125rem] leading-[1.625rem] primary-text">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : <p>We have sent the reset email to <span className="text-yellow-200">{email}</span></p>}
          </div>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] primary-text">
                  Email Address <sup className="text-red-600">*</sup>
                </p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full bg-transparent rounded-[0.5rem] p-[12px] primary-text border-2 ring-1 "
                />
              </label>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-green-500 py-[12px] px-[12px] font-medium primary-text"
            >
              {!emailSent ? "Send Email" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 primary-text">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
          </div>
  )
}

export default ForgotPassword