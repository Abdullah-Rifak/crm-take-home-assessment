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
    <div className="mt-3 surface-card p-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold">Notes</h4>
      </div>

      <div className="space-y-2">
        {notes.map((note) => (
          <div key={note._id} className="border rounded-lg p-2 bg-slate-50">
            <p className="text-sm text-slate-800">{note.content}</p>
            <small className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="input-ui"
          placeholder="Add note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addNote} className="btn-primary">Add</button>
      </div>
    </div>
  );
}