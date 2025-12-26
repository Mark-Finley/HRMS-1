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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { mockEmployees } from "../services/api";

export default function Employees() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Employees
          </Typography>
          <Typography color="textSecondary">Manage your workforce</Typography>
        </Box>
        <Button variant="contained" onClick={() => setOpenDialog(true)}>
          Add Employee
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Department</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Position</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockEmployees.map((emp) => (
                  <TableRow key={emp.id} hover>
                    <TableCell>
                      <Typography variant="body2">{emp.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{emp.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{emp.department}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{emp.role}</Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" gap={1}>
                        <Button size="small" variant="outlined">
                          Edit
                        </Button>
                        <Button size="small" variant="outlined" color="error">
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <TextField label="Full Name" fullWidth placeholder="Enter employee name" />
            <TextField label="Email" fullWidth type="email" placeholder="Enter email" />
            <TextField label="Department" fullWidth placeholder="Enter department" />
            <TextField label="Position" fullWidth placeholder="Enter position" />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
