import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // Optionally remove StrictMode if it's causing issues
  // <BrowserRouter>
  // <StrictMode>
  <App />
  // </StrictMode>
  // </BrowserRouter>
);
