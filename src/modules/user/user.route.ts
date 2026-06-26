import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();

router.post("/register", userController.createdUser);
router.get("/me", auth(Role.USER, Role.ADMIN), userController.getProfile);
router.put(
  "/my-profile",
  auth(Role.USER, Role.ADMIN),
  userController.updateProfile,
);
export const userRouter = router;
