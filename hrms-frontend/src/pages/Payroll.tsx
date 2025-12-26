import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  MenuItem,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import { AttachMoney, TrendingUp } from "@mui/icons-material";
import { useState } from "react";

const mockPayrollData = [
  {
    id: "1",
    employee: "John Doe",
    month: "December 2025",
    basicSalary: 50000,
    allowances: 5000,
    deductions: 3000,
    netSalary: 52000,
    status: "Paid",
  },
  {
    id: "2",
    employee: "Jane Smith",
    month: "December 2025",
    basicSalary: 60000,
    allowances: 7000,
    deductions: 4000,
    netSalary: 63000,
    status: "Pending",
  },
  {
    id: "3",
    employee: "Bob Wilson",
    month: "December 2025",
    basicSalary: 45000,
    allowances: 4000,
    deductions: 2500,
    netSalary: 46500,
    status: "Paid",
  },
];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState("2025-12");

  const getStatusColor = (status: string) => {
    return status === "Paid" ? "success" : "warning";
  };

  const totalPayroll = mockPayrollData.reduce((sum, emp) => sum + emp.netSalary, 0);
  const paidCount = mockPayrollData.filter((emp) => emp.status === "Paid").length;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Payroll Management
        </Typography>
        <Typography color="textSecondary">Process and manage employee salaries</Typography>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: "#e3f2fd", color: "#1976d2" }}>
                  <AttachMoney />
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Total Payroll
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                ₹{totalPayroll.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box sx={{ p: 1, borderRadius: 1, bgcolor: "#e8f5e9", color: "#388e3c" }}>
                  <TrendingUp />
                </Box>
                <Typography color="textSecondary" variant="body2">
                  Paid
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {paidCount} / {mockPayrollData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
            <TextField
              label="Month"
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 200 }}
            />
            <TextField
              select
              label="Status"
              defaultValue="all"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
            <Button variant="contained">Process Payroll</Button>
            <Button variant="outlined">Export Report</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Payroll Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Employee</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Basic Salary</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Allowances</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Deductions</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Net Salary</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPayrollData.map((payroll) => (
                  <TableRow key={payroll.id} hover>
                    <TableCell>
                      <Typography variant="body2">{payroll.employee}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">₹{payroll.basicSalary.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">₹{payroll.allowances.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">₹{payroll.deductions.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: "bold", color: "success.main" }}>
                        ₹{payroll.netSalary.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={payroll.status}
                        color={getStatusColor(payroll.status)}
                        variant="outlined"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" gap={1}>
                        <Button size="small" variant="outlined">
                          View
                        </Button>
                        {payroll.status === "Pending" && (
                          <Button size="small" variant="outlined" color="success">
                            Pay
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
