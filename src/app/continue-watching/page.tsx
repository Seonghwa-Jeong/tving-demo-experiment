"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { contents } from "@/data/mockData";

export default function ContinueWatchingPage() {
  const { user, watchHistory } = useApp();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">로그인이 필요합니다</h2>
          <p className="text-sm text-white/50 mb-6">시청 기록을 보려면 로그인하세요.</p>
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg font-bold text-white text-sm hover:opacity-90"
            style={{ backgroundColor: "#FF153C" }}
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  const historyContents = watchHistory
    .map((h) => ({
      history: h,
      content: contents.find((c) => c.id === h.contentId),
    }))
    .filter((item) => item.content !== undefined);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "방금 전";
    if (mins < 60) return `${mins}분 전`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}시간 ${m}분`;
    return `${m}분`;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-24 px-6 pb-16">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">이어보기</h1>
            <p className="text-sm text-white/40">최근 시청한 콘텐츠 {historyContents.length}개</p>
          </div>
        </div>

        {historyContents.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-white/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-white/40 text-lg mb-2">시청 기록이 없습니다</p>
            <p className="text-white/30 text-sm mb-6">
              콘텐츠를 재생하면 여기에 기록이 남습니다
            </p>
            <Link
              href="/"
              className="px-6 py-3 rounded-lg font-bold text-white text-sm hover:opacity-90"
              style={{ backgroundColor: "#FF153C" }}
            >
              콘텐츠 둘러보기
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {historyContents.map(({ history, content }) => (
              <div
                key={history.contentId}
                className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:bg-[#222] transition-colors group"
              >
                <Link href={`/watch/${content!.id}`}>
                  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                    <Image
                      src={content!.thumbnail}
                      alt={content!.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div
                        className="h-full"
                        style={{ width: `${history.progress}%`, backgroundColor: "#FF153C" }}
                      />
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate">{content!.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-white/40">{formatDate(history.lastWatched)}</span>
                        <span className="text-xs text-white/30">•</span>
                        <span className="text-xs text-white/40">
                          {formatDuration(Math.round((history.duration * history.progress) / 100))} 시청
                        </span>
                      </div>
                    </div>
                    <span
                      className="flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded"
                      style={{ color: "#FF153C", backgroundColor: "#FF153C22" }}
                    >
                      {Math.round(history.progress)}%
                    </span>
                  </div>

                  <div className="mt-3 h-1 bg-white/10 rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${history.progress}%`, backgroundColor: "#FF153C" }}
                    />
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/watch/${content!.id}`}
                      className="flex-1 py-2 rounded-lg text-xs font-bold text-white text-center hover:opacity-90"
                      style={{ backgroundColor: "#FF153C" }}
                    >
                      이어보기
                    </Link>
                    <Link
                      href={`/content/${content!.id}`}
                      className="px-3 py-2 rounded-lg text-xs text-white/60 bg-white/10 hover:bg-white/20"
                    >
                      상세정보
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
