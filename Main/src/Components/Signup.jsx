import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GoSignIn } from "react-icons/go";
import { FaRegUser, FaLock, FaBars, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log("Signup data:", signupData);
        navigate("/main");
      }, 1000); // Delay for animation
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b relative from-[#f1f5f9] to-[#e2e8f0] text-[#1e293b] font-sans  overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute top-[-10%] left-[-15%] w-[40%] opacity-50"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#06b6d4"
            d="M39.3,-61.7C53.5,-51.5,68.8,-43.6,73.5,-32.2C78.2,-20.9,72.2,-5.9,65.9,5.4C59.6,16.8,52.8,23.5,45.6,30.5C38.4,37.5,30.8,44.9,21.7,48.3C12.5,51.7,2,51.1,-10.6,52.1C-23.1,53,-46.6,55.6,-54.8,47.8C-63.1,39.9,-56.1,21.5,-53.3,6.3C-50.5,-8.9,-52,-20.9,-47.1,-32.2C-42.2,-43.5,-30.8,-54.1,-18,-62.6C-5.3,-71.1,8.9,-77.4,22.4,-76.8C35.8,-76.1,48.1,-68.4,39.3,-61.7Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute bottom-[-10%] right-[-15%] w-[50%] opacity-40"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#0891b2"
            d="M43.3,-62.1C55.4,-52.6,61.6,-37.7,65.2,-22.8C68.8,-7.8,69.7,7.3,66.1,21.5C62.5,35.8,54.5,49.1,43.1,54.3C31.7,59.6,15.8,56.7,-0.1,56.9C-16,57,-32,60.3,-43.2,54.4C-54.4,48.5,-60.8,33.3,-65.7,18.6C-70.7,3.9,-74.3,-10.2,-70.4,-21.9C-66.5,-33.5,-55.2,-42.8,-43.3,-51.9C-31.4,-60.9,-15.7,-69.6,0.4,-69.9C16.5,-70.3,33.1,-62,43.3,-62.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      
      {/* Dynamic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4]/10 to-[#0891b2]/10 animate-gradient-shift"></div>

      {/* Navbar */}
      <nav className="bg-[#ffffff]/95 backdrop-blur-md text-[#1e293b] py-4 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink
            to="/"
            className="text-3xl font-[Pacifico] tracking-wider text-[#06b6d4] hover:text-[#0891b2] transition-colors duration-300"
          >
            Quote Loom
          </NavLink>
          <button
            className="md:hidden text-[#1e293b] hover:text-[#06b6d4] focus:outline-none transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="hidden md:flex space-x-8 items-center">
           
            <NavLink
              to="/login"
              className="flex items-center space-x-2 px-5 py-2.5 border-2 border-[#06b6d4] text-[#06b6d4] rounded-full font-semibold hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              <GoSignIn size={20} />
              <span>Login</span>
            </NavLink>
          </div>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-6">
            <NavLink
              to="/login"
              className="flex items-center justify-center space-x-2 px-5 py-2.5 border-2 border-[#06b6d4] text-[#06b6d4] rounded-full font-semibold hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <GoSignIn size={20} />
              <span>Login</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Main Section */}
      <main className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10">
        <div className="w-full max-w-md bg-[#ffffff]/90 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-8 border border-[#e2e8f0]/50 hover:border-[#06b6d4]/70 transition-all duration-500 animate-form-entry group">
          <form onSubmit={handleSignupSubmit} className="space-y-6">
          <div className="text-center text-3xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#0891b2] bg-clip-text text-transparent flex items-center justify-center gap-2">
  <span className="text-[#06b6d4] hover:text-[#0891b2] hover:scale-110 transition-transform duration-300">
    <FaRegUser className="text-3xl" />
  </span>
  <span className="text-transparent bg-gradient-to-r from-[#06b6d4] to-[#0891b2] bg-clip-text">
    Sign Up
  </span>
</div>


            {/* Name Field */}
            <div className="space-y-2 animate-field-entry animation-delay-100">
              <label
                htmlFor="name"
                className="text-md font-semibold text-[#1e293b]"
              >
                Name
              </label>
              <div className="flex items-center bg-[#e2e8f0]/50 rounded-md px-3 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#06b6d4]">
                <span className="text-lg mr-2 text-[#475569] hover:scale-110 hover:rotate-12 transition-transform duration-200">
                  <FaRegUser />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={signupData.name}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-md text-[#1e293b] placeholder-[#64748b] placeholder-opacity-0 focus:placeholder-opacity-100 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm animate-error-entry">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2 animate-field-entry animation-delay-200">
              <label
                htmlFor="email"
                className="text-md font-semibold text-[#1e293b]"
              >
                Email
              </label>
              <div className="flex items-center bg-[#e2e8f0]/50 rounded-md px-3 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#06b6d4]">
                <span className="text-lg mr-2 text-[#475569] hover:scale-110 hover:rotate-12 transition-transform duration-200">
                  <MdEmail />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-md text-[#1e293b] placeholder-[#64748b] placeholder-opacity-0 focus:placeholder-opacity-100 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm animate-error-entry">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2 animate-field-entry animation-delay-300">
              <label
                htmlFor="password"
                className="text-md font-semibold text-[#1e293b]"
              >
                Password
              </label>
              <div className="flex items-center bg-[#e2e8f0]/50 rounded-md px-3 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#06b6d4]">
                <span className="text-lg mr-2 text-[#475569] hover:scale-110 hover:rotate-12 transition-transform duration-200">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-md text-[#1e293b] placeholder-[#64748b] placeholder-opacity-0 focus:placeholder-opacity-100 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-lg text-[#475569] hover:text-[#06b6d4] hover:scale-110 transition-all duration-200 active:scale-90"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm animate-error-entry">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2 animate-field-entry animation-delay-400">
              <label
                htmlFor="confirmPassword"
                className="text-md font-semibold text-[#1e293b]"
              >
                Confirm Password
              </label>
              <div className="flex items-center bg-[#e2e8f0]/50 rounded-md px-3 py-2 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#06b6d4]">
                <span className="text-lg mr-2 text-[#475569] hover:scale-110 hover:rotate-12 transition-transform duration-200">
                  <FaLock />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none text-md text-[#1e293b] placeholder-[#64748b] placeholder-opacity-0 focus:placeholder-opacity-100 transition-all duration-300"
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer text-lg text-[#475569] hover:text-[#06b6d4] hover:scale-110 transition-all duration-200 active:scale-90"
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm animate-error-entry">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#06b6d4] hover:bg-[#0891b2] text-white font-semibold py-2.5 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-pulse-button relative overflow-hidden group disabled:opacity-50"
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            {/* Or Divider */}
            <div className="flex items-center animate-divider-entry">
              <div className="flex-grow h-px bg-[#e2e8f0] animate-line-grow"></div>
              <span className="px-3 text-[#475569] text-sm font-medium">
                or
              </span>
              <div className="flex-grow h-px bg-[#e2e8f0] animate-line-grow"></div>
            </div>

            {/* Login Link */}
            <div className="text-center text-md font-medium text-[#475569] animate-link-entry">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-[#06b6d4] hover:text-[#0891b2] relative group transition-colors duration-200"
              >
                Login
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#06b6d4] group-hover:w-full transition-all duration-300"></span>
              </NavLink>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
