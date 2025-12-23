import { User } from "../models/user.model.js";

const getStudentProfile = async (req, res) => {
    
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({
      success: true,
      user,
    });
};

const updateStudentProfile = async (req, res) => {
  const updates = {};

  if (req.body.name) updates.name = req.body.name;
  if (req.body.email) updates.email = req.body.email;
  if (req.body.course) updates.course = req.body.course;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: updates },
    { new: true, runValidators: true }
  ).select("-password");

  res.json({
    success: true,
    user: updatedUser,
  });
};


export {getStudentProfile,updateStudentProfile}
