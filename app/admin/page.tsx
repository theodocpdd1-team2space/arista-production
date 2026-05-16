"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Boxes,
  ChevronRight,
  Eye,
  Home,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string | null;
  imageUrl: string | null;
  gallery: string[];
  specs: string[];
  whatsappUrl: string | null;
  shopeeUrl: string | null;
  tokopediaUrl: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
};

type SiteContent = {
  id: string;
  key: string;
  content: any;
};

type AnalyticsSummary = {
  totalUniqueVisitors: number;
  totalViews: number;
  totalClicks: number;
  desktopPercent: number;
  mobilePercent: number;
  topLinks: {
    path: string;
    views: number;
    clicks: number;
    uniqueVisitors: number;
    volume: number;
  }[];
};

type StorageInfo = {
  usedBytes: number;
  limitBytes: number;
  remainingBytes: number;
  usedFormatted: string;
  limitFormatted: string;
  remainingFormatted: string;
  percentUsed: number;
};

const defaultHomeContent = {
  hero: {
    videoUrl: "/videos/heroarista.mp4",
    headline: "ARISTA PRODUCTION",
    eyebrow: "Event Production / Sound System / LED Videotron / Stage Lighting",
    title: "Clean setup.\nStrong impact.",
    description:
      "Vendor production event untuk acara kecil sampai besar. Dari wedding elegan sampai panggung horeg yang butuh power.",
    ctaText: "Konsultasi Event",
    ctaUrl:
      "https://wa.me/6281234567890?text=Halo%20ARISTA%20Production%2C%20saya%20ingin%20konsultasi%20event.",
  },
  runningText:
    "Sound System — LED Videotron — Stage Lighting — Wedding — Corporate — Concert — Horeg — Product Delivery Until Malaysia —",
  slideshow: [
    "/images/arista-slide-1.jpg",
    "/images/arista-slide-2.jpg",
    "/images/arista-slide-3.jpg",
    "/images/arista-slide-4.jpg",
    "/images/arista-slide-5.jpg",
  ],
  why: [
    {
      title: "Bukan sekadar rental alat",
      desc: "ARISTA membantu membaca kebutuhan acara, menyesuaikan alat, crew, operator, dan teknis agar event berjalan aman.",
    },
    {
      title: "Setup rapi dan siap show",
      desc: "Dari loading, routing kabel, soundcheck, visual check, sampai standby saat acara berlangsung.",
    },
    {
      title: "Sound, LED, lighting satu arah",
      desc: "Audio, visual, dan lighting disusun untuk mendukung mood acara.",
    },
    {
      title: "Pengalaman small sampai big event",
      desc: "Mulai dari wedding, corporate, sekolah, kampus, konser, sampai event horeg.",
    },
  ],
  eventTypes: [
    {
      label: "Small Event",
      title: "Private, sekolah, gereja, dan gathering kecil",
      desc: "Untuk acara intimate yang tetap butuh audio jelas, setup rapi, dan operator yang paham teknis.",
    },
    {
      label: "Medium Event",
      title: "Wedding, seminar, corporate, dan launching",
      desc: "Cocok untuk kebutuhan sound system, LED backdrop, lighting ambience, dan multimedia.",
    },
    {
      label: "Big Event",
      title: "Konser, festival, outdoor, dan event horeg",
      desc: "Untuk acara besar yang membutuhkan power audio, coverage area luas, visual kuat, dan crew teknis solid.",
    },
  ],
  services: [
    {
      title: "Sound System",
      desc: "Tata suara untuk wedding, corporate event, konser, gathering, ibadah, sekolah, hingga event outdoor.",
      image:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "LED Videotron",
      desc: "Visual panggung untuk backdrop, opening show, presentasi, multimedia, live camera, dan kebutuhan display acara.",
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Stage Lighting",
      desc: "Lighting panggung yang membangun mood acara.",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1400&auto=format&fit=crop",
    },
  ],
  delivery: {
    title: "We deliver\nuntil\nMalaysia.",
    desc: "Untuk produk custom ARISTA seperti LAN to XLR / Snake Cable, pengiriman tidak hanya di Indonesia. Kami juga bisa bantu pengiriman produk sampai Malaysia.",
  },
    featuredProduct: {
    image: "/images/product-cable.jpg",
    leftEyebrow: "ARISTA PRODUCT",
    leftTitle: "LAN TO XLR\nSNAKE CABLE",
    iconLabel: "Cable Icon",
    eyebrow: "CUSTOM CABLE FOR VENDOR",
    title: "LIHAT\nKUALITASNYA.\nRASAKAN\nBEDANYA.",
    description:
      "Selain jasa event production, ARISTA juga memiliki produk custom untuk kebutuhan audio profesional. Produk dibuat untuk vendor sound, rental, gereja, panggung, dan instalasi yang butuh jalur kabel lebih bersih, rapi, dan efisien.",
    features: [
      "CUSTOM CHANNEL",
      "MINIM NOISE",
      "SETUP PANGGUNG RAPI",
      "COCOK UNTUK RENTAL",
    ],
    primaryButtonText: "LIHAT PRODUK UTAMA",
    primaryButtonUrl: "/product",
    secondaryButtonText: "TANYA CUSTOM",
    secondaryButtonUrl:
      "https://wa.me/6281234567890?text=Halo%20ARISTA%20Production%2C%20saya%20ingin%20tanya%20produk%20custom.",
  },
  productCategories: [
    {
      title: "LAN to XLR Snake Cable",
      desc: "Produk custom untuk routing audio yang lebih rapi, cepat, dan efisien.",
    },
    {
      title: "Custom Cable Assembly",
      desc: "Kabel custom sesuai kebutuhan vendor, rental, gereja, dan instalasi panggung.",
    },
    {
      title: "Stage Audio Accessories",
      desc: "Aksesori pendukung setup audio agar panggung terlihat lebih clean dan profesional.",
    },
    {
      title: "Vendor Technical Support",
      desc: "Konsultasi teknis untuk kebutuhan setup audio, lighting, LED, dan sistem event.",
    },
  ],
  works: [
    {
      title: "Corporate Event Production",
      meta: "Sound, LED, Lighting",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1400&auto=format&fit=crop",
    },
    {
      title: "Wedding Reception Setup",
      meta: "Audio Visual Production",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1400&auto=format&fit=crop",
    },
  ],
  feedback: [
    {
      text: "Sound-nya clear, crew enak diajak koordinasi, dan acara berjalan aman sampai selesai.",
      name: "Corporate Event",
    },
    {
      text: "Lighting dan LED bikin panggung terlihat jauh lebih mahal.",
      name: "Wedding Organizer",
    },
  ],
  faqs: [
    {
      q: "ARISTA melayani event apa saja?",
      a: "ARISTA bisa membantu wedding, seminar, gathering, corporate event, launching, konser, event sekolah, kampus, ibadah, outdoor event, sampai event horeg.",
    },
  ],
  cta: {
    eyebrow: "Ready To Build Your Event",
    title: "Make your\nstage louder.",
    desc: "Kirim tanggal acara, lokasi, jumlah audience, jenis event, dan kebutuhan teknis. Tim ARISTA akan bantu arahkan paket yang paling masuk akal.",
    buttonText: "Hubungi ARISTA",
    buttonUrl:
      "https://wa.me/6281234567890?text=Halo%20ARISTA%20Production%2C%20saya%20ingin%20konsultasi%20event.",
  },
};

