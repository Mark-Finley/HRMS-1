import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  Dashboard,
  People,
  EventNote,
  Timer,
  AttachMoney,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../auth/authStore";
import { useState } from "react";

const DRAWER_WIDTH = 280;

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: Dashboard, roles: ["admin", "hr", "employee"] },
  { label: "Employees", path: "/employees", icon: People, roles: ["admin", "hr"] },
  { label: "Leave", path: "/leave", icon: EventNote, roles: ["admin", "hr", "employee"] },
  { label: "Attendance", path: "/attendance", icon: Timer, roles: ["admin", "hr", "employee"] },
  { label: "Payroll", path: "/payroll", icon: AttachMoney, roles: ["admin", "hr"] },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Filter menu items based on user role
  const visibleMenuItems = menuItems.filter((item) => item.roles.includes(user?.role || "employee"));

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          HRMS
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          Human Resource Management
        </Typography>
      </Box>

      {/* User Info */}
      {user && (
        <Box sx={{ p: 2, bgcolor: "primary.light", color: "white" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {user.name}
          </Typography>
          <Typography variant="caption" sx={{ textTransform: "capitalize", opacity: 0.9 }}>
            {user.role}
          </Typography>
        </Box>
      )}

      <Divider />

      {/* Menu Items */}
      <List sx={{ flex: 1, py: 2 }}>
        {visibleMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                mx: 1,
                mb: 1,
                borderRadius: 1,
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "white" : "inherit",
                "&:hover": {
                  bgcolor: isActive ? "primary.dark" : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive ? "white" : "inherit",
                  minWidth: 40,
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer Toggle */}
      {isMobile && (
        <Box sx={{ position: "fixed", top: 70, left: 16, zIndex: 1200 }}>
          <IconButton
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{
              bgcolor: "primary.main",
              color: "white",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
