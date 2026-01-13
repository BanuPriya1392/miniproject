import React from "react";
import { Link } from "react-router-dom";
import { Clock, Play, Calendar, Trash2 } from "lucide-react";
import { useLibrary } from "../context/LibraryContext";

const History = () => {
  const { history, clearHistory } = useLibrary();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tight">
              Watch History
            </h1>
            <p className="text-gray-400 text-sm">
              Record of all transmissions accessed by your terminal
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 text-red-400 transition-all font-bold text-xs uppercase"
          >
            <Trash2 className="w-4 h-4" />
            Clear Archive
          </button>
        )}
      </div>

      {/* INFO BAR */}
      {history.length > 0 && (
        <div className="bg-gray-900/50 rounded-xl p-4 mb-8 border border-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#00F0FF]" />
                <span className="text-sm font-black uppercase tracking-widest">
                  Active Logs
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500 font-bold">
                  {history.length} total transmissions
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY LIST */}
      <div className="space-y-4">
        {history.map((video, index) => (
          <Link
            key={`${video.id}-${index}`}
            to={`/video/${video.id}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#0D1223]/50 border border-white/5 hover:border-[#00F0FF]/30 hover:bg-[#0D1223] group transition-all"
          >
            {/* INDEX */}
            <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center text-xs font-black text-gray-600 border border-white/5">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* THUMBNAIL */}
            <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-[#00F0FF] fill-[#00F0FF]" />
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h3 className="font-bold text-sm line-clamp-1 group-hover:text-[#00F0FF] transition-colors uppercase tracking-tight">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-bold">
                {video.author}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                  {video.views}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 font-bold">
                  {video.tag || "Archive"}
                </span>
              </div>
            </div>

            {/* STATUS */}
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">
                Watched
              </span>
              <div className="mt-1 text-[#00F0FF] opacity-50">
                <Play size={12} fill="currentColor" className="ml-auto" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* EMPTY STATE */}
      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-gray-700" />
          </div>
          <h3 className="text-xl font-bold mb-2 uppercase italic">
            No Watch History Found
          </h3>
          <p className="text-gray-500 text-center max-w-sm mb-8 text-sm font-medium">
            Your viewed transmissions will appear here once the archive node is
            active.
          </p>
          <Link
            to="/explore"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#7B68EE] font-black text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
          >
            Explore Videos
          </Link>
        </div>
      )}
    </div>
  );
};

export default History;
