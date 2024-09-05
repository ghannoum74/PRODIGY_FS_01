import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import useLogout from "../../hooks/useLogout";
import PropTypes from "prop-types";
// import SuccessfullPage from "./SuccessfullPage";
const SubmittForm = ({ caption, to, btn }) => {
  const navigate = useNavigate();
  const [logOut, setLogOut] = useState("");
  const { logout } = useLogout();
  //when btn == log out so we in the profilePage route so i should have only one button with fex 1 and color red
  useEffect(() => {
    if (btn === "LOG OUT") {
      setLogOut("logOutBtn");
    }
  }, [btn]);
  const handleButtonClick = () => {
    if (btn === "Close") {
      console.log();
    }
    if (btn === "LOG OUT") {
      logout();
      navigate("/");
    }
  };
  return (
    <>
      <div className="last-one">
        <Link to={to} className="switch-page">
          {caption}
        </Link>
        <button
          type="submit"
          className={`switch-bttn ${logOut}`}
          onClick={handleButtonClick}
        >
          {btn}
        </button>
      </div>
    </>
  );
};

SubmittForm.propTypes = {
  caption: PropTypes.string,
  to: PropTypes.string,
  btn: PropTypes.string,
};

export default SubmittForm;
