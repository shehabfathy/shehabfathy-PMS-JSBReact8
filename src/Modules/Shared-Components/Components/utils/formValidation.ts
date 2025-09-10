import type { RegisterOptions } from "react-hook-form";
import type { loginFormValues } from "../../../Authentication/Components/Login/Login";

export const emailValidation: RegisterOptions<loginFormValues, "email"> = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export const PASSWORD_VALIDATION: RegisterOptions<loginFormValues, "password"> =
  {
    required: "Password is required",
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
      message:
        "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
    },
  };

export const SEED_VALIDATION: RegisterOptions<loginFormValues, "seed"> = {
  required: "OTP is required",
};
