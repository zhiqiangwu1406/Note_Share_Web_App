import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNote,
  getNotes,
  updateNote,
} from "../controller/noteController";
import { protectRoute } from "../middlewares/protectRoute";
import { authorizeUser } from "../middlewares/authorizeUser";

const router = Router();

router.post("/notes/create", protectRoute, createNote);
router.get("/notes", getNotes);
router.get("/notes/:id", getNote);
router.put("/notes/:id", protectRoute, authorizeUser, updateNote);
router.delete("/notes/:id", protectRoute, authorizeUser, deleteNote);

export default router;
