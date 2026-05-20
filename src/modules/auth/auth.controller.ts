import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utility/sendResponse";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: true, //In production true
      httpOnly: true,
      sameSite: "lax",
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in Success fully",
      data: result,
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

const refreshToken = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.generateRefreshToken(
      req.cookies.refreshToken,
    );

    res.status(201).json({
      success: true,
      message: "Refresh Token Generated Successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const AuthController = {
  loginUser,
  refreshToken,
};