const emptyProduct = {
  id: "",
  name: "",
  category: "Snake Cable",
  description: "",
  price: "",
  imageUrl: "",
  gallery: [] as string[],
  specs: [] as string[],
  whatsappUrl: "",
  shopeeUrl: "",
  tokopediaUrl: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "home", label: "Home Content", icon: Home },
  { id: "products", label: "Products", icon: Boxes },
  { id: "media", label: "Media Upload", icon: ImagePlus },
  { id: "settings", label: "Settings", icon: Settings },
];

function mergeHomeContent(content: any) {
  return {
    ...defaultHomeContent,
    ...content,
    hero: {
      ...defaultHomeContent.hero,
      ...(content?.hero || {}),
    },
    delivery: {
      ...defaultHomeContent.delivery,
      ...(content?.delivery || {}),
    },
        featuredProduct: {
      ...defaultHomeContent.featuredProduct,
      ...(content?.featuredProduct || {}),
      features:
        Array.isArray(content?.featuredProduct?.features) &&
        content.featuredProduct.features.length > 0
          ? content.featuredProduct.features
          : defaultHomeContent.featuredProduct.features,
    },
    cta: {
      ...defaultHomeContent.cta,
      ...(content?.cta || {}),
    },
    slideshow:
      Array.isArray(content?.slideshow) && content.slideshow.length > 0
        ? content.slideshow
        : defaultHomeContent.slideshow,
    why:
      Array.isArray(content?.why) && content.why.length > 0
        ? content.why
        : defaultHomeContent.why,
    eventTypes:
      Array.isArray(content?.eventTypes) && content.eventTypes.length > 0
        ? content.eventTypes
        : defaultHomeContent.eventTypes,
    services:
      Array.isArray(content?.services) && content.services.length > 0
        ? content.services
        : defaultHomeContent.services,
    productCategories:
      Array.isArray(content?.productCategories) &&
      content.productCategories.length > 0
        ? content.productCategories
        : defaultHomeContent.productCategories,
    works:
      Array.isArray(content?.works) && content.works.length > 0
        ? content.works
        : defaultHomeContent.works,
    feedback:
      Array.isArray(content?.feedback) && content.feedback.length > 0
        ? content.feedback
        : defaultHomeContent.feedback,
    faqs:
      Array.isArray(content?.faqs) && content.faqs.length > 0
        ? content.faqs
        : defaultHomeContent.faqs,
  };
}

