import { Outlet, Navigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useAuthStore } from "../auth/authStore";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

export default function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar - hidden on mobile, shown in drawer */}
      {!isMobile && <Sidebar />}

      {/* Mobile drawer sidebar */}
      {isMobile && <Sidebar mobileOpen={mobileMenuOpen} onMobileClose={() => setMobileMenuOpen(false)} />}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Topbar onMenuToggle={() => setMobileMenuOpen(true)} />
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
