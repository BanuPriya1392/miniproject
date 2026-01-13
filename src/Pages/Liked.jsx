import React from "react";
import { Link } from "react-router-dom";
import { ThumbsUp, Play, Clock, User, HeartOff } from "lucide-react";
import { useLibrary } from "../context/LibraryContext";

const Liked = () => {
  const { likedVideos, toggleLike } = useLibrary();

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white p-6">
      {/* HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] flex items-center justify-center">
            <ThumbsUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter">
              Liked Videos
            </h1>
            <p className="text-gray-400 text-sm">
              Your personal collection of favorite transmissions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4 text-[#00F0FF]" />
          <span>Sync Active</span>
          <span className="mx-2">•</span>
          <User className="w-4 h-4" />
          <span>{likedVideos.length} transmissions</span>
        </div>
      </div>

      {/* VIDEOS GRID */}
      {likedVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedVideos.map((video) => (
            <div key={video.id} className="group relative">
              <Link to={`/video/${video.id}`}>
                <div className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#00F0FF]/30 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold line-clamp-2 group-hover:text-[#00F0FF] transition-colors uppercase text-sm tracking-tight">
                      {video.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 font-bold">
                      {video.author}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
                        {video.views}
                      </span>
                      <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 font-bold border border-white/5">
                        {video.tag || "Archive"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Quick Remove Button */}
              <button
                onClick={() => toggleLike(video)}
                className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:bg-red-500/20"
              >
                <HeartOff size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <ThumbsUp className="w-16 h-16 text-gray-800 mb-6" />
          <h3 className="text-xl font-bold mb-2 uppercase italic text-gray-400">
            No signals archived
          </h3>
          <Link
            to="/explore"
            className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-[#00F0FF] to-[#7B68EE] font-black text-xs uppercase tracking-widest transition-all"
          >
            Scan Sector
          </Link>
        </div>
      )}
    </div>
  );
};

export default Liked;
