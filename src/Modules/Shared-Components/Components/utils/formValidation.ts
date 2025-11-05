import type { RegisterOptions } from "react-hook-form";
import type { loginFormValues } from "../../../Authentication/Components/Login/Login";
import type { RegisterFormInputs } from "../../../Authentication/Components/Register/Register";

import type { ResetFormValues } from "../../../Authentication/Components/Change-Password/ChangePassword";
import type { ForgetFormValues } from "../../../Authentication/Components/Forget-Password/ForgetPassword";

// 🔹 Common regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-{}[\]:;"\\|,.<>/?]).{6,}$/;

const USERNAME_REGEX = /^[A-Za-z0-9]{7,8}$/;
const COUNTRY_REGEX = /^[A-Za-z ]{2,50}$/;
const PHONE_REGEX = /^01[1205][0-9]{8}$/;

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: EMAIL_REGEX,
    message: "Invalid email address",
  },
} as const;

// For Forget Password form
export const FORGET_EMAIL_VALIDATION: RegisterOptions<
  ForgetFormValues,
  "email"
> = {
  required: "Email is required",
  pattern: {
    value: EMAIL_REGEX,
    message: "Invalid email address",
  },
};
export const PASSWORD_VALIDATION = {
  required: "Password is required",
  pattern: {
    value: PASSWORD_REGEX,
    message:
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
  },
} as const;

export const OLD_PASSWORD_VALIDATION: RegisterOptions<
  ResetFormValues,
  "oldPassword"
> = {
  required: "Old password is required",
  pattern: {
    value: PASSWORD_REGEX,
    message:
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
  },
};

// For ChangePassword (field name: newPassword)
export const NEW_PASSWORD_VALIDATION: RegisterOptions<
  ResetFormValues,
  "newPassword"
> = {
  required: "New password is required",
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
