import React, { createContext, useState, useEffect } from "react";

export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  // Load existing videos on mount
  useEffect(() => {
    const savedVideos = JSON.parse(
      localStorage.getItem("nexus_videos") || "[]",
    );
    setVideos(savedVideos);
  }, []);

  const addVideo = (newVideo) => {
    const updatedVideos = [newVideo, ...videos];
    setVideos(updatedVideos);
    localStorage.setItem("nexus_videos", JSON.stringify(updatedVideos));
  };

  return (
    <VideoContext.Provider value={{ videos, addVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
