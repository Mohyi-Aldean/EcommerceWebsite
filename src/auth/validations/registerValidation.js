import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  userName: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default registerSchema;
