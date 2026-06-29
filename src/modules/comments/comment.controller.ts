import { catchAsync } from "../../utils/catchAsync";
import type { Request, Response, NextFunction } from "express";
import { commentService } from "./comment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createdComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const comment = req.body;
    const result = await commentService.createdCommentDB(authorId, comment);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comments created successfully",
      data: result,
    });
  },
);
const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    const result = await commentService.getCommentByAuthorIdDB(
      authorId as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comments retrieved successfully",
      data: result,
    });
  },
);
const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const result = await commentService.getCommentByCommentIdDB(
      commentId as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get comment  successfully",
      data: result,
    });
  },
);
const updateCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const deleteCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { commentId } = req.params;
    const authorId = user?.id as string;
    const result = await commentService.deleteCommentByCommentIdDB(
      commentId as string,
      authorId,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comment deleted successfully",
      data: result,
    });
  },
);
const updateCommentByModerate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const commentController = {
  createdComment,
  getCommentByAuthorId,
  getCommentByCommentId,
  deleteCommentByCommentId,
  updateCommentByCommentId,
  updateCommentByModerate,
};
