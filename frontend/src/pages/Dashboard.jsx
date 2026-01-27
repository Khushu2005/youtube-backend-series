import "../pages/Dashboard.scss";
import LogoutButton from "../components/LogoutButton";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header>
        <h1>
          My <span>Notes</span>
        </h1>

        <LogoutButton /> 
      </header>

      <div className="notes-grid">
        <div className="empty-state">
          <h2> Welcome!</h2>
          <p>Your notes will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
