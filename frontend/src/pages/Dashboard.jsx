import { useEffect, useState } from "react";
import "../pages/Dashboard.scss";
import LogoutButton from "../components/LogoutButton";
import api from "../services/api";

function Dashboard() {
  // Data rakhne ke liye State
  const [notes, setNotes] = useState([]);

  //  Form ka data rakhne ke liye State
  const [formData, setFormData] = useState({ title: "", content: "" });

  //  FETCH NOTES
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        // Backend se data through api
        const res = await api.get("/note/get-all-notes");
        // State mein save kar liya
        setNotes(res.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []); // [] ka matlab: Sirf page load hone par chalega

  //  CREATE NOTE (POST)
  const handleCreate = async (e) => {
    e.preventDefault(); // Page reload hone se roka
    try {
      // Backend ko data bheja
      const res = await api.post("/note/create", formData);

      // Screen par naya note turant dikhane ke liye
      // [new  Note, ...old Notes(jo db me the)]
      setNotes([res.data.note, ...notes]);

      // Form khali kar diya
      setFormData({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>
          My <span>Notes</span>
        </h1>
        <LogoutButton />
      </header>

      {/* CREATE FORM */}
      <div className="create-note-section">
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          ></textarea>
          <button type="submit">Add Note +</button>
        </form>
      </div>

      {/* DISPLAY NOTES */}
      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div className="note-card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
