import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ThumbsUp, Share2, ChevronDown } from "lucide-react";
import { fetchVideos, fetchVideoById } from "../api/mockapi.js";
import { useLibrary } from "../context/LibraryContext";

const VideoDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure liked logic from context
  const { addToHistory, toggleLike, likedVideos } = useLibrary();

  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(
    location.state?.showDetails || false,
  );

  // Check if current video is liked by looking at the global state
  const isLiked = videoData
    ? likedVideos.some((v) => v.id === videoData.id)
    : false;

  const getYouTubeId = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVideoById(id);
      setVideoData(data);

      if (data) {
        addToHistory(data);
      }

      const all = await fetchVideos("All");
      setRelatedVideos(all.filter((v) => v.id.toString() !== id.toString()));
    };

    loadData();
    window.scrollTo(0, 0);
  }, [id, addToHistory]);

  const handleVideoSwitch = (videoId) => {
    navigate(`/video/${videoId}`, { state: { autoPlay: true } });
  };

  if (!videoData) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const videoId = getYouTubeId(videoData.url);

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-[#0A0E1A] min-h-screen text-white">
      <div className="flex-1 space-y-6">
        {/* PLAYER BOX */}
        <div className="aspect-video bg-black rounded-[2rem] overflow-hidden border border-[#00F0FF]/20 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&modestbranding=1&rel=0&playsinline=1&controls=1&enablejsapi=1&origin=${window.location.origin}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={videoData.title}
          />
        </div>

        {/* INFO SECTION */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black tracking-tighter">
            {videoData.title}
          </h1>
          <div className="flex items-center justify-between border-b border-white/5 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00F0FF] to-[#7B68EE] p-0.5">
                <img
                  src={videoData.thumbnail}
                  className="w-full h-full object-cover rounded-full"
                  alt="avatar"
                />
              </div>
              <div>
                <p className="font-bold">{videoData.author}</p>
                <p className="text-xs text-gray-500">
                  {videoData.views} Views • Sector {id}
                </p>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2">
              <button
                onClick={() => toggleLike(videoData)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-white/5 hover:bg-white/10 text-white border border-transparent"
                }`}
              >
                <ThumbsUp
                  size={18}
                  className={isLiked ? "fill-[#00F0FF]" : ""}
                />
                <span className="text-sm font-bold">
                  {isLiked ? "Signaled" : "Signal"}
                </span>
              </button>

              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors border border-transparent">
                <Share2 size={18} />{" "}
                <span className="text-sm font-bold">Export</span>
              </button>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00F0FF]">
                Transmission Log
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isDescriptionExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
            {isDescriptionExpanded && (
              <p className="mt-4 text-sm text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-2">
                {videoData.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="lg:w-80 space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-600">
          Next Transmissions
        </h3>
        {relatedVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoSwitch(video.id)}
            className="flex gap-3 cursor-pointer group hover:bg-white/5 p-2 rounded-xl transition-all"
          >
            <div className="w-28 h-16 bg-gray-800 rounded-lg overflow-hidden shrink-0">
              <img
                src={video.thumbnail}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                alt={video.title}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-[11px] font-bold line-clamp-2 leading-tight group-hover:text-[#00F0FF]">
                {video.title}
              </h4>
              <p className="text-[9px] text-gray-500 mt-1 uppercase">
                {video.author}
              </p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default VideoDetail;
