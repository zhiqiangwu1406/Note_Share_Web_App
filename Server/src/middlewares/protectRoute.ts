import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import type { Types } from "mongoose";

export interface AuthRequest extends Request {
  user?: {
    id: Types.ObjectId | string;
    username: string;
    email: string;
  };
}

export const protectRoute = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
      res.status(400);
      throw new Error("Invalid Request.");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (!decodedToken) {
      res.status(401);
      throw new Error("Unauthorized.");
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    req.user = { id: user._id, username: user.username, email: user.email };
    next();
  },
);
