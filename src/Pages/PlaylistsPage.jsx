import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ListVideo,
  Play,
  MoreVertical,
  FolderPlus,
  Trash2,
  X,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useLibrary } from "../context/LibraryContext";

const PlaylistsPage = () => {
  // Destructure removeFromPlaylist from your context
  const { playlists, createPlaylist, deletePlaylist, removeFromPlaylist } =
    useLibrary();
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleCreateNew = () => {
    const name = prompt("Enter playlist name:");
    if (name && name.trim() !== "") createPlaylist(name);
  };

  // Function to handle removing a video and updating local view state
  const handleRemoveVideo = (e, playlistId, videoId) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Remove this video from the playlist?")) {
      removeFromPlaylist(playlistId, videoId);
      // Update the local selectedPlaylist state so the UI refreshes immediately
      setSelectedPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((v) => v.id !== videoId),
      }));
    }
  };

  // --- RENDER FOLDER CONTENT ---
  if (selectedPlaylist) {
    return (
      <div className="p-6 lg:p-10 bg-[#0A0E1A] min-h-screen animate-in fade-in duration-500">
        <button
          onClick={() => setSelectedPlaylist(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#00F0FF] transition-colors mb-6 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Return to Collections
          </span>
        </button>

        <div className="flex items-end gap-4 mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#00F0FF]/20 to-[#7B68EE]/20 rounded-2xl border border-[#00F0FF]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <ListVideo className="text-[#00F0FF]" size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
              {selectedPlaylist.title}
            </h1>
            <p className="text-[#00F0FF] text-[10px] font-bold tracking-[0.3em] uppercase mt-1">
              Sector: Internal Storage • {selectedPlaylist.videos.length} Files
              Found
            </p>
          </div>
        </div>

        {selectedPlaylist.videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">
              This folder is currently empty
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedPlaylist.videos.map((video) => (
              <div key={video.id} className="relative group">
                <Link
                  to={`/video/${video.id}`}
                  className="block bg-[#0D1223] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00F0FF]/30 transition-all shadow-xl"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={video.thumbnail}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={video.title}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#00F0FF] rounded-full flex items-center justify-center shadow-[0_0_15px_#00F0FF]">
                        <Play
                          size={20}
                          className="fill-black text-black ml-0.5"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold truncate group-hover:text-[#00F0FF] transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] text-gray-500 font-black uppercase tracking-widest">
                        {video.channel}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-all"
                      />
                    </div>
                  </div>
                </Link>

                {/* REMOVE BUTTON - Top Right Overlay */}
                <button
                  onClick={(e) =>
                    handleRemoveVideo(e, selectedPlaylist.id, video.id)
                  }
                  className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md text-white/50 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all z-20 border border-white/10"
                  title="Remove from playlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- RENDER MAIN PLAYLISTS GRID (SAME AS BEFORE) ---
  return (
    <div className="p-6 lg:p-10 bg-[#0A0E1A] min-h-screen">
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

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
            No Data Streams Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {playlists.map((pl) => (
            <div key={pl.id} className="group relative">
              <div
                onClick={() => setSelectedPlaylist(pl)}
                className="cursor-pointer block relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-3 bg-[#0D1223] transition-all hover:border-[#00F0FF]/50"
              >
                {pl.videos && pl.videos.length > 0 ? (
                  <img
                    src={pl.videos[0].thumbnail}
                    alt={pl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-40"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    <ListVideo className="text-white/5" size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E1A] to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <div className="bg-[#00F0FF]/10 backdrop-blur-md px-4 py-2 rounded-full border border-[#00F0FF]/50 text-[#00F0FF] text-[10px] font-black uppercase tracking-widest">
                    Open Folder
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-[#00F0FF]/10 backdrop-blur-md px-2 py-1 rounded text-[10px] font-black border border-[#00F0FF]/30 text-[#00F0FF]">
                  {pl.videos.length} VIDEOS
                </div>
              </div>

              <div className="flex justify-between items-start px-1 relative">
                <div
                  className="flex-1 min-w-0"
                  onClick={() => setSelectedPlaylist(pl)}
                >
                  <h3 className="font-bold text-white group-hover:text-[#00F0FF] transition-colors truncate cursor-pointer">
                    {pl.title}
                  </h3>
                  <p className="text-gray-600 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
                    Verified User Folder
                  </p>
                </div>

                <div className="relative ml-2">
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === pl.id ? null : pl.id)
                    }
                    className="text-gray-500 hover:text-white transition-colors p-1"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {activeMenu === pl.id && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setActiveMenu(null)}
                      />
                      <div className="absolute right-0 bottom-full mb-2 w-36 bg-[#161B2C] border border-white/10 rounded-xl shadow-2xl z-50 py-1 animate-in slide-in-from-bottom-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deletePlaylist(pl.id);
                            setActiveMenu(null);
                          }}
                          className="w-full text-left px-3 py-2 text-[10px] font-black uppercase text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                        >
                          <Trash2 size={14} /> Delete Folder
                        </button>
                        <button
                          onClick={() => setActiveMenu(null)}
                          className="w-full text-left px-3 py-2 text-[10px] font-black uppercase text-gray-400 hover:bg-white/5 flex items-center gap-2"
                        >
                          <X size={14} /> Close
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;
