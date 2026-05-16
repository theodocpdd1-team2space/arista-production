"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Upload } from "lucide-react";

type HomeMedia = {
  id: string;
  title: string | null;
  url: string;
  sortOrder: number;
  isActive: boolean;
};

export default function AdminHomeSlideshowPage() {
  const [items, setItems] = useState<HomeMedia[]>([]);
  const [title, setTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadItems() {
    const res = await fetch("/api/admin/home-media");
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Pilih gambar dulu.");
      return;
    }

    setLoading(true);

    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadForm,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        alert(uploadData.error || "Upload gagal.");
        return;
      }

      const saveRes = await fetch("/api/admin/home-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          url: uploadData.url,
          sortOrder: Number(sortOrder),
          isActive: true,
        }),
      });

      if (!saveRes.ok) {
        alert("Gagal simpan data ke database.");
        return;
      }

      setTitle("");
      setSortOrder("0");
      setFile(null);
      await loadItems();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm("Hapus gambar ini?");
    if (!ok) return;

    await fetch(`/api/admin/home-media/${id}`, {
      method: "DELETE",
    });

    await loadItems();
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-black px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between">
          <a href="/admin" className="flex items-center">
            <span className="text-xl font-black uppercase tracking-[-0.06em]">
              Admin
            </span>
            <span className="ml-2 text-xl font-light uppercase tracking-[-0.06em]">
              Slideshow
            </span>
          </a>

          <a
            href="/"
            className="border border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
          >
            View Site
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-12 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Home Content
            </p>

            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
              Upload
              <br />
              Slideshow.
            </h1>

            <form onSubmit={handleSubmit} className="mt-10 border border-black p-6">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Title
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-3 w-full border border-black px-4 py-3 outline-none"
                  placeholder="Event documentation"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Sort Order
                </span>
                <input
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  type="number"
                  className="mt-3 w-full border border-black px-4 py-3 outline-none"
                />
              </label>

              <label className="mt-5 block">
                <span className="text-xs font-black uppercase tracking-[0.18em]">
                  Image
                </span>
                <input
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  type="file"
                  accept="image/*"
                  className="mt-3 w-full border border-black px-4 py-3"
                />
              </label>

              <button
                disabled={loading}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                {loading ? "Uploading..." : "Upload Image"}
              </button>
            </form>
          </div>

          <div>
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((item) => (
                <div key={item.id} className="border border-black">
                  <div className="aspect-video bg-black">
                    <img
                      src={item.url}
                      alt={item.title || "ARISTA slideshow"}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-black p-4">
                    <div>
                      <p className="font-black uppercase">
                        {item.title || "Untitled"}
                      </p>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">
                        Order: {item.sortOrder}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="border border-black p-3 transition hover:bg-black hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {items.length === 0 && (
              <div className="border border-black p-10 text-center">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-black/45">
                  Belum ada gambar slideshow.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
