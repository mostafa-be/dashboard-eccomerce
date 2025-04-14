import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
// Remove <React.StrictMode> temporarily
root.render(<App />);
