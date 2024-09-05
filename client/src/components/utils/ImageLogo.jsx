import PropTypes from "prop-types";

const ImageLogo = ({ header, desc }) => {
  return (
    <>
      <img
        src="https://cdn.pixabay.com/photo/2017/06/19/04/31/logo-2418158_1280.png"
        alt="invalid"
      />
      <h3 className="header">{header}</h3>
      <div className="desc-page">{desc}</div>
    </>
  );
};

ImageLogo.propTypes = {
  header: PropTypes.string.isRequired,
  desc: PropTypes.string,
};

export default ImageLogo;
