import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, getAllStudentData } from "@/store/admin-slice";
import { logoutUser, registerUser } from "@/store/auth-slice";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { studentData, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllStudentData());
  }, [dispatch]);

  function registerStudent(data) {
    dispatch(registerUser(data))
      .then((res) => {
        console.log(res);

        if (res?.payload?.success) {
          alert("user registered");
          // dispatch(getAllStudentData()); // Refresh the student list
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
        alert("error");
      });
  }

  function handleDeleteStudent(studentId) {
    console.log(studentId);

    dispatch(deleteStudent(studentId)).then(dispatch(getAllStudentData()));
  }

  function handleLogoutAdmin() {
    dispatch(logoutUser())
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
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
                            <EditStudent student={student} />
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteStudent(student._id)}
                        >
                          Delete
                        </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
