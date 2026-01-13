import React, { createContext, useContext, useState, useEffect } from "react";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("nexus_watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("nexus_playlists");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "pl-1", title: "Quantum Basics", videos: [] },
          { id: "pl-2", title: "Cyber Beats", videos: [] },
        ];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("nexus_history");
    return saved ? JSON.parse(saved) : [];
  });

  // NEW: Liked Videos State
  const [likedVideos, setLikedVideos] = useState(() => {
    const saved = localStorage.getItem("nexus_liked");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("nexus_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("nexus_playlists", JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem("nexus_history", JSON.stringify(history));
  }, [history]);

  // NEW: Sync Liked to LocalStorage
  useEffect(() => {
    localStorage.setItem("nexus_liked", JSON.stringify(likedVideos));
  }, [likedVideos]);

  // --- LIKED LOGIC ---
  const toggleLike = (video) => {
    setLikedVideos((prev) => {
      const isLiked = prev.some((v) => v.id === video.id);
      if (isLiked) {
        return prev.filter((v) => v.id !== video.id);
      } else {
        return [video, ...prev]; // Add to top
      }
    });
  };

  const addToHistory = (video) => {
    setHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      return [video, ...filtered].slice(0, 50);
    });
  };

  const clearHistory = () => {
    if (window.confirm("Clear all watch history?")) setHistory([]);
  };

  const toggleWatchlist = (video) => {
    setWatchlist((prev) => {
      const isSaved = prev.some((v) => v.id === video.id);
      return isSaved ? prev.filter((v) => v.id !== video.id) : [video, ...prev];
    });
  };

  const clearWatchlist = () => {
    if (window.confirm("Clear entire watchlist?")) setWatchlist([]);
  };

  const createPlaylist = (title) => {
    const newPlaylist = { id: `pl-${Date.now()}`, title, videos: [] };
    setPlaylists([...playlists, newPlaylist]);
  };

  const deletePlaylist = (playlistId) => {
    if (window.confirm("Delete this playlist?")) {
      setPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    }
  };

  const addToPlaylist = (playlistId, video) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          const exists = pl.videos.some((v) => v.id === video.id);
          return exists ? pl : { ...pl, videos: [...pl.videos, video] };
        }
        return pl;
      })
    );
  };

  const removeFromPlaylist = (playlistId, videoId) => {
    setPlaylists((prev) =>
      prev.map((pl) => {
        if (pl.id === playlistId) {
          return { ...pl, videos: pl.videos.filter((v) => v.id !== videoId) };
        }
        return pl;
      })
    );
  };

  return (
    <LibraryContext.Provider
      value={{
        watchlist,
        toggleWatchlist,
        clearWatchlist,
        playlists,
        createPlaylist,
        deletePlaylist,
        addToPlaylist,
        removeFromPlaylist,
        history,
        addToHistory,
        clearHistory,
        likedVideos, // Exported
        toggleLike, // Exported
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
