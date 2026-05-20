import type { Response } from "express";
import type { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const generateToken = (res: Response, id: Types.ObjectId) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.status(200).cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    partitioned: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
