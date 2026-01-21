import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "lucide-react";
import VideoCard from "../Components/VideoCard";
import { fetchVideos } from "../api/mockapi";
const HomePage = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const FEATURED_VIDEO_ID = "1";

  const categories = [
    "All",
    "Gaming",
    "Education",
    "Music",
    "Tech",
    "Live",
    "Cinema",
    "AI",
  ];

  useEffect(() => {
    fetchVideos(activeCategory).then((data) => setVideos(data));
  }, [activeCategory]);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-700">
      {/* HERO SECTION - Now clickable as a whole */}
      <section
        onClick={() => navigate(`/video/${FEATURED_VIDEO_ID}`)}
        className="relative h-[350px] rounded-[2rem] overflow-hidden group shadow-2xl shadow-blue-500/10 cursor-pointer"
      >
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1200"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] via-[#0A0E1A]/20 to-transparent" />

        <div className="absolute bottom-8 left-8 max-w-xl space-y-4 text-left">
          <div className="flex items-center gap-2 bg-[#00F0FF]/20 backdrop-blur-md border border-[#00F0FF]/30 px-3 py-1 rounded-full w-fit">
            <Radio size={14} className="text-[#00F0FF] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00F0FF]">
              Nexus Featured Transmission
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white italic uppercase">
            Exploring the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#7B68EE]">
              Unseen Dimensions
            </span>
          </h2>

          {/* Buttons removed from here */}
        </div>
      </section>

      {/* CATEGORY BAR */}
      <section className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? "bg-[#00F0FF] border-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                : "bg-[#0D1223] border-white/10 text-gray-400 hover:border-white/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* VIDEO GRID */}
      <section>
        <h3 className="text-xl font-bold text-white mb-6 uppercase italic tracking-tighter">
          Recommended for You
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
