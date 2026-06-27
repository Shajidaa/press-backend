import { prisma } from "../../lib/prisma";
import { ICreatedPostPayload } from "./post.interface";

const createdPostDB = async (payload: ICreatedPostPayload, userId: string) => {
  const post = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return post;
};
const getAllPostDB = async () => {
  const allPost = await prisma.post.findMany({
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });
  return allPost;
};
const getPostStatsDB = {};
const getMyPostsDB = {};
const getMyPostByIdDB = {};
const updatePostDB = {};
const deletedPostDb = {};
export const postService = {
  createdPostDB,
  getAllPostDB,
  getPostStatsDB,
  getMyPostByIdDB,
  getMyPostsDB,
  updatePostDB,
  deletedPostDb,
};
