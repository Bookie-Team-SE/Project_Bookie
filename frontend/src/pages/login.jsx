import React, { useState } from "react";
import { Link } from "react-router-dom";
import bookie from "../assets/bookie.png";
import "../styles/login.css";
import libraryImage from "../assets/test.jpg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login Data:", {
      ...formData,
      rememberMe,
    });

    // Connect your login API here
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE - LOGIN FORM */}
      <div className="login-left">
        <div className="login-content">

          {/* Logo */}
          <div className="login-logo">
            <img
              src={bookie}
              alt="Biblion Logo"
              className="login-logo-image"
            />
          </div>

          {/* Welcome Text */}
          <div className="welcome-section">
            <h1>Welcome Back, Grace</h1>
            <p>
              Welcome back to Biblion! Please enter your details
            </p>
          </div>

          {/* Welcome Banner */}
          <div className="login-welcome-banner">

            <div className="welcome-message">
              <h3>Your Library Awaits</h3>
              <p>
                Sign in to explore, borrow, and manage your
                favorite books.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <i
                    className={
                      showPassword
                        ? "fa-solid fa-eye"
                        : "fa-solid fa-eye-slash"
                    }
                  ></i>
                </button>
              </div>
            </div>

            {/* Remember Me / Forgot Password */}
            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember for 30 days</span>
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button">
              Log In
            </button>

          </form>

          {/* Register */}
          <div className="register-section">
            <p>
              Don’t have an account?
              <Link to="/register"> Register for free</Link>
            </p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="login-right">
        <img
          src={libraryImage}
          alt="Books and library"
          className="login-background"
        />
      </div>

    </div>
  );
}

export default Login;
