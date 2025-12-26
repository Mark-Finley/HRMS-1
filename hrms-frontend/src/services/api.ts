// Mock data service - No actual backend calls
import type { Role } from "../types/user";

export const mockUsers = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@hrms.com",
    role: "admin" as Role,
  },
  hr: {
    id: "2",
    name: "HR Manager",
    email: "hr@hrms.com",
    role: "hr" as Role,
  },
  employee: {
    id: "3",
    name: "John Doe",
    email: "john@hrms.com",
    role: "employee" as Role,
  },
};

export const mockDashboardStats = {
  totalEmployees: 150,
  activeLeave: 12,
  presentToday: 142,
  pendingPayroll: 8,
};

export const mockEmployees = [
  { id: "1", name: "John Doe", email: "john@company.com", department: "IT", role: "Engineer" },
  { id: "2", name: "Jane Smith", email: "jane@company.com", department: "HR", role: "Manager" },
  { id: "3", name: "Bob Wilson", email: "bob@company.com", department: "Finance", role: "Analyst" },
];

export const mockLeaveRequests = [
  { id: "1", employee: "John Doe", type: "Sick", from: "2025-12-27", to: "2025-12-28", status: "Pending" },
  { id: "2", employee: "Jane Smith", type: "Vacation", from: "2026-01-10", to: "2026-01-15", status: "Approved" },
];

export const mockAttendance = [
  { id: "1", employee: "John Doe", date: "2025-12-26", status: "Present", checkIn: "09:00", checkOut: "17:00" },
  { id: "2", employee: "Jane Smith", date: "2025-12-26", status: "Present", checkIn: "09:15", checkOut: "17:30" },
  { id: "3", employee: "Bob Wilson", date: "2025-12-26", status: "Absent" },
];
