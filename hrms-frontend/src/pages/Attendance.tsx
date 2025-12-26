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
} from "@mui/material";
import { useState } from "react";
import { mockAttendance } from "../services/api";

export default function Attendance() {
  const [filterDate, setFilterDate] = useState(new Date().toISOString().split("T")[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "success";
      case "Absent":
        return "error";
      case "Late":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Attendance
        </Typography>
        <Typography color="textSecondary">Track employee attendance</Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
            <TextField
              label="Date"
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ minWidth: 200 }}
            />
            <TextField
              select
              label="Department"
              defaultValue="all"
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">All Departments</MenuItem>
              <MenuItem value="it">IT</MenuItem>
              <MenuItem value="hr">HR</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
            </TextField>
            <Button variant="contained">Apply Filters</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Employee</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Date</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Check In</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Check Out</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockAttendance.map((att) => (
                  <TableRow key={att.id} hover>
                    <TableCell>
                      <Typography variant="body2">{att.employee}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{att.date}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={att.status} color={getStatusColor(att.status)} variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{att.checkIn || "N/A"}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{att.checkOut || "N/A"}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, mt: 3 }}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              Present
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "success.main" }}>
              {mockAttendance.filter((a) => a.status === "Present").length}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              Absent
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "error.main" }}>
              {mockAttendance.filter((a) => a.status === "Absent").length}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography color="textSecondary" sx={{ mb: 1 }}>
              Attendance Rate
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main" }}>
              94%
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
