import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">CivicTech</h2>

      <NavLink to="/dashboard" className="nav-item">
        🏠 Home
      </NavLink>

      <NavLink to="/profile" className="nav-item">
        👤 Profile
      </NavLink>

      <NavLink to="/search" className="nav-item">
        🔍 Search
      </NavLink>

      <NavLink to="/wishlist" className="nav-item">
        ⭐ Wishlist
      </NavLink>

      <button className="logout" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
}