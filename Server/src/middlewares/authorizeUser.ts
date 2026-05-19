import type { NextFunction, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import type { AuthRequest } from "./protectRoute";
import { Note } from "../models/Note";

export const authorizeUser = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const noteId = req.params.id;
    const userId = req.user?.id;
    const note = await Note.findById(noteId);
    if (!note) {
      res.status(404);
      throw new Error("User not found.");
    }

    if (note.userId!.toString() !== userId?.toString()) {
      res.status(403);
      throw new Error("Unauthorized.");
    }
    next();
  },
);
