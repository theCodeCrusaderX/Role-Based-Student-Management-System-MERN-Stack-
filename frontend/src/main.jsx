import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { Toaster } from "@/components/ui/toaster";
import { SnackbarProvider } from "notistack";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
      {/* <Toaster></Toaster> */}
    </Provider>
  </BrowserRouter>
);
