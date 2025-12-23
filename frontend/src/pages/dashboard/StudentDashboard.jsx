import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentData, updateStudentData } from "@/store/student-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logoutUser } from "@/store/auth-slice";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { studentData, isLoading } = useSelector(
    (state) => state.student
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
  });

  // Fetch student profile
  useEffect(() => {
    dispatch(getStudentData());
  }, [dispatch]);

  // Populate form when data arrives
  useEffect(() => {
    if (studentData) {
      setFormData({
        name: studentData.name || "",
        email: studentData.email || "",
        course: studentData.course || "",
      });
    }
  }, [studentData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdate() {
    dispatch(updateStudentData(formData));
  }

  function handleLogout() {
    dispatch(logoutUser())
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <Card className="w-full max-w-xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Student Dashboard</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Course</Label>
            <Input
              name="course"
              value={formData.course}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Enrollment Date</Label>
            <Input
              value={
                studentData?.enrollmentDate
                  ? new Date(studentData.enrollmentDate).toLocaleDateString()
                  : ""
              }
              disabled
            />
          </div>
          <div className="flex justify-between">
            {" "}
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
            <Button onClick={handleLogout} disabled={isLoading}>
              logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
