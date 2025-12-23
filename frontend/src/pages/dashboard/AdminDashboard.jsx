import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudentData } from "@/store/admin-slice";
import { logoutUser, registerUser } from "@/store/auth-slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSnackbar } from "notistack";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Form from "@/components/Form";
import EditStudent from "@/components/EditStudent";

function AdminDashboard() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { studentData,pagination, isLoading } = useSelector((state) => state.admin);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getAllStudentData({ page, limit }));
  }, [dispatch, page, limit]);

  function registerStudent(data) {
    dispatch(registerUser(data))
      .then((res) => {
        console.log(res);

        if (res?.payload?.success) {
          enqueueSnackbar("Student registered successfully", {
            variant: "success",
          });
          dispatch(getAllStudentData({ page, limit })); // Refresh the student list
        } else {
          enqueueSnackbar("Registration failed", { variant: "error" });
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        enqueueSnackbar("An error occurred during registration", {
          variant: "error",
        });
      });
  }

  useEffect(() => {
    dispatch(getAllStudentData({ page, limit }));
  }, [dispatch, page,limit]);

  function handleDeleteStudent(studentId) {
    console.log(studentId);

    dispatch(deleteStudent(studentId))
      .then(() => {
        dispatch(getAllStudentData({ page, limit }));
        enqueueSnackbar("Student deleted successfully", { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar("Failed to delete student", { variant: "error" });
      });
  }

  function handleLogoutAdmin() {
    dispatch(logoutUser()).then(() => {
      enqueueSnackbar("Admin logged out successfully", { variant: "success" });
    });
  }

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{
        backgroundColor: "#a60071",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/cubes.png")',
      }}
    >
      <Button onClick={handleLogoutAdmin}>logout</Button>
      <Card className="max-w-6xl mx-auto shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Admin Dashboard – Students</CardTitle>
          <Dialog>
            <DialogTrigger>
              <Button>Add Student</Button>
            </DialogTrigger>
            <DialogContent>
              <Form onSubmit={registerStudent} />
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-center py-6">Loading students...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {studentData?.length > 0 ? (
                  studentData.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </TableCell>

                      <TableCell className="text-right space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </DialogTrigger>

                          <DialogContent>
                            <EditStudent student={student} page={page} limit={limit} />
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                              Delete
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to delete this student?
                              </AlertDialogTitle>
                            </AlertDialogHeader>

                            <div className="flex justify-end gap-3 mt-4">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteStudent(student._id)}
                              >
                                Yes, Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">
              Page {pagination?.currentPage} of {pagination?.totalPages}
            </p>

            <div className="space-x-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                disabled={page === pagination?.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
        {/* PAGINATION */}
      </Card>
    </div>
  );
}

export default AdminDashboard;
