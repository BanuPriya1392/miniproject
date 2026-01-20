import React, { useState, useEffect, useContext, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  History,
  PlusSquare,
  Video,
  Tag,
  Upload,
  Loader2,
  X,
  FileText,
  Type,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { AuthContext } from "../App";
import { getVideoAutomatedContent } from "../utils/geminiAI";

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Menu States
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Upload Functional States
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // UPDATED: State for multiple tags
  const [aiTags, setAiTags] = useState([]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
    } else if (location.pathname !== "/explore") {
      setSearchQuery("");
    }
  }, [location.pathname, location.search]);

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
    {
      id: 3,
      text: "Security protocol initialized",
      time: "5h ago",
      unread: false,
    },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim();
      navigate(`/explore${query ? `?q=${encodeURIComponent(query)}` : ""}`, {
        replace: true,
      });
      e.target.blur();
    }
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setShowNotifications(false);
      setShowAccountMenu(false);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  // UPDATED: Handle multiple tag generation
  const handleGetTags = async () => {
    if (!title || !description)
      return alert("Please provide a title and description for AI analysis.");
    setIsAnalyzing(true);
    try {
      const tags = await getVideoAutomatedContent(title, description);
      setAiTags(tags);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFinalUpload = () => {
    setUploadStatus("uploading");
    let val = 0;
    const interval = setInterval(() => {
      val += 10;
      setProgress(val);
      if (val >= 100) {
        clearInterval(interval);
        setUploadStatus("success");
        setTimeout(() => {
          setShowUploadModal(false);
          resetForm();
        }, 1500);
      }
    }, 150);
  };

  const resetForm = () => {
    setVideoFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setTitle("");
    setDescription("");
    setAiTags([]); // Clear the array
    setUploadStatus("idle");
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white flex font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <header className="bg-[#0A0E1A]/80 backdrop-blur-md p-4 flex justify-between items-center gap-4 border-b border-white/5 relative z-50">
          <div className="relative flex-1 max-w-2xl group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00F0FF]"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search the Nexus..."
              className="w-full bg-[#0D1223] border border-white/10 rounded-full py-2.5 pl-12 pr-4 focus:border-[#00F0FF]/50 outline-none text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowAccountMenu(false);
                }}
                className={`p-2 rounded-xl transition-all ${showNotifications ? "bg-[#00F0FF]/10 text-[#00F0FF]" : "text-gray-400 hover:text-[#00F0FF]"}`}
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#00F0FF] rounded-full shadow-[0_0_8px_#00F0FF]"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0D1223] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
                  <div className="p-4 border-b border-white/5 text-[10px] font-black uppercase text-[#00F0FF] tracking-widest">
                    Signal Log
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 hover:bg-white/5 border-b border-white/5 cursor-pointer"
                      >
                        <p className="text-sm font-medium">{n.text}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {n.time}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 bg-[#00F0FF] text-black px-4 py-2 rounded-xl font-bold text-xs uppercase transition-transform hover:scale-105"
            >
              <PlusSquare size={18} /> Uplink
            </button>

            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <div
                onClick={() => {
                  setShowAccountMenu(!showAccountMenu);
                  setShowNotifications(false);
                }}
                className={`w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#7000FF] p-[1px] cursor-pointer transition-all ${showAccountMenu ? "ring-2 ring-[#00F0FF]" : ""}`}
              >
                <div className="w-full h-full bg-[#0A0E1A] rounded-xl flex items-center justify-center">
                  <User size={20} />
                </div>
              </div>
              {showAccountMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0D1223] border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-4 border-b border-white/5 mb-2">
                    <p className="text-xs font-black text-[#00F0FF] uppercase truncate">
                      {user?.name || "Neural Operative"}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {user?.email}
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

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* UPLOAD MODAL */}
        {showUploadModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0D1223] border border-white/10 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2">
                  <Upload className="text-[#00F0FF]" /> Nexus Studio Uplink
                </h2>
                <button
                  onClick={() => {
                    if (uploadStatus !== "uploading") {
                      setShowUploadModal(false);
                      resetForm();
                    }
                  }}
                  className="hover:bg-red-500/20 hover:text-red-500 p-2 rounded-full transition-colors text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Type
                        className="absolute left-3 top-3 text-gray-500"
                        size={18}
                      />
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Video Title"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-[#00F0FF] outline-none"
                      />
                    </div>
                    <div className="relative">
                      <FileText
                        className="absolute left-3 top-3 text-gray-500"
                        size={18}
                      />
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description..."
                        rows="4"
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-[#00F0FF] outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* AI TAGS AREA */}
                  <div className="space-y-4">
                    <button
                      onClick={handleGetTags}
                      disabled={isAnalyzing || !videoFile}
                      className="w-full bg-[#7000FF]/20 border border-[#7000FF]/50 text-[#CCAAFF] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#7000FF]/30 transition-all disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Tag size={18} />
                      )}
                      {isAnalyzing
                        ? "ANALYZING NEURAL DATA..."
                        : "GENERATE AI SMART TAGS"}
                    </button>

                    {aiTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-4 bg-black/40 border border-white/5 rounded-2xl">
                        {aiTags.map((tag, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-[10px] font-black uppercase rounded-lg animate-in fade-in zoom-in-95 duration-300"
                          >
                            <Tag size={10} /> {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden relative flex items-center justify-center">
                    {previewUrl ? (
                      <video
                        src={previewUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div
                        onClick={() => fileInputRef.current.click()}
                        className="text-center cursor-pointer"
                      >
                        <Video
                          size={48}
                          className="text-gray-700 mx-auto mb-2"
                        />
                        <p className="text-[10px] text-gray-500 font-bold uppercase">
                          Select Video Source
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      hidden
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <button
                    onClick={handleFinalUpload}
                    disabled={
                      !videoFile ||
                      aiTags.length === 0 ||
                      uploadStatus !== "idle"
                    }
                    className="w-full bg-[#00F0FF] text-black py-4 rounded-2xl font-black uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)] disabled:grayscale disabled:opacity-50"
                  >
                    {uploadStatus === "uploading"
                      ? `Transmitting ${progress}%`
                      : uploadStatus === "success"
                        ? "Uplink Complete"
                        : "Authorize Uplink"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
