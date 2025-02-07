import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const forgotSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});

export const updatePassSchema = Yup.object({
  newPassword: Yup.string().min(6).required("Please enter your password"),
  confPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .min(6)
    .required("Please confirm your password"),
});
