import { Request, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import sendResponse from "../../utility/sendRespone";
const createdUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await userService.createUserFromDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created",
      data: {
        result,
      },
    });
  } catch (error) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: (error as Error).message,
    });
  }
};

export const userController = {
  createdUser,
};
