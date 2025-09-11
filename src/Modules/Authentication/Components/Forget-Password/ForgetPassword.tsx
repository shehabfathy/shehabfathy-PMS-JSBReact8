import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { emailValidation } from "../../../Shared-Components/Components/utils/formValidation";
import { ROUTES } from "../../../Shared-Components/Components/routes/routes";
import { ClipLoader } from "react-spinners";
import logo from "../../../../assets/auth-logo.svg";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<ForgetFormValues>();

  type ForgetFormValues = {
    email: string;
  };

  const onSubmit = async (value: ForgetFormValues) => {
    try {
      await axios.post(
        `https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request`,
        value
      );
      toast.success("Verification code sent to your email");
      navigate(ROUTES.RESET_PASSWORD);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <section className="position-relative forget-container">
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
                  <span style={{ textDecoration: "underline" }}>F</span>orget
                  Password
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
                <div className=" mb-3">
                  <Link to={ROUTES.LOGIN} className="link ">
                    Back to Login
                  </Link>
                </div>
                <button
                  type="submit"
                  className="btn mx-auto d-block w-75 rounded-5  border-0 btn-submit"
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
