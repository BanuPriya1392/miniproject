import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Video,
  Home,
  Compass,
  Radio,
  Clock,
  ThumbsUp,
  Gamepad2,
  GraduationCap,
  Music,
  Cpu,
  Film,
  Brain,
  ListVideo, // Added for Playlists
  Bookmark, // Added for Watchlist
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#0D1223]/50 backdrop-blur-xl flex flex-col p-4 h-screen sticky top-0 shrink-0">
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-3 px-2 mb-10 group cursor-pointer"
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:rotate-12 transition-transform">
          <Video size={20} className="text-white" />
        </div>
        <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] via-white to-[#7B68EE] lg:block hidden">
          NEXUS
        </span>
      </Link>

      {/* MAIN NAV */}
      <nav className="space-y-1 flex-1 overflow-y-auto no-scrollbar">
        <SidebarItem to="/home" icon={<Home size={20} />} label="Home" />
        <SidebarItem
          to="/explore"
          icon={<Compass size={20} />}
          label="Explore"
        />
        <SidebarItem to="/live" icon={<Radio size={20} />} label="Live" />

        <div className="my-4 border-t border-white/5 mx-2" />
        <p className="px-4 mb-2 text-[10px] font-black text-gray-600 uppercase tracking-widest hidden lg:block">
          Library
        </p>

        <SidebarItem to="/history" icon={<Clock size={20} />} label="History" />

        {/* NEW: Playlists Route */}
        <SidebarItem
          to="/playlists"
          icon={<ListVideo size={20} />}
          label="Playlists"
        />

        {/* NEW: Watchlist Route */}
        <SidebarItem
          to="/watchlist"
          icon={<Bookmark size={20} />}
          label="Watchlist"
        />

        <SidebarItem to="/liked" icon={<ThumbsUp size={20} />} label="Liked" />

        <div className="my-4 border-t border-white/5 mx-2" />
        <p className="px-4 mb-2 text-[10px] font-black text-gray-600 uppercase tracking-widest hidden lg:block">
          Categories
        </p>

        <SidebarItem
          to="/gaming"
          icon={<Gamepad2 size={20} />}
          label="Gaming"
        />
        <SidebarItem
          to="/education"
          icon={<GraduationCap size={20} />}
          label="Education"
        />
        <SidebarItem to="/music" icon={<Music size={20} />} label="Music" />
        <SidebarItem to="/tech" icon={<Cpu size={20} />} label="Tech" />
        <SidebarItem to="/cinema" icon={<Film size={20} />} label="Cinema" />
        <SidebarItem to="/ai" icon={<Brain size={20} />} label="AI" />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-4 px-3 py-3 rounded-xl transition-all group
      ${
        isActive
          ? "bg-gradient-to-r from-[#00F0FF]/20 to-transparent border-l-4 border-[#00F0FF] text-[#00F0FF]"
          : "text-gray-500 hover:text-white hover:bg-white/5"
      }
    `}
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="text-sm font-bold lg:block hidden">{label}</span>
  </NavLink>
);

export default Sidebar;
