import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added Link and useNavigate
import {
  ListVideo,
  Play,
  MoreVertical,
  FolderPlus,
  Trash2,
  X,
} from "lucide-react";
import { useLibrary } from "../context/LibraryContext";

const PlaylistsPage = () => {
  const { playlists, createPlaylist, deletePlaylist } = useLibrary();
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const handleCreateNew = () => {
    const name = prompt("Enter playlist name:");
    if (name && name.trim() !== "") createPlaylist(name);
  };

  return (
    <div className="p-6 lg:p-10 bg-[#0A0E1A] min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#00F0FF]/10 rounded-xl">
            <ListVideo className="text-[#00F0FF]" size={28} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">
            Your Playlists
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] px-4 py-2 rounded-xl border border-[#00F0FF]/30 transition-all font-bold text-xs uppercase tracking-widest"
        >
          <FolderPlus size={18} />
          New Collection
        </button>
      </div>

      {/* GRID */}
      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            No Data Streams Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((pl) => {
            // Determine the link: If playlist has videos, play the first one, else do nothing
            const firstVideoPath =
              pl.videos && pl.videos.length > 0
                ? `/video/${pl.videos[0].id}`
                : "#";

            return (
              <div key={pl.id} className="group relative">
                {/* WRAPPER FOR THUMBNAIL & PLAY ACTION */}
                <Link
                  to={firstVideoPath}
                  className="block relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-3 bg-[#0D1223]"
                >
                  {pl.videos && pl.videos.length > 0 ? (
                    <img
                      src={pl.videos[0].thumbnail}
                      alt={pl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-50"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <ListVideo className="text-white/5" size={48} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                  {/* PLAY OVERLAY */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-12 h-12 bg-[#00F0FF] rounded-full flex items-center justify-center shadow-[0_0_20px_#00F0FF]">
                      <Play className="fill-black text-black ml-1" size={24} />
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#0D1223]/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black border border-white/10 text-[#00F0FF]">
                    {pl.videos.length} VIDEOS
                  </div>
                </Link>

                {/* TEXT INFO & MENU */}
                <div className="flex justify-between items-start px-1 relative">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white group-hover:text-[#00F0FF] transition-colors truncate">
                      {pl.title}
                    </h3>
                    <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                      Verified User Folder
                    </p>
                  </div>

                  <div className="relative ml-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigating to video when clicking menu
                        setActiveMenu(activeMenu === pl.id ? null : pl.id);
                      }}
                      className="text-gray-500 hover:text-white transition-colors p-1"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* DROP DOWN MENU */}
                    {activeMenu === pl.id && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setActiveMenu(null)}
                        />
                        <div className="absolute right-0 bottom-full mb-2 w-36 bg-[#161B2C] border border-white/10 rounded-xl shadow-2xl z-50 py-1 animate-in slide-in-from-bottom-2 duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePlaylist(pl.id);
                              setActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-tighter text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 size={14} /> Delete Folder
                          </button>
                          <button
                            onClick={() => setActiveMenu(null)}
                            className="w-full text-left px-3 py-2 text-[10px] font-black uppercase tracking-tighter text-gray-400 hover:bg-white/5 flex items-center gap-2 transition-colors"
                          >
                            <X size={14} /> Close
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
