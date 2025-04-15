"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export const HeroParallax = ({ products = [] }) => {
  // Ensure we have at least 15 items by filling with placeholders
  const allProducts = [
    ...products,
    ...Array(Math.max(0, 15 - products.length)).fill({
      title: "Create a Quote",
      link: "#",
      thumbnail: (
        <div className="group relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur-md">
          <div className="h-full p-8 flex items-center justify-center">
            <p className="text-white/50 text-xl">Add your inspiring quote</p>
          </div>
        </div>
      ),
    }),
  ];

  const firstRow = allProducts.slice(0, 5);
  const secondRow = allProducts.slice(5, 10);
  const thirdRow = allProducts.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="relative h-[300vh] py-40 overflow-hidden antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, idx) => (
            <QuoteCard quote={product} translate={translateX} key={`first-${idx}`} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product, idx) => (
            <QuoteCard quote={product} translate={translateXReverse} key={`second-${idx}`} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, idx) => (
            <QuoteCard quote={product} translate={translateX} key={`third-${idx}`} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const QuoteCard = ({ quote, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/quote h-96 w-[30rem] relative shrink-0 bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/10"
    >
      <div className="absolute top-4 left-4 text-[#00B7EB]/50">
        <FaQuoteLeft size={24} />
      </div>
      <div className="absolute bottom-4 right-4 text-[#00B7EB]/50">
        <FaQuoteRight size={24} />
      </div>
      <div className="h-full flex flex-col justify-center">
        {quote.thumbnail}
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/quote:opacity-80 bg-black/50 pointer-events-none transition-opacity duration-300 rounded-xl"></div>
    </motion.div>
  );
};
