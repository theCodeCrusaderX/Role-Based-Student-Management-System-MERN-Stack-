import { Router } from "express";
import { getStudentProfile,updateStudentProfile } from "../controller/student.controller.js";
import { authMiddleware } from "../controller/user.controller.js";

const router = Router();

router.route("/get/me").get(authMiddleware,getStudentProfile);
router.route("/update/me").patch(authMiddleware,updateStudentProfile);

export default router;
