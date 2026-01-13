import React from "react";
import { Bookmark, Trash2, Play, Ghost, XCircle } from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import { Link } from "react-router-dom";

const WatchlistPage = () => {
  // Accessing real data and the clear functionality from context
  const { watchlist, toggleWatchlist, clearWatchlist } = useLibrary();

  return (
    <div className="p-6 lg:p-10 bg-[#0A0E1A] min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#7B68EE]/10 rounded-xl">
            <Bookmark className="text-[#7B68EE]" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
              Watch Later
            </h1>
            <p className="text-[#7B68EE] text-[10px] font-black uppercase tracking-[0.2em]">
              {watchlist.length} Saved Protocols
            </p>
          </div>
        </div>

        {/* CLEAR ALL BUTTON */}
        {watchlist.length > 0 && (
          <button
            onClick={clearWatchlist}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/20 transition-all font-bold text-xs uppercase tracking-tighter"
          >
            <XCircle size={16} />
            Clear All
          </button>
        )}
      </div>

      {/* CONTENT SECTION */}
      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-white/5 rounded-3xl bg-[#0D1223]/20">
          <Ghost size={48} className="text-gray-800 mb-4 animate-pulse" />
          <p className="text-gray-500 font-bold mb-2 text-lg">
            Nexus Watchlist Offline
          </p>
          <Link
            to="/explore"
            className="text-[#00F0FF] text-sm hover:underline font-black uppercase tracking-widest"
          >
            Scan for Content
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl space-y-4">
          {watchlist.map((video) => (
            <div
              key={video.id}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-[#0D1223]/50 border border-white/5 hover:border-[#00F0FF]/30 transition-all group relative overflow-hidden"
            >
              {/* Thumbnail with Link to play video */}
              <Link
                to={`/video/${video.id}`}
                className="relative w-full sm:w-56 aspect-video rounded-xl overflow-hidden shrink-0 border border-white/10"
              >
                <img
                  src={video.thumbnail || video.thumb}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-[#00F0FF] border border-[#00F0FF]/20">
                  {video.duration || "12:45"}
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play size={30} className="text-[#00F0FF] fill-[#00F0FF]" />
                </div>
              </Link>

              {/* Video Info */}
              <div className="flex flex-col justify-between py-1 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00F0FF] transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 font-medium">
                    {video.author || video.channel}
                  </p>
                </div>

                <div className="flex items-center gap-6 mt-4">
                  <button
                    onClick={() => toggleWatchlist(video)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                  {/* Optional Metadata display in place of the button */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-700">
                    Added to Library
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
