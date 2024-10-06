import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext"; // Import StoreContext

const LoginPopup = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext); // Get setToken from context
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Set the URL based on the current state (Login or Sign Up)
    const url =
      currState === "Sign Up"
        ? "http://localhost:8889/api/auth/signup"
        : "http://localhost:8889/api/auth/signin";

    console.log("Sending request to:", url);
    console.log("Form Data:", JSON.stringify(formData));

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check for specific error messages
        if (data.message) {
          throw new Error(data.message);
        } else {
          throw new Error("An unexpected error occurred.");
        }
      }

      console.log("Response from server:", data);

      if (currState === "Sign Up") {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          setCurrState("Login");
          setMessage("");
        }, 2000);
      } else {
        setMessage("Login successful!");
        localStorage.setItem("token", data.accessToken); // Save the token
        setToken(data.accessToken); // Set token in context

        setTimeout(() => {
          setShowLogin(false); // Close the popup
          navigate("/"); // Redirect to the home page
        }, 1000);
      }

      // Reset form data after successful submission
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error during signup/login:", error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close popup" />
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

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Processing..." : currState === "Sign Up" ? "Create Account" : "Log In"}
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

      {message.includes("Incorrect email or password") && (
        <div className="forgot-password">
          <p>
            Forgot Password?{" "}
            <span onClick={() => navigate("/forgot-password")}>Click here</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPopup;
