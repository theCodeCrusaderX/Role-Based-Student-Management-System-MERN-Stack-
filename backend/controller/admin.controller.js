import { User } from "../models/user.model.js";

// const getAllStudentProfile = async (req, res) => {
    
//   const user = await User.find({role : "student"}).select("-password");
//   res.status(200).json({
//       success: true,
//       user,
//     });
// };

const getAllStudentProfile = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const students = await User.find({ role: "student" })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      students,
      pagination: {
        totalStudents,
        currentPage: page,
        totalPages: Math.ceil(totalStudents / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};


const updateStudentProfile = async (req, res) => {

  const studentId = req.params.studentId;
  const updates = {};

  if (req.body.name) updates.name = req.body.name;
  if (req.body.email) updates.email = req.body.email;
  if (req.body.course) updates.course = req.body.course;

  const updatedUser = await User.findByIdAndUpdate(
    studentId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");

  res.json({
    success: true,
    user: updatedUser,
  });
};

const deleteStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1️⃣ Check if student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // 2️⃣ Delete student
    await User.findByIdAndDelete(studentId);

    // 3️⃣ Success response
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export {getAllStudentProfile,updateStudentProfile,deleteStudentProfile}
