"use client";

import { useRef } from "react";
import ContentCard from "./ContentCard";
import { Content } from "@/data/mockData";

interface ContentRowProps {
  title: string;
  contents: Content[];
}

export default function ContentRow({ title, contents }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: dir === "left" ? -600 : 600, behavior: "smooth" });
    }
  };

  if (contents.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 px-6">{title}</h2>
      <div className="relative group/row">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-[117px] flex items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={rowRef}
          className="flex gap-3 overflow-x-auto scroll-smooth px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-[117px] flex items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
