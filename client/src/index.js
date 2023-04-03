import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProSidebarProvider } from "react-pro-sidebar";
// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// npm run build
if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <ProSidebarProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProSidebarProvider>
      </ChakraProvider>
    </DndProvider>
  </AuthProvider>
);
