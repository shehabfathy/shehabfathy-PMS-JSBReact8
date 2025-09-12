import type { RegisterOptions } from "react-hook-form";
import type { loginFormValues } from "../../../Authentication/Components/Login/Login";
import type { RegisterFormInputs } from "../../../Authentication/Components/Register/Register";
import type { VerifyAccountInputs } from "../../../Authentication/Components/Verify-Account/Verify-Account";

export const emailValidation: RegisterOptions<
  loginFormValues | RegisterFormInputs | VerifyAccountInputs,
  "email"
> = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export const PASSWORD_VALIDATION: RegisterOptions<
  loginFormValues | RegisterFormInputs,
  "password"
> = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
    message:
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
  },
};
export const USERNAME_VALIDATION: RegisterOptions<
  RegisterFormInputs,
  "userName"
> = {
  required: "User name is required",
  pattern: {
    value: /^[A-Za-z0-9]{7,8}$/,
    message: " must include letters and digits not more 8 character",
  },
};
export const COUNTRY_VALIDATION: RegisterOptions<
  RegisterFormInputs,
  "country"
> = {
  required: "Country is required",
  pattern: {
    value: /^[A-Za-z ]{2,50}$/,
    message: "Please enter a valid country name (letters only).",
  },
};
export const PHONENUMBER_VALIDATION: RegisterOptions<
  RegisterFormInputs,
  "phoneNumber"
> = {
  required: "phoneNumber is required",
  pattern: {
    value: /^01[1205][0-9]{8}$/,
    message: "Please enter a valid phone Number.",
  },
};

export const SEED_VALIDATION: RegisterOptions<loginFormValues, "seed"> = {
  required: "OTP is required",
};
