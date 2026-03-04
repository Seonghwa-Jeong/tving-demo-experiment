"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contents } from "@/data/mockData";
import { useApp } from "@/context/AppContext";

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user, updateWatchHistory, getWatchProgress, isFavorite, toggleFavorite } = useApp();
  const [showInfo, setShowInfo] = useState(true);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const content = contents.find((c) => c.id === id);

  useEffect(() => {
    if (!content) return;
    const initial = getWatchProgress(content.id);
    setSimulatedProgress(initial);

    // Hide info overlay after 3 seconds
    const timer = setTimeout(() => setShowInfo(false), 3000);
    return () => clearTimeout(timer);
  }, [content?.id]);

  // Simulate progress tracking (increments 1% every 6 seconds when "playing")
  useEffect(() => {
    if (!content || !user) return;

    progressInterval.current = setInterval(() => {
      setSimulatedProgress((prev) => {
        const next = Math.min(prev + 1, 100);
        updateWatchHistory(content.id, next, content.duration);
        return next;
      });
    }, 6000);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [content?.id, user]);

  if (!content) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/50 mb-4">콘텐츠를 찾을 수 없습니다.</p>
          <Link href="/" style={{ color: "#FF153C" }} className="hover:underline text-sm">
            홈으로
          </Link>
        </div>
      </div>
    );
  }

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${content.videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="min-h-screen bg-black">
      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent px-6 py-4 flex items-center justify-between transition-opacity duration-300 ${
          showInfo ? "opacity-100" : "opacity-0 hover:opacity-100"
        }`}
        onMouseMove={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">뒤로가기</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-white font-semibold">{content.title}</span>
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={() => toggleFavorite(content.id)}
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
            >
              <svg
                className="w-4 h-4"
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
          <Link
            href={`/content/${content.id}`}
            className="text-xs text-white/60 hover:text-white px-3 py-1.5 rounded bg-white/10"
          >
            상세정보
          </Link>
        </div>
      </div>

      {/* YouTube Player */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={youtubeEmbedUrl}
          title={content.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      {/* Progress indicator */}
      {user && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10">
          <div
            className="h-full transition-all duration-1000"
            style={{ width: `${simulatedProgress}%`, backgroundColor: "#FF153C" }}
          />
        </div>
      )}

      {/* Content info below player */}
      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded text-white"
                style={{ backgroundColor: "#FF153C" }}
              >
                {content.category}
              </span>
              <span className="text-xs text-white/50">{content.year}</span>
              <span className="text-xs text-white/50">{content.rating}세 이상</span>
            </div>
            <h1 className="text-xl font-bold text-white mb-2">{content.title}</h1>
            <p className="text-sm text-white/60 leading-relaxed max-w-2xl">{content.description}</p>
          </div>

          <div className="flex-shrink-0 text-right">
            <div className="text-2xl font-bold" style={{ color: "#FF153C" }}>
              ★ {content.score}
            </div>
            <div className="text-xs text-white/40 mt-1">평점</div>
          </div>
        </div>

        {!user && (
          <div
            className="mt-6 p-4 rounded-xl border text-sm"
            style={{ borderColor: "#FF153C33", backgroundColor: "#FF153C11" }}
          >
            <span className="text-white/70">
              시청 기록을 저장하려면{" "}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: "#FF153C" }}>
                로그인
              </Link>
              하세요.
            </span>
          </div>
        )}

        {user && simulatedProgress > 0 && (
          <div className="mt-6 p-4 rounded-xl bg-white/5">
            <div className="flex justify-between text-xs text-white/50 mb-2">
              <span>시청 진행도</span>
              <span>{Math.round(simulatedProgress)}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${simulatedProgress}%`, backgroundColor: "#FF153C" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
