import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CarInfo from "../pages/CarInfo";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/carinfo" element={<CarInfo />} />
        <Route path="*" element={<Navigate to="/carinfo" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
