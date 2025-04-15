import React, { useState, useEffect } from "react";
import { CiLogin, CiShare2 } from "react-icons/ci";
import { GoSignIn } from "react-icons/go";
import { LuCopy, LuCopyCheck, LuMessageSquareMore } from "react-icons/lu";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { FaQuoteLeft, FaQuoteRight, FaUserShield, FaGamepad, FaBars, FaTimes } from "react-icons/fa";
import { BsChatLeftQuoteFill } from "react-icons/bs";
import { SiGameloft } from "react-icons/si";
import { TiSocialLastFm } from "react-icons/ti";
import { SlSocialSkype } from "react-icons/sl";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import FloatingDock from "../Ui/FloatingDock";
import { HeroParallax } from "../Ui/hero-parallax";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "../Ui/text-generate";

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
      icon: <IoIosCreate />,
      title: "Create & Curate",
      description: "Design and save quotes that reflect your voice. Make inspiration personal.",
    },
    {
      icon: <FaBars />,
      title: "Distraction-Free UI",
      description: "A calm, clutter-free interface that keeps you focused on what matters.",
    },
    {
      icon: <FaQuoteLeft />,
      title: "Endless Inspiration",
      description: "Tap into a library of impactful quotes from every corner of thought.",
    },
    {
      icon: <LuMessageSquareMore />,
      title: "Instant Sharing",
      description: "Copy or share quotes effortlessly across your favorite platforms.",
    },
    {
      icon: <FaUserShield />,
      title: "User Privacy",
      description: "We respect your space—no sign-ups, no data tracking, just good vibes.",
    },
    {
      icon: <FaGamepad />,
      title: "Gamified Fun",
      description: "Earn likes, collect badges, and make your quote journey more rewarding.",
    },
  ];

  const sampleQuotes = [
    {
      id: 1,
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs"
    },
    {
      id: 2,
      text: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs"
    },
    {
      id: 3,
      text: "Your time is limited, don't waste it living someone else's life.",
      author: "Steve Jobs"
    },
    {
      id: 4,
      text: "Stay hungry, stay foolish.",
      author: "Steve Jobs"
    },
    {
      id: 5,
      text: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs"
    },
    {
      id: 6,
      text: "The people who are crazy enough to think they can change the world are the ones who do.",
      author: "Steve Jobs"
    },
    {
      id: 7,
      text: "Quality is more important than quantity. One home run is much better than two doubles.",
      author: "Steve Jobs"
    },
    {
      id: 8,
      text: "Be a yardstick of quality. Some people aren't used to an environment where excellence is expected.",
      author: "Steve Jobs"
    },
    {
      id: 9,
      text: "I'm convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.",
      author: "Steve Jobs"
    },
    {
      id: 10,
      text: "Sometimes when you innovate, you make mistakes. It is best to admit them quickly, and get on with improving your other innovations.",
      author: "Steve Jobs"
    },
    {
      id: 11,
      text: "My favorite things in life don't cost any money. It's really clear that the most precious resource we all have is time.",
      author: "Steve Jobs"
    },
    {
      id: 12,
      text: "I think if you do something and it turns out pretty good, then you should go do something else wonderful, not dwell on it for too long. Just figure out what's next.",
      author: "Steve Jobs"
    },
    {
      id: 13,
      text: "Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose.",
      author: "Steve Jobs"
    },
    {
      id: 14,
      text: "Have the courage to follow your heart and intuition. They somehow already know what you truly want to become.",
      author: "Steve Jobs"
    },
    {
      id: 15,
      text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      author: "Steve Jobs"
    }
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
    <div className="min-h-screen bg-black text-white font-['Poppins']">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black backdrop-blur-md px-8 py-4">
        <style>
          {`
            @keyframes navSlide {
              0% { opacity: 0; transform: translateY(-20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        <div
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{ animation: "navSlide 0.6s ease-in-out forwards" }}
        >
          <Link
            to="/"
            className="text-4xl font-bold text-white font-[playball] tracking-tight  transition-colors duration-300 hover:text-[#00B7EB]"
          >
            Quote Loom
          </Link>
          <button
            className="md:hidden text-white focus:outline-none transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="hidden md:flex space-x-8 items-center">
  <Link
    to="/signup"
    className="px-4 py-3 bg-white text-black rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-gray-200"
  >
    Sign Up
  </Link>
  <Link
    to="/login"
    className="px-4 py-3 border border-gray-400 text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-gray-800 hover:text-white"
  >
    Login
  </Link>
</div>
        </div>
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 pb-6">
           
            <Link
              to="/signup"
              className="px-6 py-3 bg-[#00B7EB] text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-[#00A3D6]"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-[#00B7EB] text-white rounded-lg font-semibold text-lg transition-colors duration-300 hover:bg-[#00B7EB] hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto py-16 px-6 text-center relative z-10" role="main">
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); opacity: 0.2; }
              50% { transform: translateY(-15px); opacity: 0.3; }
            }
            @keyframes heroTitleSlide {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes heroSubtitleSlide {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes textGlow {
              0%, 100% { text-shadow: 0 0 2px rgba(0, 183, 235, 0.3), 0 0 5px rgba(0, 183, 235, 0.2); }
              50% { text-shadow: 0 0 5px rgba(0, 183, 235, 0.5), 0 0 10px rgba(0, 183, 235, 0.3); }
            }
          `}
        </style>
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          {[
            { Icon: FaGamepad, top: "10%", left: "10%", size: 56, delay: 0 },
            { Icon: BsChatLeftQuoteFill, top: "25%", left: "85%", size: 42, delay: 1 },
            { Icon: SiGameloft, top: "45%", left: "20%", size: 48, delay: 2 },
            { Icon: TiSocialLastFm, top: "15%", left: "65%", size: 50, delay: 3 },
            { Icon: SlSocialSkype, top: "60%", left: "35%", size: 44, delay: 4 },
            { Icon: FaGamepad, top: "35%", left: "90%", size: 42, delay: 5 },
            { Icon: BsChatLeftQuoteFill, top: "70%", left: "15%", size: 40, delay: 6 },
          ].map(({ Icon, top, left, size, delay }, index) => (
            <Icon
              key={index}
              className="absolute"
              style={{
                top,
                left,
                fontSize: `${size}px`,
                color: "#00B7EB",
                opacity: 0.2,
                animation: `float 4s ease-in-out ${delay}s infinite`,
                pointerEvents: "none",
              }}
            />
          ))}
        </div>
        <div className="relative mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-4xl md:text-7xl mt-18 font-bold text-white mb-4"
            style={{
              animation: "textGlow 3s ease-in-out infinite",
              background: "linear-gradient(to right, #FFFFFF, #E0F7FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Inspire...Create...Share.
          </motion.h1>
          <TextGenerateEffect
            words="Discover, create, and share quotes that spark creativity and drive motivation."
            className="text-center max-w-2xl mx-auto"
            duration={0.8}
          />
        </div>
        <div
          className="bg-black/80 backdrop-blur-md rounded-lg p-6 mb-8 border border-[#00B7EB]/30 max-w-3xl mx-auto relative"
          style={{ animation: "quoteSlide 0.6s ease-in-out 0.4s forwards", opacity: 0 }}
        >
          <FaQuoteLeft className="absolute top-4 left-4 text-[#00B7EB]/50 text-3xl" />
          <FaQuoteRight className="absolute bottom-4 right-4 text-[#00B7EB]/50 text-3xl" />
          <div className="relative h-16 md:h-20">
            {text.map((quote, index) => (
              <p
                key={index}
                className={`absolute w-full mt-7 text-lg md:text-xl font-medium text-white transition-all duration-800 ease-in-out ${
                  currentText === index
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8"
                }`}
              >
                {quote}
              </p>
            ))}
          </div>
          <div className="text-base text-white/70 mt-4">
            {currentText + 1} of {text.length}
          </div>
        </div>
        <div className="flex justify-center -mt-44 space-x-4 mb-8">
          <button
            onClick={handleLike}
            className="p-3 bg-black/80 border border-[#00B7EB]/30 rounded-lg text-white transition-colors duration-300 hover:bg-[#00B7EB] hover:text-black"
            aria-label={isLiked ? "Unlike quote" : "Like quote"}
          >
            {isLiked ? <AiFillLike size={24} /> : <AiOutlineLike size={24} />}
          </button>
          <button
            onClick={handleCopy}
            className="p-3 bg-black/80 border border-[#00B7EB]/30 rounded-lg text-white transition-colors duration-300 hover:bg-[#00B7EB] hover:text-black"
            aria-label="Copy quote"
          >
            {isCopied ? <LuCopyCheck size={24} /> : <LuCopy size={24} />}
          </button>
          <button
            onClick={handleShare}
            className="p-3 bg-black/80 border border-[#00B7EB]/30 rounded-lg text-white transition-colors duration-300 hover:bg-[#00B7EB] hover:text-black"
            aria-label="Share quote"
          >
            <CiShare2 size={24} />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
          className="flex justify-center -mt-32 mb-16"
        >
          <Link
            to="/signup"
            className="px-8 py-4 bg-gray-800 mt-44 text-white border-2 border-[#00B7EB]/40 rounded-lg font-semibold text-xl transition-all duration-300 hover:bg-gray-900 hover:scale-105 hover:shadow-lg hover:shadow-[#00B7EB]/20"
          >
            Start Your Journey
          </Link>
        </motion.div>
        
      </main>

      {/* Parallax Quotes Section */}
      <section className="relative overflow-hidden -mt-40 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/100 pointer-events-none" />
        <HeroParallax quotes={sampleQuotes} />
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto py-16 px-6" role="region" aria-labelledby="features-heading">
        <style>
          {`
            @keyframes featureTitleSlide {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes cardSlide {
              0% { opacity: 0; transform: translateX(-20px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            @keyframes iconPulse {
              0%, 100% { opacity: 0.8; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.05); }
            }
          `}
        </style>
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          style={{ animation: "featureTitleSlide 0.6s ease-in-out forwards" }}
        >
          Why Choose Quote Loom
        </h2>
        <div className="flex flex-col items-center gap-6 w-full max-w-7xl mx-auto">
          {features.map((item, index) => (
            <div
              key={index}
              className="w-[90vw] min-h-[24vh] bg-black/80 backdrop-blur-md rounded-lg p-6 flex flex-row gap-12 items-center border border-[#00B7EB]/30 transition-colors duration-300 hover:bg-black/90"
              style={{
                animation: `cardSlide 0.8s ease-in-out ${0.2 + index * 0.2}s forwards`,
                opacity: 0,
              }}
            >
              <div className="w-20 flex-shrink-0 flex items-center justify-center">
                <div
                  className="p-3"
                  style={{
                    animation: `iconPulse 2s ease-in-out ${index * 0.2}s infinite`,
                  }}
                >
                  {React.cloneElement(item.icon, {
                    className: "text-7xl text-[#00B7EB]/80",
                  })}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xl font-semibold text-white/80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 backdrop-blur-md py-8 px-6 border-t border-[#00B7EB]/20 relative">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              Quote Loom
            </h2>
            <p className="text-base text-white/80 max-w-md">
              Discover a world of inspiration through curated quotes. Spark creativity and find motivation daily.
            </p>
          </div>
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
                className="text-white/80 hover:text-[#00B7EB] transition-colors duration-300 text-2xl"
                aria-label={`Visit our ${href} page`}
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="text-sm text-white/80">
            © {new Date().getFullYear()} Quote Loom. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;