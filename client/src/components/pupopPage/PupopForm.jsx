import { useState } from "react";
import SubmittForm from "../utils/SubmittForm";
import AnimatedPopup from "../utils/AnimatedPopup";
import { toast, ToastContainer } from "react-toastify";
import { inputsData } from "../utils/AllInputsData";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import AnimatedPage from "../utils/AnimatedPage";
import ImageLogo from "../utils/ImageLogo";

const PupopForm = ({ userData, setIsPupopAppear }) => {
  const [isPending, setIsPending] = useState(false);
  const [showChangePasswordPage, setShowChangePasswordPage] = useState(false);
  const {
    register,
    reset,
    clearErrors,
    setError,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const togglePassword = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  // login firstly
  const submitForm = async (data) => {
    setIsPending(true);
    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_POST_LOGIN_URL,
        data
      );
      if (result.status === 200) {
        setShowChangePasswordPage(true);
      }
      reset();
    } catch (error) {
      if (error.response?.data?.error) {
        setError("apiError", {
          type: "server",
          message: error.response.data.error,
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  const updatePassord = async (data) => {
    try {
      const result = await axios.patch(
        `http://localhost:5000/auth/update/${localStorage.getItem("id")}`,
        { password: data["password"] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (result.status === 200) {
        toast.success("Password updated Succesfuly!", {
          hideProgressBar: true,
        });
        setIsPupopAppear(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!", {
        hideProgressBar: true,
      });
    }
  };
  return (
    <div className="pupop-parent">
      <AnimatedPopup>
        <ToastContainer />
        {isPending && (
          <div className="loading" style={{ zIndex: 12 }}>
            <div></div>
          </div>
        )}
        <div className="container-authPage pupop">
          {/* go to the next step change password */}
          {showChangePasswordPage ? (
            <div className="changePasswordPupop">
              <AnimatedPage>
                <ImageLogo
                  header="Change Password"
                  desc="Create A Strong Unforgatble Password"
                />
                <form
                  onSubmit={handleSubmit(updatePassord)}
                  onChange={() => clearErrors("apiError")}
                  className="auth-form"
                  action={import.meta.env.VITE_REACT_APP_POST_LOGIN_UR}
                  method="POST"
                >
                  <div className="cont-input" key={inputsData[4].id}>
                    <input
                      name={inputsData[4].name}
                      id={inputsData[4].id}
                      type={isPasswordShow ? "text" : inputsData[4].type}
                      className={inputsData[4].className}
                      placeholder={inputsData[4].placeholder}
                      {...register(inputsData[4].name, {
                        required: `Sorry, ${inputsData[4].label} is required`,
                        pattern: {
                          value: inputsData[4].match,
                          message: inputsData[4].messageerror,
                        },
                      })}
                    />
                    <label className="each-label">{inputsData[4].label}</label>
                    <div
                      className={`error-message ${
                        errors[inputsData[4].name] ? "show" : ""
                      }`}
                    >
                      {errors[inputsData[4].name]?.message}
                    </div>
                    <FontAwesomeIcon
                      className="show-password"
                      onClick={togglePassword}
                      icon={isPasswordShow ? faEyeSlash : faEye}
                      style={{ color: "#5f6368" }}
                    />
                  </div>

                  <div className="cont-input" key={inputsData[5].id}>
                    <input
                      id={inputsData[5].id}
                      type={inputsData[5].type}
                      name={inputsData[5].name}
                      className={inputsData[5].className}
                      placeholder={inputsData[5].placeholder}
                      pattern={inputsData[5].pattern}
                      {...register(inputsData[5].name, {
                        required: `Sorry, ${inputsData[4].label} is required`,
                        pattern: {
                          value: inputsData[5].match,
                          message: inputsData[5].messageerror,
                        },
                        validate: (value) => {
                          const password = watch("password");
                          return value === password || "Password dosen't match";
                        },
                      })}
                    />
                    <label className="each-label">{inputsData[5].label}</label>
                    <div
                      className={`error-message ${
                        errors[inputsData[5].name] ? "show" : ""
                      }`}
                    >
                      {errors[inputsData[5].name]?.message}
                    </div>
                  </div>
                  {/* general error comes from API */}
                  {errors.apiError && (
                    <div className={`error-message-Api show`}>
                      {errors.apiError.message}
                    </div>
                  )}

                  <SubmittForm caption="" to="/" btn="Log in" />
                </form>
              </AnimatedPage>
            </div>
          ) : (
            <>
              <img
                src="https://cdn.pixabay.com/photo/2017/06/19/04/31/logo-2418158_1280.png"
                alt=""
              />
              <h3 className="header">Sign in</h3>
              <div className="desc-page">Use your Google Account</div>
              <form
                onSubmit={handleSubmit(submitForm)}
                onChange={() => clearErrors("apiError")}
                className="auth-form"
                action={import.meta.env.VITE_REACT_APP_POST_LOGIN_UR}
                method="POST"
              >
                <div className="cont-input" key={inputsData[3].id}>
                  <input
                    name={inputsData[3].name}
                    id={inputsData[3].id}
                    className={inputsData[3].className}
                    placeholder={inputsData[3].placeholder}
                    {...register(inputsData[3].name, {
                      required: `Sorry, ${inputsData[3].label} is required`,
                      pattern: {
                        value: inputsData[3].match,
                        message: inputsData[3].messageerror,
                      },
                      validate: (value) => {
                        if (value === userData.email) {
                          return true;
                        }
                        return "Email does not match";
                      },
                    })}
                  />
                  <label className="each-label">{inputsData[3].label}</label>
                  <div
                    className={`error-message ${
                      errors[inputsData[3].name] ? "show" : ""
                    }`}
                  >
                    {errors[inputsData[3].name]?.message}
                  </div>
                </div>

                <div className="cont-input" key={inputsData[4].id}>
                  <input
                    id={inputsData[4].id}
                    type={isPasswordShow ? "text" : inputsData[4].type}
                    name={inputsData[4].name}
                    className={inputsData[4].className}
                    placeholder={inputsData[4].placeholder}
                    pattern={inputsData[4].pattern}
                    {...register(inputsData[4].name, {
                      required: `Sorry, ${inputsData[4].label} is required`,
                      pattern: {
                        value: inputsData[4].match,
                        message: inputsData[4].messageerror,
                      },
                    })}
                  />
                  <label className="each-label">{inputsData[4].label}</label>
                  <div
                    className={`error-message ${
                      errors[inputsData[4].name] ? "show" : ""
                    }`}
                  >
                    {errors[inputsData[4].name]?.message}
                  </div>
                  <FontAwesomeIcon
                    className="show-password"
                    onClick={togglePassword}
                    icon={isPasswordShow ? faEyeSlash : faEye}
                    style={{ color: "#5f6368" }}
                  />
                </div>
                {/* general error comes from API */}
                {errors.apiError && (
                  <div className={`error-message-Api show`}>
                    {errors.apiError.message}
                  </div>
                )}

                <SubmittForm caption="" to="/" btn="Log in" />
              </form>
            </>
          )}
        </div>
      </AnimatedPopup>
    </div>
  );
};

PupopForm.propTypes = {
  userData: PropTypes.object,
  setIsPupopAppear: PropTypes.func,
};

export default PupopForm;
