import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://distributiondevelop.byteelephants.com/api/auth/login?username=${name}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      const token = data?.externalToken;

      if (token) {
        localStorage.setItem("token", token);
        // alert("Login successful! Redirecting...");
        navigate("/productform"); // Redirect to ProductForm
      } else {
        alert("Login failed! Token not found in response.");
      }
    } catch (error) {
      alert(error.message || "Error during login. Please try again.");
    }
  };

  const fetchCountryData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }
      const response = await fetch(
        "https://distribution.byteelephants.com/api/distributiondevelop/v1/country",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const content = data?.data?.content || [];
        console.log("Country data:", content);

        // Navigate to /table route with countryData
        navigate("/productform", { state: { countryData: content } });
      } else {
        const errorMessage = await response.text();
        console.error("Error fetching country data:", errorMessage);
      }
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
