import { catchAsync } from "../../utils/catchAsync";
import type { Request, Response, NextFunction } from "express";
import { postService } from "./post.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
const createdPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const result = await postService.createdPostDB(req.body, id as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post created successfully!",
      data: result,
    });
  },
);
const getAllPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAllPostDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "get All post successfully!",
      data: result,
    });
  },
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
