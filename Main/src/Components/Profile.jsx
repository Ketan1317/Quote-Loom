import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  RiUserLine,
  RiBookmarkLine,
  RiHeartLine,
  RiPencilLine,
  RiUserFollowLine,
  RiShareForwardLine,
  RiEditLine,
  RiCameraLine,
  RiCloseLine,
  RiQuillPenLine,
  RiThumbUpLine,
  RiBookmarkFill,
} from "react-icons/ri";
import { FaImages, FaQuoteLeft, FaGamepad } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { FollowerPointerCard } from "../Ui/following-pointer";
import { GoogleGeminiEffect } from "../Ui/gemini-effect";
import { TextGenerateEffect } from "../Ui/text-generate";

const EditProfileModal = ({ profile, setProfile, setShowEdit, handleEditSubmit }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 px-4"
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      className="bg-black/95 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md border border-[#00B7EB]/20 shadow-[0_0_20px_rgba(0,183,235,0.2)]"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowEdit(false)}
          className="text-[#00B7EB] hover:text-[#00A3D6] transition-colors duration-300"
        >
          <RiCloseLine size={24} />
        </motion.button>
      </div>
      <form onSubmit={handleEditSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-4 py-3 bg-black/60 text-white rounded-lg border border-[#00B7EB]/30 focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/50 transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            className="w-full px-4 py-3 bg-black/60 text-white rounded-lg border border-[#00B7EB]/30 focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/50 transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-black/60 text-white rounded-lg border border-[#00B7EB]/30 focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/50 transition-all duration-300 resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            className="w-full px-4 py-3 bg-black/60 text-white rounded-lg border border-[#00B7EB]/30 focus:border-[#00B7EB] focus:ring-2 focus:ring-[#00B7EB]/50 transition-all duration-300"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#00B7EB] text-black py-3 rounded-lg text-lg font-semibold hover:bg-[#00A3D6] transition-all duration-300"
        >
          Save Changes
        </motion.button>
      </form>
    </motion.div>
  </motion.div>
);

const AvatarSection = ({ avatarImage, handleAvatarClick, handleAvatarChange, fileInputRef }) => (
  <motion.div
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    className="relative group"
  >
    <FollowerPointerCard title="Change Avatar" className="cursor-pointer">
      <motion.div
        whileHover={{ rotate: 5 }}
        className="w-32 h-32 rounded-full bg-gradient-to-r from-[#00B7EB] to-[#00A3D6] p-1 cursor-pointer"
        onClick={handleAvatarClick}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-black/80 relative">
          {avatarImage ? (
            <img
              src={avatarImage}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <RiUserLine className="w-full h-full p-8 text-gray-500" />
          )}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <RiCameraLine className="text-white" size={28} />
          </div>
        </div>
      </motion.div>
    </FollowerPointerCard>
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleAvatarChange}
      accept="image/*"
      className="hidden"
    />
  </motion.div>
);

