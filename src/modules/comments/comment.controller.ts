import { catchAsync } from "../../utils/catchAsync";
import type { Request, Response, NextFunction } from "express";
const createdComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getCommentByAuthorId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updateCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const deleteCommentByCommentId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
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
