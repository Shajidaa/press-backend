import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();

router.post("/register", userController.createdUser);
router.get("/me", userController.getProfile);
export const userRouter = router;
