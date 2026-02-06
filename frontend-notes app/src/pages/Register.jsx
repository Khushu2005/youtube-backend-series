import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import api service to make requests to backend 
import api from "../services/api"; 
import "./Register.scss";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


// function to handle form submission and send data to backend
const handleSubmit = async (e) => {
    e.preventDefault();

     // the fromat in which the backend expects the data
    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

try {

// yaha post likha hai means method vhi jo backend me likha  hai
// full url = http://localhost:3000/api/auth/register 
const res = await api.post("/auth/register", payload);

alert(res.data.message);

//register baad dashboard dikhega 
navigate("/dashboard");
} 

//otherwise error aayega
catch (error) {
alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🍓 Join Notes App</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
