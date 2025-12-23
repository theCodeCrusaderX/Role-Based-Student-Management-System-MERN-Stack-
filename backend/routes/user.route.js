import { Router } from "express";
import {
  registerUser,
  loginUser,
  authMiddleware,
  logoutUser
} from "../controller/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/check-auth").get(authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});

router.route("/logout").post(authMiddleware, logoutUser)

export default router;
