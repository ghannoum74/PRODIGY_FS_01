import { Route, Routes } from "react-router-dom";

import AuthPage from "./components/registerPages/AuthPage";
import LoginPage from "./components/loginPages/LoginPage";
import ProfilePage from "./components/profilePage/ProfilePage";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>
    </AnimatePresence>
  );
};

// ProtectedRoute.propTypes = {
//   element: PropTypes.element.isRequired,
// };
export default App;
