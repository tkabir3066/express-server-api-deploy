import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  JWT_ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE as string,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  JWT_REFRESH_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE as string,
};

export default config;
