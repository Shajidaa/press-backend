import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router();
router.post(
  "/",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.createdComment,
);

router.get("/author/:authorId", commentController.getCommentByAuthorId);

router.get("/:commentId", commentController.getCommentByCommentId);

router.patch(
  "/:commentId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.updateCommentByCommentId,
);

router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.deleteCommentByCommentId,
);

router.patch(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commentController.updateCommentByModerate,
);
export const commentRouter = router;
