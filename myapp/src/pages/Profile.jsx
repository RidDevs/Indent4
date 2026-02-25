import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

  const [user, setUser] = useState(currentUser || {});
  const wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  if (!currentUser) return null;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    // Update user inside users array
    const updatedUsers = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    alert("Profile Updated Successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <h2>My Profile</h2>

        <div className="profile-card">
          <label>Full Name</label>
          <input
            name="name"
            value={user.name || ""}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            value={user.email || ""}
            disabled
          />

          <label>Age</label>
          <input
            name="age"
            type="number"
            value={user.age || ""}
            onChange={handleChange}
          />

          <label>State</label>
          <input
            name="state"
            value={user.state || ""}
            onChange={handleChange}
          />

          <label>District</label>
          <input
            name="district"
            value={user.district || ""}
            onChange={handleChange}
          />

          <label>Occupation</label>
          <input
            name="occupation"
            value={user.occupation || ""}
            onChange={handleChange}
          />

          <button onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <div className="profile-stats">
          <h3>Saved Schemes</h3>
          <p>{wishlist.length} schemes in wishlist</p>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}