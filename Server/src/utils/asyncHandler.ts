import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "../middlewares/protectRoute";

export const asyncHandler =
  (
    controllerFn: (
      req: Request | AuthRequest,
      res: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  (req: Request | AuthRequest, res: Response, next: NextFunction) =>
    Promise.resolve(controllerFn(req, res, next)).catch(next);
