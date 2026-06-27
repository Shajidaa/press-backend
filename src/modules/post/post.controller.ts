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
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = await req.user?.id;
    if (!authorId) {
      throw new Error("user id not found!");
    }
    const result = await postService.getMyPostsDB(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "get my all post successfully!",
      data: result,
    });
  },
);
const getMyPostByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    console.log(req.params);
    if (!postId) {
      throw new Error("Post id not found");
    }

    const result = await postService.getMyPostByIdDB(postId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "get single post successfully!",
      data: result,
    });
  },
);
const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = await req.user?.id;
    const isAdmin = await req.user?.role;
    const postId = await req.params.postId;
    const payload = await req.body;
    if (!postId) {
      throw new Error("Post id not found");
    }

    if (!authorId) {
      throw new Error("user id not found!");
    }

    const result = await postService.updatePostDB(
      postId as string,
      payload,
      authorId,
      isAdmin as string,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Update single post successfully!",
      data: result,
    });
  },
);
const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = await req.user?.id;
    const isAdmin = (await req.user?.role) === "ADMIN";
    const postId = await req.params.postId;
    const result = await postService.deletedPostDb(
      postId as string,
      authorId as string,
      isAdmin,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Post deleted successfully!",
      data: result,
    });
  },
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
