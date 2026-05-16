"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Cable,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MessageCircle,
  PackageCheck,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";

const whatsappBase =
  "https://wa.me/6281234567890?text=Halo%20ARISTA%20Production%2C%20saya%20tertarik%20dengan%20produk%20";

const shopeeUrl = "https://shopee.co.id/";
const tokopediaUrl = "https://www.tokopedia.com/";

type Product = {
  id?: string;
  name: string;
  category: string;
  price?: string | null;
  image?: string;
  imageUrl?: string | null;
  desc?: string;
  description?: string;
  specs?: string[];
  featured?: boolean;
  isFeatured?: boolean;
  whatsappUrl?: string | null;
  shopeeUrl?: string | null;
  tokopediaUrl?: string | null;
  isActive?: boolean;
};

const fallbackProducts: Product[] = [
  {
    name: "LAN to XLR Snake Cable 8 Channel",
    category: "Snake Cable",
    price: "Mulai dari Rp xxx.xxx",
    image: "/images/products/lan-xlr-8ch.jpg",
    desc: "Solusi routing audio lebih rapi untuk vendor sound, gereja, rental, dan kebutuhan panggung.",
    specs: ["8 Channel", "Custom length", "XLR connector", "Clean stage routing"],
    featured: true,
  },
  {
    name: "LAN to XLR Snake Cable 12 Channel",
    category: "Snake Cable",
    price: "Mulai dari Rp xxx.xxx",
    image: "/images/products/lan-xlr-12ch.jpg",
    desc: "Untuk setup audio yang membutuhkan channel lebih banyak dengan jalur kabel yang tetap clean.",
    specs: ["12 Channel", "Custom build", "Vendor ready", "Minim noise"],
    featured: true,
  },
  {
    name: "Custom XLR Cable",
    category: "Custom Cable",
    price: "By request",
    image: "/images/products/custom-xlr.jpg",
    desc: "Kabel XLR custom untuk mic, mixer, speaker aktif, stage routing, dan kebutuhan audio profesional.",
    specs: ["Custom length", "Male/female XLR", "Neat finishing", "Daily rental use"],
    featured: false,
  },
  {
    name: "Custom Jack / TRS Cable",
    category: "Custom Cable",
    price: "By request",
    image: "/images/products/custom-trs.jpg",
    desc: "Kabel jack custom untuk kebutuhan keyboard, mixer, audio interface, monitor, dan setup panggung.",
    specs: ["TRS / TS option", "Custom length", "Clean soldering", "Stage ready"],
    featured: false,
  },
  {
    name: "Stage Audio Accessories",
    category: "Accessories",
    price: "By request",
    image: "/images/products/audio-accessories.jpg",
    desc: "Aksesori pendukung audio agar setup panggung lebih rapi, cepat, dan terlihat profesional.",
    specs: ["Cable support", "Stage utility", "Vendor use", "Custom request"],
    featured: false,
  },
  {
    name: "Vendor Technical Support",
    category: "Support",
    price: "By request",
    image: "/images/products/technical-support.jpg",
    desc: "Konsultasi teknis untuk kebutuhan audio, routing kabel, setup stage, dan kebutuhan produksi event.",
    specs: ["Audio routing", "Stage planning", "Setup advice", "Vendor support"],
    featured: false,
  },
];

const faqs = [
  {
    q: "Apakah produk bisa custom panjang kabel?",
    a: "Bisa. Produk ARISTA dapat disesuaikan berdasarkan kebutuhan channel, panjang kabel, jenis konektor, dan penggunaan di lapangan.",
  },
  {
    q: "Bisa dikirim ke luar kota?",
    a: "Bisa. Produk dapat dikirim ke berbagai kota di Indonesia, dan untuk kebutuhan tertentu bisa dikirim sampai Malaysia.",
  },
  {
    q: "Bisa beli lewat marketplace?",
    a: "Bisa. Nanti produk dapat diarahkan ke Shopee atau Tokopedia. Untuk custom order, lebih disarankan konsultasi via WhatsApp dulu.",
  },
  {
    q: "Apakah produk cocok untuk vendor sound?",
    a: "Ya. Produk dibuat untuk kebutuhan vendor sound, rental, gereja, panggung, instalasi audio, dan kebutuhan teknis event.",
  },
];

