import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  People,
  EventNote,
  Timer,
  AttachMoney,
  TrendingUp,
} from "@mui/icons-material";
import { useAuthStore } from "../auth/authStore";
import { mockDashboardStats, mockAttendance, mockLeaveRequests } from "../services/api";

interface StatCard {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  suffix?: string;
}

const StatCard = ({ title, value, icon: Icon, color, bgColor, suffix }: StatCard) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 0.1,
          transform: "translate(20%, -20%)",
        }}
      >
        <Icon sx={{ fontSize: 100 }} />
      </Box>

      <CardContent sx={{ flex: 1, position: "relative", zIndex: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: bgColor,
              color: color,
            }}
          >
            <Icon />
          </Box>
          <Typography color="textSecondary" variant="body2">
            {title}
          </Typography>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: "bold", my: 1 }}>
          {value}
          {suffix && <span style={{ fontSize: "0.6em", marginLeft: "4px" }}>{suffix}</span>}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: color }}>
          <TrendingUp sx={{ fontSize: "0.875rem" }} />
          <Typography variant="caption">+5% from last month</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);

  const stats: StatCard[] = [
    {
      title: "Total Employees",
      value: mockDashboardStats.totalEmployees,
      icon: People,
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      title: "On Leave Today",
      value: mockDashboardStats.activeLeave,
      icon: EventNote,
      color: "#f57c00",
      bgColor: "#fff3e0",
    },
    {
      title: "Present Today",
      value: mockDashboardStats.presentToday,
      icon: Timer,
      color: "#388e3c",
      bgColor: "#e8f5e9",
    },
    {
      title: "Pending Payroll",
      value: mockDashboardStats.pendingPayroll,
      icon: AttachMoney,
      color: "#d32f2f",
      bgColor: "#ffebee",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      case "Present":
        return "success";
      case "Absent":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Dashboard
        </Typography>
        <Typography color="textSecondary">
          Welcome back! Here's your HR management summary.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Tables Grid */}
      <Grid container spacing={2}>
        {/* Leave Requests */}
        {(user?.role === "admin" || user?.role === "hr") && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Recent Leave Requests
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                        <TableCell>Employee</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockLeaveRequests.map((req) => (
                        <TableRow key={req.id} hover>
                          <TableCell>
                            <Typography variant="body2">{req.employee}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">{req.type}</Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={req.status}
                              size="small"
                              color={getStatusColor(req.status)}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Attendance Summary */}
        <Grid size={{ xs: 12, md: user?.role === "employee" ? 12 : 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Today's Attendance
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                      <TableCell>Employee</TableCell>
                      <TableCell>Status</TableCell>
                      {user?.role !== "employee" && <TableCell>Check In</TableCell>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockAttendance.map((att) => (
                      <TableRow key={att.id} hover>
                        <TableCell>
                          <Typography variant="body2">{att.employee}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={att.status}
                            size="small"
                            color={getStatusColor(att.status)}
                            variant="outlined"
                          />
                        </TableCell>
                        {user?.role !== "employee" && (
                          <TableCell>
                            <Typography variant="body2">
                              {att.checkIn || "N/A"}
                            </Typography>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        {user?.role === "employee" && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  Your Stats
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Attendance Rate</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      94%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={94} sx={{ height: 8, borderRadius: 4 }} />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Leave Balance</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      12/25 days
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={48} sx={{ height: 8, borderRadius: 4 }} />
                </Box>

                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Performance</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Excellent
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={100} sx={{ height: 8, borderRadius: 4 }} color="success" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
