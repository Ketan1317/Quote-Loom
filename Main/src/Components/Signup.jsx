import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import { FaRegUser, FaLock, FaBars, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BackgroundBeamsWithCollision } from "../Ui/background-beams-with-collision";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!signupData.name) newErrors.name = "Name is required";
    if (!signupData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!signupData.password) newErrors.password = "Password is required";
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("http://localhost:8000/user/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(signupData),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data.user));
          navigate("/dashboard");
        } else {
          setError(data.error || "Signup failed");
        }
      } catch (err) {
        console.error("Signup error:", err);
        setError("Failed to connect to the server.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins']">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black backdrop-blur-md px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink
            to="/"
            className="text-4xl font-bold  font-[playball] text-white transition-colors duration-300 hover:text-[#00B7EB]"
          >
            Quote Loom
          </NavLink>
          <button
            className="md:hidden text-white focus:outline-none transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink
              to="/login"
              className="px-4 py-3 border border-gray-400 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white"
            >
              Login
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
              to="/login"
              className="px-4 py-3 border border-gray-400 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <BackgroundBeamsWithCollision className="min-h-screen flex items-center justify-center py-15 px-4 relative">
        <div className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-xl p-8 border border-[#00B7EB]/30">
          <form onSubmit={handleSignupSubmit} className="space-y-6">
            <div className="text-center text-3xl font-bold text-white mb-8">
              <span className="text-white text-4xl font-bold">Sign Up</span>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-md font-semibold text-white">
                Name
              </label>
              <div className="flex items-center mt-2 bg-black/50 rounded-md px-3 py-2 border border-[#00B7EB]/30">
                <span className="text-lg mr-2 text-[#00B7EB]">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signupData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-md text-white placeholder-gray-400"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-md font-semibold text-white">
                Email
              </label>
              <div className="flex items-center mt-2 bg-black/50 rounded-md px-3 py-2 border border-[#00B7EB]/30">
                <span className="text-lg mr-2 text-[#00B7EB]">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleInputChange}
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
              <label htmlFor="password" className="text-md font-semibold text-white">
                Password
              </label>
              <div className="flex items-center mt-2  bg-black/50 rounded-md px-3 py-2 border border-[#00B7EB]/30">
                <span className="text-lg mr-2 text-[#00B7EB]">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleInputChange}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-md font-semibold text-white">
                Confirm Password
              </label>
              <div className="flex items-center mt-2 bg-black/50 rounded-md px-3 py-2 border border-[#00B7EB]/30">
                <span className="text-lg mr-2 text-[#00B7EB]">
                  <FaLock />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-md text-white placeholder-gray-400"
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer text-lg text-[#00B7EB]"
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-950 border border-[#00B7EB]/30 text-white font-semibold py-2.5 rounded-lg transition-colors duration-300 hover:bg-gray-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <div className="text-center text-md font-medium text-white">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-[#00B7EB] hover:text-[#00A3D6] hover:underline-offset-2 transition-colors duration-300"
              >
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Signup;
