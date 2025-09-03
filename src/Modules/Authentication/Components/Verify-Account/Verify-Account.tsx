import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import logo from "../../../../assets/auth-logo.svg";
import axiosInstance from "../../../Shared-Components/api/authInstance"; // adjust path
import { ClipLoader } from "react-spinners";

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
    <section className="verfiy-container">
      <div className="container vh-100">
        <div className="row h-100 justify-content-center align-items-center vh-100">
          <div className="col-md-6 d-flex flex-column align-items-center">
            <div className="logo-container text-center mb-3">
              <img src={logo} alt="logo" />
            </div>
            <div className="p-4 form-container rounded-4 w-100 auth-form">
              {/* Title */}
              <div className="title mb-4 text-start">
                <span className="text-white">Welcome to PMS</span>
                <h4><span style={{ textDecoration: "underline" }}>V</span>erify Account</h4>
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
                <button
                  type="submit"
                  className="btn mx-auto d-block w-50 rounded-5 border-0 btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ClipLoader size={24} aria-label="Loading Spinner" />
                  ) : (
                    "Verify"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VerifyAccount;
