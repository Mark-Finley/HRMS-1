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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { mockLeaveRequests } from "../services/api";
import { useAuthStore } from "../auth/authStore";

export default function Leave() {
  const [openDialog, setOpenDialog] = useState(false);
  const user = useAuthStore((s) => s.user);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Leave Management
          </Typography>
          <Typography color="textSecondary">
            {user?.role === "employee" ? "Your leave requests" : "Manage employee leave"}
          </Typography>
        </Box>
        {user?.role === "employee" && (
          <Button variant="contained" onClick={() => setOpenDialog(true)}>
            Request Leave
          </Button>
        )}
      </Box>

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
                    <strong>Type</strong>
                  </TableCell>
                  <TableCell>
                    <strong>From</strong>
                  </TableCell>
                  <TableCell>
                    <strong>To</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  {user?.role !== "employee" && (
                    <TableCell>
                      <strong>Actions</strong>
                    </TableCell>
                  )}
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
                      <Typography variant="body2">{req.from}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{req.to}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={req.status} color={getStatusColor(req.status)} variant="outlined" />
                    </TableCell>
                    {user?.role !== "employee" && (
                      <TableCell>
                        <Stack direction="row" gap={1}>
                          <Button size="small" variant="outlined" color="success">
                            Approve
                          </Button>
                          <Button size="small" variant="outlined" color="error">
                            Reject
                          </Button>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Request Leave Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Leave</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Leave Type</InputLabel>
              <Select label="Leave Type" defaultValue="sick">
                <MenuItem value="sick">Sick Leave</MenuItem>
                <MenuItem value="vacation">Vacation</MenuItem>
                <MenuItem value="personal">Personal Leave</MenuItem>
                <MenuItem value="maternity">Maternity Leave</MenuItem>
              </Select>
            </FormControl>
            <TextField label="From Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField label="To Date" type="date" fullWidth InputLabelProps={{ shrink: true }} />
            <TextField
              label="Reason"
              fullWidth
              multiline
              rows={3}
              placeholder="Enter reason for leave"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
