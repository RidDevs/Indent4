import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({ name: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("user"));

    if (
      stored &&
      stored.name === data.name &&
      stored.password === data.password
    ) {
      alert("Login Successful!");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}