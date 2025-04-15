import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import { FaRegUser, FaLock, FaBars, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BackgroundBeamsWithCollision } from "../Ui/background-beams-with-collision";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (formSubmitted) validateForm();
  }, [loginData, formSubmitted]);

  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginData.email))
      newErrors.email = "Email is invalid";
    if (!loginData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    if (error) setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setError("");
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(loginData),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/dashboard");
        } else {
          setError(data.error || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError("Failed to connect to the server.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins']">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black backdrop-blur-md px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink
            to="/"
            className="text-4xl font-bold text-white font-[playball] transition-colors duration-300 hover:text-[#00B7EB]"
          >
            Quote Loom
          </NavLink>
          <button
            className="md:hidden text-white focus:outline-none transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/signup"
              className="px-4 py-3 border border-gray-400 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-6">
            <NavLink
              to="/signup"
              className="px-4 py-3 border border-gray-400 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <BackgroundBeamsWithCollision className="max-h-screen flex items-center justify-center py-14 px-4 relative">
        <div className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-xl p-8 border border-[#00B7EB]/30">
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="text-center text-3xl font-bold text-white mb-8">
              <span className="text-white text-4xl font-bold">Login</span>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-md mb-4 font-semibold text-white">
                Email
              </label>
              <div className="flex items-center mt-2 bg-black/50  rounded-md px-3 py-2 border border-[#00B7EB]/30">
                <span className="text-lg mr-2 text-[#00B7EB]">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  className="w-full bg-transparent outline-none text-md text-white placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-md mb-4 font-semibold text-white">
                Password
              </label>
              <div className="flex items-center mt-2 bg-black/50 rounded-md px-3 py-2 border border-[#00B7EB]/30">
                <span className="text-lg mr-2 text-[#00B7EB]">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  className="w-full bg-transparent outline-none text-md text-white placeholder-gray-400"
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-lg text-[#00B7EB]"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Backend Error */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-950 border border-[#00B7EB]/30 text-white font-semibold py-2.5 rounded-lg transition-colors duration-300 hover:bg-gray-900"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <div className="flex items-center justify-center gap-1">
              <span className="w-[180px] h-[2px] bg-gray-700"></span>
              <p className="text-gray-700 font-semibold">OR</p>
              <span className="w-[180px] h-[2px] bg-gray-700"></span>
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 py-2.5 bg-black/50 border border-[#00B7EB]/30 text-white rounded-lg font-semibold transition-colors duration-300 hover:bg-gray-900"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>

            {/* Signup Link */}
            <div className="text-center text-md font-medium text-white">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#00B7EB] hover:text-[#00A3D6] transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Login;