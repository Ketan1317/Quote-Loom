import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { FaDownload, FaRandom, FaSearch, FaHeart, FaCopy, FaShare, FaCheck } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import domtoimage from 'dom-to-image';
import { FaImages } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaQuoteLeft } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Lens } from "../Ui/lens";

const defaultQuotes = [
    {
        text: "Be yourself; everyone else is already taken.",
        author: "Oscar Wilde"
    },
    {
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        author: "Albert Einstein"
    },
    {
        text: "Be the change that you wish to see in the world.",
        author: "Mahatma Gandhi"
    },
    {
        text: "In three words I can sum up everything I've learned about life: it goes on.",
        author: "Robert Frost"
    },
    {
        text: "If you tell the truth, you don't have to remember anything.",
        author: "Mark Twain"
    },
    {
        text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
        author: "Ralph Waldo Emerson"
    },
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },
    {
        text: "Dream big and dare to fail.",
        author: "Norman Vaughan"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
];

const Quotes = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [quotes, setQuotes] = useState([]);
    const [filteredQuotes, setFilteredQuotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    const quoteImageRef = useRef(null);
    const [copiedId, setCopiedId] = useState(null);
    const [likedQuotes, setLikedQuotes] = useState([]);
    const [selectedForImage, setSelectedForImage] = useState(null);

    const fetchRandomImage = async () => {
        try {
            setImageLoading(true);
            const response = await axios.get('https://api.unsplash.com/photos/random', {
                params: {
                    query: 'nature,landscape',
                    orientation: 'landscape',
                },
                headers: {
                    Authorization: 'Client-ID 5Y1cYQsp-_7tm63QGfo6ffJgQ6mcRSNRZZNvlPPrytQ'
                }
            });
            const imageUrlWithCors = response.data.urls.regular + '?cross-origin=anonymous';
            setImageUrl(imageUrlWithCors);
        } catch (error) {
            console.error("Error fetching image:", error);
        } finally {
            setImageLoading(false);
        }
    };

    const fetchQuotes = async () => {
        try {
            setLoading(true);
            setQuotes(defaultQuotes);
            setFilteredQuotes(defaultQuotes);
        } catch (error) {
            console.error("Error setting quotes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomImage();
        fetchQuotes();
    }, []);

    useEffect(() => {
        const filtered = quotes.filter(quote =>
            quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            quote.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredQuotes(filtered);
    }, [searchTerm, quotes]);

    const handleDownload = async () => {
        if (!quoteImageRef.current || !selectedQuote) return;

        try {
            // Show loading state
            const button = document.querySelector('#downloadButton');
            button.textContent = 'Generating...';
            button.disabled = true;

            const element = quoteImageRef.current;

            // Generate image
            const dataUrl = await domtoimage.toPng(element, {
                quality: 1.0,
                bgcolor: '#fff',
                style: {
                    'border-radius': '0'
                }
            });

            // Create download link
            const link = document.createElement('a');
            link.download = `quote-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();

            // Reset button state
            button.textContent = 'Download Quote Image';
            button.disabled = false;
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Failed to generate image. Please try again.');
        }
    };

    const handleCopy = (quote, index) => {
        navigator.clipboard.writeText(`"${quote.text}" - ${quote.author || "Unknown"}`);
        setCopiedId(index);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const toggleLike = (index) => {
        setLikedQuotes(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const handleUseInImage = (quote, index) => {
        setSelectedQuote({ content: quote.text, author: quote.author || "Unknown" });
        setSelectedForImage(index);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md px-6 py-4 shadow-[0_2px_4px_rgba(0,183,235,0.1)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <NavLink
                        to="/"
                        className="text-4xl font-bold text-white font-[playball] hover:text-[#00B7EB] transition-colors duration-300"
                    >
                        Quote Loom
                    </NavLink>
                    <ul className="hidden md:flex items-center gap-16">
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `text-xl font-bold flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                                    }`
                                }
                            >
                                <FaQuoteLeft />Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/quotes"
                                className={({ isActive }) =>
                                    `text-xl font-bold flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                                    }`
                                }
                            >
                                <FaImages />Create
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/own-quotes"
                                className={({ isActive }) =>
                                    `text-xl font-bold transition-colors flex items-center gap-2 duration-300 ${isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                                    }`
                                }
                            >
                                <IoMdAdd />Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/game"
                                className={({ isActive }) =>
                                    `text-xl font-bold flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                                    }`
                                }
                            >
                                <FaGamepad />Game
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    `text-xl font-bold flex items-center gap-2 transition-colors duration-300 ${isActive ? "text-[#00B7EB] border-b-2 border-[#00B7EB]" : "text-white hover:text-[#00B7EB]"
                                    }`
                                }
                            >
                                <CgProfile />Profile
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Quote Image Generator */}
                <div className="bg-black/80 backdrop-blur-md rounded-xl p-8 mb-8 border border-[#00B7EB]/30">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-white">Quote Image Generator</h2>
                        <button
                            onClick={fetchRandomImage}
                            className="px-6 py-3 bg-black border border-[#00B7EB] text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-[#00B7EB] hover:text-black transition-all duration-300"
                        >
                            <FaRandom className="text-[#00B7EB] hover:text-black" /> New Background
                        </button>
                    </div>
                    <div ref={quoteImageRef} className="relative aspect-[16/9] rounded-lg overflow-hidden">
                        {imageLoading ? (
                            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                        ) : (
                            <div className="relative w-full h-full">
                                <img
                                    src={imageUrl}
                                    alt="Quote background"
                                    className="w-full h-full object-cover"
                                    crossOrigin="anonymous"
                                />
                                {selectedQuote && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                        <div className="text-center p-8 max-w-3xl">
                                            <p className="text-4xl font-serif italic mb-6 leading-relaxed tracking-wide text-white">
                                                "{selectedQuote.content || selectedQuote.text}"
                                            </p>
                                            <p className="text-2xl font-medium text-white">
                                                - {selectedQuote.author || "Unknown"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        id="downloadButton"
                        onClick={handleDownload}
                        className="mt-6 w-full bg-black border border-[#00B7EB] text-white px-6 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium hover:bg-[#00B7EB] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedQuote}
                    >
                        <FaDownload className="text-[#00B7EB]" />
                        <span>Download Quote Image</span>
                    </button>
                </div>

                {/* Quotes List Section */}
                <div className="bg-black/80 backdrop-blur-md rounded-xl p-8 border border-[#00B7EB]/30">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Inspiring Quotes Collection</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search quotes by content or author..."
                                className="w-full pl-14 pr-6 py-4 rounded-lg bg-black/50 border border-[#00B7EB]/30 text-white placeholder-gray-400 focus:border-[#00B7EB] focus:ring-1 focus:ring-[#00B7EB] transition-all duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Quotes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                        {loading ? (
                            <div className="col-span-2 text-center py-4">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto"></div>
                                <p className="mt-4 text-2xl text-gray-400">Loading inspiring quotes...</p>
                            </div>
                        ) : (
                            filteredQuotes.map((quote, index) => (
                                <div
                                    key={index}
                                    onMouseEnter={() => setSelectedForImage(index)}
                                    onMouseLeave={() => setSelectedForImage(null)}
                                    className={`relative bg-black/50 backdrop-blur-xl rounded-xl p-8 border-2 transition-all duration-500 ease-out ${
                                        selectedForImage === index 
                                            ? 'border-white shadow-[0_0_30px_rgba(0,183,235,0.15)]' 
                                            : 'border-white/20 hover:border-[#00B7EB]/30'
                                    } ${
                                        selectedForImage !== null && selectedForImage !== index 
                                            ? 'blur-[2px] scale-95' 
                                            : ''
                                    }`}
                                >
                                    <Lens zoomFactor={1.3} lensSize={250}>
                                        <div className="relative group cursor-pointer">
                                            <div className="absolute -top-6 -left-6 text-8xl font-serif text-white/10 select-none transition-all duration-300 group-hover:text-[#00B7EB]/20">"</div>
                                            <div className="space-y-6 select-none">
                                                <p className="text-2xl md:text-3xl text-white mb-4 pl-8 leading-relaxed font-serif italic tracking-wide group-hover:text-white/90">
                                                    {quote.text}
                                                </p>
                                                <p className="text-xl text-white/70 pl-8 font-medium group-hover:text-[#00B7EB]/80">
                                                    - {quote.author || "Unknown"}
                                                </p>
                                            </div>
                                        </div>
                                    </Lens>
                                    
                                    <div className={`flex justify-between items-center mt-8 pt-6 border-t border-white/10 transition-opacity duration-300 ${
                                        selectedForImage === index ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleUseInImage(quote, index)}
                                                className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                                                    selectedForImage === index
                                                        ? 'bg-[#00B7EB]/10 text-white border-2 border-[#00B7EB]/30 shadow-[0_0_20px_rgba(0,183,235,0.2)]'
                                                        : 'bg-black/50 border-2 border-white text-white hover:bg-[#00B7EB]/5 hover:border-[#00B7EB]/20'
                                                }`}
                                            >
                                                {selectedForImage === index ? (
                                                    <>
                                                        <FaCheck className="text-lg animate-bounce text-[#00B7EB]" />
                                                        <span>Selected</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaDownload className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                                                        <span>Use in Image</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleCopy(quote, index)}
                                                className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                                                    copiedId === index
                                                        ? 'bg-[#00B7EB]/10 text-white border-2 border-[#00B7EB]/30 shadow-[0_0_20px_rgba(0,183,235,0.2)]'
                                                        : 'bg-black/50 border-2 border-white text-white hover:bg-[#00B7EB]/5 hover:border-[#00B7EB]/20'
                                                }`}
                                            >
                                                {copiedId === index ? (
                                                    <>
                                                        <FaCheck className="text-lg animate-bounce text-[#00B7EB]" />
                                                        <span>Copied!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCopy className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                                                        <span>Copy</span>
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => toggleLike(index)}
                                                className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                                                    likedQuotes.includes(index)
                                                        ? 'bg-[#00B7EB]/10 text-white border-2 border-[#00B7EB]/30 shadow-[0_0_20px_rgba(0,183,235,0.2)]'
                                                        : 'bg-black/50 border-2 border-white text-white hover:bg-[#00B7EB]/5 hover:border-[#00B7EB]/20'
                                                }`}
                                            >
                                                <FaHeart className={`text-lg ${likedQuotes.includes(index) ? 'animate-pulse text-[#00B7EB]' : ''}`} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleShare(quote)}
                                            className="p-3 rounded-full bg-black/50 border-2 border-white/20 text-white/70 hover:text-[#00B7EB] hover:border-[#00B7EB]/30 hover:scale-110 transition-all duration-300"
                                        >
                                            <FaShare className="text-lg" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* No Results Message */}
                    {!loading && filteredQuotes.length === 0 && (
                        <div className="col-span-2 text-center py-12">
                            <div className="bg-black/50 backdrop-blur-xl rounded-xl p-8 border-2 border-white/20">
                                <p className="text-3xl text-white mb-4">No quotes found</p>
                                <p className="text-xl text-white/70">Try adjusting your search terms</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Quotes;
