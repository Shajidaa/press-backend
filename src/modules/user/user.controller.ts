import { Request, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
const createdUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await userService.createUserFromDB(payload);

    res.status(201).json({
      success: true,
      statusCode: httpStatus.CREATED,
      message: "user created",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: (error as Error).message,
    });
  }
};

export const userController = {
  createdUser,
};
