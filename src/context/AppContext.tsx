"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Content } from "@/data/mockData";
import * as amplitude from "@amplitude/unified";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface WatchHistory {
  contentId: string;
  progress: number; // 0-100
  lastWatched: string;
  duration: number;
}

interface AppContextType {
  user: User | null;
  favorites: string[];
  watchHistory: WatchHistory[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  toggleFavorite: (contentId: string) => void;
  isFavorite: (contentId: string) => boolean;
  updateWatchHistory: (contentId: string, progress: number, duration: number) => void;
  getWatchProgress: (contentId: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("tving_user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedFavorites = localStorage.getItem("tving_favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

    const storedHistory = localStorage.getItem("tving_watch_history");
    if (storedHistory) setWatchHistory(JSON.parse(storedHistory));
  }, []);

  const login = (email: string, password: string): boolean => {
    const users: (User & { password: string })[] = JSON.parse(
      localStorage.getItem("tving_users") || "[]"
    );
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("tving_user", JSON.stringify(userData));
      amplitude.setUserId(found.id);
      amplitude.experiment()?.fetch().then(() => {
        window.dispatchEvent(new Event("amplitude:variants-updated"));
      });

      const userFavorites = JSON.parse(
        localStorage.getItem(`tving_favorites_${found.id}`) || "[]"
      );
      setFavorites(userFavorites);

      const userHistory = JSON.parse(
        localStorage.getItem(`tving_history_${found.id}`) || "[]"
      );
      setWatchHistory(userHistory);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    const users: (User & { password: string })[] = JSON.parse(
      localStorage.getItem("tving_users") || "[]"
    );
    if (users.find((u) => u.email === email)) return false;

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("tving_users", JSON.stringify(users));

    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem("tving_user", JSON.stringify(userData));
    amplitude.setUserId(newUser.id);
    setFavorites([]);
    setWatchHistory([]);
    return true;
  };

  const logout = () => {
    if (user) {
      localStorage.setItem(`tving_favorites_${user.id}`, JSON.stringify(favorites));
      localStorage.setItem(`tving_history_${user.id}`, JSON.stringify(watchHistory));
    }
    setUser(null);
    setFavorites([]);
    setWatchHistory([]);
    localStorage.removeItem("tving_user");
    amplitude.reset();
    amplitude.experiment()?.fetch().then(() => {
      window.dispatchEvent(new Event("amplitude:variants-updated"));
    });
  };

  const toggleFavorite = (contentId: string) => {
    if (!user) return;
    const updated = favorites.includes(contentId)
      ? favorites.filter((id) => id !== contentId)
      : [...favorites, contentId];
    setFavorites(updated);
    localStorage.setItem(`tving_favorites_${user.id}`, JSON.stringify(updated));
  };

  const isFavorite = (contentId: string) => favorites.includes(contentId);

  const updateWatchHistory = (contentId: string, progress: number, duration: number) => {
    if (!user) return;
    const updated = watchHistory.filter((h) => h.contentId !== contentId);
    updated.unshift({
      contentId,
      progress,
      lastWatched: new Date().toISOString(),
      duration,
    });
    const trimmed = updated.slice(0, 20);
    setWatchHistory(trimmed);
    localStorage.setItem(`tving_history_${user.id}`, JSON.stringify(trimmed));
  };

  const getWatchProgress = (contentId: string): number => {
    const item = watchHistory.find((h) => h.contentId === contentId);
    return item?.progress || 0;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        favorites,
        watchHistory,
        login,
        signup,
        logout,
        toggleFavorite,
        isFavorite,
        updateWatchHistory,
        getWatchProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
