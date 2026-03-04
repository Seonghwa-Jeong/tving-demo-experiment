"use client";

import Image from "next/image";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Content } from "@/data/mockData";

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  const { isFavorite, toggleFavorite, user, getWatchProgress } = useApp();
  const progress = getWatchProgress(content.id);
  const favorite = isFavorite(content.id);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}시간 ${m}분`;
    return `${m}분`;
  };

  return (
    <div className="group relative flex-shrink-0 w-52 cursor-pointer">
      <Link href={`/content/${content.id}`}>
        <div className="relative w-52 h-[117px] rounded-lg overflow-hidden bg-[#2a2a2a]">
          <Image
            src={content.thumbnail}
            alt={content.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

          {/* Rating badge */}
          <div className="absolute top-2 left-2 px-1.5 py-0.5 text-xs font-bold text-white bg-black/60 rounded">
            {content.rating}
          </div>

          {/* Favorite button */}
          {user && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(content.id);
              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                fill={favorite ? "#FF153C" : "none"}
                stroke={favorite ? "#FF153C" : "white"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}

          {/* Play icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {/* Progress bar */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
              <div
                className="h-full"
                style={{ width: `${progress}%`, backgroundColor: "#FF153C" }}
              />
            </div>
          )}
        </div>
      </Link>

      <div className="mt-2 px-0.5">
        <Link href={`/content/${content.id}`}>
          <h3 className="text-sm font-medium text-white truncate hover:text-white/80">
            {content.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-white/50">{content.year}</span>
          <span className="text-xs text-white/30">•</span>
          <span className="text-xs text-white/50">{formatDuration(content.duration)}</span>
          {content.score && (
            <>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs font-medium" style={{ color: "#FF153C" }}>
                ★ {content.score}
              </span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {content.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] px-1.5 py-0.5 rounded text-white/60 bg-white/10"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
