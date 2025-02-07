import React, { useContext, useRef, useState } from "react";
import AuthSubmitBtn from "../../components/Onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { LoginImage, Logo } from "../../assets/export";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toast";
import CountDown from "../../components/Onboarding/CountDown";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const inputs = useRef([]);

  const [otp, setOtp] = useState(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const email = sessionStorage.getItem("email");

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const getOtpValue = () => {
    sessionStorage.setItem("otp", otp.join(""));
    return otp.join("");
  };

  const handleRestart = () => {
    setSeconds(59);
    setIsActive(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let obj = {
        email: email,
        otp: getOtpValue(),
      };

      const response = await axios.post("/admin/verify-otp", obj);
      if (response.status === 200 && response?.data?.is_verified === true) {
        // login(response?.data);
        setLoading(false);
        SuccessToast("OTP Verified");
        sessionStorage.setItem("authToken", response?.data?.data?.token);
        navigate("/update-password");
      } else {
        ErrorToast("Invalid OTP");
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    try {
      let obj = {
        email: email,
      };
      const response = await axios.post("/admin/resend-otp", obj);
      if (response.status === 200) {
        SuccessToast("OTP Sent");
        handleRestart();
      }
    } catch (err) {
      console.log("🚀 ~ handleResendOtp ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>

        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className="font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
            Please enter the code that we sent to your email to reset your
            password.
          </p>
        </div>

        <div className="w-full h-auto flex justify-start items-center gap-2 my-2 flex-wrap">
          {otp.map((digit, index) => (
            <input
              inputMode="numeric"
              key={index}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputs.current[index] = el)}
              className="flex-1 min-w-[50px] max-w-[66px] h-[60px] rounded-xl bg-transparent outline-none text-center border border-[#074F57] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#074F57]"
            />
          ))}
        </div>

        <div className="w-full h-auto flex -mt-8 flex-col gap-1 justify-start items-start">
          <div className="w-full lg:w-[434px] flex gap-1 justify-start items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive a code?
            </span>
            {isActive ? (
              <CountDown
                isActive={isActive}
                setIsActive={setIsActive}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            ) : (
              <button
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
                className="outline-none text-[13px] border-none text-black font-bold"
              >
                {resendLoading ? "Resending..." : "Resend now"}
              </button>
            )}
          </div>
        </div>
        <AuthSubmitBtn text={"Next"} loading={loading} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* <img
          src={Gradient}
          alt="auth_mockup"
          className="absolute inset-25 w-full h-full"
        />

        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        /> */}

        <div className="relative flex justify-center items-center h-full">
          <img
            src={LoginImage}
            alt="login_mockup"
            className="relative w-[70%] h-auto mb-20 object-contain rounded-lg"
          />
        </div>

        <div className="absolute bottom-10 text-[#074F57] text-center z-20">
          <div className="flex flex-col items-center space-y-2">
            <img src={Logo} alt="pill" className="w-[50px]" />
            <h3 className="text-lg font-medium">Verification</h3>
            <p className="text-sm">Verify your OTP to continue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
