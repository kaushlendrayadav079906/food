import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom"; // For navigation

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // For success or error messages
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const url = currState === "Sign Up"
      ? 'http://localhost:8888/ecomm/api/v1/auth/signup'
      : 'http://localhost:8888/ecomm/api/v1/auth/signin';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (currState === "Sign Up") {
          setMessage("Registration successful! Redirecting to login...");
          setTimeout(() => {
            setCurrState("Login"); // Switch to login after successful signup
            setMessage(""); // Clear the message after switching
          }, 2000);
        } else {
          setMessage("Login successful!");
          localStorage.setItem("token", data.accessToken); // Save token
          navigate("/dashboard"); // Navigate to a protected route like dashboard
        }

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close popup"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create Account" : "Log In"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Click here</span>
          </p>
        )}
      </form>

      {message && (
        <p className={message.includes("Error") ? "error-message" : "message"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginPopup;
