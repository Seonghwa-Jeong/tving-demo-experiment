"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { contents } from "@/data/mockData";
import { useApp } from "@/context/AppContext";
import ContentRow from "@/components/ContentRow";
import * as amplitude from "@amplitude/unified";

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, toggleFavorite, user, getWatchProgress } = useApp();

  const content = contents.find((c) => c.id === id);

  useEffect(() => {
    if (!content) return;
    amplitude.track("Content Viewed", {
      content_id: content.id,
      content_title: content.title,
      content_category: content.category,
      content_year: content.year,
    });
  }, [content?.id]);

  if (!content) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-white/50 text-lg mb-4">콘텐츠를 찾을 수 없습니다.</p>
          <Link href="/" className="text-sm hover:underline" style={{ color: "#FF153C" }}>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const related = contents
    .filter((c) => c.id !== content.id && (c.category === content.category || c.genres.some((g) => content.genres.includes(g))))
    .slice(0, 6);

  const progress = getWatchProgress(content.id);
  const favorite = isFavorite(content.id);

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}시간 ${m}분`;
    return `${m}분`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Hero */}
      <div className="relative w-full h-[55vh] min-h-[400px]">
        <Image
          src={content.thumbnail}
          alt={content.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/30" />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-20 left-6 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-8 left-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: "#FF153C" }}
            >
              {content.category}
            </span>
            <span className="text-xs text-white/60">{content.rating}세 이상</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white">{content.title}</h1>
        </div>
      </div>

      {/* Detail section */}
      <div className="max-w-screen-xl mx-auto px-6 pb-16 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2">
            {/* Action buttons */}
            <div className="flex items-center gap-3 mb-6">
              <Link
                href={`/watch/${content.id}`}
                className="flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white text-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#FF153C" }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {progress > 0 ? `이어보기 (${Math.round(progress)}%)` : "재생하기"}
              </Link>

              {user && (
                <button
                  onClick={() => {
                    amplitude.track(favorite ? "Favorite Removed" : "Favorite Added", {
                      content_id: content.id,
                      content_title: content.title,
                      content_category: content.category,
                    });
                    toggleFavorite(content.id);
                  }}
                  className={`flex items-center gap-2 px-7 py-3.5 rounded-lg text-sm font-medium border transition-colors ${
                    favorite
                      ? "border-[#FF153C] text-[#FF153C]"
                      : "border-white/20 text-white/70 hover:border-white/40"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={favorite ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {favorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                </button>
              )}
            </div>

            {/* Progress bar */}
            {progress > 0 && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-white/50 mb-1.5">
                  <span>시청 진행도</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${progress}%`, backgroundColor: "#FF153C" }}
                  />
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-white/70 leading-relaxed mb-6">{content.description}</p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {content.genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-full text-sm text-white/70 border border-white/20"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Meta info */}
          <div className="bg-[#1a1a1a] rounded-xl p-5 h-fit space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/50">평점</span>
              <span className="font-bold text-lg" style={{ color: "#FF153C" }}>
                ★ {content.score}
              </span>
            </div>
            <hr className="border-white/10" />
            <div className="flex justify-between">
              <span className="text-sm text-white/50">연도</span>
              <span className="text-sm text-white">{content.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/50">러닝타임</span>
              <span className="text-sm text-white">{formatDuration(content.duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/50">관람등급</span>
              <span className="text-sm text-white">{content.rating}세 이상</span>
            </div>
            {content.episodes && (
              <div className="flex justify-between">
                <span className="text-sm text-white/50">에피소드</span>
                <span className="text-sm text-white">{content.episodes}편</span>
              </div>
            )}
            {content.director && (
              <div className="flex justify-between">
                <span className="text-sm text-white/50">감독</span>
                <span className="text-sm text-white">{content.director}</span>
              </div>
            )}
            {content.cast && content.cast.length > 0 && (
              <div>
                <span className="text-sm text-white/50 block mb-2">출연진</span>
                <div className="flex flex-wrap gap-1.5">
                  {content.cast.map((actor) => (
                    <span
                      key={actor}
                      className="text-xs px-2 py-1 rounded bg-white/10 text-white/70"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <ContentRow title="관련 콘텐츠" contents={related} />
          </div>
        )}
      </div>
    </div>
  );
}
