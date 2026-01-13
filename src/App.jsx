import React, { useState, createContext, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LibraryProvider } from "./context/LibraryContext";
import Layout from "./Components/Layout";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import HomePage from "./Pages/HomePage";
import Explore from "./Pages/Explore";
import CategoryPage from "./Pages/CategoryPage";
import VideoDetail from "./Pages/VideoDetail";
import PlaylistsPage from "./Pages/PlaylistsPage";
import WatchlistPage from "./Pages/WatchlistPage";
import History from "./Pages/History";
import Liked from "./Pages/Liked";

// --- AUTH CONTEXT ---
export const AuthContext = createContext();

function App() {
  // Initialize user from localStorage for persistence
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nexus_user");
    return saved
      ? JSON.parse(saved)
      : { name: "GUEST", email: "guest@nexus.core" };
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("nexus_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ name: "GUEST", email: "guest@nexus.core" });
    localStorage.removeItem("nexus_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <LibraryProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="explore" element={<Explore />} />
              <Route
                path="live"
                element={<CategoryPage title="Live Sector" category="Live" />}
              />
              <Route path="history" element={<History />} />
              <Route path="playlists" element={<PlaylistsPage />} />
              <Route path="watchlist" element={<WatchlistPage />} />
              <Route path="liked" element={<Liked />} />
              <Route
                path="gaming"
                element={
                  <CategoryPage title="Gaming Sector" category="Gaming" />
                }
              />
              <Route
                path="music"
                element={<CategoryPage title="Music Sector" category="Music" />}
              />
              <Route
                path="education"
                element={
                  <CategoryPage title="Education Sector" category="Education" />
                }
              />
              <Route
                path="cinema"
                element={
                  <CategoryPage title="Cinema Sector" category="Cinema" />
                }
              />
              <Route
                path="tech"
                element={<CategoryPage title="Tech Sector" category="Tech" />}
              />
              <Route
                path="ai"
                element={<CategoryPage title="AI Sector" category="AI" />}
              />
              <Route path="video/:id" element={<VideoDetail />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
          </Routes>
        </LibraryProvider>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
