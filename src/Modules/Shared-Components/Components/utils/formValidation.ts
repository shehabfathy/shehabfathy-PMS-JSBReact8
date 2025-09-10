import type { RegisterOptions } from "react-hook-form";

interface RegisterFormInputs {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: FileList;
}

// Generic helper for cleaner typing
type FieldValidation<T extends keyof RegisterFormInputs> = RegisterOptions<
  RegisterFormInputs,
  T
>;

export const emailValidation: FieldValidation<"email"> = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};

export const PASSWORD_VALIDATION: FieldValidation<"password"> = {
  required: "Password is required",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
    message:
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
  },
};

export const SEED_VALIDATION: FieldValidation<"confirmPassword"> = {
  required: "OTP is required",
};
