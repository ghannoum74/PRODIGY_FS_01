import { Link } from "react-router-dom";

import PropTypes from "prop-types";
// import SuccessfullPage from "./SuccessfullPage";
const SubmittForm = ({ caption, to, btn }) => {
  return (
    <>
      <div className="last-one">
        <Link to={to} className="switch-page">
          {caption}
        </Link>
        <button type="submit" className="switch-bttn">
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
