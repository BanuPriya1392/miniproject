import React, { useState, useEffect } from "react";
// Ensure this points to your new Sheety logic file
import { fetchVideos } from "../api/mockapi";
import VideoCard from "../Components/VideoCard";

const CategoryPage = ({ title, category }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchVideos(category);
        if (isMounted) setVideos(data || []);
      } catch (err) {
        if (isMounted) setError("Failed to connect to the uplink.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [category]);

  // Clean the title: If title already includes "Sector", remove it so we don't double it
  const cleanTitle = title?.toUpperCase().replace("SECTOR", "").trim();

  const Skeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, n) => (
        <div key={n} className="space-y-3 animate-pulse">
          <div className="aspect-video bg-white/5 rounded-2xl" />
          <div className="h-4 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-1/2 bg-white/5 rounded" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700 min-h-screen bg-[#0A0E1A]">
      <header className="relative">
        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">
            {/* We use cleanTitle here to prevent "Gaming Sector Sector" */}
            {cleanTitle} <span className="text-[#00F0FF]">Sector</span>
          </h2>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            {videos.length} Transmissions
          </span>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-[#00F0FF] to-transparent mt-2" />
      </header>

      {loading ? (
        <Skeletons />
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-red-400 italic font-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm text-[#00F0FF] underline"
          >
            Try Reconnecting
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <VideoCard key={video.id || video.title} video={video} />
            ))
          ) : (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full mb-4 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-dashed border-gray-600 rounded-full animate-spin" />
              </div>
              <p className="text-gray-500 italic">
                No transmissions found in the {category} sector...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
