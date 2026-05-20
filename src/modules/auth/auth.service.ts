import bcrypt from "bcryptjs";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { pool } from "../../db";
import config from "../../config/env";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  //1. Check if the user exists
  //2. if the user exist then compare password
  //3.Generate token

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1

    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("User does not exist");
  }

  const user = userData.rows[0];
  //   console.log(user);

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }

  //if password matched then generate token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE,
  } as SignOptions);
  const refreshToken = jwt.sign(jwtPayload, config.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: config.JWT_REFRESH_TOKEN_EXPIRE,
  } as SignOptions);

  return { accessToken, refreshToken };
};

const generateRefreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized Access");
  }

  const decoded = jwt.verify(
    token as string,
    config.JWT_REFRESH_TOKEN_SECRET,
  ) as JwtPayload;

  console.log(decoded);

  const userData = await pool.query(
    `
      SELECT * FROM users
      WHERE email=$1
      `,
    [decoded.email],
  );

  const user = userData.rows[0];
  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  if (!user.is_active) {
    throw new Error("Access Forbidden");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE,
  } as SignOptions);

  return { accessToken };
};

export const AuthService = {
  loginUserIntoDB,
  generateRefreshToken,
};
