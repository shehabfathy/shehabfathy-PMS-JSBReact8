import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import logo from "../../../../assets/auth-logo.svg";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Spinner from "../../../Shared-Components/Components/Spinner/Spinner";
import { emailValidation } from "../../../../../src/Modules/Shared-Components/Components/utils/formValidation";
import axiosInstance from "../../../Shared-Components/api/authInstance"; // adjust path

// ✅ Define types for form fields
interface RegisterFormInputs {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage?: FileList; // Add profileImage as optional FileList
}

function Register() {
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm: boolean;
  }>({
    password: false,
    confirm: false,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const handleRegister: SubmitHandler<RegisterFormInputs> = async (
    formData
  ) => {
    try {
      const data = new FormData();
      data.append("userName", formData.userName);
      data.append("email", formData.email);
      data.append("country", formData.country);
      data.append("phoneNumber", formData.phoneNumber);
      data.append("password", formData.password);
      data.append("confirmPassword", formData.confirmPassword);

      if (formData.profileImage && formData.profileImage[0]) {
        data.append("profileImage", formData.profileImage[0]);
      }

      const response = await axiosInstance.post("/Users/Register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("📩 API Response:", response.data);
      toast.success("✅ Registered Successfully!");
      navigate("/verify-account");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      console.error("❌ API Error:", error.response);
      toast.error(`❌ ${errorMsg}`);
    }
  };

  return (
    <section className="register-container">
      <div className="container">
        <div className="row vh-100 d-flex justify-content-center align-items-center overflow-auto">
          {/* Logo */}
          <div className="logo-container text-center mb-3">
            <img className="logo" src={logo} alt="logo" />
          </div>

          <div className="col-md-8 rounded-3 px-3 py-3 mx-auto form-container">
            {/* Title */}
            <div className="title mb-4 text-start">
              <p className="text-white">Welcome to PMS</p>
              <h4 className="register-title">Create New Account</h4>
            </div>

            {/* Image Upload */}
            <div className="text-center mb-4">
              <label
                htmlFor="profileImage"
                className="d-block rounded-3 p-4 mx-auto upload-label"
              >
                <i className="fa fa-upload me-2"></i> Upload Image
              </label>
              <input
                type="file"
                id="profileImage"
                className="d-none"
                {...register("profileImage")}
              />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="row">
                {/* Left Column */}
                <div className="col-md-6">
                  {/* Username */}
                  <div className="mb-3">
                    <label>User Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        {...register("userName", {
                          required: "User name is required",
                        })}
                      />
                    </div>
                    {errors.userName && (
                      <p className="text-danger small ">
                        {errors.userName.message}
                      </p>
                    )}
                  </div>

                  {/* Country */}
                  <div className="mb-3">
                    <label>Country</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                      />
                    </div>
                    {errors.country && (
                      <p className="text-danger small ">
                        {errors.country.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword.password ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            password: !prev.password,
                          }))
                        }
                      >
                        <i
                          className={`fa ${
                            showPassword.password ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-danger small ">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div className="col-md-6">
                  {/* Email */}
                  <div className="mb-3">
                    <label>Email</label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        {...register("email", emailValidation)}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-danger small ">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label>Phone Number</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        {...register("phoneNumber", {
                          required: "Phone is required",
                          minLength: {
                            value: 10,
                            message: "Phone must be at least 10 digits",
                          },
                        })}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-danger small ">
                        {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        className="form-control"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                      >
                        <i
                          className={`fa ${
                            showPassword.confirm ? "fa-eye-slash" : "fa-eye"
                          }`}
                        />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-danger small ">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Login Link */}
              <div className="mb-3 text-end">
                <Link to="/login" className="text-success text-decoration-none">
                  login now?
                </Link>
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
                  {isSubmitting ? <Spinner size={24} /> : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
