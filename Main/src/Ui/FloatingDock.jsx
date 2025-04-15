import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaHome, FaQuoteLeft, FaGamepad, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const FloatingDock = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);

  const items = [
    { icon: <FaHome />, label: "Home", href: "/" },
    { icon: <FaQuoteLeft />, label: "Quotes", href: "/quotes" },
    { icon: <FaGamepad />, label: "Game", href: "/game" },
    { icon: <FaUser />, label: "Profile", href: "/profile" },
  ];

  return (
    <motion.div
      ref={dockRef}
      onMouseMove={(e) => {
        const rect = dockRef.current?.getBoundingClientRect();
        if (rect) {
          mouseX.set(e.clientX - rect.left);
        }
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <motion.div
        className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 border border-white/10"
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            mouseX={mouseX}
            icon={item.icon}
            label={item.label}
            href={item.href}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const DockItem = ({ mouseX, icon, label, href }) => {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square rounded-full bg-white/5 flex items-center justify-center relative group"
      >
        <motion.div
          className="text-white/80 group-hover:text-[#00B7EB] transition-colors duration-300"
          style={{ fontSize: "1.2rem" }}
        >
          {icon}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/5 rounded-md text-white/80 text-xs whitespace-nowrap"
        >
          {label}
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default FloatingDock; 