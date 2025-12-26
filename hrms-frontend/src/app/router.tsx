import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import AppLayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Leave from "../pages/Leave";
import Attendance from "../pages/Attendance";
import Payroll from "../pages/Payroll";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll" element={<Payroll />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
