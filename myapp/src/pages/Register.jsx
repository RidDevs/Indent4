import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    state: "",
    district: "",
    income_range: "",
    occupation: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));
    alert("Registered Successfully!");
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />

        <select name="gender" onChange={handleChange}>
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input name="state" placeholder="State" onChange={handleChange} />
        <input name="district" placeholder="District" onChange={handleChange} />

        <select name="income_range" onChange={handleChange}>
          <option>Income Range</option>
          <option>Below 1L</option>
          <option>1-3L</option>
          <option>3-5L</option>
        </select>

        <input name="occupation" placeholder="Occupation" onChange={handleChange} />
        <input name="password" type="password" placeholder="Create Password" onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}