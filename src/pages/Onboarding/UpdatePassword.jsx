import React, { useContext, useState } from "react";
import AuthInput from "../../components/Onboarding/AuthInput";
import AuthSubmitBtn from "../../components/Onboarding/AuthSubmitBtn";
// import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import { LoginImage, Logo } from "../../assets/export";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../../data/authentication";
import { updatePassSchema } from "../../schema/signInSchema";
import { useFormik } from "formik";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toast";
import axios from "axios";

const UpdatePassword = () => {
  // const { navigate } = useContext(GlobalContext);
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate = useNavigate(); // Directly using useNavigate hook

  const token = sessionStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const otp = sessionStorage.getItem("otp");

  const email = sessionStorage.getItem("email");

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: updatePassword,
      validationSchema: updatePassSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        // e.preventDefault();

        setLoading(true);
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          let obj = {
            email: email,
            otp: otp,
            new_password: values.newPassword,
          };

          const response = await axios.post(
            "http://3.129.5.190/api/admin/update-password",
            obj,
            config
          );
          if (response.status === 200) {
            setLoading(false);
            setIsUpdated(true);
            SuccessToast(response?.data?.message);
            navigate("/");
          } else {
            SuccessToast(response?.data?.message);
          }
        } catch (err) {
          console.log("🚀 ~ createAccount ~ err:", err);
          ErrorToast(err?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-4 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>

        <div className="w-full flex justify-start -mt-6 items-start flex-col">
          <h1 className="text-[36px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Update Password
          </h1>
        </div>

        {/* <div className="flex items-center -mt-4 gap-4 w-full">
          <img
            src="https://via.placeholder.com/80" // Replace with actual image source
            alt="Profile"
            className="w-15 h-15 rounded-full"
          />
          <div>
            <h2 className="text-[16px] font-semibold">Alex Deli</h2>
            <p className="text-[16px] text-gray-500">alex.deli@gmail.com</p>
          </div>
        </div> */}

        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"New Password"}
            placeholder={"Enter Password"}
            type={"password"}
            id="newPassword"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.newPassword}
          />
          <AuthInput
            text={"Confirm Password"}
            placeholder={"Enter Password"}
            type={"password"}
            id="confPassword"
            name="confPassword"
            value={values.confPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.confPassword}
          />
        </div>

        {/* Submit Button */}
        <AuthSubmitBtn text={"Update Password"} loading={loading} />

        {/* Modal for successful update */}
        {/* {isUpdated && (
          <PasswordUpdateModal
            isOpen={isUpdated}
            onRequestClose={() => setIsUpdated(false)} // Close modal when needed
          />
        )} */}
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* <img
          src={LoginImage}
          alt="auth_mockup"
          className="absolute inset-25 w-full h-full"
        /> */}
        {/* 
        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        />

        <div className="relative flex justify-center items-center h-full">
          <img
            src={UpdatepasswordImage}
            alt="login_mockup"
            className="relative w-[60%] h-full object-contain" // Centered and responsive
          />

          
        </div> */}

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
            <h3 className="text-lg font-medium">Update Password</h3>
            <p className="text-sm">
              You are only one step away update your password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
