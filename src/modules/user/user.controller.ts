import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const createdUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  },
);
export const userController = {
  createdUser,
};
