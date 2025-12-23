import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStudentDataAsId, getAllStudentData } from "@/store/admin-slice";
import { useSnackbar } from 'notistack';

export default function EditStudent({ student, page, limit }) {
  console.log("852", student._id);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    name: student.name || "",
    email: student.email || "",
    course: student.course || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleUpdate() {
    dispatch(
      updateStudentDataAsId({
        studentId: student._id,
        data: formData,
      })
    ).then(() => {
      dispatch(getAllStudentData({ page, limit }))
      enqueueSnackbar("Student updated successfully", { variant: 'success' });
    }).catch(() => {
      enqueueSnackbar("Failed to update student", { variant: 'error' });
    });

  }


  return (
    <div className="max-h-screen bg-gray-50 p-6 flex justify-center">
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
                student?.enrollmentDate
                  ? new Date(student.enrollmentDate).toLocaleDateString()
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
