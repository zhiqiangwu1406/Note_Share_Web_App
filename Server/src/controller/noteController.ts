import type { Request, Response } from "express";
import { Note } from "../models/Note";
import type { noteType } from "../Types/noteType";
import type { AuthRequest } from "../middlewares/protectRoute";

export const createNote = async (req: AuthRequest, res: Response) => {
  const { title } = req.body;
  const userId = req.user!.id;
  const username = req.user!.username;
  try {
    if (title.trim() === "") return;
    const createdNote = await Note.create({ title, userId, username });
    res.status(201).json({ message: "Note creation successful.", createdNote });
  } catch (error) {
    console.log("Note creation error: ", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  const notes = await Note.find();
  try {
    res.status(200).json({ message: "All notes fetched", notes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.status(200).json({ message: "Note fetched", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title }: noteType = req.body;
    const modifiedNote = await Note.findByIdAndUpdate(id, { title });
    res.status(200).json({ message: "Note update successful.", modifiedNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
