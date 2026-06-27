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
const getMyPostsDB = async (authorId: string) => {
  const post = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        omit: {
          password: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return post;
};
const getMyPostByIdDB = async (postId: string) => {
  // const singlePost = await prisma.post.findUniqueOrThrow({
  //   where: { id: postId },
  // });
  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });
  return updatedPost;
};
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
