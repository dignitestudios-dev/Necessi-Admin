import Login from "../pages/Onboarding/Login";
import ForgotPassword from "../pages/Onboarding/ForgotPassword"
// import OnboardLayout from "../layouts/OnboardLayout";
// import UpdatePassword from "../pages/onboarding/UpdatePassword";
// import VerifyOtp from "../pages/onboarding/VerifyOtp";
// import ProfileSetup from "../pages/onboarding/ProfileSetup";
import VerifyOtp from "../pages/Onboarding/VerifyOtp";

export const AuthenticationRoutes = [
    {
      title: "Login",
      url: "/Login",
      page: <Login />,
    },
    {
      title: "Forgot Password",
      url: "/forgot-password",
      page: <ForgotPassword />,
    },
    // {
    //   title: "Forgot Password",
    //   url: "/update-password",
    //   page: <UpdatePassword />,
    // },
    {
      title: "Verify Otp",
      url: "/verify-otp",
      page: <VerifyOtp />,
    },
   
]    