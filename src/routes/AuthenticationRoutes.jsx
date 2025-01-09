import Login from "../pages/Onboarding/Login";
import ForgotPassword from "../pages/Onboarding/ForgotPassword"
import UpdatePassword from "../pages/Onboarding/UpdatePassword";
import VerifyOtp from "../pages/Onboarding/VerifyOtp";

export const AuthenticationRoutes = [
    {
      title: "Login",
      url: "/",
      page: <Login />,
    },
    {
      title: "Forgot Password",
      url: "/forgot-password",
      page: <ForgotPassword />,
    },
    {
      title: "Update Password",
      url: "/update-password",
      page: <UpdatePassword />,
    },
    {
      title: "Verify Otp",
      url: "/verify-otp",
      page: <VerifyOtp />,
    },
   
]    