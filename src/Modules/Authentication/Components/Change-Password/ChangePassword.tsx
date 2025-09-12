import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Shared-Components/Components/routes/routes";
import logo from "../../../../assets/auth-logo.svg";
import { useForm } from "react-hook-form";
import { PASSWORD_VALIDATION } from "../../../Shared-Components/Components/utils/formValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
export default function ChangePassword() {
  const [Show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ResetFormValues>();

  type ResetFormValues = {
    newPassword: string;
    oldPassword: string;
    confirmNewPassword: string;
  };
  const onSubmit = async (value: ResetFormValues) => {
    try {
      const response = await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Users/ChangePassword`,
        value
      );
      toast.success("Password changed successful. Please login");
      navigate(ROUTES.LOGIN);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="position-relative login-container">
      <div className="container vh-100">
        <div className="row h-100 d-flex justify-content-center align-items-center">
          <div className="col-md-5 d-flex flex-column align-items-center">
            <div className="header text-center mb-4">
              <img src={logo} alt="pms-logo" />
            </div>

            <div className="p-4 form-container rounded-4 w-100 auth-form">
              <div className="title mb-5">
                <span className="text-white">Welcome to PMS</span>
                <h4>
                  <span style={{ textDecoration: "underline" }}>C</span>hange
                  Password
                </h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Old Password</label>
                <div className="position-relative">
                  <input
                    {...register("oldPassword", PASSWORD_VALIDATION)}
                    type={Show ? "text" : "password"}
                    className="form-control pe-5"
                    placeholder="Enter your old password"
                    autoComplete="old-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 text-light me-2"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        Show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                      }
                    ></i>
                  </button>
                </div>

                {errors.oldPassword && (
                  <div className="text-danger mb-3">
                    {errors.oldPassword.message}
                  </div>
                )}

                <label>New Password</label>
                <div className="position-relative">
                  <input
                    {...register("newPassword", PASSWORD_VALIDATION)}
                    type={Show ? "text" : "password"}
                    className="form-control pe-5"
                    placeholder="Enter your new password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 text-light me-2"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        Show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                      }
                    ></i>
                  </button>
                </div>

                {errors.newPassword && (
                  <div className="text-danger mb-3">
                    {errors.newPassword.message}
                  </div>
                )}

                <label>Confirm Password</label>
                <div className="position-relative mb-2">
                  <input
                    {...register("confirmNewPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                    type={Show ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm New Password"
                    aria-label="Confirm Password"
                    aria-describedby="basic-addon1"
                  />

                  <button
                    type="button"
                    onClick={() => setShow((prev) => !prev)}
                    className="position-absolute top-50 end-0 translate-middle-y bg-transparent border-0 text-light me-2"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        Show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                      }
                    ></i>
                  </button>
                </div>

                {errors.confirmNewPassword && (
                  <div className="mb-2 text-danger">
                    {errors.confirmNewPassword.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn mx-auto d-block w-75 rounded-5 border-0 btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ClipLoader size={24} aria-label="Loading Spinner" />
                  ) : (
                    "Save"
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
