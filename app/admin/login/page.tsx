"use client";

import React, { useState } from "react";
import { Loader2, Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login gagal.");
        return;
      }

      window.location.href = "/admin";
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#111] p-4 text-black">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1500px] overflow-hidden border border-white/20 bg-white shadow-2xl lg:grid-cols-[1fr_0.85fr]">
        <section className="flex flex-col justify-between bg-black p-8 text-white md:p-12">
          <div>
            <p className="text-3xl font-black uppercase tracking-[-0.08em]">
              ARISTA<span className="font-light">CMS</span>
            </p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.35em] text-white/35">
              Secure Admin Access
            </p>
          </div>

          <div className="my-20">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-white/35">
              Content Control Panel
            </p>
            <h1 className="text-7xl font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-9xl">
              Login
              <br />
              Admin.
            </h1>
          </div>

          <p className="max-w-xl text-sm font-medium leading-relaxed text-white/45">
            Kelola homepage, produk, media upload, dan user admin ARISTA
            Production dari satu panel.
          </p>
        </section>

        <section className="flex items-center justify-center p-6 md:p-12">
          <form onSubmit={login} className="w-full max-w-md">
            <div className="mb-10 flex h-16 w-16 items-center justify-center border border-black bg-black text-white">
              <Lock className="h-8 w-8" />
            </div>

            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Admin Login
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em]">
              Masuk
              <br />
              Panel.
            </h2>

            <div className="mt-10 space-y-5">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
                  Username
                </span>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 w-full border border-black bg-white px-4 py-4 text-sm font-semibold outline-none"
                  placeholder="admin"
                />
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full border border-black bg-white px-4 py-4 text-sm font-semibold outline-none"
                  placeholder="••••••••••"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-3 border border-black bg-black px-5 py-5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                Login
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold leading-relaxed text-black/45">
              Default user: admin. Password sesuai yang sudah di-set di database.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
