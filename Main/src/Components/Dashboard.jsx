import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaShare, FaCopy, FaCheck, FaRandom, FaBookmark, FaRegBookmark,
  FaFacebook, FaTwitter, FaWhatsapp
} from 'react-icons/fa';
import { AiOutlineLike, AiOutlineHistory } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { FaImages, FaQuoteLeft, FaGamepad } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FollowerPointerCard } from "../Ui/following-pointer";
import { GoogleGeminiEffect } from "../Ui/gemini-effect";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [quote, setQuote] = useState(null);
  const [translatedQuote, setTranslatedQuote] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState([]);
  const [userStats, setUserStats] = useState({
    quotesSaved: 0,
    totalLikes: 0,
    totalShares: 0,
  });
  const [quoteHistory, setQuoteHistory] = useState([]);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [likedQuotes, setLikedQuotes] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState([0, 0, 0, 0, 0]);

  // Mock translation function (replace with real API in production)
  const translateQuote = async (text, targetLang) => {
    try {
      // Mock response (simulating API call)
      // In production, use: await axios.post('https://translation-api.example.com', { text, target: targetLang })
      const translations = {
        es: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.",
        fr: "La vie est ce qui arrive pendant que vous êtes occupé à faire d'autres plans.",
        de: "Das Leben ist das, was passiert, während du damit beschäftigt bist, andere Pläne zu machen.",
        hi: "जीवन वही है जो तब होता है जब आप अन्य योजनाएँ बनाने में व्यस्त होते हैं।",
      };
      if (targetLang === "en") return text;
      return translations[targetLang] || text; // Fallback to original if translation unavailable
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original on error
    }
  };

  const fetchNewQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': 'DI5rFzjCxnDIL659YPa8Hg==y2TmKYXSz9YVCoi6',
        },
      });
      if (response.data && response.data.length > 0) {
        const newQuote = response.data[0];
        setQuote(newQuote);
        setTranslatedQuote(newQuote.quote);
        setQuoteHistory((prev) => [newQuote, ...prev].slice(0, 5));
        setSelectedLanguage("en"); // Reset to English
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const progress = scrollY / (documentHeight - windowHeight);
      setScrollProgress([
        Math.min(progress * 1.5, 1),
        Math.min(progress * 1.2, 1),
        Math.min(progress * 0.9, 1),
        Math.min(progress * 0.6, 1),
        Math.min(progress * 0.3, 1),
      ]);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (quote && selectedLanguage !== "en") {
      translateQuote(quote.quote, selectedLanguage).then((translated) => {
        setTranslatedQuote(translated);
      });
    } else if (quote) {
      setTranslatedQuote(quote.quote);
    }
  }, [selectedLanguage, quote]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${translatedQuote}" - ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this quote!',
          text: `"${translatedQuote}" - ${quote.author}`,
          url: window.location.href,
        });
        setUserStats((prev) => ({
          ...prev,
          totalShares: prev.totalShares + 1,
        }));
      } catch (err) {
        console.error('Failed to share: ', err);
      }
    } else {
      setShowShareOptions(true); // Fallback to manual share options
    }
  };

  const handleSaveQuote = () => {
    if (!quote) return;
    const isAlreadySaved = savedQuotes.some((q) => q.quote === quote.quote);
    if (!isAlreadySaved) {
      setSavedQuotes((prev) => [...prev, { ...quote, savedAt: new Date(), translatedQuote }]);
      setUserStats((prev) => ({
        ...prev,
        quotesSaved: prev.quotesSaved + 1,
      }));
    }
  };

  const handleLike = () => {
    if (!quote) return;
    const isCurrentlyLiked = likedQuotes.has(quote.quote);
    const newLikedQuotes = new Set(likedQuotes);
    if (isCurrentlyLiked) {
      newLikedQuotes.delete(quote.quote);
      setUserStats((prev) => ({
        ...prev,
        totalLikes: prev.totalLikes - 1,
      }));
    } else {
      newLikedQuotes.add(quote.quote);
      setUserStats((prev) => ({
        ...prev,
        totalLikes: prev.totalLikes + 1,
      }));
    }
    setLikedQuotes(newLikedQuotes);
    setLiked(!isCurrentlyLiked);
  };

  useEffect(() => {
    if (quote) {
      setLiked(likedQuotes.has(quote.quote));
    }
  }, [quote, likedQuotes]);

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins']">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md px-6 py-4 shadow-[0_2px_4px_rgba(0,183,235,0.1)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink
            to="/"
            className="text-4xl font-bold text-white font-[playball] hover:text-[#00B7EB] transition-colors duration-300"
          >
            Quote Loom
          </NavLink>
          <ul className="hidden md:flex items-center gap-14">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
                    isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                  }`
                }
              >
                <FaQuoteLeft /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/quotes"
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
                    isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                  }`
                }
              >
                <FaImages /> Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/own-quotes"
                className={({ isActive }) =>
                  `text-xl font-semibold transition-colors flex items-center gap-2 duration-300 ${
                    isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                  }`
                }
              >
                <IoMdAdd /> Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/game"
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
                    isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                  }`
                }
              >
                <FaGamepad /> Game
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
                    isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                  }`
                }
              >
                <CgProfile /> Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Gemini Effect Background */}
      

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quote Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/80 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,183,235,0.1)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Daily Inspiration</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchNewQuote}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white hover:bg-white/10 transition-all duration-300 text-md font-semibold"
                >
                  <FaRandom className="text-white" /> New Quote
                </motion.button>
              </div>

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4"
              >
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-2 bg-black/50 border border-[#00B7EB]/30 text-white rounded-lg focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/50 transition-all duration-300"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
              </motion.div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="h-6 bg-white/10 rounded w-2/3"></div>
                  <div className="h-4 bg-white/10 rounded w-1/4 mt-4"></div>
                </div>
              ) : quote && (
                <FollowerPointerCard title={quote.author} className="cursor-none">
                  <motion.div
                    key={selectedLanguage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-l-4 border-white/20 pl-4 mb-6"
                  >
                    <p className="text-2xl font-serif font-bold italic mb-3 text-white leading-relaxed">
                      "{translatedQuote}"
                    </p>
                    <p className="text-lg font-semibold text-white/60">- {quote.author}</p>
                  </motion.div>
                </FollowerPointerCard>
              )}

              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-md font-semibold transition-all duration-300 ${
                    copied
                      ? 'bg-white/10 text-white'
                      : 'bg-black/50 border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {copied ? (
                    <>
                      <FaCheck size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy size={12} /> Copy
                    </>
                  )}
                </motion.button>
                <motion.button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/50 border border-white/20 text-white hover:bg-white/10 text-md font-semibold transition-all duration-300"
                >
                  <FaShare size={12} /> Share
                </motion.button>
                <motion.button
                  onClick={handleLike}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-md font-semibold transition-all duration-300 ${
                    liked
                      ? 'bg-white/10 text-white'
                      : 'bg-black/50 border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  <AiOutlineLike size={14} className={liked ? 'animate-pulse' : ''} />
                  {liked ? 'Liked' : 'Like'}
                </motion.button>
                <motion.button
                  onClick={handleSaveQuote}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-md font-semibold transition-all duration-300 ${
                    savedQuotes.some((q) => q.quote === quote?.quote)
                      ? 'bg-white/10 text-white'
                      : 'bg-black/50 border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {savedQuotes.some((q) => q.quote === quote?.quote) ? (
                    <FaBookmark size={12} />
                  ) : (
                    <FaRegBookmark size={12} />
                  )}{' '}
                  Save
                </motion.button>
              </div>

              {/* Share Options Dropdown */}
              <AnimatePresence>
                {showShareOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-4 bg-black/50 rounded-lg border border-[#00B7EB]/30"
                  >
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          window.open(
                            `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                            '_blank'
                          )
                        }
                        className="p-2 bg-black/50 border border-[#00B7EB]/30 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        <FaFacebook size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                              `"${translatedQuote}" - ${quote.author}`
                            )}`,
                            '_blank'
                          )
                        }
                        className="p-2 bg-black/50 border border-[#00B7EB]/30 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        <FaTwitter size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(`"${translatedQuote}" - ${quote.author}`)}`,
                            '_blank'
                          )
                        }
                        className="p-2 bg-black/50 border border-[#00B7EB]/30 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        <FaWhatsapp size={16} />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Stats Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/80 backdrop-blur-md p-8 rounded-lg max-w-4xl mx-auto border border-white/10 shadow-[0_0_20px_rgba(0,183,235,0.1)]"
            >
              <h3 className="text-3xl font-bold text-white text-center mb-8">Activity Overview</h3>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                {[
                  { icon: <FaBookmark size={20} />, stat: userStats.quotesSaved, label: "Saved Quotes" },
                  { icon: <AiOutlineLike size={20} />, stat: userStats.totalLikes, label: "Total Likes" },
                  { icon: <FaShare size={20} />, stat: userStats.totalShares, label: "Shares" },
                ].map((item, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex-1 p-6 bg-black/50 rounded-lg border border-white/10 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-white/10">
                        {React.cloneElement(item.icon, { className: "text-white" })}
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-white">{item.stat}</p>
                        <p className="text-sm text-white/60">{item.label}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Quotes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,183,235,0.1)]"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <AiOutlineHistory size={22} className="text-white" /> Recent Quotes
              </h3>
              <div className="space-y-3">
                {quoteHistory.slice(1).map((historyQuote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <p className="text-sm italic font-semibold text-white line-clamp-2">
                      "{historyQuote.quote}"
                    </p>
                    <p className="text-xs font-medium text-white/60 mt-1">
                      - {historyQuote.author}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Saved Quotes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/80 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(0,183,235,0.1)]"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <FaBookmark className="text-white" size={18} /> Saved Quotes
              </h3>
              <div className="space-y-3">
                {savedQuotes.slice(-3).map((savedQuote, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg bg-black/50 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <p className="text-sm italic font-semibold text-white line-clamp-2">
                      "{savedQuote.translatedQuote || savedQuote.quote}"
                    </p>
                    <p className="text-xs font-medium text-white/60 mt-1">
                      - {savedQuote.author}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;