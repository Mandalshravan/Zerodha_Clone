import { createRoot } from "react-dom/client";
import App from "./index.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <index />
  </BrowserRouter>
);