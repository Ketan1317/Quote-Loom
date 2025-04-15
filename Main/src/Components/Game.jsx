import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaImages, FaQuoteLeft, FaGamepad, FaRandom, FaLightbulb } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { ToastContainer, toast } from 'react-toastify';
import { BackgroundBeamsWithCollision } from "../Ui/background-beams-with-collision";
import SparklesCore from "../Ui/sparkles";

const Game = () => {
  const [activeGame, setActiveGame] = useState("fill-blanks");
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [scrambledWords, setScrambledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [gameData, setGameData] = useState({
    "fill-blanks": {
      questions: [
        {
          quote: "Success is not final, ___ is not fatal: it is the courage to continue that counts.",
          answer: "failure",
          hint: "The opposite of success",
        },
        {
          quote: "The future belongs to those who ___ in the beauty of their dreams.",
          answer: "believe",
          hint: "To have faith in something",
        },
        {
          quote: "Don't watch the clock; do what it does. Keep ___.",
          answer: "going",
          hint: "To continue moving forward",
        },
      ],
    },
    "quote-guessing": {
      questions: [
        {
          quote: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          options: ["Steve Jobs", "Albert Einstein", "Walt Disney", "Mark Twain"],
        },
        {
          quote: "Life is what happens while you're busy making other plans.",
          author: "John Lennon",
          options: ["John Lennon", "Bob Dylan", "Paul McCartney", "Mick Jagger"],
        },
        {
          quote: "The journey of a thousand miles begins with one step.",
          author: "Lao Tzu",
          options: ["Lao Tzu", "Confucius", "Sun Tzu", "Buddha"],
        },
      ],
    },
    "author-matching": {
      questions: [
        {
          quote: "The only true wisdom is in knowing you know nothing.",
          author: "Socrates",
          options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
        },
        {
          quote: "Knowledge speaks, but wisdom listens.",
          author: "Jimi Hendrix",
          options: ["Jimi Hendrix", "Bob Marley", "John Lennon", "Bob Dylan"],
        },
        {
          quote: "Life is really simple, but we insist on making it complicated.",
          author: "Confucius",
          options: ["Confucius", "Lao Tzu", "Sun Tzu", "Buddha"],
        },
      ],
    },
    "quote-scramble": {
      questions: [
        {
          quote: "The only way to do great work is to love what you do",
          author: "Steve Jobs",
        },
        {
          quote: "Life is what happens while you're busy making other plans",
          author: "John Lennon",
        },
        {
          quote: "The journey of a thousand miles begins with one step",
          author: "Lao Tzu",
        },
      ],
    },
    "quote-trivia": {
      questions: [
        {
          question: "Which philosopher said 'The only true wisdom is in knowing you know nothing'?",
          answer: "Socrates",
          options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
          fact: "Socrates was known for his method of questioning, which is now called the Socratic method.",
        },
        {
          question: "Who said 'Knowledge speaks, but wisdom listens'?",
          answer: "Jimi Hendrix",
          options: ["Jimi Hendrix", "Bob Marley", "John Lennon", "Bob Dylan"],
          fact: "Jimi Hendrix was not only a legendary guitarist but also a profound thinker about life and music.",
        },
        {
          question: "Which ancient philosopher said 'Life is really simple, but we insist on making it complicated'?",
          answer: "Confucius",
          options: ["Confucius", "Lao Tzu", "Sun Tzu", "Buddha"],
          fact: "Confucius' teachings have influenced East Asian culture and society for over two millennia.",
        },
      ],
    },
  });

  const scrambleWords = (quote) => {
    const words = quote.split(" ");
    const scrambled = [...words].sort(() => Math.random() - 0.5);
    setScrambledWords(scrambled);
    setSelectedWords([]);
  };

  const handleWordSelect = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const checkScrambleAnswer = () => {
    const userAnswer = selectedWords.join(" ");
    const correctAnswer = gameData["quote-scramble"].questions[currentQuestion].quote;
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(isCorrect);
    if (isCorrect) setScore((prev) => prev + 1);
    setShowResult(true);
  };

  const handleAnswer = () => {
    if (activeGame === "fill-blanks") {
      const correct = userAnswer.toLowerCase() === gameData[activeGame].questions[currentQuestion].answer;
      setIsCorrect(correct);
      if (correct) setScore((prev) => prev + 1);
    } else if (activeGame === "quote-trivia") {
      const correct = userAnswer === gameData[activeGame].questions[currentQuestion].answer;
      setIsCorrect(correct);
      if (correct) setScore((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const nextQuestion = () => {
    setShowResult(false);
    setUserAnswer("");
    if (activeGame === "quote-scramble") {
      scrambleWords(gameData["quote-scramble"].questions[currentQuestion].quote);
    }
    if (currentQuestion < gameData[activeGame].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
    }
  };

  const renderGame = () => {
    switch (activeGame) {
      case "fill-blanks":
        return (
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-[#00B7EB] mb-6">Fill in the Blank</h3>
            <p className="text-lg italic mb-6 leading-relaxed">
              "{gameData[activeGame].questions[currentQuestion].quote}"
            </p>
            <div className="flex flex-col gap-6">
              <div className="relative">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Your answer..."
                  className="w-full px-4 py-3 bg-black/50 border border-[rgba(0,183,235,0.3)] text-white rounded-lg transition-all duration-300 focus:border-[#00B7EB] focus:ring-2 focus:ring-[rgba(0,183,235,0.5)]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  Hint: {gameData[activeGame].questions[currentQuestion].hint}
                </span>
              </div>
              {showResult && (
                <div className={`p-4 rounded-lg text-center animate-[fadeIn_0.3s_ease-out] ${
                  isCorrect ? "bg-[rgba(0,183,235,0.2)] text-[#00B7EB]" : "bg-[rgba(255,77,77,0.2)] text-[#FF4D4D]"
                }`}>
                  {isCorrect
                    ? "Correct!"
                    : `Incorrect. The answer is: ${gameData[activeGame].questions[currentQuestion].answer}`}
                </div>
              )}
              <div className="flex gap-8">
                <button
                  onClick={handleAnswer }
                  className="flex-1 px-4 py-3 border-[#00B7EB] bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:text-black  hover:scale-105"
                >
                  Check Answer
                </button>
                <button
                  onClick={nextQuestion}
                  className="flex-1 px-4 py-3 bg-black/50 border border-[#00B7EB] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-900  hover:scale-105"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        );

      case "quote-scramble":
        return (
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-[#00B7EB] mb-6">Quote Scramble</h3>
            <p className="text-lg mb-6">
              Author: {gameData[activeGame].questions[currentQuestion].author}
            </p>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="min-h-[3rem] p-4 bg-black/50 border border-[rgba(0,183,235,0.3)] rounded-lg flex flex-wrap gap-2">
                  {selectedWords.map((word, index) => (
                    <span
                    key={index}
                    className="px-2 py-1 bg-gray-800 text-white rounded-md font-semibold text-2xl"
                  >
                    {word}
                  </span>
                  
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {scrambledWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => handleWordSelect(word)}
                      disabled={selectedWords.includes(word)}
                      className={`px-4 py-2 rounded-xl font-semibold text-xl border transition-all duration-300 ${
                        selectedWords.includes(word)
                          ? "opacity-50 border-red-600 border-2 cursor-not-allowed"
                          : "border-green-600 border-2 hover:bg-gray-900  hover:scale-105"
                      }`}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
              {showResult && (
                <div className={`p-4 rounded-lg text-center animate-[fadeIn_0.3s_ease-out] ${
                  isCorrect ? "bg-[rgba(0,183,235,0.2)] text-[#00B7EB]" : "bg-[rgba(255,77,77,0.2)] text-[#FF4D4D]"
                }`}>
                  {isCorrect
                    ? "Correct!"
                    : `Incorrect. The correct quote is: ${gameData[activeGame].questions[currentQuestion].quote}`}
                </div>
              )}
              <div className="flex gap-8">
                <button
                  onClick={checkScrambleAnswer}
                  className="flex-1 px-4 py-3  bg-gray-800 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:text-black  hover:scale-105"
                >
                  Check Answer
                </button>
                <button
                  onClick={nextQuestion}
                  className="flex-1 px-4 py-3 bg-black/50 border border-[#00B7EB] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-900   hover:scale-105"
                >
                  Next Question
                </button>
              </div>
            </div>
          </div>
        );

      case "quote-trivia":
        return (
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-[#00B7EB] mb-6">Quote Trivia</h3>
            <div className="flex flex-col gap-6">
              <p className="text-xl font-medium mb-6">
                {gameData[activeGame].questions[currentQuestion].question}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {gameData[activeGame].questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setUserAnswer(option);
                      handleAnswer();
                    }}
                    className="p-4 bg-black/50 border border-[rgba(0,183,235,0.3)] text-white rounded-lg transition-all duration-300 text-center hover:bg-gray-900 "
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className="flex flex-col gap-4">
                  <div className={`p-4 rounded-lg text-center animate-[fadeIn_0.3s_ease-out] ${
                    isCorrect ? "bg-[rgba(0,183,235,0.2)] text-[#00B7EB]" : "bg-[rgba(255,77,77,0.2)] text-[#FF4D4D]"
                  }`}>
                    {isCorrect ? "Correct!" : "Incorrect!"}
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-[rgba(0,183,235,0.1)] rounded-lg mt-4">
                    <FaLightbulb className="text-[#00B7EB]" />
                    <p>{gameData[activeGame].questions[currentQuestion].fact}</p>
                  </div>
                </div>
              )}
              <button
                onClick={nextQuestion}
                className="px-4 py-3 bg-black/50 border border-[#00B7EB] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:border-none hover:text-black hover:scale-105"
              >
                Next Question
              </button>
            </div>
          </div>
        );

      case "quote-guessing":
        return (
          <div className="flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-[#00B7EB] mb-6">
              {activeGame === "quote-guessing" ? "Guess the Author" : "Match the Author"}
            </h3>
            <p className="text-lg italic mb-6 leading-relaxed">
              "{gameData[activeGame].questions[currentQuestion].quote}"
            </p>
            <div className="grid grid-cols-2 gap-4">
              {gameData[activeGame].questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const correct = option === gameData[activeGame].questions[currentQuestion].author;
                    setIsCorrect(correct);
                    if (correct) setScore((prev) => prev + 1);
                    setShowResult(true);
                  }}
                  className="p-4 bg-black/50 border border-[rgba(0,183,235,0.3)] text-white rounded-lg transition-all duration-300 text-center hover:bg-gray-900 "
                >
                  {option}
                </button>
              ))}
            </div>
            {showResult && (
              <div className={`p-4 rounded-lg text-center animate-[fadeIn_0.3s_ease-out] ${
                isCorrect ? "bg-[rgba(0,183,235,0.2)] text-[#00B7EB]" : "bg-[rgba(255,77,77,0.2)] text-[#FF4D4D]"
              }`}>
                {isCorrect
                  ? "Correct!"
                  : `Incorrect. The author is: ${gameData[activeGame].questions[currentQuestion].author}`}
              </div>
            )}
            <button
              onClick={nextQuestion}
              className="px-4 py-3 bg-black/50 border border-[#00B7EB] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-gray-700 hover:border-none hover:text-black hover:scale-105"
            >
              Next Question
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Poppins'] relative overflow-hidden flex flex-col">
      <ToastContainer />
      
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
                <FaQuoteLeft/>Dashboard
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
                <FaImages/>Create
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
                <IoMdAdd/>Post
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
                <FaGamepad/>Game
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
                <CgProfile/>Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="flex-1 relative">
        {/* Background Effects Layer */}
        <div className="absolute inset-0 w-full h-full">
          <BackgroundBeamsWithCollision />
        </div>

        {/* Main Content Layer */}
        <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-5rem)] py-12">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="flex flex-col gap-12">
              {/* Header Section with Enhanced Sparkles */}
              <div className="text-center space-y-8 relative">
                <div className="absolute inset-0 -z-10">
                  <SparklesCore
                    id="tsparticles"
                    background="transparent"
                    minSize={1}
                    maxSize={2}
                    particleDensity={200}
                    className="w-full h-full"
                    particleColor="#00B7EB"
                    speed={2}
                  />
                </div>
                <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-[#00B7EB] to-[#00B7EB]/50 pb-2">
                  Quote Quest
                </h1>
                <div className="inline-flex items-center bg-[rgba(0,183,235,0.1)] text-[#00B7EB] px-8 py-4 rounded-2xl font-semibold text-2xl backdrop-blur-sm border border-[#00B7EB]/20">
                  Score: {score}
                </div>
              </div>

              {/* Game Type Selection */}
              <div className="flex flex-wrap gap-6 justify-center max-w-4xl mx-auto">
                {["fill-blanks", "quote-guessing", "quote-scramble", "quote-trivia"].map((game) => (
                  <button
                    key={game}
                    onClick={() => {
                      setActiveGame(game);
                      setCurrentQuestion(0);
                      setShowResult(false);
                      setUserAnswer("");
                      if (game === "quote-scramble") {
                        scrambleWords(gameData[game].questions[0].quote);
                      }
                    }}
                    className={`px-8 py-4 rounded-xl text-xl font-bold transition-all duration-300 backdrop-blur-sm ${
                      activeGame === game
                        ? "text-white bg-[#00B7EB] shadow-[0_0_20px_rgba(0,183,235,0.3)] scale-105 border-2 border-[#00B7EB]"
                        : "bg-black/40 border-2 border-[rgba(0,183,235,0.3)] text-white hover:bg-[#00B7EB]/10 hover:border-[#00B7EB] hover:scale-105"
                    }`}
                  >
                    {game === "fill-blanks"
                      ? "Fill in Blanks"
                      : game === "quote-guessing"
                      ? "Guess Author"
                      : game === "quote-scramble"
                      ? "Quote Scramble"
                      : "Quote Trivia"}
                  </button>
                ))}
              </div>

              {/* Game Content */}
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-10 border-2 border-[rgba(0,183,235,0.2)] shadow-[0_0_30px_rgba(0,183,235,0.1)] animate-[slideIn_0.4s_ease-out] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#00B7EB]/5 to-transparent opacity-50"></div>
                <div className="relative z-10">
                  {renderGame()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Game;