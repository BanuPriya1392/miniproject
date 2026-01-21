import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Play, Filter, Search as SearchIcon } from "lucide-react";

import { fetchVideos } from "../api/videosapi.js";
const Explore = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Get the search query from the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const data = await fetchVideos("All");
      setVideos(data);
      setLoading(false);
    };
    loadVideos();
  }, []);

  // 2. Filter logic: Runs whenever videos load OR the searchTerm in URL changes
  useEffect(() => {
    if (searchTerm) {
      const results = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.author.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredVideos(results);
    } else {
      setFilteredVideos(videos);
    }
  }, [searchTerm, videos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0A0E1A] min-h-screen">
      {/* HEADER SECTION */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[#00F0FF] mb-2">
          <Filter size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Sector Scan
          </span>
        </div>
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">
          {searchTerm ? `Results for: ${searchTerm}` : "Global Transmissions"}
        </h1>
      </div>

      {/* RESULTS GRID */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Link
              key={video.id}
              to={`/video/${video.id}`}
              className="group bg-[#0D1223] rounded-2xl overflow-hidden border border-white/5 hover:border-[#00F0FF]/30 transition-all duration-500 shadow-xl"
            >
              {/* THUMBNAIL */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-3 right-3 bg-[#00F0FF] text-black p-2 rounded-full translate-y-12 group-hover:translate-y-0 transition-transform shadow-[0_0_15px_#00F0FF]">
                  <Play size={16} fill="black" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-bold text-sm line-clamp-2 group-hover:text-[#00F0FF] transition-colors uppercase tracking-tight">
                  {video.title}
                </h3>
                <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-widest">
                  {video.author}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[9px] text-gray-600 font-black">
                    {video.views} Views
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-[#00F0FF] border border-[#00F0FF]/20 font-bold">
                    {video.tag}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* NO RESULTS STATE */
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-[3rem]">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <SearchIcon className="w-10 h-10 text-gray-700" />
          </div>
          <h2 className="text-xl font-black uppercase italic text-gray-400">
            No signals found
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Try searching for a different frequency or sector.
          </p>
        </div>
      )}
    </div>
  );
};

export default Explore;
