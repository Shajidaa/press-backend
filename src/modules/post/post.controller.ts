import { catchAsync } from "../../utils/catchAsync";
import type { Request, Response, NextFunction } from "express";
const createdPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getPostStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getMyPostByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const postController = {
  createdPost,
  getAllPost,
  getPostStats,
  getMyPosts,
  getMyPostByID,
  updatePost,
  deletePost,
};
