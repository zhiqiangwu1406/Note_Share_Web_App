import { Router } from "express";
import {
  getUserProfile,
  loginController,
  logoutController,
  registerController,
  updateUserProfile,
} from "../controller/userController";
import multer from "multer";
import { protectRoute } from "../middlewares/protectRoute";

const router = Router();
const upload = multer();

router.post("/register", upload.none(), registerController);
router.post("/login", loginController);
router.delete("/logout", logoutController);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

export default router;

//need to use multer middleware to handle form-data from res.
