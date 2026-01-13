import React, { useState, useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Search, Bell, User, Settings, LogOut, History } from "lucide-react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../App"; // Import context

const Layout = () => {
  const { user, logout } = useContext(AuthContext); // DYNAMIC USER DATA
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "New transmission from Sector 7G",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Quantum AI update complete",
      time: "1h ago",
      unread: false,
    },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      if (query) navigate(`/explore?q=${encodeURIComponent(query)}`);
      else navigate(`/explore`);
    }
  };

  useEffect(() => {
    const closeMenus = () => {
      setShowNotifications(false);
      setShowAccountMenu(false);
    };
    window.addEventListener("click", closeMenus);
    return () => window.removeEventListener("click", closeMenus);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-[#0A0E1A]/80 backdrop-blur-md p-4 flex justify-between items-center gap-4 border-b border-white/5 relative z-50">
          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-2xl group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search the Nexus..."
              onKeyDown={handleSearch}
              className="w-full bg-[#0D1223] border border-white/10 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:border-[#00F0FF]/50 transition-all text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* NOTIFICATIONS */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowAccountMenu(false);
                }}
                className={`p-2 rounded-full relative group transition-colors ${
                  showNotifications ? "bg-[#00F0FF]/10" : "hover:bg-white/5"
                }`}
              >
                <Bell
                  size={20}
                  className={
                    showNotifications
                      ? "text-[#00F0FF]"
                      : "group-hover:text-[#00F0FF]"
                  }
                />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0D1223] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center text-xs font-black uppercase tracking-widest text-[#00F0FF]">
                    Signal Log
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 hover:bg-white/5 border-b border-white/5 cursor-pointer transition-colors"
                      >
                        <p className="text-sm font-medium leading-snug">
                          {n.text}
                        </p>
                        <p className="text-[10px] text-[#00F0FF]/60 mt-1 font-bold">
                          {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACCOUNT MENU */}
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <div
                onClick={() => {
                  setShowAccountMenu(!showAccountMenu);
                  setShowNotifications(false);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                  showAccountMenu
                    ? "ring-2 ring-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                    : "hover:scale-105 border border-white/20"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF] via-[#7000FF] to-[#FF00D6] opacity-80" />
                <div className="absolute inset-[1px] bg-[#0A0E1A]/40 backdrop-blur-md rounded-[9px] z-10" />
                <div className="relative z-20">
                  <User
                    size={20}
                    className={
                      showAccountMenu ? "text-[#00F0FF]" : "text-white"
                    }
                    strokeWidth={2.5}
                  />
                </div>
              </div>

              {showAccountMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-[#0D1223] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-3 py-3 border-b border-white/5 mb-2">
                    <p className="text-xs font-black text-[#00F0FF] uppercase truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                  <MenuButton
                    icon={<User size={16} />}
                    text="Profile"
                    onClick={() => navigate("/profile")}
                  />
                  <MenuButton
                    icon={<History size={16} />}
                    text="Activity"
                    onClick={() => navigate("/history")}
                  />
                  <MenuButton
                    icon={<Settings size={16} />}
                    text="System Config"
                    onClick={() => navigate("/settings")}
                  />
                  <div className="h-px bg-white/5 my-2" />
                  <MenuButton
                    icon={<LogOut size={16} />}
                    text="De-authorize"
                    color="text-red-400"
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const MenuButton = ({ icon, text, onClick, color = "text-gray-300" }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group ${color}`}
  >
    <span className="group-hover:text-[#00F0FF] transition-colors">{icon}</span>
    <span className="text-xs font-bold">{text}</span>
  </button>
);

export default Layout;