export default function AdminPage() {
  const [active, setActive] = useState("dashboard");
  const [homeContent, setHomeContent] = useState<any>(defaultHomeContent);
  const [products, setProducts] = useState<Product[]>([]);
  const [productForm, setProductForm] = useState<any>(emptyProduct);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [contentLoading, setContentLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [storage, setStorage] = useState<StorageInfo | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  useEffect(() => {
    loadContent();
    loadProducts();
    loadStorage();
    loadAnalytics();
  }, []);

  async function loadContent() {
    const res = await fetch("/api/admin/content");
    const data: SiteContent[] = await res.json();

    const home = data.find((item) => item.key === "home");
    if (home?.content) {
      setHomeContent(mergeHomeContent(home.content));
    }
  }

  async function loadProducts() {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  }

  async function loadStorage() {
    try {
      const res = await fetch("/api/admin/storage");
      const data = await res.json();
      setStorage(data);
    } catch (error) {
      console.error("Failed to load storage:", error);
    }
  }

  async function loadAnalytics() {
    try {
      const res = await fetch("/api/admin/analytics", {
        cache: "no-store",
      });

      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    }
  }

  async function saveHomeContent() {
    setContentLoading(true);

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: "home",
          content: homeContent,
        }),
      });

      if (!res.ok) {
        alert("Gagal simpan home content.");
        return;
      }

      alert("Home content berhasil disimpan.");
    } finally {
      setContentLoading(false);
    }
  }

  async function uploadFile(file: File) {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Upload gagal.");
        return "";
      }

      await loadStorage();

      return data.url as string;
    } finally {
      setUploading(false);
    }
  }

  async function saveProduct() {
    if (!productForm.name.trim()) {
      alert("Nama produk wajib diisi.");
      return;
    }

    setProductLoading(true);

    try {
      const method = selectedProductId ? "PATCH" : "POST";
      const url = selectedProductId
        ? `/api/admin/products/${selectedProductId}`
        : "/api/admin/products";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productForm,
          specs:
            typeof productForm.specs === "string"
              ? productForm.specs
                  .split("\n")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : productForm.specs,
          gallery: Array.isArray(productForm.gallery) ? productForm.gallery : [],
        }),
      });

      if (!res.ok) {
        alert("Gagal simpan produk.");
        return;
      }

      setProductForm(emptyProduct);
      setSelectedProductId(null);
      await loadProducts();
      alert("Produk berhasil disimpan.");
    } finally {
      setProductLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    const ok = confirm("Hapus produk ini?");
    if (!ok) return;

    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    await loadProducts();

    if (selectedProductId === id) {
      setSelectedProductId(null);
      setProductForm(emptyProduct);
    }
  }

  function editProduct(product: Product) {
    setSelectedProductId(product.id);
    setProductForm({
      ...product,
      price: product.price || "",
      imageUrl: product.imageUrl || "",
      gallery: product.gallery || [],
      whatsappUrl: product.whatsappUrl || "",
      shopeeUrl: product.shopeeUrl || "",
      tokopediaUrl: product.tokopediaUrl || "",
      specs: product.specs?.join("\n") || "",
    });
    setActive("products");
  }

  function updateHome(path: string, value: any) {
    setHomeContent((prev: any) => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let cursor = next;

      for (let i = 0; i < keys.length - 1; i++) {
        cursor = cursor[keys[i]];
      }

      cursor[keys[keys.length - 1]] = value;
      return next;
    });
  }

  function updateArrayItem(
    section: string,
    index: number,
    key: string,
    value: string
  ) {
    setHomeContent((prev: any) => {
      const next = structuredClone(prev);
      next[section][index][key] = value;
      return next;
    });
  }

  function addArrayItem(section: string, template: any) {
    setHomeContent((prev: any) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  }

  function removeArrayItem(section: string, index: number) {
    setHomeContent((prev: any) => {
      const next = structuredClone(prev);
      next[section].splice(index, 1);
      return next;
    });
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", {
      method: "POST",
    });

    window.location.href = "/admin/login";
  }

  return (
    <main className="min-h-screen bg-[#111] p-4 text-black">
      <div className="mx-auto grid min-h-[calc(100vh-32px)] max-w-[1500px] grid-cols-1 overflow-hidden border border-white/20 bg-white shadow-2xl lg:grid-cols-[220px_1fr]">
        <aside className="bg-black text-white">
          <div className="border-b border-white/15 p-6">
            <p className="text-2xl font-black uppercase tracking-[-0.08em]">
              ARISTA<span className="font-light">CMS</span>
            </p>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
              Content Control
            </p>
          </div>

          <nav className="p-3">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex w-full items-center justify-between border border-transparent px-4 py-4 text-left text-xs font-black uppercase tracking-[0.16em] transition ${
                  active === item.id
                    ? "border-white bg-white text-black"
                    : "text-white/55 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </nav>

          <div className="border-t border-white/15 p-4">
            <a
              href="/"
              className="flex items-center justify-center gap-3 border border-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] transition hover:bg-white hover:text-black"
            >
              <Eye className="h-4 w-4" />
              View Site
            </a>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex items-center justify-between border-b border-black bg-black px-5 py-5 text-white md:px-7">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                ARISTA Production Admin
              </p>
              <h1 className="mt-1 text-2xl font-black uppercase tracking-[-0.06em]">
                {sidebarItems.find((item) => item.id === active)?.label}
              </h1>
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <a
                href="/product"
                className="border border-white/30 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/70 hover:bg-white hover:text-black"
              >
                Product Page
              </a>
              <button
                onClick={active === "home" ? saveHomeContent : undefined}
                disabled={active === "home" && contentLoading}
                className="inline-flex items-center gap-3 border border-white bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-black disabled:opacity-50"
              >
                {contentLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </button>
              <button
                onClick={logout}
                className="border border-white/30 px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white/70 hover:bg-white hover:text-black"
              >
                Logout
              </button>
            </div>
          </header>

          <div className="h-[calc(100vh-116px)] overflow-y-auto bg-[#f2f2f2] p-5 md:p-7">
            {active === "dashboard" && (
              <DashboardView
                products={products}
                homeContent={homeContent}
                storage={storage}
                analytics={analytics}
              />
            )}

            {active === "home" && (
              <HomeEditor
                homeContent={homeContent}
                updateHome={updateHome}
                updateArrayItem={updateArrayItem}
                addArrayItem={addArrayItem}
                removeArrayItem={removeArrayItem}
                uploadFile={uploadFile}
                uploading={uploading}
                saveHomeContent={saveHomeContent}
                contentLoading={contentLoading}
              />
            )}

            {active === "products" && (
              <ProductEditor
                products={filteredProducts}
                search={search}
                setSearch={setSearch}
                productForm={productForm}
                setProductForm={setProductForm}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
                saveProduct={saveProduct}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
                productLoading={productLoading}
                uploadFile={uploadFile}
                uploading={uploading}
              />
            )}

            {active === "media" && (
              <MediaUpload
                uploadFile={uploadFile}
                uploading={uploading}
                storage={storage}
              />
            )}

            {active === "settings" && <SettingsView />}
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardView({
  products,
  homeContent,
  storage,
  analytics,
}: {
  products: Product[];
  homeContent: any;
  storage: StorageInfo | null;
  analytics: AnalyticsSummary | null;
}) {
  const topLinks = analytics?.topLinks || [];

  const cards = [
    { label: "Products", value: products.length },
    { label: "Active", value: products.filter((p) => p.isActive).length },
    { label: "Views", value: analytics?.totalViews || 0 },
    { label: "Clicks", value: analytics?.totalClicks || 0 },
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((item) => (
          <div key={item.label} className="border border-black bg-white p-6">
            <p className="text-5xl font-black tracking-[-0.08em]">
              {typeof item.value === "number"
                ? item.value.toLocaleString()
                : item.value}
            </p>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.25em] text-black/45">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="border border-black bg-white p-6 md:p-8">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-black/10 pb-7 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-black/45">
              Website Traffic & Analytics
            </p>
            <h2 className="text-4xl font-black tracking-[-0.06em] md:text-5xl">
              Top Visited Links & Clicks
            </h2>
          </div>

          <div className="flex items-center gap-3 text-lg font-black text-green-600 md:text-2xl">
            <span className="text-3xl leading-none">↗</span>
            Live database tracking
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]">
          <div className="border border-black/5 bg-[#f7f7f7] p-8 md:p-10">
            <p className="text-lg font-black text-black/45 md:text-xl">
              Total Unique Visitors
            </p>

            <h3 className="mt-6 text-7xl font-black tracking-[-0.1em] md:text-8xl">
              {(analytics?.totalUniqueVisitors || 0).toLocaleString()}
            </h3>

            <div className="mt-8 grid gap-4 text-xl font-black">
              <div className="flex items-center justify-between gap-6">
                <span className="text-black/50">Desktop</span>
                <span>{analytics?.desktopPercent || 0}%</span>
              </div>

              <div className="flex items-center justify-between gap-6">
                <span className="text-black/50">Mobile</span>
                <span>{analytics?.mobilePercent || 0}%</span>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="hidden grid-cols-[70px_1fr_180px_130px_110px] gap-4 px-2 pb-5 text-xs font-black uppercase tracking-[0.28em] text-black/40 md:grid">
              <div />
              <div>Page / Link Path</div>
              <div>Volume</div>
              <div>Views</div>
              <div>Clicks</div>
            </div>

            <div className="divide-y divide-black/10">
              {topLinks.map((item, index) => (
                <div
                  key={`${item.path}-${index}`}
                  className="grid gap-4 py-5 md:grid-cols-[70px_1fr_180px_130px_110px] md:items-center"
                >
                  <div className="text-2xl font-black text-black/35">
                    {index + 1}.
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-2xl font-black tracking-[-0.04em] md:text-3xl">
                      {item.path}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-black/35 md:hidden">
                      {item.views.toLocaleString()} views ·{" "}
                      {item.clicks.toLocaleString()} clicks
                    </p>
                  </div>

                  <div className="hidden items-center md:flex">
                    <div className="h-4 w-full overflow-hidden rounded-full bg-black/5">
                      <div
                        className="h-full rounded-full bg-black"
                        style={{ width: `${item.volume}%` }}
                      />
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 text-xl font-bold text-black/65 md:flex">
                    <Eye className="h-5 w-5" />
                    {item.views.toLocaleString()}
                  </div>

                  <div className="hidden items-center gap-2 text-xl font-black md:flex">
                    <span className="text-3xl leading-none">⌁</span>
                    {item.clicks.toLocaleString()}
                  </div>
                </div>
              ))}

              {topLinks.length === 0 && (
                <div className="py-12 text-center text-sm font-black uppercase tracking-[0.18em] text-black/40">
                  Belum ada data analytics. Buka website publik dulu, lalu klik beberapa tombol.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="border border-black bg-white p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
                Storage Usage
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.07em]">
                {storage?.usedFormatted || "0 B"} /{" "}
                {storage?.limitFormatted || "10 GB"}
              </h2>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/45">
              {storage?.percentUsed || 0}% used
            </p>
          </div>

          <div className="mt-5 h-4 border border-black bg-white">
            <div
              className="h-full bg-black"
              style={{
                width: `${Math.min(storage?.percentUsed || 0, 100)}%`,
              }}
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-black/55">
            Remaining: {storage?.remainingFormatted || "10 GB"}
          </p>
        </div>

        <div className="border border-black bg-black p-7 text-white">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40">
            Today Reminder
          </p>
          <h3 className="mt-5 text-4xl font-black uppercase leading-[0.85] tracking-[-0.08em]">
            Analytics sudah real.
          </h3>
          <p className="mt-6 text-sm font-medium leading-relaxed text-white/55">
            Dashboard ini membaca data dari database. Cocok untuk VPS dan bisa dikembangkan jadi laporan traffic harian.
          </p>
        </div>
      </div>
    </div>
  );
}


function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
        {label}
      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 min-h-[96px] w-full border border-black bg-white px-4 py-3 text-sm font-semibold outline-none"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full border border-black bg-white px-4 py-3 text-sm font-semibold outline-none"
        />
      )}
    </label>
  );
}

