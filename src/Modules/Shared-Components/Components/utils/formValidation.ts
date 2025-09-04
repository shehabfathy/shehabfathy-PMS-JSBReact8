import type { RegisterOptions } from "react-hook-form";

export const emailValidation: RegisterOptions = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export const PASSWORD_VALIDATION: RegisterOptions = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
    message:
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
  },
};

export const SEED_VALIDATION: RegisterOptions = {
  required: "OTP is required",
};
