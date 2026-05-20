import express, { type Request, type Response } from "express";
import { UserRoutes } from "./modules/user/user.route";
import { ProfileRoutes } from "./modules/profile/profile.route";
import { AuthRoutes } from "./modules/auth/auth.route";
import logger from "./middlewares/logger";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.get("/", (req, res) => {
  //   res.send("Hello World!");
  res.status(200).json({ message: "Hello Users!" });
});

app.use("/api/users", UserRoutes);
app.use("/api/profile", ProfileRoutes);
app.use("/api/auth", AuthRoutes);

// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
