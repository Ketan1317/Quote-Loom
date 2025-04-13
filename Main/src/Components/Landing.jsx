import React, { useState, useEffect } from "react";
import { CiLogin, CiShare2 } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";
import { LuCopy, LuCopyCheck, LuMessageSquareMore } from "react-icons/lu";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { MdOutlineSocialDistance } from "react-icons/md";
import { FaQuoteLeft, FaQuoteRight, FaUserShield, FaGamepad } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Landing = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentText, setCurrentText] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const text = [
    "Where inspiration meets code—one quote at a time.",
    "Refresh your mind. Reload your motivation.",
    "Unleash your creativity with every quote.",
  ];

  const features = [
    {
      icon: <IoIosCreate className="text-3xl text-[#06b6d4]" />,
      title: "Create & Curate",
      description: "Design and save quotes that reflect your voice. Make inspiration personal.",
    },
    {
      icon: <MdOutlineSocialDistance className="text-3xl text-[#06b6d4]" />,
      title: "Distraction-Free UI",
      description: "A calm, clutter-free interface that keeps you focused on what matters.",
    },
    {
      icon: <FaQuoteLeft className="text-3xl text-[#06b6d4]" />,
      title: "Endless Inspiration",
      description: "Tap into a library of impactful quotes from every corner of thought.",
    },
    {
      icon: <LuMessageSquareMore className="text-3xl text-[#06b6d4]" />,
      title: "Instant Sharing",
      description: "Copy or share quotes effortlessly across your favorite platforms.",
    },
    {
      icon: <FaUserShield className="text-3xl text-[#06b6d4]" />,
      title: "User Privacy",
      description: "We respect your space—no sign-ups, no data tracking, just good vibes.",
    },
    {
      icon: <FaGamepad className="text-3xl text-[#06b6d4]" />,
      title: "Gamified Fun",
      description: "Earn likes, collect badges, and make your quote journey more rewarding.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % text.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [text.length]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text[currentText]);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Quote Loom",
      text: text[currentText],
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else alert("Browser doesn't support native sharing. Try copying instead!");
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  const handleLike = () => setIsLiked(!isLiked);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f5f9] to-[#e2e8f0] text-[#1e293b] font-sans">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-70 left-10 w-64 h-64 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill="#06b6d4"
            d="M37.5,-49.6C46.1,-40.8,46.7,-20.4,50.3,1.7C53.9,23.9,60.4,47.7,51.3,56.7C42.2,65.7,17.6,59.9,-3.7,58.4C-25,56.8,-50.1,59.4,-60.4,49.5C-70.6,39.7,-65.9,17.3,-58.6,-3.2C-51.3,-23.8,-41.5,-42.6,-28.9,-50.9C-16.2,-59.1,-0.6,-56.8,18,-56.2C36.5,-55.6,54.1,-56.5,37.5,-49.6Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg
          className="absolute top-20 right-20 w-80 h-80 opacity-25"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
        >
          <path
            fill="#0891b2"
            d="M47.1,-60.9C58.3,-50.4,60.3,-29.1,59.2,-11.8C58.1,5.5,54,19.8,45.9,27.8C37.7,35.8,25.6,37.5,13.4,44.2C1.1,50.9,-11.3,62.6,-25.2,65.7C-39.1,68.8,-54.5,63.4,-65.6,52.4C-76.7,41.4,-83.6,24.9,-80.4,9.5C-77.2,-6,-63.9,-20.3,-51.4,-31.4C-39,-42.5,-27.3,-50.4,-13.7,-55.4C0,-60.5,17.4,-62.6,30,-56.7C42.6,-50.8,50.5,-36.9,47.1,-60.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      {/* Navbar */}
      <nav className="bg-[#ffffff]/95 backdrop-blur-md text-[#1e293b] py-4 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-3xl font-[Pacifico] tracking-wider text-[#06b6d4] hover:text-[#0891b2] transition-colors duration-300">
            Quote Loom
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-[#1e293b] hover:text-[#06b6d4] focus:outline-none transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
           
            <Link
              to="/signup"
              className="flex items-center space-x-2 px-5 py-2.5 bg-[#06b6d4] text-white rounded-full font-semibold hover:bg-[#0891b2] transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              <GoSignIn size={20} />
              <span>Sign Up</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 px-5 py-2.5 border-2 border-[#06b6d4] text-[#06b6d4] rounded-full font-semibold hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            >
              <CiLogin size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-6">
            {["Home", "Quotes", "Create", "Profile"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-lg font-medium text-center hover:text-[#06b6d4] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              to="/signup"
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#06b6d4] text-white rounded-full font-semibold hover:bg-[#0891b2] transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <GoSignIn size={20} />
              <span>Sign Up</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 px-5 py-2.5 border-2 border-[#06b6d4] text-[#06b6d4] rounded-full font-semibold hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              <CiLogin size={20} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative min-h-[90vh] max-w-7xl mx-auto py-20 px-6 overflow-hidden">
        <FaQuoteLeft className="absolute top-12 left-0 text-[100px] text-[#06b6d4]/10 animate-[float_6s_ease-in-out_infinite] pointer-events-none hidden md:block" />
        <FaQuoteRight className="absolute bottom-12 right-0 text-[100px] text-[#06b6d4]/10 animate-[float_6s_ease-in-out_infinite_2s] pointer-events-none hidden md:block" />

        <div className="text-center">
          <h1 className="head text-4xl md:text-5xl  font-extrabold text-[#1e293b] animate-[fadeIn_1s_ease-out]">
            Welcome to Quote Loom
          </h1>

          {/* Rotating Quotes */}
          <div className="relative h-24 md:h-28 mt-14 overflow-hidden bg-transparent backdrop-blur-sm rounded-xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] animate-[slideUp_0.8s_ease-out] border border-[#06b6d4]/20 hover:border-[#06b6d4]/50 transition-colors duration-500">
            {text.map((quote, index) => (
              <p
                key={index}
                className={`absolute inset-0 w-full mt-9 text-base sm:text-xl md:text-2xl font-medium text-[#1e293b] transition-all duration-1000 ease-in-out ${
                  currentText === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {quote}
              </p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-5 mt-6 animate-[fadeIn_1.2s_ease-out]">
            <button
              onClick={handleLike}
              className="p-4 bg-[#ffffff] rounded-full text-[#06b6d4] hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              aria-label={isLiked ? "Unlike quote" : "Like quote"}
            >
              {isLiked ? <AiFillLike size={26} /> : <AiOutlineLike size={26} />}
            </button>
            <button
              onClick={handleCopy}
              className="p-4 bg-[#ffffff] rounded-full text-[#06b6d4] hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              aria-label="Copy quote"
            >
              {isCopied ? <LuCopyCheck size={26} /> : <LuCopy size={26} />}
            </button>
            <button
              onClick={handleShare}
              className="p-4 bg-[#ffffff] rounded-full text-[#06b6d4] hover:bg-[#06b6d4] hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              aria-label="Share quote"
            >
              <CiShare2 size={26} />
            </button>
          </div>

          {/* Scrolling Info Text */}
          <div className="w-full mt-14 overflow-hidden">
            <div className="flex gap-20 text-[#475569] text-base md:text-lg font-medium animate-[scrollLeft_20s_linear_infinite]">
              <p>Inspire your day with curated wisdom—one quote at a time.</p>
              <p>Explore creativity and clarity with every refresh.</p>
              <p>Let words spark motivation and drive change.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#1e293b] mb-12 animate-[fadeIn_1s_ease-out]">
          What Makes Quote Loom Unique
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-[#ffffff] rounded-2xl p-6 border border-[#06b6d4] hover:shadow-[0_4px_20px_rgba(6,182,212,0.2)] transition-all duration-500 transform hover:-translate-y-2 animate-[slideUp_0.8s_ease-out] animate-delay-[${index * 100}ms]"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-full bg-[#e2e8f0] text-[#06b6d4] transform hover:scale-110 transition-transform duration-300 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1e293b]">{item.title}</h3>
              </div>
              <p className="text-[#475569] font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#f8fafc] to-[#e2e8f0] text-[#1e293b] py-12 px-6 border-t border-[#e2e8f0] animate-[fadeIn_1s_ease-out]">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
          {/* Branding and Description */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-[Pacifico] text-[#06b6d4] hover:text-[#0891b2] transition-colors duration-300">
              Quote Loom
            </h2>
            <p className="text-sm font-medium text-[#475569] max-w-md leading-relaxed">
              Discover a world of inspiration through carefully curated quotes. Spark creativity and find motivation with every visit.
            </p>
          </div>

          {/* Social Icons (Centered) */}
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { Icon: FaGithub, href: "#" },
              { Icon: FaLinkedin, href: "#" },
              { Icon: FaTwitter, href: "#" },
              { Icon: FaDiscord, href: "#" },
              { Icon: FaFacebook, href: "#" },
              { Icon: FaInstagram, href: "#" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="text-[#475569] hover:text-[#06b6d4] text-3xl transform hover:scale-125 transition-all duration-300 hover:shadow-[0_0_8px_rgba(6,182,212,0.3)]"
                aria-label={`Visit our ${href}`}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm font-medium text-[#64748b]">
            © {new Date().getFullYear()} Quote Loom. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;