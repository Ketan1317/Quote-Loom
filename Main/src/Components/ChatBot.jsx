import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { FaTimes, FaRobot } from "react-icons/fa";

const ChatBot = ({ onGenerateQuote }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Bot's knowledge base
    const botResponses = {
        greetings: [
            "Hello! I'm QuoteBot. How can I inspire you today?",
            "Hi there! Looking for some inspiration?",
            "Welcome! What kind of quote would you like?"
        ],
        motivation: [
            "Here's a motivational quote: 'The only way to do great work is to love what you do.'",
            "Remember: 'Success is not final, failure is not fatal: it is the courage to continue that counts.'",
            "Here's one for you: 'The future belongs to those who believe in the beauty of their dreams.'"
        ],
        love: [
            "Love is beautiful: 'The best thing to hold onto in life is each other.'",
            "Here's a lovely one: 'Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.'",
            "Remember: 'The greatest happiness of life is the conviction that we are loved.'"
        ],
        success: [
            "Success wisdom: 'Success is walking from failure to failure with no loss of enthusiasm.'",
            "Here's a good one: 'Success usually comes to those who are too busy to be looking for it.'",
            "Remember: 'The road to success and the road to failure are almost exactly the same.'"
        ],
        life: [
            "Life's truth: 'Life is what happens while you're busy making other plans.'",
            "Here's wisdom: 'Life is 10% what happens to you and 90% how you react to it.'",
            "Remember: 'Life is really simple, but we insist on making it complicated.'"
        ],
        default: [
            "Here's a thoughtful quote: 'The only true wisdom is in knowing you know nothing.'",
            "I think you might like this: 'Change your thoughts and you change your world.'",
            "How about this one: 'Every moment is a fresh beginning.'"
        ]
    };

    // Initialize chat with welcome message
    useEffect(() => {
        if (chatHistory.length === 0) {
            setChatHistory([{
                type: 'bot',
                text: "Hello! I'm QuoteBot. I can help you find inspiring quotes. Try asking for quotes about: motivation, love, success, or life!"
            }]);
        }
    }, []);

    const analyzeMessage = (msg) => {
        msg = msg.toLowerCase();
        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
            return 'greetings';
        } else if (msg.includes('motivat') || msg.includes('inspire')) {
            return 'motivation';
        } else if (msg.includes('love') || msg.includes('relationship')) {
            return 'love';
        } else if (msg.includes('success') || msg.includes('achieve')) {
            return 'success';
        } else if (msg.includes('life') || msg.includes('living')) {
            return 'life';
        }
        return 'default';
    };

    const getRandomResponse = (category) => {
        const responses = botResponses[category];
        return responses[Math.floor(Math.random() * responses.length)];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        // Add user message
        setChatHistory(prev => [...prev, { type: 'user', text: message }]);
        setIsLoading(true);

        // Simulate processing time
        setTimeout(() => {
            const category = analyzeMessage(message);
            const response = getRandomResponse(category);

            // Extract just the quote from the response (remove the prefix text)
            const quote = response.split(': ')[1]?.replace(/[''"]/g, '') || response;

            // Add bot response
            setChatHistory(prev => [...prev, { type: 'bot', text: response }]);
            
            // Send quote to parent component
            onGenerateQuote(quote);

            setIsLoading(false);
            setMessage('');
        }, 1000);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#06b6d4] text-white p-4 rounded-full shadow-lg hover:bg-[#0891b2] transition-all duration-300"
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
                    <div className="p-4 bg-[#06b6d4] text-white rounded-t-lg flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <FaRobot size={20} />
                            <h3 className="font-semibold">QuoteBot</h3>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    chat.type === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-lg ${
                                        chat.type === 'user'
                                            ? 'bg-[#06b6d4] text-white'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                                >
                                    {chat.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg animate-pulse">
                                    Finding the perfect quote...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Suggestion Chips */}
                    <div className="px-4 py-2 border-t border-b flex gap-2 overflow-x-auto">
                        {['Motivation', 'Love', 'Success', 'Life'].map((topic) => (
                            <button
                                key={topic}
                                onClick={() => setMessage(topic)}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 whitespace-nowrap"
                            >
                                {topic}
                            </button>
                        ))}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask for a quote..."
                                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="p-2 bg-[#06b6d4] text-white rounded-lg hover:bg-[#0891b2] transition-colors disabled:bg-gray-300"
                                disabled={isLoading}
                            >
                                <IoSend size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;