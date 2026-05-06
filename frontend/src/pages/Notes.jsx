import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function Notes({ leadId }) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const fetchNotes = useCallback(async () => {
    if (!leadId) return;
    const res = await api.get(`/notes/${leadId}`);
    setNotes(res.data);
  }, [leadId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async () => {
    if (!content) return;

    await api.post("/notes", {
      leadId,
      content,
    });

    setContent("");
    fetchNotes();
  };

  return (
    <div style={{ border: "1px solid #aaa", padding: "10px", marginTop: "10px" }}>
      <h4>Notes</h4>

      {notes.map((note) => (
        <div key={note._id}>
          <p>{note.content}</p>
          <small>{new Date(note.createdAt).toLocaleString()}</small>
        </div>
      ))}

      <input
        placeholder="Add note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>
    </div>
  );
}