import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "./protectRoute";

export const errorHandler = (
  error: Error,
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
  next();
};
