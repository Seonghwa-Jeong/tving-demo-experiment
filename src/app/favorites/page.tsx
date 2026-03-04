"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { contents } from "@/data/mockData";
import ContentCard from "@/components/ContentCard";

export default function FavoritesPage() {
  const { user, favorites } = useApp();
  const router = useRouter();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">로그인이 필요합니다</h2>
          <p className="text-sm text-white/50 mb-6">즐겨찾기 기능을 이용하려면 로그인하세요.</p>
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

  const favoriteContents = contents.filter((c) => favorites.includes(c.id));

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
            <h1 className="text-2xl font-bold text-white">즐겨찾기</h1>
            <p className="text-sm text-white/40">{favoriteContents.length}개의 콘텐츠</p>
          </div>
        </div>

        {favoriteContents.length === 0 ? (
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-white/40 text-lg mb-2">즐겨찾기한 콘텐츠가 없습니다</p>
            <p className="text-white/30 text-sm mb-6">
              콘텐츠에서 하트 버튼을 눌러 즐겨찾기를 추가해보세요
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
          <div className="flex flex-wrap gap-4">
            {favoriteContents.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
