import { Outlet, Navigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useAuthStore } from "../auth/authStore";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar - hidden on mobile */}
      {!isMobile && <Sidebar />}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Topbar />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3 },
            backgroundColor: "#f5f5f5",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
