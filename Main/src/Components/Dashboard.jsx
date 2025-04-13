import axios from "axios";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
    useEffect(() => {
        axios.get("https://zenquotes.io/api/random").then((res) => console.log(res)).catch((err) => console.log(err));
    })
  return (
    <div>
      <nav className="bg-[#ffffff]/95 flex items-center justify-between px-7 backdrop-blur-md text-[#1e293b] py-4 px-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] sticky top-0 z-50">
        <NavLink
          to="/"
          className="text-3xl font-[Pacifico] tracking-wider text-[#06b6d4] hover:text-[#0891b2] transition-colors duration-300"
        >
          Quote Loom
        </NavLink>
        <ul className="flex space-x-8">
  {["Dashboard", "Quotes", "Authors", "Own Quotes", "Profile"].map((item) => (
    <li key={item}>
      <NavLink
        to={`/${item.toLowerCase().replace(" ", "-")}`}
        className={({ isActive }) =>
          `relative px-3 py-2 text-lg font-medium transition-all duration-300 
          ${isActive ? "text-[#e63946]" : "text-[#f7c3c3]"} 
          hover:text-[#e63946] group`
        }
      >
        {item}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#e63946] transition-all duration-300 group-hover:w-full"></span>
      </NavLink>
    </li>
  ))}
</ul>
        <NavLink to="/login">
            <button className="bg-red-500 text-white px-4 py-2 rounded-2xl hover:bg-red-600 cursor-pointer transition-colors duration-300">
                Logout
            </button>
        </NavLink>
      </nav>
      <main>

      </main>
    </div>
  );
};

export default Dashboard;
