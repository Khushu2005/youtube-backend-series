import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api"; 
import "../pages/Login.scss";

function Login() {
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await api.post("/auth/login", payload);

      alert(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      alert(
        "Error: " + (error.response?.data?.message || "Login Failed")
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p className="sub-text">Login to access your strawberry notes.</p>

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

        <p>
          New here? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
