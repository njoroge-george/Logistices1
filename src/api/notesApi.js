import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/notes';

export const getNotes = () => axios.get(BASE_URL);
export const addNote = (note) => axios.post(BASE_URL, note);
export const updateNote = (id, note) => axios.put(`${BASE_URL}/${id}`, note);
export const deleteNote = (id) => axios.delete(`${BASE_URL}/${id}`);
