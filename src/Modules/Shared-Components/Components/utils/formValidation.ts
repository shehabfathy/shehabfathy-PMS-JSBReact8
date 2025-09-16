import type { RegisterOptions } from "react-hook-form";
import type { loginFormValues } from "../../../Authentication/Components/Login/Login";
import type { RegisterFormInputs } from "../../../Authentication/Components/Register/Register";
import type { VerifyAccountInputs } from "../../../Authentication/Components/Verify-Account/Verify-Account";

// 🔹 Common regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/;
const USERNAME_REGEX = /^[A-Za-z0-9]{7,8}$/;
const COUNTRY_REGEX = /^[A-Za-z ]{2,50}$/;
const PHONE_REGEX = /^01[1205][0-9]{8}$/;

// ✅ Works for Login, Register, and VerifyAccount (all have "email")
export const emailValidation: RegisterOptions<
  loginFormValues | RegisterFormInputs | VerifyAccountInputs,
  "email"
> = {
  required: "Email is required",
  pattern: {
    value: EMAIL_REGEX,
    message: "Invalid email address",
  },
};

export const PASSWORD_VALIDATION: RegisterOptions<
  loginFormValues | RegisterFormInputs,
  "password"
> = {
  required: "Password is required",
  pattern: {
    value: PASSWORD_REGEX,
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
    value: USERNAME_REGEX,
    message: "Must include letters and digits, max 8 characters",
  },
};

export const COUNTRY_VALIDATION: RegisterOptions<
  RegisterFormInputs,
  "country"
> = {
  required: "Country is required",
  pattern: {
    value: COUNTRY_REGEX,
    message: "Please enter a valid country name (letters only).",
  },
};

export const PHONENUMBER_VALIDATION: RegisterOptions<
  RegisterFormInputs,
  "phoneNumber"
> = {
  required: "Phone number is required",
  pattern: {
    value: PHONE_REGEX,
    message: "Please enter a valid phone number.",
  },
};

export const SEED_VALIDATION: RegisterOptions<loginFormValues, "seed"> = {
  required: "OTP is required",
};
