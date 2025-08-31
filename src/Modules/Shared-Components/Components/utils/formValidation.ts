import type { RegisterOptions } from "react-hook-form";

export const emailValidation: RegisterOptions<{ email: string }> = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email address",
  },
};