const QuoteCard = ({ quote, handleLike, handleSave, handleShare }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-black/70 backdrop-blur-md rounded-xl p-6 border border-[#00B7EB]/20 hover:border-[#00B7EB]/40 transition-all duration-300 shadow-[0_0_10px_rgba(0,183,235,0.1)]"
  >
    <TextGenerateEffect words={quote.quote} className="text-lg font-medium text-white mb-3 italic" />
    <p className="text-gray-400 text-sm font-semibold">- {quote.author}</p>
    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#00B7EB]/10">
      <div className="flex gap-6">
        <motion.button
          onClick={() => handleLike(quote.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 text-sm ${quote.isLiked ? "text-[#00B7EB]" : "text-gray-400"} hover:text-[#00B7EB] transition-colors duration-300`}
        >
          <RiHeartLine size={20} />
          <span>{quote.likes}</span>
        </motion.button>
        <motion.button
          onClick={() => handleSave(quote.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center gap-2 text-sm ${quote.isSaved ? "text-[#00B7EB]" : "text-gray-400"} hover:text-[#00B7EB] transition-colors duration-300`}
        >
          <RiBookmarkLine size={20} />
          <span>{quote.saves}</span>
        </motion.button>
      </div>
      <motion.button
        onClick={() => handleShare(quote)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-400 hover:text-[#00B7EB] transition-colors duration-300"
      >
        <RiShareForwardLine size={22} />
      </motion.button>
    </div>
  </motion.div>
);

const Profile = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [avatarImage, setAvatarImage] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "Ketan Goyal",
    username: "__Ketan__Goyal__1317",
    bio: "Passionate about inspiring quotes and meaningful words",
    email: "goyalketan1317@gmail.com",
  });

  const [collections, setCollections] = useState({
    saved: [
      { id: 1, quote: "Life is what happens while you're busy making other plans.", author: "John Lennon", likes: 24, saves: 12, isLiked: false, isSaved: true },
      { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", likes: 18, saves: 8, isLiked: false, isSaved: true },
    ],
    liked: [
      { id: 2, quote: "Be the change you wish to see in world.", author: "Mahatma Gandhi", likes: 156, saves: 89, isLiked: true, isSaved: false },
      { quote: "Success is not final, failure is not fatal.", author: "Winston Churchill", likes: 92, saves: 45, isLiked: true, isSaved: false },
    ],
    created: [
      { id: 3, quote: "Every moment is a fresh beginning.", author: profile.name, likes: 34, saves: 15, isLiked: false, isSaved: false },
      { quote: "Dreams don't work unless you do.", author: profile.name, likes: 27, saves: 11, isLiked: false, isSaved: false },
    ],
  });

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = (quote) => {
    if (navigator.share) {
      navigator.share({
        title: "Share Quote",
        text: `"${quote.quote}" - ${quote.author}`,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
        alert("Quote copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(`"${quote.quote}" - ${quote.author}`);
      alert("Quote copied to clipboard!");
    }
  };

  const handleLike = (quoteId) => {
    setCollections((prev) => {
      const newCollections = { ...prev };
      Object.keys(newCollections).forEach((key) => {
        newCollections[key] = newCollections[key].map((quote) => {
          if (quote.id === quoteId) {
            const isLiked = !quote.isLiked;
            return {
              ...quote,
              isLiked,
              likes: isLiked ? quote.likes + 1 : quote.likes - 1,
            };
          }
          return quote;
        });
      });
      return newCollections;
    });
  };

  const handleSave = (quoteId) => {
    setCollections((prev) => {
      const newCollections = { ...prev };
      Object.keys(newCollections).forEach((key) => {
        newCollections[key] = newCollections[key].map((quote) => {
          if (quote.id === quoteId) {
            const isSaved = !quote.isSaved;
            return {
              ...quote,
              isSaved,
              saves: isSaved ? quote.saves + 1 : quote.saves - 1,
            };
          }
          return quote;
        });
      });
      return newCollections;
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setShowEdit(false);
    setCollections((prev) => ({
      ...prev,
      created: prev.created.map((quote) => ({
        ...quote,
        author: profile.name,
      })),
    }));
  };

  const statsData = [
    { label: "Created", value: 45, icon: RiQuillPenLine },
    { label: "Likes", value: 328, icon: RiThumbUpLine },
    { label: "Saved", value: 67, icon: RiBookmarkFill },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins']">
      {/* Gemini Effect Background */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none">
        <GoogleGeminiEffect 
          pathLengths={[0.2, 0.4, 0.6, 0.8, 1]}
          title="Profile"
          description="."
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md px-6 py-4 shadow-[0_2px_8px_rgba(0,183,235,0.1)]">
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
                <FaQuoteLeft size={18} />
                Dashboard
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
                <FaImages size={18} />
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/own-quotes"
                className={({ isActive }) =>
                  `text-xl font-semibold flex items-center gap-2 transition-colors duration-300 ${
                    isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                  }`
                }
              >
                <IoMdAdd size={18} />
                Post
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
                <FaGamepad size={18} />
                Game
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
                <CgProfile size={18} />
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-black/80 backdrop-blur-md rounded-xl p-8 border border-[#00B7EB]/20 shadow-[0_0_15px_rgba(0,183,235,0.1)]"
          >
            <div className="flex flex-col items-center text-center">
              <AvatarSection
                avatarImage={avatarImage}
                handleAvatarClick={handleAvatarClick}
                handleAvatarChange={handleAvatarChange}
                fileInputRef={fileInputRef}
              />
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mt-6"
              >
                <TextGenerateEffect words={profile.name} />
              </motion.h1>
              <p className="text-gray-300 mt-2 text-lg">@{profile.username}</p>
              <p className="text-white text-md font-medium max-w-xs mt-3 leading-relaxed">
                <TextGenerateEffect words={profile.bio} />
              </p>
              <div className="flex gap-8 mt-6 mb-8">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <RiUserFollowLine size={18} />
                  <strong>245</strong> followers
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <RiUserFollowLine size={18} />
                  <strong>182</strong> following
                </motion.span>
              </div>
              <motion.button
                onClick={() => setShowEdit(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-[#00B7EB] text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#00A3D6] transition-all duration-300"
              >
                <RiEditLine size={18} /> Edit Profile
              </motion.button>
            </div>
            {/* Stats */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[#00B7EB] mb-4">Stats</h3>
              <div className="space-y-4">
                {statsData.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-4 p-3 bg-black/50 rounded-lg border border-[#00B7EB]/20"
                  >
                    <stat.icon size={24} className="text-[#00B7EB]" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quotes Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-black/80 backdrop-blur-md rounded-xl p-8 border border-[#00B7EB]/20 shadow-[0_0_15px_rgba(0,183,235,0.1)]"
          >
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex bg-black/70 rounded-full p-1 border border-[#00B7EB]/20">
                {[
                  { id: "saved", icon: RiBookmarkLine, label: "Saved Quotes" },
                  { id: "liked", icon: RiHeartLine, label: "Liked Quotes" },
                  { id: "created", icon: RiPencilLine, label: "My Quotes" },
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#00B7EB] text-black"
                        : "text-white hover:bg-black/50"
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quotes Feed */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-6"
              >
                {collections[activeTab].length ? (
                  collections[activeTab].map((quote) => (
                    <QuoteCard
                      key={quote.id}
                      quote={quote}
                      handleLike={handleLike}
                      handleSave={handleSave}
                      handleShare={handleShare}
                    />
                  ))
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-400 italic"
                  >
                    No quotes in this collection yet.
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.section>
      </main>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEdit && (
          <EditProfileModal
            profile={profile}
            setProfile={setProfile}
            setShowEdit={setShowEdit}
            handleEditSubmit={handleEditSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;