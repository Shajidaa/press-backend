import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comment.interface";

const createdCommentDB = async (
  authorId: string,
  payload: ICreateCommentPayload,
) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });
  const result = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
  });
  return result;
};
const getCommentByAuthorIdDB = async (authorId: string) => {
  const allComment = await prisma.comment.findMany({
    where: {
      id: authorId,
    },
    orderBy: {
      status: "desc",
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
  return allComment;
};
const getCommentByCommentIdDB = async (commentId: string) => {
  const singleComment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
      author: {
        omit: {
          password: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  return singleComment;
};
const deleteCommentByCommentIdDB = async (
  commentId: string,
  authorId: string,
) => {
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    select: {
      id: true,
    },
  });

  await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });

  return null;
};
const updateCommentByCommentIdDB = async () => {};
const updateCommentByModerateDB = async () => {};

export const commentService = {
  createdCommentDB,
  getCommentByAuthorIdDB,
  getCommentByCommentIdDB,
  deleteCommentByCommentIdDB,
  updateCommentByCommentIdDB,
  updateCommentByModerateDB,
};
