"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (ok) {
      router.push("/");
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/">
            <span className="text-4xl font-black tracking-tighter" style={{ color: "#FF153C" }}>
              TVING
            </span>
          </Link>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6">로그인</h1>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF153C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF153C] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90 mt-2"
              style={{ backgroundColor: "#FF153C" }}
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/50">
            아직 회원이 아니신가요?{" "}
            <Link href="/signup" className="font-medium hover:underline" style={{ color: "#FF153C" }}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
