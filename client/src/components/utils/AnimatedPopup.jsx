import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedPopup = ({ children }) => {
  const animations = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
  };
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

AnimatedPopup.propTypes = {
  children: PropTypes.node,
};

export default AnimatedPopup;
