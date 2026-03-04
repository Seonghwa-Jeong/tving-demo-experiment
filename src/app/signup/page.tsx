"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!agreed) {
      setError("이용약관에 동의해주세요.");
      return;
    }

    const ok = signup(name, email, password);
    if (ok) {
      router.push("/");
    } else {
      setError("이미 사용 중인 이메일입니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/">
            <span className="text-4xl font-black tracking-tighter" style={{ color: "#FF153C" }}>
              TVING
            </span>
          </Link>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-2">회원가입</h1>
          <p className="text-sm text-white/50 mb-6">TVING과 함께 즐거운 스트리밍을 시작하세요</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF153C] transition-colors"
              />
            </div>

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
                placeholder="8자 이상"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF153C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                비밀번호 확인
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#FF153C] transition-colors"
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-[#FF153C]"
              />
              <span className="text-sm text-white/60">
                TVING{" "}
                <span className="text-white/80 underline cursor-pointer">이용약관</span> 및{" "}
                <span className="text-white/80 underline cursor-pointer">개인정보처리방침</span>에
                동의합니다.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90 mt-2"
              style={{ backgroundColor: "#FF153C" }}
            >
              회원가입 완료
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/50">
            이미 회원이신가요?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: "#FF153C" }}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