function getProductImage(product: Product) {
  return product.imageUrl || product.image || "/images/products/lan-xlr-hero.jpg";
}

function getProductDesc(product: Product) {
  return product.description || product.desc || "";
}

function getProductFeatured(product: Product) {
  return Boolean(product.isFeatured || product.featured);
}

function getProductWhatsapp(product: Product) {
  return product.whatsappUrl || `${whatsappBase}${encodeURIComponent(product.name)}`;
}

function getProductShopee(product: Product) {
  return product.shopeeUrl || shopeeUrl;
}

function getProductTokopedia(product: Product) {
  return product.tokopediaUrl || tokopediaUrl;
}

export default function ProductPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [products, setProducts] = useState<Product[]>(fallbackProducts);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/site/products", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((product) => product.category)));
    return ["All", ...unique];
  }, [products]);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const featuredProduct =
    products.find((product) => getProductFeatured(product)) || products[0] || fallbackProducts[0];

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-black bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <a href="/" className="flex items-center">
            <span className="text-xl font-black uppercase tracking-[-0.06em] md:text-2xl">
              ARISTA
            </span>
            <span className="ml-1 text-xl font-light uppercase tracking-[-0.06em] md:text-2xl">
              PRODUCTION
            </span>
          </a>

          <nav className="hidden items-center gap-10 text-xs font-black uppercase tracking-[0.18em] md:flex">
            <a href="/#why" className="hover:opacity-50">
              Why
            </a>
            <a href="/#events" className="hover:opacity-50">
              Events
            </a>
            <a href="/#services" className="hover:opacity-50">
              Services
            </a>
            <a href="/product" className="opacity-50">
              Product
            </a>
          </nav>

          <a
            href={`${whatsappBase}ARISTA`}
            className="group inline-flex items-center gap-3 border border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
          >
            Contact
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-20">
        <div className="mx-auto max-w-[1500px] px-5 py-10 md:px-10 md:py-16">
          <a
            href="/"
            className="mb-10 inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-black/50 transition hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>

          <div className="grid gap-8 border-b border-black pb-10 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-black/45">
                ARISTA Product Catalog
              </p>
              <h1 className="text-[17vw] font-black uppercase leading-[0.78] tracking-[-0.1em] md:text-[10vw]">
                Product
                <br />
                Archive
              </h1>
            </div>

            <div className="max-w-xl md:justify-self-end md:text-right">
              <p className="text-lg font-semibold leading-relaxed text-black/60">
                Katalog produk custom ARISTA untuk kebutuhan vendor audio,
                panggung, rental, gereja, instalasi, dan technical support.
                Bisa order via WhatsApp atau marketplace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row md:justify-end">
                <a
                  href={`${whatsappBase}katalog%20produk`}
                  className="inline-flex items-center justify-center gap-3 border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
                >
                  Order via WA
                  <MessageCircle className="h-4 w-4" />
                </a>

                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-3 border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
                >
                  View Products
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10">
        <div className="grid border border-black lg:grid-cols-2">
          <div className="border-b border-black bg-black text-white lg:border-b-0 lg:border-r">
            <div className="aspect-[4/3] overflow-hidden border-b border-white/30">
              <img
                src={getProductImage(featuredProduct)}
                alt={featuredProduct.name}
                className="h-full w-full object-cover grayscale"
              />
            </div>

            <div className="p-8 md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/45">
                Featured Product
              </p>
              <h2 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
                {featuredProduct.name}
              </h2>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-12 flex h-16 w-16 items-center justify-center border border-black bg-black text-white">
              <Cable className="h-8 w-8" />
            </div>

            <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              {featuredProduct.category}
            </p>

            <h3 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
              Routing rapi.
              <br />
              Setup cepat.
            </h3>

            <p className="mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-black/60">
              {getProductDesc(featuredProduct)}
            </p>

            <div className="mt-10 grid gap-0 border-l border-t border-black md:grid-cols-2">
              {(featuredProduct.specs || []).slice(0, 4).map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-r border-black p-5 text-sm font-black uppercase tracking-[0.12em]"
                >
                  <Check className="h-5 w-5" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={getProductWhatsapp(featuredProduct)}
                className="inline-flex items-center justify-center gap-3 border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
              >
                Beli via WhatsApp
                <MessageCircle className="h-4 w-4" />
              </a>

              <a
                href={getProductShopee(featuredProduct)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
              >
                Shopee
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href={getProductTokopedia(featuredProduct)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
              >
                Tokopedia
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HEARTMADE VALUE SECTION */}
      <section className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10">
        <div className="border border-black bg-white">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-black p-8 md:p-10 lg:border-b-0 lg:border-r">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-black/45">
                Made With Purpose
              </p>

              <h2 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-8xl">
                Dibuat
                <br />
                dari hati.
              </h2>

              <p className="mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-black/60">
                Produk ARISTA dibuat untuk melengkapi kebutuhan event kamu.
                Bukan sekadar kabel atau aksesori, tapi bagian kecil yang bisa
                membuat setup panggung lebih rapi, audio lebih aman, dan kerja
                teknis jadi lebih efisien.
              </p>
            </div>

            <div className="grid border-l-0 border-black md:grid-cols-2">
              {[
                {
                  title: "Pengerjaan rapi",
                  desc: "Setiap detail dibuat dengan finishing yang bersih agar nyaman dipakai di lapangan.",
                },
                {
                  title: "Minim noise",
                  desc: "Dirancang untuk kebutuhan audio yang lebih aman, stabil, dan tidak mengganggu jalannya event.",
                },
                {
                  title: "Murah tapi tidak murahan",
                  desc: "Harga tetap masuk akal, tapi kualitas tetap dijaga untuk kebutuhan vendor dan panggung.",
                },
                {
                  title: "Lebih efisien",
                  desc: "Membantu proses setup lebih cepat, routing lebih clean, dan crew lebih mudah bekerja.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="border-b border-black p-7 transition hover:bg-black hover:text-white md:border-r"
                >
                  <p className="mb-14 text-xs font-black uppercase tracking-[0.35em] opacity-40">
                    0{index + 1}
                  </p>

                  <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
                    {item.title}
                  </h3>

                  <p className="mt-6 text-sm font-medium leading-relaxed opacity-60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING TEXT */}
      <section className="overflow-hidden border-y border-black bg-black py-5 text-white">
        <div className="flex w-max animate-[marquee_24s_linear_infinite] whitespace-nowrap">
          <p className="text-4xl font-black uppercase tracking-[-0.06em] md:text-7xl">
            Custom Cable — Snake Cable — Audio Accessories — Vendor Support —
            Shopee — Tokopedia — WhatsApp Order — Delivery Until Malaysia —&nbsp;
          </p>
          <p className="text-4xl font-black uppercase tracking-[-0.06em] md:text-7xl">
            Custom Cable — Snake Cable — Audio Accessories — Vendor Support —
            Shopee — Tokopedia — WhatsApp Order — Delivery Until Malaysia —&nbsp;
          </p>
        </div>
      </section>

      {/* PRODUCT LIST */}
      <section id="products" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              <Search className="h-4 w-4" />
              Product List
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Choose
              <br />
              Your Gear
            </h2>
          </div>

          <p className="max-w-xl text-lg font-semibold leading-relaxed text-black/60">
            Pilih produk yang sesuai kebutuhan. Untuk custom order, klik tombol
            WhatsApp agar bisa dibantu hitungkan spesifikasi dan estimasinya.
          </p>
        </div>

        {/* FILTER */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border border-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] transition ${
                activeCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid border-l border-t border-black md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id || product.name}
              className="group border-b border-r border-black bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-black bg-black">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="p-7">
                <div className="mb-10 flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-black/40">
                      {product.category}
                    </p>
                    {getProductFeatured(product) && (
                      <p className="mt-2 inline-flex border border-black px-2 py-1 text-[10px] font-black uppercase tracking-[0.18em]">
                        Featured
                      </p>
                    )}
                  </div>

                  <ShoppingBag className="h-8 w-8" />
                </div>

                <h3 className="min-h-[96px] text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-4xl">
                  {product.name}
                </h3>

                <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-black/45">
                  {product.price || "By request"}
                </p>

                <p className="mt-6 min-h-[96px] text-base font-medium leading-relaxed text-black/60">
                  {getProductDesc(product)}
                </p>

                <div className="mt-8 grid gap-0 border-l border-t border-black">
                  {(product.specs || []).map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-3 border-b border-r border-black p-4 text-xs font-black uppercase tracking-[0.14em]"
                    >
                      <Check className="h-4 w-4" />
                      {spec}
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3">
                  <a
                    href={getProductWhatsapp(product)}
                    className="inline-flex items-center justify-center gap-3 border border-black bg-black px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                  >
                    Beli via WhatsApp
                    <MessageCircle className="h-4 w-4" />
                  </a>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={getProductShopee(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:bg-black hover:text-white"
                    >
                      Shopee
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <a
                      href={getProductTokopedia(product)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 border border-black px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:bg-black hover:text-white"
                    >
                      Tokopedia
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* QUALITY SECTION */}
      <section className="border-y border-black bg-[#f2f2f2]">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-24 md:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Product Quality
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Built for
              <br />
              real stage.
            </h2>
          </div>

          <div className="grid border-l border-t border-black md:grid-cols-3">
            {[
              {
                icon: Cable,
                title: "Clean Wiring",
                desc: "Membantu stage terlihat rapi dan tidak penuh jalur kabel berantakan.",
              },
              {
                icon: PackageCheck,
                title: "Checked Before Send",
                desc: "Produk dicek sebelum dikirim agar siap dipakai customer.",
              },
              {
                icon: Truck,
                title: "Delivery Ready",
                desc: "Bisa dikirim ke luar kota dan kebutuhan tertentu sampai Malaysia.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border-b border-r border-black bg-white p-7"
              >
                <item.icon className="mb-12 h-9 w-9" />
                <h3 className="text-3xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
                  {item.title}
                </h3>
                <p className="mt-6 text-sm font-medium leading-relaxed text-black/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE CTA */}
      <section className="bg-black px-5 py-24 text-white md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-white/40">
                Buy From Marketplace
              </p>
              <h2 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-9xl">
                Order
                <br />
                your gear.
              </h2>
            </div>

            <div>
              <p className="text-lg font-medium leading-relaxed text-white/55">
                Untuk produk ready stock bisa beli melalui marketplace. Untuk
                custom order, konsultasi via WhatsApp agar spesifikasi tidak
                salah.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <a
                  href={`${whatsappBase}produk%20ARISTA`}
                  className="inline-flex items-center justify-center gap-3 border border-white bg-white px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
                >
                  WhatsApp
                  <MessageCircle className="h-4 w-4" />
                </a>

                <a
                  href={shopeeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-white px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                >
                  Shopee
                  <ExternalLink className="h-4 w-4" />
                </a>

                <a
                  href={tokopediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-white px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                >
                  Tokopedia
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Product FAQ
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Before
              <br />
              Order
            </h2>
          </div>

          <div className="border-t border-black">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="border-b border-black">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="text-2xl font-black uppercase tracking-[-0.04em]">
                    {faq.q}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp className="h-6 w-6 shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 shrink-0" />
                  )}
                </button>

                {openFaq === index && (
                  <div className="max-w-3xl pb-8 text-lg font-medium leading-relaxed text-black/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white bg-black px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-3xl font-black uppercase tracking-[-0.06em]">
              ARISTA<span className="font-light">PRODUCTION</span>
            </p>
            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/45">
              Product catalog for custom audio cable, snake cable, stage audio
              accessories, and vendor technical support.
            </p>
          </div>

          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/35">
            © {new Date().getFullYear()} ARISTA
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </main>
  );
}