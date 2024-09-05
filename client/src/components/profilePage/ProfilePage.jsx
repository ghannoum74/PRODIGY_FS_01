import {
  faAt,
  faCopy,
  faFloppyDisk,
  faKey,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import defaultProfile from "../../../public/default-profile.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { inputsData } from "../utils/AllInputsData";
import AnimatedPage from "../utils/AnimatedPage";
import PupopForm from "../pupopPage/PupopForm";
import { AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// Fake data

const Successfull = () => {
  const [isPending, setIsPending] = useState(false);
  const [inputFocused, setInputFocused] = useState("");
  const [invalidBtn, setInvalidBtn] = useState(true);
  const [isPupopAppear, setIsPupopAppear] = useState(false);
  const [userData, setUserData] = useState({});
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    // clearErrors,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      birthday: userData.birthday,
      email: userData.email,
      password: userData.password,
      gender: null,
    },
  });

  // loading and reading data and file (picture) from my local Pc
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputFocus = (inputName) => {
    setInputFocused(inputName);
  };

  const handleInputBlur = () => {
    setInputFocused("");
  };

  const handleData = () => {
    // so it called once instead of calling and cause re rendering for each on change
    if (invalidBtn === true) setInvalidBtn(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
  };

  // fetching user's data

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/");
    }
    const fetchData = async () => {
      setIsPending(true);
      try {
        const result = await axios.get(
          `http://localhost:5000/api/user/${localStorage.getItem("id")}`
        );
        if (result.status === 200) {
          reset(result.data);
          setUserData(result.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    };
    fetchData();
  }, [reset]);

  // update user's data
  const onSubmit = async (data) => {
    const changedData = {};
    Object.keys(data).map((key) => {
      if (data[key] !== userData[key]) {
        changedData[key] = data[key];
      }
    });
    try {
      if (Object.keys(changedData).length > 0) {
        const result = await axios.patch(
          `http://localhost:5000/auth/update/${localStorage.getItem("id")}`,
          changedData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (result.status === 200) {
          toast.success("Form updated Succesfuly!", {
            hideProgressBar: true,
          });
          setInvalidBtn(true);
          setUserData(data);
        }
      } else {
        toast.error("Something Went Wrong!", {
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!", {
        hideProgressBar: true,
      });
    }
  };

  return (
    <>
      {isPupopAppear && (
        <div
          className="blured-backg"
          onClick={() => setIsPupopAppear(false)}
        ></div>
      )}
      <AnimatePresence>
        {isPupopAppear && (
          <PupopForm userData={userData} setIsPupopAppear={setIsPupopAppear} />
        )}
      </AnimatePresence>
      <AnimatedPage>
        <ToastContainer />
        {isPending ? (
          <span className="loader"></span>
        ) : (
          <form className="profilePage" onSubmit={handleSubmit(onSubmit)}>
            <div className="container-profilePage">
              <div className="header-profilePage">
                <h3 className="header">User Profile</h3>
                <div className={`buttons ${invalidBtn ? "invalid" : "valid"}`}>
                  <Link to="/" className="logout" onClick={handleLogout}>
                    LOG OUT
                  </Link>
                  <button className="save" disabled={invalidBtn} type="submit">
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      style={{ color: "#ffffff" }}
                    />
                    <div className="save-btn">SAVE</div>
                  </button>
                </div>
              </div>
              <div className="container-card">
                <div className="basic-card">
                  <div className="card-header">Basic Info</div>
                  <div className="each-card">
                    <div className="container-basic-data">
                      <div className="profile-picture">
                        <img
                          src={imageSrc ? imageSrc : defaultProfile}
                          alt="Profile"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="main-data">
                        <div className="name">
                          {userData.firstName}&nbsp;{userData.lastName}
                        </div>
                        <div className="id">{userData._id}</div>
                        <FontAwesomeIcon
                          icon={faCopy}
                          style={{ color: "#5f6368", cursor: "pointer" }}
                          title="copy"
                        />
                        <div
                          className="change-password-btn"
                          onClick={() => setIsPupopAppear(true)}
                        >
                          <FontAwesomeIcon
                            icon={faLock}
                            style={{ color: "#000000" }}
                          />
                          <span>CHANGE PASSWORD</span>
                        </div>
                      </div>
                    </div>
                    <div className="container-inputs">
                      {inputsData.slice(0, 3).map((input) => (
                        <div className="container-success-box" key={input.id}>
                          <label className="success-label">{input.label}</label>
                          <div
                            className={`wrapper-before ${
                              inputFocused === input.name ? "focused" : ""
                            }`}
                            onClick={() => handleInputFocus(input.name)}
                            onBlur={handleInputBlur}
                          >
                            <input
                              type={input.type}
                              name={input.name}
                              className="success-input"
                              title={input.messageerror}
                              // defaultValue={userData[input.name]}
                              {...register(input.name, {
                                required: `Sorry, ${input.label} should'nt be empty!`,
                                pattern: {
                                  value: input.match,
                                  message: input.messageerror,
                                },
                                onChange: () => {
                                  handleData();
                                },
                              })}
                            />
                          </div>
                          <div
                            className={`error-message ${
                              errors[input.name] ? "show" : ""
                            }`}
                          >
                            {errors[input.name]?.message}
                          </div>
                        </div>
                      ))}

                      <div className="container-success-box">
                        <label className="success-label">Gender</label>
                        <div
                          className={`wrapper-before ${
                            inputFocused === "gender" ? "focused" : ""
                          }`}
                          onClick={() => handleInputFocus("gender")}
                          onBlur={handleInputBlur}
                        >
                          <select
                            id="gender"
                            name="gender"
                            className="success-input"
                            {...register("gender", {
                              onChange: () => handleData(),
                            })}
                          >
                            <option defaultChecked value="male">
                              Male
                            </option>
                            <option value="female">Female</option>
                            <option value="rather not say">
                              Rather not say
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-last-cards">
                  <div className="basic-card">
                    <div className="card-header">Contacts</div>
                    <div className="each-card">
                      <div className="container-basic-data">
                        <FontAwesomeIcon
                          icon={faAt}
                          style={{ color: "#f44336" }}
                          className="at-sign"
                        />
                        <div className="main-data">
                          <div className="name">{userData.email}</div>
                          <div className="id">{userData.email}</div>
                          <FontAwesomeIcon
                            icon={faCopy}
                            style={{ color: "#5f6368", cursor: "pointer" }}
                            title="copy"
                          />
                        </div>
                      </div>
                      <div className="container-inputs">
                        <div className="container-success-box">
                          <label className="success-label">
                            {inputsData[3].label}
                          </label>
                          <div
                            className={`wrapper-before ${
                              inputFocused === inputsData[3].name
                                ? "focused"
                                : ""
                            }`}
                            onClick={() => handleInputFocus(inputsData[3].name)}
                            onBlur={handleInputBlur}
                          >
                            <input
                              type={inputsData[3].type}
                              name={inputsData[3].name}
                              className="success-input"
                              title="Email cannot be changed"
                              disabled
                              style={{ cursor: "not-allowed" }}
                              defaultValue={userData[inputsData[3].name]}
                              {...register(inputsData[3].name, {
                                pattern: {
                                  value: inputsData[3].match,
                                  message: inputsData[3].messageerror,
                                },
                              })}
                            />
                            <div
                              className={`error-message ${
                                errors[inputsData[3].name] ? "show" : ""
                              }`}
                            >
                              {errors[inputsData[3].name]?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="basic-card">
                    <div className="card-header">Address</div>
                    <div className="each-card">
                      <div className="container-basic-data">
                        <FontAwesomeIcon
                          icon={faKey}
                          style={{ color: "#03a9f4" }}
                          className="lock-icon"
                        />
                        <div className="main-data">
                          <div className="name">{inputsData[4].label}</div>
                          <div className="id"></div>
                        </div>
                      </div>
                      <div className="container-inputs">
                        <div className="container-success-box">
                          <label className="success-label">
                            {inputsData[4].label}
                          </label>
                          <div
                            className={`wrapper-before ${
                              inputFocused === inputsData[4].name
                                ? "focused"
                                : ""
                            }`}
                            onClick={() => handleInputFocus(inputsData[4].name)}
                            onBlur={handleInputBlur}
                          >
                            <input
                              type={inputsData[4].type}
                              name={inputsData[4].name}
                              style={{ cursor: "not-allowed" }}
                              className="success-input"
                              disabled
                              {...register(inputsData[4].name)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </AnimatedPage>
    </>
  );
};

export default Successfull;
