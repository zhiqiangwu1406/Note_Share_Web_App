import type { Request, Response } from "express";
import type { userType } from "../Types/userType";
import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";
import { asyncHandler } from "../utils/asyncHandler";
import type { AuthRequest } from "../middlewares/protectRoute";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password }: userType = await req.body;

    const existingUser = await User.findOne({ email }); //check the user is already existed or not
    if (existingUser) {
      res.status(400);
      throw new Error("Email has already been registered.");
    }

    const wsfield = [username, email, password].some(
      (one) => one.trim() === "",
    ); //check out the fields are whitespaces
    if (wsfield) {
      res.status(404);
      throw new Error("All fields are required.");
    }

    const createdUser = await User.create({ username, email, password });
    const userToRes = await User.findById(createdUser._id).select("-password");
    res.status(200).json({ message: "registration successful.", userToRes });
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const passMatch = await existingUser.matchPassword(password);
      if (passMatch) {
        generateToken(res, existingUser._id);
        res.status(200).json({
          message: "login successful",
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        });
      } else {
        res.status(401);
        throw new Error("Incorrect Password.");
      }
    } else {
      res.status(401);
      throw new Error("Invalid Credentials.");
    }
  },
);

export const logoutController = asyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 0,
    });
    res.status(200).json({ message: "User logout." });
  },
);

export const getUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res
      .status(200)
      .json({ message: "Profile fetch successful", user: req?.user });
  },
);

export const updateUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const incomingUser = req.user;
    const user = await User.findById(incomingUser?.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    await user.save();
    res.status(200).json({
      message: "Profile update successful",
      id: user._id,
      username: user.username,
      email: user.email,
    });
  },
);
