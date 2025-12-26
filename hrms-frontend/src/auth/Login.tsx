import {
  Button,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./authStore";
import { SupervisorAccount, Groups, PersonOutline } from "@mui/icons-material";

interface RoleOption {
  role: "admin" | "hr" | "employee";
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const theme = useTheme();

  const roleOptions: RoleOption[] = [
    {
      role: "admin",
      label: "Admin",
      description: "Full system access",
      icon: SupervisorAccount,
      color: "#d32f2f",
    },
    {
      role: "hr",
      label: "HR Manager",
      description: "Manage employees & leave",
      icon: Groups,
      color: "#1976d2",
    },
    {
      role: "employee",
      label: "Employee",
      description: "View personal info",
      icon: PersonOutline,
      color: "#388e3c",
    },
  ];

  const handleLogin = (role: "admin" | "hr" | "employee") => {
    login(role);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "white",
              mb: 1,
            }}
          >
            HRMS
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontWeight: 300,
            }}
          >
            Human Resource Management System
          </Typography>
        </Box>

        <Card
          sx={{
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}>
              Select Role to Login
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "center", mb: 4 }}
            >
              Choose your role to experience the demo
            </Typography>

            <Grid container spacing={3}>
              {roleOptions.map(({ role, label, description, icon: Icon, color }) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={role}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleLogin(role)}
                    sx={{
                      height: 160,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      bgcolor: color,
                      "&:hover": {
                        bgcolor: color,
                        transform: "translateY(-4px)",
                        boxShadow: 6,
                      },
                      transition: "all 0.3s ease",
                      borderRadius: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 48 }} />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {label}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>
                      {description}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="caption" color="textSecondary">
                <strong>Demo Notice:</strong> This is a demo application with mock data. No actual backend
                is connected.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
