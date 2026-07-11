import * as yup from "yup";

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must be at least 8 characters, include one uppercase letter and one number",
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});
