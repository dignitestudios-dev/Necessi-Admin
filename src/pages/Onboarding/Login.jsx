import React, { useContext, useEffect, useRef, useState } from "react";
import AuthInput from "../../components/Onboarding/AuthInput";
import AuthSubmitBtn from "../../components/Onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { LoginImage } from "../../assets/export";
import { Logo } from "../../assets/export";
import { useFormik } from "formik";
import { signInSchema } from "../../schema/signInSchema";
import { loginValues } from "../../data/Authentication";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toast";
import axios from "../../axios";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { navigate } = useContext(GlobalContext);
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values) => {
        try {
          setLoading(true);
          const response = await axios.post("/admin/login", {
            ...values,
          });
          if (response.status === 200) {
            login(response.data);
            SuccessToast("Logged in successfully");
            navigate("/dashboard", "Home");
            setLoading(false);
          }
        } catch (err) {
          console.error("🚀 ~ onSubmit: ~ err:", err);
          ErrorToast(err.response.data.message);
          setLoading(false);
        }
      },
    });

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        <div className="flex flex-col items-start space-y-2">
          <img src={Logo} alt="pill" className="w-[200px]" />
          <h3 className="text-lg font-medium">Necessi Admin Panel</h3>
          <p className="text-sm">Login with your credentials to continue.</p>
        </div>
        <div className="flex flex-col w-full h-auto justify-start items-start gap-4">
          <AuthInput
            text="Email"
            placeholder="Type your email address here"
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.email}
            touched={touched?.email}
          />
          <div className="flex flex-col w-full lg:w-[434px] justify-start items-end gap-1">
            <AuthInput
              text="Password"
              placeholder="Enter Password"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors?.password}
              touched={touched?.password}
            />
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs font-medium text-[#074F57]"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <AuthSubmitBtn text={"Log in"} loading={loading} />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* <img
          src={Gradient}
          alt="gradient"
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
            <h3 className="text-lg font-medium">Necessi Admin Panel</h3>
            <p className="text-sm">Login with your credentials to continue.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
