import { useEffect, useState } from "react";
import "../pages/Dashboard.scss";
import LogoutButton from "../components/LogoutButton";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import api from "../services/api";

function Dashboard() {
// Data rakhne ke liye State
const [notes, setNotes] = useState([]);

// Form ka data rakhne ke liye State
const [formData, setFormData] = useState({ title: "", content: "" });

// Ye naya state hai: Ye track karega ki hum abhi Edit kar rahe hain ya nahi  // agr seteddingNoteId null hai to mtlb naya note add kr rhe hai

const [editingNoteId, setEditingNoteId] = useState(null);

// FETCH NOTES
  useEffect(() => {
const fetchNotes = async () => {
try {
// Backend se data through api (URL fix kiya: /note)
const res = await api.get("/note/get-all-notes");

// State mein save kar liya
// (Safety check lagaya taaki agar notes na ho to crash na kare)

setNotes(res.data.notes || []);
} catch (error) {
console.error("Error fetching notes:", error);}};
fetchNotes();
}, []); 
// [] ka matlab: Sirf page load hone par chalega

const handleSubmit = async (e) => {
e.preventDefault(); // Page reload hone se roka
try {
if (editingNoteId) {
// UPDATE LOGIC (Agar Edit mode on hai)

const res = await api.put(`/note/update/${editingNoteId}`, formData);

// UI Update: List me purane note ko naye data se replace kar diya
//  Backend update me seedha object bhejta hai jo updated note hota hai

setNotes(
 notes.map((note) => (note._id === editingNoteId ? res.data : note)),);

setEditingNoteId(null); // Mode wapis normal
} else {
// CREATE LOGIC (Agar Naya note hai)
// URL fix kiya: /note
const res = await api.post("/note/create", formData);

// Screen par naya note turant dikhane ke liye
// [new Note, ...old Notes(jo db me the)]
setNotes([res.data.note, ...notes]); }

// Form khali kar diya
setFormData({ title: "", content: "" }); } catch (error) {
console.error("Error saving note:", error);
    }
  };

 // DELETE FUNCTION
const handleDelete = async (id) => {
try {
 // Delete button click krte hi backend se delete kar diya ye api call se

await api.delete(`/note/delete/${id}`);

// UI Update: Delete hue note ko list se hata diya
setNotes(notes.filter((note) => note._id !== id));
} catch (error) {
 console.error("Error deleting note:", error);
    }
  };

  // EDIT CLICK FUNCTION
const handleEdit = (note) => {
setEditingNoteId(note._id); // id of note jise edit karna hai
setFormData({ title: note.title, content: note.content }); // Data form me bhejo
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>
          My <span>Notes</span>
        </h1>
        <LogoutButton />
      </header>

      <div className="create-note-section">
        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className={editingNoteId ? "btn-update" : "btn-add"}
          >
            {editingNoteId ? "Update Note " : "Add Note ➕"}
          </button>
        </form>
      </div>

      <div className="notes-grid">
        {notes.length > 0 ? (
          notes.map((note) =>
            // Agar galti se undefined note aa jaye to crash na ho
            note ? (
              <div className="note-card" key={note._id}>
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                </div>

                <div className="card-actions">
                  <EditButton onClick={() => handleEdit(note)} />
                  <DeleteButton onClick={() => handleDelete(note._id)} />
                </div>
              </div>
            ) : null,
          )
        ) : (
          <p className="empty-text">No notes found. Create one!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
