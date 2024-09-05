import ReactDOM from "react-dom/client";
import App from "./App";
import "./Css/index.css";
import { Provider } from "react-redux";
import store from "./states/store";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
