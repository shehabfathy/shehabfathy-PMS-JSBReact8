import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Shared-Components/Components/routes/routes";
import logo from "../../../../assets/auth-logo.svg";
import { useForm } from "react-hook-form";
import { emailValidation } from "../../../Shared-Components/Components/utils/formValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
export default function Login() {
  const [Show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
  } = useForm();

  const onSubmit = async (value: object) => {
    try {
      const { data } = await axios.post(
        `https://upskilling-egypt.com:3003/api/v1/Users/Login`,
        value
      );
      localStorage.setItem("token", data.token);
      toast.success("Welcome Dear");
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <section className="position-relative login-container ">
      <div className="container">
        <div
          className="header  text-center position-absolute start-50 translate-middle-x   "
          style={errors.email ? { top: 0 } : { top: "-10px" }}
        >
          <img src={logo} alt="pms-logo" />
        </div>

        <div className="row d-flex align-items-center vh-100 justify-content-center ">
          <div
            className="col-md-5  p-4 form-container rounded-4 "
            style={{ backgroundColor: "rgba(49, 74, 89, 0.9) " }}
          >
            <div className="content mb-5">
              <span style={{ color: "#Fff" }}>welcome to PMS</span>
              <h4 style={{ color: "#EF9B28" }}>Login</h4>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="">Email</label>
              <div className="input-group form-input mb-2 ">
                <input
                  {...register("email", emailValidation)}
                  type="email"
                  className="form-control"
                  placeholder="Enter your E-mail"
                  aria-label="Email"
                  aria-describedby="basic-addon1"
                />
              </div>
              {errors.email && (
                <div className="text-danger mb-3">{errors.email.message}</div>
              )}
              <label htmlFor="">Password</label>
              <div className="input-group   mb-2">
                <input
                  {...register("password", {
                    required: "Password is Required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"\\|,.<>\/?]).{6,}$/,
                      message:
                        "Password must contain at least one uppercase letter,one special character, and be at least 6 characters ",
                    },
                  })}
                  type={Show ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  aria-label="password"
                  aria-describedby="basic-addon1"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => {
                    setShow((prev: boolean) => !prev);
                  }}
                  className="input-group-text bg-transparent border-0 text-light"
                  id="basic-addon1"
                >
                  <i
                    className={
                      Show ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                    }
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="text-danger mb-3">
                  {errors.password.message}
                </div>
              )}
              <div className="btns d-flex justify-content-between mb-4  ">
                <Link
                  to={ROUTES.REGISTER.slice(1)}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Register Now ?
                </Link>
                <Link
                  to={ROUTES.FORGET_PASSWORD.slice(1)}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Forget Password ?
                </Link>
              </div>
              <button
                type="submit"
                className="btn mx-auto d-block w-75 rounded-5 "
                style={{
                  backgroundColor: "#EF9B28",
                  color: "#fff",
                  cursor: "pointer",
                }}
                disabled={!isDirty || !isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <ClipLoader
                    size={24}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
