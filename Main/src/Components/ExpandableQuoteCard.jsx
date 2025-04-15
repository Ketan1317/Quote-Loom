import React, { useState, useRef } from "react";
import { FaShare, FaHeart, FaPen, FaTrash, FaCopy, FaTimes } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { useOutsideClick } from "../Ui/Expandable-cards";

const ExpandableQuoteCard = ({ quote, onLike, onShare, onCopy, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  useOutsideClick(cardRef, () => {
    if (isExpanded) setIsExpanded(false);
  });

  return (
    <article
      ref={cardRef}
      className={`bg-white/5 backdrop-blur-md rounded-lg p-6 border border-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] ${
        isExpanded ? "transform scale-105" : ""
      }`}
      style={{
        animation: `cardSlide 0.6s ease-in-out ${quote.id % 10 * 0.1}s forwards`,
        opacity: 0,
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="relative">
        <span className="absolute -top-2 -left-2 text-white/20 text-4xl">"</span>
        <p className="text-lg text-white font-medium italic mb-2 pl-6">"{quote.text}"</p>
        {quote.context && (
          <p className="text-sm text-white/60 italic pl-6 mb-4">"{quote.context}"</p>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-white/5 text-white text-xs font-medium rounded-full capitalize">
            {quote.type}
          </span>
          <span className="text-white/60 text-xs flex items-center gap-1">
            <FiCalendar size={12} />
            {new Date(quote.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(quote.id);
            }}
            className={`flex items-center gap-1 text-sm transition-all duration-300 ${
              quote.likes > 0 ? "text-[#00B7EB]" : "text-white/60"
            } hover:text-[#00B7EB]`}
            aria-label="Like quote"
          >
            <FaHeart size={14} className={quote.likes > 0 ? "animate-pulse" : ""} />
            <span>{quote.likes}</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(quote);
            }}
            className="text-white/60 hover:text-[#00B7EB] transition-colors duration-300"
            aria-label="Share quote"
          >
            <FaShare size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCopy(quote.text);
            }}
            className="text-white/60 hover:text-[#00B7EB] transition-colors duration-300"
            aria-label="Copy quote"
          >
            <FaCopy size={14} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(quote.id);
            }}
            className="text-white/60 hover:text-red-500 transition-colors duration-300"
            aria-label="Delete quote"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/60">Created:</span>
              <span className="text-sm text-white">
                {new Date(quote.createdAt).toLocaleString()}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="text-white/60 hover:text-[#00B7EB] transition-colors duration-300"
            >
              <FaTimes size={14} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default ExpandableQuoteCard; 