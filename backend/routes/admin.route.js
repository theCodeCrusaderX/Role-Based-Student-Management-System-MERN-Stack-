import { Router } from "express";
import { getAllStudentProfile,updateStudentProfile,deleteStudentProfile } from "../controller/admin.controller.js";
// import { authMiddleware } from "../controller/user.controller.js";

const router = Router();

router.route("/get/all").get(getAllStudentProfile);
router.route("/student-data/update/:studentId").patch(updateStudentProfile);
router.route("/student-data/delete/:studentId").delete(deleteStudentProfile)

export default router;
