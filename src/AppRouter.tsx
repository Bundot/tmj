import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { ContentProvider } from "./context/ContentContext";

export function AppRouter() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  );
}