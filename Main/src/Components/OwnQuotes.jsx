import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaShare, FaHeart, FaPen, FaTrash, FaCopy, FaTimes } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { FiFilter, FiCalendar } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";
import { IoMdAdd } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { HeroParallax } from "../Ui/hero-parallax";
import { BackgroundBeamsWithCollision } from "../Ui/background-beams-with-collision";

const OwnQuotes = () => {
  const [quotes, setQuotes] = useState(() => {
    const saved = localStorage.getItem("own-quotes");
    return saved ? JSON.parse(saved) : [];
  });
  const [newQuote, setNewQuote] = useState("");
  const [context, setContext] = useState("");
  const [type, setType] = useState("motivation");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationQuote, setNotificationQuote] = useState("");

  // Define the quoteDatabase
  const quoteDatabase = {
    motivation: [
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Don't watch the clock; do what it does. Keep going.",
      "The only way to do great work is to love what you do.",
      "Believe you can and you're halfway there.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "The only limit to our realization of tomorrow is our doubts of today.",
    ],
    wisdom: [
      "The only true wisdom is in knowing you know nothing.",
      "Knowledge speaks, but wisdom listens.",
      "Life is really simple, but we insist on making it complicated.",
      "The journey of a thousand miles begins with one step.",
      "The more you know, the more you realize you don't know.",
      "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
      "The only real mistake is the one from which we learn nothing.",
      "The greatest wisdom is in simplicity.",
    ],
    love: [
      "Love is composed of a single soul inhabiting two bodies.",
      "The best thing to hold onto in life is each other.",
      "Where there is love there is life.",
      "Love is not about how many days, months, or years you have been together.",
      "The greatest happiness of life is the conviction that we are loved.",
      "Love doesn't make the world go 'round. Love is what makes the ride worthwhile.",
      "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
      "The best love is the kind that awakens the soul and makes us reach for more.",
    ],
    success: [
      "Success usually comes to those who are too busy to be looking for it.",
      "The road to success is always under construction.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "The secret of success is to do the common things uncommonly well.",
      "Success is not the key to happiness. Happiness is the key to success.",
      "The only place where success comes before work is in the dictionary.",
      "Success is not in what you have, but who you are.",
      "The road to success and the road to failure are almost exactly the same.",
    ],
    life: [
      "Life is what happens while you're busy making other plans.",
      "Life is 10% what happens to you and 90% how you react to it.",
      "Life is either a daring adventure or nothing at all.",
      "Life is really simple, but we insist on making it complicated.",
      "Life is a succession of lessons which must be lived to be understood.",
      "The purpose of our lives is to be happy.",
      "Life is like riding a bicycle. To keep your balance, you must keep moving.",
      "Life is a journey that must be traveled no matter how bad the roads and accommodations.",
    ],
    humor: [
      "I'm not lazy, I'm just conserving energy.",
      "Life is short. Smile while you still have teeth.",
      "The best way to predict the future is to create it.",
      "Don't take life too seriously. You'll never get out of it alive.",
      "I used to think I was indecisive, but now I'm not so sure.",
      "I'm on a seafood diet. I see food and I eat it.",
      "I'm not arguing, I'm just explaining why I'm right.",
      "I'm not saying I'm Batman, I'm just saying nobody has ever seen me and Batman in the same room together.",
    ],
    inspiration: [
      "The only way to do great work is to love what you do.",
      "Your time is limited, don't waste it living someone else's life.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Don't let yesterday take up too much of today.",
      "You are never too old to set another goal or to dream a new dream.",
      "The only limit to our realization of tomorrow is our doubts of today.",
      "Believe you can and you're halfway there.",
      "The best way to predict the future is to create it.",
    ],
    leadership: [
      "A leader is one who knows the way, goes the way, and shows the way.",
      "Leadership is not about being in charge. It's about taking care of those in your charge.",
      "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets people to do the greatest things.",
      "Leadership is the capacity to translate vision into reality.",
      "A good leader takes a little more than his share of the blame, a little less than his share of the credit.",
      "Leadership is not about being in control. It's about creating conditions for others to succeed.",
      "The function of leadership is to produce more leaders, not more followers.",
      "Leadership is the art of getting someone else to do something you want done because he wants to do it.",
    ],
  };

  useEffect(() => {
    localStorage.setItem("own-quotes", JSON.stringify(quotes));
  }, [quotes]);

  const generateAIQuote = async (prompt) => {
    setIsLoading(true);
    try {
      const userPrompt = prompt.toLowerCase();
      let category = "wisdom";
      if (userPrompt.includes("motiv") || userPrompt.includes("inspire")) category = "motivation";
      else if (userPrompt.includes("love") || userPrompt.includes("heart")) category = "love";
      else if (userPrompt.includes("success") || userPrompt.includes("achieve")) category = "success";
      else if (userPrompt.includes("life") || userPrompt.includes("living")) category = "life";
      else if (userPrompt.includes("funny") || userPrompt.includes("humor")) category = "humor";
      else if (userPrompt.includes("inspire")) category = "inspiration";
      else if (userPrompt.includes("leadership")) category = "leadership";

      const quotes = quoteDatabase[category];
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

      setTimeout(() => {
        setAiResponse(randomQuote);
        setNewQuote(randomQuote);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error generating quote:", error);
      setAiResponse("Failed to generate quote. Please try again.");
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuote.trim()) return;

    const quote = {
      id: Date.now(),
      text: newQuote,
      context,
      type,
      likes: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
    };

    setQuotes((prev) => [quote, ...prev]);
    setNewQuote("");
    setContext("");
    setNotificationQuote(newQuote);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleShare = async (quote) => {
    try {
      await navigator.share({
        title: "Check out my quote on Quote Loom!",
        text: quote.text,
        url: window.location.href,
      });
      setQuotes((prev) =>
        prev.map((q) => (q.id === quote.id ? { ...q, shares: q.shares + 1 } : q))
      );
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleLike = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, likes: q.likes + 1 } : q))
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quote?")) {
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Quote copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const sortedQuotes = [...quotes].sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "mostLiked") return b.likes - a.likes;
    if (sortOrder === "alphabetical") return a.text.localeCompare(b.text);
    return 0;
  });

  const filteredQuotes = sortedQuotes.filter((quote) =>
    filterType === "all" ? true : quote.type === filterType
  );

  return (
    <div className="min-h-screen bg-black pb-6 text-white relative">
      <BackgroundBeamsWithCollision className="absolute inset-0 opacity-50" />
      
      <style>
        {`
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes cardSlide {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>

      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-lg w-full px-4">
          <div
            className="bg-black/90 backdrop-blur-md border border-blue-500/30 rounded-lg p-4 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            style={{ animation: "slideDown 0.5s ease-in-out forwards" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-base font-medium">"{notificationQuote}"</p>
                <p className="text-blue-300 text-sm">Quote posted successfully!</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-blue-300 hover:text-white transition-colors duration-300"
              >
                <FaTimes size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-md px-6 py-4 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink
            to="/"
            className="text-4xl font-bold text-white font-[playball] hover:text-blue-300 transition-colors duration-300"
          >
            Quote Loom
          </NavLink>
          <ul className="hidden md:flex items-center gap-14">
            {[
              { to: "/dashboard", icon: FaQuoteLeft, text: "Dashboard" },
              { to: "/quotes", icon: FaQuoteLeft, text: "Create" },
              { to: "/own-quotes", icon: IoMdAdd, text: "Post" },
              { to: "/game", icon: FaGamepad, text: "Game" },
              { to: "/profile", icon: CgProfile, text: "Profile" },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
                      isActive ? "text-blue-300 border-b-2 border-blue-300" : "text-white/70 hover:text-blue-300"
                    }`
                  }
                >
                  <item.icon /> {item.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center py-12 bg-gradient-to-b from-black to-blue-900/10">
        <h1 className="text-6xl flex items-center justify-center gap-4 font-bold text-white mb-4">
          <IoMdAdd className="text-blue-400" />
          <span>Create</span>
        </h1>
        <p className="text-xl text-blue-200/80">Share your thoughts with the world</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mb-20">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Quote Generator */}
          <div className="lg:col-span-1">
            <div className="bg-black/70 backdrop-blur-md rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <h2 className="text-3xl font-bold text-white mb-10">AI Quote Generator</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Enter a keyword..."
                    className="flex-1 p-3 bg-black/50 border border-blue-500/20 text-white rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  />
                  <button
                    onClick={() => generateAIQuote(aiPrompt)}
                    disabled={isLoading}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-600 transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <AiOutlineLoading3Quarters size={16} className="animate-spin" />
                    ) : (
                      <IoSend size={16} />
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(quoteDatabase).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setAiPrompt(category);
                        generateAIQuote(category);
                      }}
                      className="px-3 py-1 bg-black/50 border border-blue-500/20 text-blue-200 text-sm rounded-full hover:bg-blue-500/30 hover:text-white transition-all duration-300 capitalize"
                    >
                      {category}
                    </button>
                  ))}
                </div>
                {aiResponse && (
                  <div className="p-4 bg-black/50 rounded-lg border border-blue-500/30">
                    <p className="text-base text-blue-100 italic">"{aiResponse}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Create Quote Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-black/70 backdrop-blur-md rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <h2 className="text-3xl font-bold text-white mb-10">Craft Your Quote</h2>
              <div className="space-y-4">
                <textarea
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="Write your quote..."
                  className="w-full p-4 bg-black/50 border border-blue-500/20 text-white rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                  rows="3"
                  required
                />
                <input
                  type="text"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add context (optional)"
                  className="w-full p-4 bg-black/50 border border-blue-500/20 text-white rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-4 bg-black/50 border border-blue-500/20 text-white rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                >
                  {Object.keys(quoteDatabase).map((category) => (
                    <option key={category} value={category} className="bg-black">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all duration-300"
                >
                  <FaPen size={16} /> Post Quote
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Quotes Display */}
        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl mb-2 font-bold text-white">Your Quotes</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-all duration-300"
              >
                <FiFilter /> Filters
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-8 p-4 bg-black/70 backdrop-blur-md rounded-lg border border-blue-500/20">
              <div className="flex flex-wrap gap-4">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="p-2 bg-black/50 border border-blue-500/20 text-white rounded-lg"
                >
                  <option value="all">All Types</option>
                  {Object.keys(quoteDatabase).map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="p-2 bg-black/50 border border-blue-500/20 text-white rounded-lg"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="mostLiked">Most Liked</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          )}

          {filteredQuotes.length === 0 ? (
            <div className="text-center py-12 text-blue-200/70">
              <p className="text-xl">No quotes yet. Create your first quote above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-black/70 backdrop-blur-md rounded-lg p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                  style={{ animation: "cardSlide 0.5s ease-in-out forwards" }}
                >
                  <p className="text-blue-100 font-semibold italic mb-4">"{quote.text}"</p>
                  <p className="text-blue-200/70 font-semibold text-sm mb-4">
                    - {quote.context || "Anonymous"}
                  </p>
                  <p className="text-blue-200/50 font-medium  text-xs mb-4">
                    {new Date(quote.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between gap-5 items-center">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleLike(quote.id)}
                        className="flex items-center gap-1 text-blue-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        <FaHeart /> {quote.likes}
                      </button>
                      <button
                        onClick={() => handleShare(quote)}
                        className="flex items-center gap-1 text-blue-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        <FaShare /> {quote.shares}
                      </button>
                      <button
                        onClick={() => handleCopy(quote.text)}
                        className="text-blue-300 hover:text-blue-400 transition-colors duration-300"
                      >
                        <FaCopy />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(quote.id)}
                      className="text-red-400 hover:text-red-500 transition-colors duration-300"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* HeroParallax Section */}
        {filteredQuotes.length > 0 && (
          <section className="mt-20">
            <HeroParallax
              products={filteredQuotes.map((quote) => ({
                title: quote.type.charAt(0).toUpperCase() + quote.type.slice(1),
                link: "#",
                thumbnail: (
                  <div className="group relative h-full w-full overflow-hidden rounded-xl border border-blue-500/20 bg-black/70 backdrop-blur-md">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative h-full p-8 flex flex-col justify-between">
                      <div className="text-2xl text-white font-medium mb-4">
                        "{quote.text}"
                      </div>
                      <div className="text-blue-300 text-sm">
                        - {quote.context || "Anonymous"}
                      </div>
                      <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => handleLike(quote.id)}
                          className="p-2 bg-blue-500/30 rounded-full hover:bg-blue-500/50"
                        >
                          <FaHeart className="text-white" />
                        </button>
                        <button
                          onClick={() => handleShare(quote)}
                          className="p-2 bg-blue-500/30 rounded-full hover:bg-blue-500/50"
                        >
                          <FaShare className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default OwnQuotes;