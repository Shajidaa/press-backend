import { NextFunction, Request, RequestHandler, Response } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

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

const getProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.JWT_ACCESS_SECRET,
    );
    // console.log(accessToken);

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    // console.log("verified token", verifiedToken);
    const id = verifiedToken.data?.id as string;
    // 3. Ensure the id exists on the payload
    if (!verifiedToken || !verifiedToken.data?.id) {
      throw new Error("Unauthorized: Invalid token payload");
    }

    // 4. Fetch profile using the verified ID
    const profile = await userService.getMyProfile(verifiedToken.data.id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Get my profile successfully",
      data: profile,
    });
  },
);
export const userController = {
  createdUser,
  getProfile,
};
