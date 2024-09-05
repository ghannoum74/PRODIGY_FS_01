import { useState } from "react";
import { inputsData } from "../utils/AllInputsData";
import SubmittForm from "../utils/SubmittForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserAuthenticate } from "../../states/accessProfilePage";
import { useNavigate } from "react-router-dom";
import AnimatedPage from "../utils/AnimatedPage";
import ImageLogo from "../utils/ImageLogo";

const LoginPage = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    // watch,
    reset,
    clearErrors,
    setError,
    handleSubmit,
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

  const submitForm = async (data) => {
    setIsPending(true);
    try {
      // console.log(data);
      const result = await axios.post(
        import.meta.env.VITE_REACT_APP_POST_LOGIN_URL,
        data
      );
      if (result.status === 200) {
        toast.success("Form Submited Successfuly!", {
          hideProgressBar: true,
        });
        console.log(result);
        localStorage.setItem("id", result.data.user._id);
        localStorage.setItem("token", result.data.token);
        dispatch(setUserAuthenticate(true));
        navigate("/profilePage");
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
        <ImageLogo header="Sign in" desc="Use your Google Account" />
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

          <div className="forget-email">
            {/* <Link to="/loginPage/ForgetEmailPage" className="forget-page">
              Forget email?
            </Link> */}
          </div>
          <SubmittForm
            caption="I Don't have an account"
            to="/"
            btn="Log in"
            // isNavigate={isValid}
          />
        </form>
      </div>
    </AnimatedPage>
  );
};

export default LoginPage;
