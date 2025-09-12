import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Shared-Components/Components/routes/routes";
import logo from "../../../../assets/auth-logo.svg";
import { useForm } from "react-hook-form";
import "./Login.modules.css";
import {
  emailValidation,
  PASSWORD_VALIDATION,
} from "../../../Shared-Components/Components/utils/formValidation";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";

export default function Login() {
  const { getUser } = useContext(AuthContext);
  const [Show, setShow] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<loginFormValues>();

  type loginFormValues = {
    email: string;
    password: string;
  };

  const onSubmit = async (value: loginFormValues) => {
    try {
      const { data } = await axios.post(
        `https://upskilling-egypt.com:3003/api/v1/Users/Login`,
        value
      );
      localStorage.setItem("token", data.token);
      getUser();
      toast.success("Welcome Dear");
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.log(error);
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
              <div className="title mb-3">
                <span className="text-white">Welcome to PMS</span>
                <h4>
                  <span style={{ textDecoration: "underline" }}>L</span>ogin
                </h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <label>E-mail</label>
                <div className="input-group form-input mb-2">
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

                <label>Password</label>
                <div className="position-relative mb-2">
                  <input
                    {...register("password", PASSWORD_VALIDATION)}
                    type={Show ? "text" : "password"}
                    className="form-control pe-5 "
                    placeholder="Enter your password"
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

                {errors.password && (
                  <div className="text-danger mb-3">
                    {errors.password.message}
                  </div>
                )}

                <div className="btns d-flex justify-content-between mb-4">
                  <Link to={ROUTES.REGISTER} className="link">
                    Register Now ?
                  </Link>
                  <Link to={ROUTES.FORGET_PASSWORD} className="link">
                    Forget Password ?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn mx-auto d-block w-75 rounded-5 border-0 btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ClipLoader size={24} aria-label="Loading Spinner" />
                  ) : (
                    "Login"
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
