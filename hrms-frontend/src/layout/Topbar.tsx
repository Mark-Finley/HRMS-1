import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import { Logout, Settings, Menu as MenuIcon } from "@mui/icons-material";
import { useAuthStore } from "../auth/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface TopbarProps {
  onMenuToggle?: () => void;
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side - Menu Toggle + Title */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={onMenuToggle}
            sx={{ mr: 2 }}
            aria-label="toggle menu"
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          Welcome, {user?.name?.split(" ")[0]}!
        </Typography>

        {/* Right side - User Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {!isMobile && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user?.email}
            </Typography>
          )}

          <Button
            onClick={handleMenuOpen}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "inherit",
              textTransform: "none",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "rgba(255, 255, 255, 0.3)",
                fontSize: "0.875rem",
              }}
            >
              {getInitials(user?.name || "User")}
            </Avatar>
            {!isMobile && (
              <Typography variant="body2" sx={{ textTransform: "capitalize" }}>
                {user?.role}
              </Typography>
            )}
          </Button>

          {/* User Menu Dropdown */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem disabled>
              <Typography variant="body2">
                <strong>{user?.name}</strong>
              </Typography>
            </MenuItem>
            <MenuItem disabled>
              <Typography variant="caption">{user?.email}</Typography>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ gap: 1 }}>
              <Settings fontSize="small" />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ gap: 1 }}>
              <Logout fontSize="small" />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
