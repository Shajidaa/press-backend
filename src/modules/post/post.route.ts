import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();
router.post(
  "/",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.createdPost,
);

router.get("/", postController.getAllPost);

router.get("/stats", auth(Role.ADMIN), postController.getPostStats);

router.get(
  "/my-posts",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.getMyPosts,
);
router.get("/:postId", postController.getMyPostByID);

router.patch(
  "/:postId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.updatePost,
);
router.delete(
  "/:postId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  postController.deletePost,
);
export const postRouter = router;
