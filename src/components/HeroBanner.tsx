"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Content } from "@/data/mockData";

interface HeroBannerProps {
  contents: Content[];
}

export default function HeroBanner({ contents }: HeroBannerProps) {
  const [current, setCurrent] = useState(0);
  const { isFavorite, toggleFavorite, user } = useApp();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % contents.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [contents.length]);

  if (contents.length === 0) return null;
  const content = contents[current];

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] max-h-[700px]">
      <Image
        src={content.thumbnail}
        alt={content.title}
        fill
        className="object-cover"
        unoptimized
        priority
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

      {/* Content info */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-16 max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold px-2 py-1 rounded"
            style={{ backgroundColor: "#FF153C" }}
          >
            {content.category}
          </span>
          <span className="text-xs text-white/60">{content.rating}세 이상</span>
          <span className="text-xs text-white/60">{content.year}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
          {content.title}
        </h1>

        <p className="text-sm text-white/70 mb-5 line-clamp-2 max-w-lg">{content.description}</p>

        <div className="flex items-center gap-3">
          <Link
            href={`/watch/${content.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FF153C" }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            재생하기
          </Link>

          <Link
            href={`/content/${content.id}`}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            상세정보
          </Link>

          {user && (
            <button
              onClick={() => toggleFavorite(content.id)}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill={isFavorite(content.id) ? "#FF153C" : "none"}
                stroke={isFavorite(content.id) ? "#FF153C" : "white"}
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
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        {contents.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
