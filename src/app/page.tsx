"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { contents, featuredContents, categories } from "@/data/mockData";
import HeroBanner from "@/components/HeroBanner";
import ContentRow from "@/components/ContentRow";
import Link from "next/link";

function HomeContent() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "전체";

  const filtered =
    selectedCategory === "전체"
      ? contents
      : contents.filter((c) => c.category === selectedCategory);

  const dramas = contents.filter((c) => c.category === "드라마");
  const movies = contents.filter((c) => c.category === "영화");
  const variety = contents.filter((c) => c.category === "예능");
  const kids = contents.filter((c) => c.category === "키즈");
  const sports = contents.filter((c) => c.category === "스포츠");
  const topRated = [...contents].sort((a, b) => b.score - a.score).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {selectedCategory === "전체" && <HeroBanner contents={featuredContents} />}

      <div
        className="px-6 pt-8 pb-4 flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((cat) => (
          <Link
            key={cat}
            href={cat === "전체" ? "/" : `/?category=${cat}`}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "text-white"
                : "text-white/60 bg-white/10 hover:bg-white/20"
            }`}
            style={selectedCategory === cat ? { backgroundColor: "#FF153C" } : {}}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="pb-16">
        {selectedCategory === "전체" ? (
          <>
            <ContentRow title="인기 TOP 콘텐츠" contents={topRated} />
            <ContentRow title="드라마" contents={dramas} />
            <ContentRow title="영화" contents={movies} />
            <ContentRow title="예능" contents={variety} />
            <ContentRow title="키즈" contents={kids} />
            <ContentRow title="스포츠" contents={sports} />
          </>
        ) : (
          <ContentRow title={`${selectedCategory} 전체`} contents={filtered} />
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f0f0f]" />}>
      <HomeContent />
    </Suspense>
  );
}
