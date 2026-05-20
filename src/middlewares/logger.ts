import type { NextFunction, Request, Response } from "express";
import fs from "fs";

const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log("Method--> Url -->Time :", req.method, req.url, Date.now());
  const log = `Method: ${req.method}, Url: ${req.url}, Time: ${Date.now()}\n\n`;

  fs.appendFile("logger.txt", log, (err) => {
    // console.log(err);
  });
  next();
};

export default logger;
