import SubmittForm from "../utils/SubmittForm";
import ImageLogo from "../utils/ImageLogo";
import { inputsData } from "../utils/AllInputsData";

// import useSignUp from "../../hooks/useSignUp";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserAuthenticate } from "../../states/accessProfilePage";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../utils/AnimatedPage";

const AuthPage = () => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const togglePassword = () => {
    setIsPasswordShow((prev) => !prev);
  };

  const validationConfirmPassword = (value) => {
    if (value !== watch("password")) {
      return "Confirm Password does not match the Password!";
    }
    return true;
  };

  const onSubmit = async (data) => {
    setIsPending(true);
    // to trim
    for (const key in data) {
      if (typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }
    // delete confirm password from data
    delete data.confirmPassword;
    try {
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_POST_SIGNUP_URL,
        data
      );
      if (result.status === 200) {
        console.log(result);
        toast.success("Form Submit Successfuly!", {
          hideProgressBar: true,
        });
        console.log(result);
        localStorage.setItem("id", result.data.user._id);
        localStorage.setItem("token", result.data.token);
        dispatch(setUserAuthenticate(true));
        navigate("/profilePage");
        // setTimeout(() => {
        //   navigate("/profilePage");
        // }, 500);
      } else {
        toast.error("Something went wrong!", {
          hideProgressBar: true,
        });
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

  return (
    <AnimatedPage>
      <ToastContainer />
      {isPending && (
        <div className="loading">
          <div></div>
        </div>
      )}
      <div className="container-authPage">
        <ImageLogo header="Create Account" desc="Enter your Information" />
        <form
          onChange={() => clearErrors("apiError")}
          onSubmit={handleSubmit(onSubmit)}
          action={import.meta.env.VITE_POST_SIGNUP_URL}
          method="POST"
          className="auth-form bithday-page"
        >
          {inputsData.map((input) => (
            <div
              className={`cont-input ${errors[input.name] ? "invalid" : ""}`}
              key={input.id}
            >
              <input
                type={
                  input.name === "password"
                    ? isPasswordShow
                      ? "text"
                      : "password"
                    : input.type
                }
                name={input.name}
                id={input.id}
                className={input.className}
                placeholder={input.placeholder}
                {...register(input.name, {
                  required: `Sorry, ${input.label} is required`,
                  pattern: input.match
                    ? {
                        value: input.match,
                        message: `${input.messageerror}`,
                      }
                    : undefined,
                  validate:
                    input.name === "confirmPassword"
                      ? validationConfirmPassword
                      : undefined,
                })}
              />
              <label className="each-label">{input.label}</label>
              {input.name === "password" && (
                <FontAwesomeIcon
                  className="show-password"
                  onClick={togglePassword}
                  icon={isPasswordShow ? faEyeSlash : faEye}
                  style={{ color: "#5f6368" }}
                />
              )}
              <div
                className={`error-message ${errors[input.name] ? "show" : ""}`}
              >
                {errors[input.name]?.message}
              </div>
            </div>
          ))}
          {/* general error comes from API */}
          {errors.apiError && (
            <div className={`error-message-Api show`}>
              {errors.apiError.message}
            </div>
          )}

          <SubmittForm
            caption="I have already an account"
            to="/loginPage"
            btn="Sign Up"
            isNavigate={false}
          />
        </form>
      </div>
    </AnimatedPage>
  );
};

export default AuthPage;
