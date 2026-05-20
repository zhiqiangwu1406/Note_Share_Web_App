import { useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  editNote,
  getNotes,
} from "../Services/noteService";
import type { noteType } from "../Types/Note";
import { useSelector } from "react-redux";
import type { RootState } from "../Store";
import { Link } from "react-router";
import { toast } from "react-toastify";

function Home() {
  const [notes, setNotes] = useState<noteType[]>([]);
  const [note, setNote] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  useEffect(() => {
    const fetchNotes = async () => {
      const receivedNotes: noteType[] = await getNotes();
      setNotes(receivedNotes);
    };
    fetchNotes();
  }, [refresh]);
  const refreshHome = () => {
    setRefresh(!refresh);
  };
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (editMode) {
      await editNote(editId, note);
      setNote("");
      refreshHome();
      setEditMode(false);
      toast.success("Note is successfully edited.");
    } else {
      await createNote(note);
      setNote("");
      refreshHome();
      toast.success("Note is successfully created.");
    }
  };

  const deleteHandler = async (id: string) => {
    await deleteNote(id);
    refreshHome();
    toast.success("Note is successfully deleted.");
  };

  const editHandler = async (id: string, note: string) => {
    setEditMode(true);
    setNote(note);
    setEditId(id);
  };

  return (
    <section className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold my-4 text-center">Note List</h2>
      <form onSubmit={submitHandler}>
        {notes?.map((note, index) => (
          <div key={index} className="flex items-center justify-between my-4">
            <div>
              <p className="text-lg py-2">{note.title} </p>
              <p className="text-sm text-gray-400">
                Created by {note.username}
              </p>
            </div>
            {note.userId === userInfo?.id && (
              <div>
                <button
                  type="button"
                  className="bg-red-400 p-2 rounded-md mx-2 hover:cursor-pointer hover:bg-red-500"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mx-2 border py-2 px-3 rounded-md hover:cursor-pointer hover:bg-gray-200"
                  onClick={() => editHandler(note._id, note.title)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
        {userInfo ? (
          <>
            <input
              type="text"
              value={note}
              className="input inline! p-2! my-4!"
              placeholder="Your note here ...."
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              type="submit"
              className="border text-sm mx-4 rounded-md p-2 bg-gray-600 text-white hover:cursor-pointer hover:bg-black"
            >
              {editMode ? "Edit" : "Create"}
            </button>{" "}
          </>
        ) : (
          <p className="border-2 p-4 w-fit">
            <Link to="/login" className="font-bold underline mr-2">
              Login
            </Link>
            to create your notes
          </p>
        )}
      </form>
    </section>
  );
}

export default Home;
