import axios from "axios";

const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_SERVER_API
  : import.meta.env.VITE_LOCAL_API_URL;

axios.defaults.withCredentials = true;

export const getNotes = async () => {
  try {
    // const response = await fetch(`${API_URL}/notes`);
    // const data = await response.json();
    // return data.notes;

    const response = await axios.get(`${API_URL}/notes`);
    return response.data.notes;
  } catch (err) {
    console.log(err);
  }
};

export const createNote = async (note: string) => {
  try {
    // const response = await fetch(`${API_URL}/notes/create`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ title: note }),
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    const response = await axios.post(`${API_URL}/notes/create`, {
      title: note,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNote = async (id: string) => {
  try {
    // const response = await fetch(`${API_URL}/notes/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // return await response.json();
    const response = await axios.delete(`${API_URL}/notes/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editNote = async (id: string, note: string) => {
  try {
    // const response = await fetch(`${API_URL}/notes/${id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ title: note }),
    // });
    // return await response.json();
    const response = await axios.put(`${API_URL}/notes/${id}`, { title: note });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
