import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Username:", name, "Password:", password);
    try {
      const response = await fetch(
        `https://distribution.byteelephants.com/api/auth/login/logout-all-device-web?username=${name}&password=${password}&deviceInfo=883487`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, password }),
        }
      );
      const data = await response.json();
      const token = data?.externalToken;
      if (token) {
        localStorage.setItem("token", token);
        fetchCountryData();
      } else {
        console.error("Token not found in the response!");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
