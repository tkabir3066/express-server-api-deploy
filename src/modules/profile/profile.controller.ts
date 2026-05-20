import type { Request, Response } from "express";
import { ProfileService } from "./profile.service";
import { sendResponse } from "../../utility/sendResponse";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await ProfileService.createProfileIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Profile Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const ProfileController = {
  createProfile,
};