function UploadField({
  label,
  value,
  onChange,
  uploadFile,
  uploading,
  accept = "image/*,video/*",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  uploadFile: (file: File) => Promise<string>;
  uploading: boolean;
  accept?: string;
}) {
  const isImage = value?.match(/\.(jpg|jpeg|png|webp|gif)$/i);
  const isVideo = value?.match(/\.(mp4|mov|webm)$/i);

  return (
    <div>
      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
        {label}
      </span>

      <div className="mt-2 grid gap-3">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-black bg-white px-4 py-3 text-sm font-semibold outline-none"
            placeholder="/uploads/file-name.jpg"
          />

          <label className="flex cursor-pointer items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Choose / Upload"}
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const uploadedUrl = await uploadFile(file);
                if (uploadedUrl) onChange(uploadedUrl);
              }}
            />
          </label>
        </div>

        {value && (
          <div className="overflow-hidden border border-black bg-black">
            {isImage && (
              <img
                src={value}
                alt=""
                className="aspect-video w-full object-cover"
              />
            )}

            {isVideo && (
              <video
                src={value}
                className="aspect-video w-full object-cover"
                controls
              />
            )}

            {!isImage && !isVideo && (
              <div className="p-4 text-xs font-black uppercase tracking-[0.16em] text-white/50">
                {value}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-black bg-white">
      <div className="border-b border-black bg-white px-5 py-4">
        <p className="text-xs font-black uppercase tracking-[0.22em]">
          {title}
        </p>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </div>
  );
}

function HomeEditor({
  homeContent,
  updateHome,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  uploadFile,
  uploading,
  saveHomeContent,
  contentLoading,
}: any) {
  function updateFeaturedProductFeature(index: number, value: string) {
    const next = [...(homeContent.featuredProduct?.features || [])];
    next[index] = value;
    updateHome("featuredProduct.features", next);
  }

  function addFeaturedProductFeature() {
    updateHome("featuredProduct.features", [
      ...(homeContent.featuredProduct?.features || []),
      "NEW FEATURE",
    ]);
  }

  function removeFeaturedProductFeature(index: number) {
    const next = [...(homeContent.featuredProduct?.features || [])];
    next.splice(index, 1);
    updateHome("featuredProduct.features", next);
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-col justify-between gap-4 border border-black bg-white p-5 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
            Home Editor
          </p>
          <h2 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em]">
            Edit semua konten homepage.
          </h2>
        </div>

        <button
          onClick={saveHomeContent}
          disabled={contentLoading}
          className="inline-flex items-center justify-center gap-3 border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black disabled:opacity-50"
        >
          {contentLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Home
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Hero">
          <UploadField
            label="Hero Video"
            value={homeContent.hero.videoUrl}
            onChange={(v) => updateHome("hero.videoUrl", v)}
            uploadFile={uploadFile}
            uploading={uploading}
            accept="video/*"
          />

          <Field
            label="Headline"
            value={homeContent.hero.headline}
            onChange={(v) => updateHome("hero.headline", v)}
          />
          <Field
            label="Eyebrow"
            value={homeContent.hero.eyebrow}
            onChange={(v) => updateHome("hero.eyebrow", v)}
          />
          <Field
            label="Title"
            value={homeContent.hero.title}
            onChange={(v) => updateHome("hero.title", v)}
            textarea
          />
          <Field
            label="Description"
            value={homeContent.hero.description}
            onChange={(v) => updateHome("hero.description", v)}
            textarea
          />
          <Field
            label="CTA Text"
            value={homeContent.hero.ctaText}
            onChange={(v) => updateHome("hero.ctaText", v)}
          />
          <Field
            label="CTA URL"
            value={homeContent.hero.ctaUrl}
            onChange={(v) => updateHome("hero.ctaUrl", v)}
          />
        </Panel>

        <Panel title="Running Text + Delivery">
          <Field
            label="Running Text"
            value={homeContent.runningText}
            onChange={(v) => updateHome("runningText", v)}
            textarea
          />
          <Field
            label="Delivery Title"
            value={homeContent.delivery.title}
            onChange={(v) => updateHome("delivery.title", v)}
            textarea
          />
          <Field
            label="Delivery Description"
            value={homeContent.delivery.desc}
            onChange={(v) => updateHome("delivery.desc", v)}
            textarea
          />
        </Panel>
      </div>

      <Panel title="Home Product Highlight">
        <div className="grid gap-5 lg:grid-cols-2">
          <UploadField
            label="Product Highlight Image"
            value={homeContent.featuredProduct?.image || ""}
            onChange={(v) => updateHome("featuredProduct.image", v)}
            uploadFile={uploadFile}
            uploading={uploading}
            accept="image/*"
          />

          <div className="grid gap-4">
            <Field
              label="Left Eyebrow"
              value={homeContent.featuredProduct?.leftEyebrow || ""}
              onChange={(v) => updateHome("featuredProduct.leftEyebrow", v)}
            />

            <Field
              label="Left Title"
              value={homeContent.featuredProduct?.leftTitle || ""}
              onChange={(v) => updateHome("featuredProduct.leftTitle", v)}
              textarea
            />

            <Field
              label="Icon Label"
              value={homeContent.featuredProduct?.iconLabel || ""}
              onChange={(v) => updateHome("featuredProduct.iconLabel", v)}
            />
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="Right Eyebrow"
            value={homeContent.featuredProduct?.eyebrow || ""}
            onChange={(v) => updateHome("featuredProduct.eyebrow", v)}
          />

          <Field
            label="Main Title"
            value={homeContent.featuredProduct?.title || ""}
            onChange={(v) => updateHome("featuredProduct.title", v)}
            textarea
          />
        </div>

        <Field
          label="Description"
          value={homeContent.featuredProduct?.description || ""}
          onChange={(v) => updateHome("featuredProduct.description", v)}
          textarea
        />

        <div className="border border-black p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">
              Feature List
            </p>

            <button
              onClick={addFeaturedProductFeature}
              className="inline-flex items-center gap-2 border border-black bg-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black"
            >
              <Plus className="h-4 w-4" />
              Add Feature
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {(homeContent.featuredProduct?.features || []).map(
              (feature: string, index: number) => (
                <div key={index} className="grid grid-cols-[1fr_auto] gap-3">
                  <input
                    value={feature}
                    onChange={(e) =>
                      updateFeaturedProductFeature(index, e.target.value)
                    }
                    className="w-full border border-black bg-white px-4 py-3 text-sm font-semibold outline-none"
                  />

                  <button
                    onClick={() => removeFeaturedProductFeature(index)}
                    className="border border-black p-3 hover:bg-black hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="Primary Button Text"
            value={homeContent.featuredProduct?.primaryButtonText || ""}
            onChange={(v) =>
              updateHome("featuredProduct.primaryButtonText", v)
            }
          />

          <Field
            label="Primary Button URL"
            value={homeContent.featuredProduct?.primaryButtonUrl || ""}
            onChange={(v) => updateHome("featuredProduct.primaryButtonUrl", v)}
          />

          <Field
            label="Secondary Button Text"
            value={homeContent.featuredProduct?.secondaryButtonText || ""}
            onChange={(v) =>
              updateHome("featuredProduct.secondaryButtonText", v)
            }
          />

          <Field
            label="Secondary Button URL"
            value={homeContent.featuredProduct?.secondaryButtonUrl || ""}
            onChange={(v) =>
              updateHome("featuredProduct.secondaryButtonUrl", v)
            }
          />
        </div>
      </Panel>

      <Panel title="Slideshow Images">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {homeContent.slideshow.map((url: string, index: number) => (
            <div key={index} className="border border-black p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">
                  Slide {index + 1}
                </p>

                <button
                  onClick={() => {
                    const next = [...homeContent.slideshow];
                    next.splice(index, 1);
                    updateHome("slideshow", next);
                  }}
                  className="border border-black p-2 hover:bg-black hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <UploadField
                label="Slide Image"
                value={url}
                onChange={(v) => {
                  const next = [...homeContent.slideshow];
                  next[index] = v;
                  updateHome("slideshow", next);
                }}
                uploadFile={uploadFile}
                uploading={uploading}
                accept="image/*"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() =>
            updateHome("slideshow", [...homeContent.slideshow, ""])
          }
          className="inline-flex items-center gap-3 border border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white"
        >
          <Plus className="h-4 w-4" />
          Add Slide
        </button>
      </Panel>

      <ArrayEditor
        title="Why ARISTA"
        section="why"
        items={homeContent.why}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ title: "New Reason", desc: "Description..." }}
        fields={["title", "desc"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <ArrayEditor
        title="Event Types"
        section="eventTypes"
        items={homeContent.eventTypes}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ label: "New Event", title: "Title", desc: "Description..." }}
        fields={["label", "title", "desc"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <ArrayEditor
        title="Services"
        section="services"
        items={homeContent.services}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ title: "New Service", desc: "Description...", image: "" }}
        fields={["title", "desc", "image"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <ArrayEditor
        title="Product Categories"
        section="productCategories"
        items={homeContent.productCategories || []}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ title: "New Category", desc: "Description..." }}
        fields={["title", "desc"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <ArrayEditor
        title="Works"
        section="works"
        items={homeContent.works}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ title: "New Work", meta: "Meta", image: "" }}
        fields={["title", "meta", "image"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <ArrayEditor
        title="Feedback"
        section="feedback"
        items={homeContent.feedback}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ text: "Feedback text", name: "Client Name" }}
        fields={["text", "name"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <ArrayEditor
        title="FAQ"
        section="faqs"
        items={homeContent.faqs}
        updateArrayItem={updateArrayItem}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        template={{ q: "Question", a: "Answer" }}
        fields={["q", "a"]}
        uploadFile={uploadFile}
        uploading={uploading}
      />

      <Panel title="Final CTA">
        <Field
          label="Eyebrow"
          value={homeContent.cta.eyebrow}
          onChange={(v) => updateHome("cta.eyebrow", v)}
        />
        <Field
          label="Title"
          value={homeContent.cta.title}
          onChange={(v) => updateHome("cta.title", v)}
          textarea
        />
        <Field
          label="Description"
          value={homeContent.cta.desc}
          onChange={(v) => updateHome("cta.desc", v)}
          textarea
        />
        <Field
          label="Button Text"
          value={homeContent.cta.buttonText}
          onChange={(v) => updateHome("cta.buttonText", v)}
        />
        <Field
          label="Button URL"
          value={homeContent.cta.buttonUrl}
          onChange={(v) => updateHome("cta.buttonUrl", v)}
        />
      </Panel>
    </div>
  );
}

function ArrayEditor({
  title,
  section,
  items,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  template,
  fields,
  uploadFile,
  uploading,
}: any) {
  return (
    <Panel title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item: any, index: number) => (
          <div key={index} className="border border-black p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">
                Item {index + 1}
              </p>

              <button
                onClick={() => removeArrayItem(section, index)}
                className="border border-black p-2 hover:bg-black hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field: string) => {
                const isMediaField =
                  field === "image" ||
                  field === "video" ||
                  field === "url" ||
                  field === "imageUrl" ||
                  field === "videoUrl";

                if (isMediaField) {
                  return (
                    <UploadField
                      key={field}
                      label={field}
                      value={item[field] || ""}
                      onChange={(v) => updateArrayItem(section, index, field, v)}
                      uploadFile={uploadFile}
                      uploading={uploading}
                      accept="image/*,video/*"
                    />
                  );
                }

                return (
                  <Field
                    key={field}
                    label={field}
                    value={item[field] || ""}
                    onChange={(v) => updateArrayItem(section, index, field, v)}
                    textarea={
                      field === "desc" ||
                      field === "text" ||
                      field === "a"
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => addArrayItem(section, template)}
        className="inline-flex items-center gap-3 border border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white"
      >
        <Plus className="h-4 w-4" />
        Add Item
      </button>
    </Panel>
  );
}

function ProductEditor({
  products,
  search,
  setSearch,
  productForm,
  setProductForm,
  selectedProductId,
  setSelectedProductId,
  saveProduct,
  deleteProduct,
  editProduct,
  productLoading,
  uploadFile,
  uploading,
}: any) {
  function setField(key: string, value: any) {
    setProductForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  }

  function setGallery(index: number, value: string) {
    const next = [...(productForm.gallery || [])];
    next[index] = value;
    setField("gallery", next);
  }

  function removeGallery(index: number) {
    const next = [...(productForm.gallery || [])];
    next.splice(index, 1);
    setField("gallery", next);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="border border-black bg-white p-5">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
              Product Form
            </p>
            <h2 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em]">
              {selectedProductId ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedProductId(null);
              setProductForm(emptyProduct);
            }}
            className="border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
          >
            New
          </button>
        </div>

        <div className="space-y-4">
          <Field
            label="Name"
            value={productForm.name}
            onChange={(v) => setField("name", v)}
          />
          <Field
            label="Category"
            value={productForm.category}
            onChange={(v) => setField("category", v)}
          />
          <Field
            label="Price"
            value={productForm.price || ""}
            onChange={(v) => setField("price", v)}
          />
          <Field
            label="Description"
            value={productForm.description}
            onChange={(v) => setField("description", v)}
            textarea
          />

          <UploadField
            label="Main Product Image"
            value={productForm.imageUrl || ""}
            onChange={(v) => setField("imageUrl", v)}
            uploadFile={uploadFile}
            uploading={uploading}
            accept="image/*"
          />

          <Panel title="Product Gallery">
            <div className="grid gap-4">
              {(productForm.gallery || []).map((url: string, index: number) => (
                <div key={index} className="border border-black p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">
                      Gallery {index + 1}
                    </p>
                    <button
                      onClick={() => removeGallery(index)}
                      className="border border-black p-2 hover:bg-black hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <UploadField
                    label="Gallery Image"
                    value={url}
                    onChange={(v) => setGallery(index, v)}
                    uploadFile={uploadFile}
                    uploading={uploading}
                    accept="image/*"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                setField("gallery", [...(productForm.gallery || []), ""])
              }
              className="inline-flex items-center gap-3 border border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white"
            >
              <Plus className="h-4 w-4" />
              Add Gallery Image
            </button>
          </Panel>

          <Field
            label="Specs per line"
            value={productForm.specs || ""}
            onChange={(v) => setField("specs", v)}
            textarea
          />
          <Field
            label="WhatsApp URL"
            value={productForm.whatsappUrl || ""}
            onChange={(v) => setField("whatsappUrl", v)}
          />
          <Field
            label="Shopee URL"
            value={productForm.shopeeUrl || ""}
            onChange={(v) => setField("shopeeUrl", v)}
          />
          <Field
            label="Tokopedia URL"
            value={productForm.tokopediaUrl || ""}
            onChange={(v) => setField("tokopediaUrl", v)}
          />
          <Field
            label="Sort Order"
            value={String(productForm.sortOrder || 0)}
            onChange={(v) => setField("sortOrder", Number(v))}
          />

          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center gap-3 border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em]">
              <input
                type="checkbox"
                checked={productForm.isFeatured}
                onChange={(e) => setField("isFeatured", e.target.checked)}
              />
              Featured
            </label>

            <label className="flex items-center gap-3 border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em]">
              <input
                type="checkbox"
                checked={productForm.isActive}
                onChange={(e) => setField("isActive", e.target.checked)}
              />
              Active
            </label>
          </div>

          <button
            onClick={saveProduct}
            disabled={productLoading}
            className="inline-flex w-full items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black disabled:opacity-50"
          >
            {productLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Product
          </button>
        </div>
      </div>

      <div className="border border-black bg-white">
        <div className="flex items-center gap-3 border-b border-black p-5">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          {products.map((product: Product) => (
            <div key={product.id} className="border-b border-r border-black">
              <div className="aspect-video bg-black">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs font-black uppercase tracking-[0.2em] text-white/35">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
                  {product.category}
                </p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
                  {product.name}
                </h3>
                <p className="mt-4 line-clamp-2 text-sm font-medium leading-relaxed text-black/55">
                  {product.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => editProduct(product)}
                    className="border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="p-10 text-center text-sm font-black uppercase tracking-[0.18em] text-black/45">
              No products yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MediaUpload({
  uploadFile,
  uploading,
  storage,
}: {
  uploadFile: (file: File) => Promise<string>;
  uploading: boolean;
  storage: StorageInfo | null;
}) {
  const [uploaded, setUploaded] = useState("");
  const [media, setMedia] = useState<any[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  async function loadMedia() {
    setLoadingMedia(true);

    try {
      const res = await fetch("/api/admin/media", {
        cache: "no-store",
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setMedia(data);
      }
    } finally {
      setLoadingMedia(false);
    }
  }

  async function deleteMedia(url: string) {
    const ok = confirm("Hapus file ini dari server?");
    if (!ok) return;

    const res = await fetch("/api/admin/media", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Gagal hapus file.");
      return;
    }

    await loadMedia();
    alert("File berhasil dihapus.");
  }

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <div className="grid gap-5">
      <div className="border border-black bg-white p-6">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
          Media Upload
        </p>
        <h2 className="mt-3 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em]">
          Upload
          <br />
          Asset.
        </h2>

        <label className="mt-8 flex cursor-pointer items-center justify-center gap-3 border border-black bg-black px-5 py-5 text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black">
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Choose / Upload File"}
          <input
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const url = await uploadFile(file);
              if (url) {
                setUploaded(url);
                await loadMedia();
              }
            }}
          />
        </label>

        {uploaded && (
          <div className="mt-6 border border-black p-5">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-black/45">
              Uploaded URL
            </p>
            <input
              value={uploaded}
              readOnly
              className="w-full border border-black px-4 py-3 text-sm font-semibold"
            />
          </div>
        )}
      </div>

      <div className="border border-black bg-white p-6">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
          Storage
        </p>
        <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.07em]">
          {storage?.usedFormatted || "0 B"} /{" "}
          {storage?.limitFormatted || "10 GB"}
        </h3>

        <div className="mt-5 h-4 border border-black bg-white">
          <div
            className="h-full bg-black"
            style={{
              width: `${Math.min(storage?.percentUsed || 0, 100)}%`,
            }}
          />
        </div>

        <p className="mt-4 text-sm font-semibold text-black/55">
          Remaining: {storage?.remainingFormatted || "10 GB"}
        </p>
      </div>

      <div className="border border-black bg-white">
        <div className="flex items-center justify-between border-b border-black p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
              Media Library
            </p>
            <h3 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em]">
              Uploaded
              <br />
              Files.
            </h3>
          </div>

          <button
            onClick={loadMedia}
            className="border border-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
          >
            {loadingMedia ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {media.map((item) => {
            const isImage = item.url.match(/\.(jpg|jpeg|png|webp|gif)$/i);
            const isVideo = item.url.match(/\.(mp4|mov|webm)$/i);

            return (
              <div key={item.url} className="border-b border-r border-black">
                <div className="aspect-video bg-black">
                  {isImage && (
                    <img
                      src={item.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}

                  {isVideo && (
                    <video
                      src={item.url}
                      className="h-full w-full object-cover"
                      controls
                    />
                  )}

                  {!isImage && !isVideo && (
                    <div className="flex h-full items-center justify-center p-5 text-center text-xs font-black uppercase tracking-[0.18em] text-white/40">
                      File Preview Not Available
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={`border border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
                        item.isUsed ? "bg-black text-white" : "bg-white text-black"
                      }`}
                    >
                      {item.isUsed ? "Used" : "Unused"}
                    </span>

                    <span className="text-xs font-black uppercase tracking-[0.16em] text-black/45">
                      {item.sizeFormatted}
                    </span>
                  </div>

                  <input
                    value={item.url}
                    readOnly
                    className="w-full border border-black px-3 py-2 text-xs font-semibold"
                  />

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] hover:bg-black hover:text-white"
                    >
                      Open
                    </a>

                    <button
                      onClick={() => deleteMedia(item.url)}
                      disabled={item.isUsed}
                      className="flex items-center justify-center border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                    >
                      Delete
                    </button>
                  </div>

                  {item.isUsed && (
                    <p className="mt-3 text-xs font-semibold leading-relaxed text-black/45">
                      File ini masih dipakai di Home/Product. Lepaskan dulu
                      sebelum dihapus.
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {media.length === 0 && (
            <div className="p-10 text-center text-sm font-black uppercase tracking-[0.18em] text-black/45">
              No uploaded media yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type AdminUser = {
  id: string;
  name: string;
  username: string;
  role: string;
  isDefault: boolean;
  isActive: boolean;
};

function SettingsView() {
  const emptyUser = {
    id: "",
    name: "",
    username: "",
    password: "",
    role: "ADMIN",
    isActive: true,
    isDefault: false,
  };

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState<any>(emptyUser);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [savingUser, setSavingUser] = useState(false);

  const selectedUser = users.find((user) => user.id === selectedId);
  const isEditingDefault = Boolean(selectedUser?.isDefault);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setLoadingUsers(true);

    try {
      const res = await fetch("/api/admin/users", {
        cache: "no-store",
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      }
    } finally {
      setLoadingUsers(false);
    }
  }

  function resetForm() {
    setSelectedId(null);
    setForm(emptyUser);
  }

  function editUser(user: AdminUser) {
    setSelectedId(user.id);
    setForm({
      ...user,
      password: "",
    });
  }

  async function saveUser() {
    if (!form.name.trim() || !form.username.trim()) {
      alert("Name dan username wajib diisi.");
      return;
    }

    if (!selectedId && !form.password.trim()) {
      alert("Password wajib diisi untuk user baru.");
      return;
    }

    setSavingUser(true);

    try {
      const method = selectedId ? "PATCH" : "POST";
      const url = selectedId
        ? `/api/admin/users/${selectedId}`
        : "/api/admin/users";

      const payload = {
        name: form.name,
        username: form.username,
        role: form.role,
        isActive: form.isActive,
        password: form.password,
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Gagal simpan admin user.");
        return;
      }

      await loadUsers();
      resetForm();
      alert("Admin user berhasil disimpan.");
    } finally {
      setSavingUser(false);
    }
  }

  async function deleteUser(user: AdminUser) {
    if (user.isDefault) {
      alert("Default admin tidak bisa dihapus.");
      return;
    }

    const ok = confirm(`Hapus user ${user.username}?`);
    if (!ok) return;

    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Gagal hapus user.");
      return;
    }

    await loadUsers();

    if (selectedId === user.id) {
      resetForm();
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="border border-black bg-white p-6">
        <div className="mb-6 flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
              Admin User Form
            </p>
            <h2 className="mt-3 text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em]">
              {selectedId ? "Edit" : "Add"}
              <br />
              User.
            </h2>
          </div>

          <button
            onClick={resetForm}
            className="border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
          >
            New
          </button>
        </div>

        {isEditingDefault && (
          <div className="mb-5 border border-black bg-black p-4 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              Default admin
            </p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/60">
              User default tidak bisa dihapus dan password tidak bisa diganti
              dari panel ini.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Field
            label="Name"
            value={form.name}
            onChange={(v) => setForm((prev: any) => ({ ...prev, name: v }))}
          />

          <Field
            label="Username"
            value={form.username}
            onChange={(v) =>
              setForm((prev: any) => ({ ...prev, username: v }))
            }
          />

          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
              Role
            </span>
            <select
              value={form.role}
              onChange={(e) =>
                setForm((prev: any) => ({ ...prev, role: e.target.value }))
              }
              className="mt-2 w-full border border-black bg-white px-4 py-3 text-sm font-semibold outline-none"
            >
              <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="EDITOR">EDITOR</option>
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">
              Password {selectedId ? "(kosongkan kalau tidak diganti)" : ""}
            </span>

            <input
              type="password"
              value={form.password}
              disabled={isEditingDefault}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder={
                isEditingDefault
                  ? "Password default admin tidak bisa diganti"
                  : "Minimal 6 karakter"
              }
              className="mt-2 w-full border border-black bg-white px-4 py-3 text-sm font-semibold outline-none disabled:bg-black/5 disabled:text-black/35"
            />
          </label>

          <label className="flex items-center gap-3 border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em]">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  isActive: e.target.checked,
                }))
              }
            />
            Active
          </label>

          <button
            onClick={saveUser}
            disabled={savingUser}
            className="inline-flex w-full items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white hover:bg-white hover:text-black disabled:opacity-50"
          >
            {savingUser ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save User
          </button>
        </div>
      </div>

      <div className="border border-black bg-white">
        <div className="flex items-center justify-between border-b border-black p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-black/45">
              Admin Users
            </p>
            <h3 className="mt-2 text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em]">
              User
              <br />
              Access.
            </h3>
          </div>

          <button
            onClick={loadUsers}
            className="border border-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
          >
            {loadingUsers ? "Loading..." : "Refresh"}
          </button>
        </div>

        <div className="grid md:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="border-b border-r border-black p-5">
              <div className="mb-5 flex flex-wrap gap-2">
                {user.isDefault && (
                  <span className="border border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
                    Default
                  </span>
                )}

                <span className="border border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
                  {user.role}
                </span>

                <span
                  className={`border border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${
                    user.isActive ? "bg-white text-black" : "bg-black text-white"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <h4 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
                {user.name}
              </h4>

              <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-black/45">
                @{user.username}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => editUser(user)}
                  className="border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteUser(user)}
                  disabled={user.isDefault}
                  className="border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.16em] hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Delete
                </button>
              </div>

              {user.isDefault && (
                <p className="mt-4 text-xs font-semibold leading-relaxed text-black/45">
                  Default admin tidak bisa dihapus. Password juga dikunci dari
                  panel.
                </p>
              )}
            </div>
          ))}

          {users.length === 0 && (
            <div className="p-10 text-center text-sm font-black uppercase tracking-[0.18em] text-black/45">
              No admin users yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
