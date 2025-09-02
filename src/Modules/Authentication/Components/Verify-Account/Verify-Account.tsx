import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../Shared-Components/Components/Spinner/Spinner";
import logo from "../../../../assets/auth-logo.svg";
import axiosInstance from "../../../Shared-Components/api/authInstance"; // adjust path

// ✅ Types for form inputs
interface VerifyAccountInputs {
  email: string;
  code: string;
}

function VerifyAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyAccountInputs>();

  // ✅ Submit handler
  const handleVerify: SubmitHandler<VerifyAccountInputs> = async (data) => {
    try {
      const response = await axiosInstance.put("/Users/Verify", data);

      console.log("📩 Verify API Response:", response.data);
      toast.success("✅ Account Verified Successfully!");
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("❌ Verify API Error:", error.response);
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row justify-content-center align-items-center">
          {/* Logo */}
          <div className="logo-container text-center mb-3">
            <img className="logo" src={logo} alt="logo" />
          </div>

          <div className="col-md-6 rounded-3 px-5 py-5 mx-auto form-container my-5">
            {/* Title */}
            <div className="title mb-4 text-start">
              <p className="text-white">Verify Your Account</p>
              <h4 className="register-title">Enter Code to Verify</h4>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleVerify)}>
              {/* Email */}
              <div className="mb-3">
                <label>Email</label>
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-danger small">{errors.email.message}</p>
                )}
              </div>

              {/* Verification Code */}
              <div className="mb-3">
                <label>Verification Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your code"
                    {...register("code", {
                      required: "Verification code is required",
                      minLength: {
                        value: 4,
                        message: "Code must be at least 4 characters",
                      },
                    })}
                  />
                </div>
                {errors.code && (
                  <p className="text-danger small">{errors.code.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn text-white px-5"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "#EF9B28",
                    width: "200px",
                  }}
                >
                  {isSubmitting ? <Spinner size={24} /> : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
