import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      setError("No registered users found. Please register first.");
      return;
    }

    const matchedUser = users.find(
      (user) =>
        user.email === form.email &&
        user.password === form.password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    // Store logged-in session
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem(
      "currentUser",
      JSON.stringify(matchedUser)
    );

    navigate("/dashboard");
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit">Log In</button>
      </form>
    </div>
  );
}