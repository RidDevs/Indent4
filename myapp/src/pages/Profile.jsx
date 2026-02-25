import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser || {});
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

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
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === user.email ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Profile updated successfully!");
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
        <h2 className="page-title">My Profile</h2>

        <div className="profile-card">
          <div className="profile-grid">

            {/* BASIC INFO */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="name"
                value={user.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                value={user.email || ""}
                disabled
                className="readonly"
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                type="number"
                value={user.age || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={user.gender || ""}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* SOCIAL INFO */}
            <div className="form-group">
              <label>Occupation</label>
              <input
                name="occupation"
                value={user.occupation || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Income Range</label>
              <select
                name="incomeRange"
                value={user.incomeRange || ""}
                onChange={handleChange}
              >
                <option value="">Select Income Range</option>
                <option>Below 1L</option>
                <option>1L - 3L</option>
                <option>3L - 5L</option>
                <option>Above 5L</option>
              </select>
            </div>

            <div className="form-group">
              <label>Caste Category</label>
              <select
                name="casteCategory"
                value={user.casteCategory || ""}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </div>

            <div className="form-group">
              <label>Area Type</label>
              <select
                name="areaType"
                value={user.areaType || ""}
                onChange={handleChange}
              >
                <option value="">Select Area Type</option>
                <option>Rural</option>
                <option>Urban</option>
              </select>
            </div>

            {/* LOCATION */}
            <div className="form-group">
              <label>State</label>
              <input
                name="state"
                value={user.state || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>District</label>
              <input
                name="district"
                value={user.district || ""}
                onChange={handleChange}
              />
            </div>

          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>

        <div className="profile-stats">
          <h3>Saved Schemes</h3>
          <p>{wishlist.length} schemes in wishlist</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}