"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Cable,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  MapPin,
  MessageCircle,
  MonitorPlay,
  PackageCheck,
  ShieldCheck,
  Star,
  Truck,
  Volume2,
  Zap,
} from "lucide-react";

const whatsappUrl =
  "https://wa.me/6281234567890?text=Halo%20ARISTA%20Production%2C%20saya%20ingin%20konsultasi%20kebutuhan%20sound%20system%2C%20LED%2C%20lighting%20untuk%20event.";

const fallbackWhy = [
  {
    title: "Bukan sekadar rental alat",
    desc: "ARISTA membantu membaca kebutuhan acara, menyesuaikan alat, crew, operator, dan teknis agar event berjalan aman.",
  },
  {
    title: "Setup rapi dan siap show",
    desc: "Dari loading, routing kabel, soundcheck, sampai standby saat acara berlangsung.",
  },
  {
    title: "Sound, LED, lighting satu arah",
    desc: "Audio, visual, dan lighting tidak jalan sendiri-sendiri. Semua disusun untuk mendukung mood acara.",
  },
  {
    title: "Pengalaman small sampai big event",
    desc: "Mulai dari wedding, corporate, sekolah, kampus, konser, sampai event horeg dengan kebutuhan SPL besar.",
  },
];

const fallbackServices = [
  {
    title: "Sound System",
    desc: "Tata suara untuk wedding, corporate event, konser, gathering, ibadah, sekolah, hingga event outdoor. Fokus pada suara yang jelas, bertenaga, dan tetap nyaman didengar.",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "LED Videotron",
    desc: "Visual panggung untuk backdrop, opening show, presentasi, multimedia, live camera, dan kebutuhan display acara. Membuat panggung terlihat lebih besar dan profesional.",
    image:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Stage Lighting",
    desc: "Lighting panggung yang membangun mood acara. Mulai dari ambience elegan untuk wedding sampai efek dinamis untuk performance dan konser.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1400&auto=format&fit=crop",
  },
];

const fallbackEventTypes = [
  {
    label: "Small Event",
    title: "Private, sekolah, gereja, dan gathering kecil",
    desc: "Untuk acara intimate yang tetap butuh audio jelas, setup rapi, dan operator yang paham teknis.",
  },
  {
    label: "Medium Event",
    title: "Wedding, seminar, corporate, dan launching",
    desc: "Cocok untuk kebutuhan panggung yang membutuhkan sound system, LED backdrop, lighting ambience, dan multimedia.",
  },
  {
    label: "Big Event",
    title: "Konser, festival, outdoor, dan event horeg",
    desc: "Untuk acara besar yang membutuhkan power audio, coverage area luas, visual kuat, dan crew teknis yang solid.",
  },
];

const fallbackWorks = [
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
  {
    title: "Night Beats Arena",
    meta: "Stage Production / Horeg Ready",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "School & Campus Event",
    meta: "Sound System / Multimedia",
    image:
      "https://images.unsplash.com/photo-1511578314322-379a95053c56?q=80&w=1400&auto=format&fit=crop",
  },
];

const fallbackSlideshow = [
  "/images/arista-slide-1.jpg",
  "/images/arista-slide-2.jpg",
  "/images/arista-slide-3.jpg",
  "/images/arista-slide-4.jpg",
  "/images/arista-slide-5.jpg",
];

const fallbackProductCategories = [
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
];

const fallbackFaqs = [
  {
    q: "ARISTA melayani event apa saja?",
    a: "ARISTA bisa membantu berbagai jenis event mulai dari wedding, seminar, gathering, corporate event, launching, konser, event sekolah, event kampus, ibadah, outdoor event, sampai event horeg.",
  },
  {
    q: "Apakah bisa untuk small event?",
    a: "Bisa. Tidak semua event harus paket besar. Kami bisa bantu menyesuaikan kebutuhan alat, crew, dan operator sesuai skala acara.",
  },
  {
    q: "Apakah ARISTA bisa handle big event atau horeg?",
    a: "Bisa. Untuk event besar, kami akan cek kebutuhan area, jumlah audience, konsep panggung, power, akses loading, dan kebutuhan teknis lain agar sistem yang dipakai sesuai.",
  },
  {
    q: "ARISTA melayani area mana saja?",
    a: "Basis kami di Gresik, Jawa Timur. Kami bisa melayani Surabaya, Sidoarjo, Lamongan, Malang, luar kota, bahkan pengiriman produk sampai Malaysia.",
  },
  {
    q: "Produk kabel ARISTA itu apa?",
    a: "ARISTA memiliki produk LAN to XLR / Snake Cable custom untuk kebutuhan vendor audio, stage, rental, gereja, dan instalasi agar setup lebih rapi, cepat, dan efisien.",
  },
];

const fallbackFeedback = [
  {
    text: "Sound-nya clear, crew enak diajak koordinasi, dan acara berjalan aman sampai selesai.",
    name: "Corporate Event",
  },
  {
    text: "Lighting dan LED bikin panggung terlihat jauh lebih mahal. Dokumentasi juga jadi bagus.",
    name: "Wedding Organizer",
  },
  {
    text: "Setup cepat, rapi, dan operator standby. Panitia jadi tidak pusing soal teknis.",
    name: "Event Organizer",
  },
];

const defaultHomeContent = {
  hero: {
    videoUrl: "/videos/heroarista.mp4",
    headline: "ARISTA\nPRODUCTION",
    eyebrow: "Event Production / Sound System / LED Videotron / Stage Lighting",
    title: "Clean setup.\nStrong impact.",
    description:
      "Vendor production event untuk acara kecil sampai besar. Dari wedding elegan sampai panggung horeg yang butuh power.",
    ctaText: "Konsultasi Event",
    ctaUrl: whatsappUrl,
  },
  runningText:
    "Sound System — LED Videotron — Stage Lighting — Wedding — Corporate — Concert — Horeg — Product Delivery Until Malaysia —",
  slideshow: fallbackSlideshow,
  why: fallbackWhy,
  eventTypes: fallbackEventTypes,
  services: fallbackServices,
  delivery: {
    title: "We deliver\nuntil\nMalaysia.",
    desc: "Untuk produk custom ARISTA seperti LAN to XLR / Snake Cable, pengiriman tidak hanya di Indonesia. Kami juga bisa bantu pengiriman produk sampai Malaysia sesuai kebutuhan customer.",
  },
  deliveryCards: [
    {
      title: "Indonesia",
      desc: "Pengiriman produk ke berbagai kota.",
    },
    {
      title: "Malaysia",
      desc: "Bisa kirim produk custom ke Malaysia.",
    },
    {
      title: "Quality Check",
      desc: "Produk dicek sebelum dikirim.",
    },
  ],
  featuredProduct: {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400&auto=format&fit=crop",
    leftEyebrow: "ARISTA Product",
    leftTitle: "LAN to XLR\nSnake Cable",
    iconLabel: "Cable",
    eyebrow: "Custom Cable For Vendor",
    title: "Lihat kualitasnya.\nRasakan bedanya.",
    description:
      "Selain jasa event production, ARISTA juga memiliki produk custom untuk kebutuhan audio profesional. Produk dibuat untuk vendor sound, rental, gereja, panggung, dan instalasi yang butuh jalur kabel lebih bersih, rapi, dan efisien.",
    features: [
      "Custom channel",
      "Minim noise",
      "Setup panggung rapi",
      "Cocok untuk rental",
    ],
    primaryButtonText: "Lihat Produk Utama",
    primaryButtonUrl: "/product",
    secondaryButtonText: "Tanya Custom",
    secondaryButtonUrl: whatsappUrl,
  },
  productCategories: fallbackProductCategories,
  works: fallbackWorks,
  feedback: fallbackFeedback,
  faqs: fallbackFaqs,
  cta: {
    eyebrow: "Ready To Build Your Event",
    title: "Make your\nstage louder.",
    desc: "Kirim tanggal acara, lokasi, jumlah audience, jenis event, dan kebutuhan teknis. Tim ARISTA akan bantu arahkan paket yang paling masuk akal.",
    buttonText: "Hubungi ARISTA",
    buttonUrl: whatsappUrl,
  },
};

function renderLines(text?: string) {
  return (text || "").split("\n").map((line, index, array) => (
    <React.Fragment key={`${line}-${index}`}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
}

function mergeHomeContent(data: any) {
  return {
    ...defaultHomeContent,
    ...data,
    hero: {
      ...defaultHomeContent.hero,
      ...(data?.hero || {}),
    },
    delivery: {
      ...defaultHomeContent.delivery,
      ...(data?.delivery || {}),
    },
    featuredProduct: {
      ...defaultHomeContent.featuredProduct,
      ...(data?.featuredProduct || {}),
      features:
        Array.isArray(data?.featuredProduct?.features) &&
        data.featuredProduct.features.length > 0
          ? data.featuredProduct.features
          : defaultHomeContent.featuredProduct.features,
    },
    cta: {
      ...defaultHomeContent.cta,
      ...(data?.cta || {}),
    },
    slideshow:
      Array.isArray(data?.slideshow) && data.slideshow.length > 0
        ? data.slideshow
        : defaultHomeContent.slideshow,
    why:
      Array.isArray(data?.why) && data.why.length > 0
        ? data.why
        : defaultHomeContent.why,
    eventTypes:
      Array.isArray(data?.eventTypes) && data.eventTypes.length > 0
        ? data.eventTypes
        : defaultHomeContent.eventTypes,
    services:
      Array.isArray(data?.services) && data.services.length > 0
        ? data.services
        : defaultHomeContent.services,
    deliveryCards:
      Array.isArray(data?.deliveryCards) && data.deliveryCards.length > 0
        ? data.deliveryCards
        : defaultHomeContent.deliveryCards,
    productCategories:
      Array.isArray(data?.productCategories) && data.productCategories.length > 0
        ? data.productCategories
        : defaultHomeContent.productCategories,
    works:
      Array.isArray(data?.works) && data.works.length > 0
        ? data.works
        : defaultHomeContent.works,
    feedback:
      Array.isArray(data?.feedback) && data.feedback.length > 0
        ? data.feedback
        : defaultHomeContent.feedback,
    faqs:
      Array.isArray(data?.faqs) && data.faqs.length > 0
        ? data.faqs
        : defaultHomeContent.faqs,
  };
}

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [home, setHome] = useState(defaultHomeContent);

  useEffect(() => {
    async function loadHomeContent() {
      try {
        const res = await fetch("/api/site/home", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data && typeof data === "object") {
          setHome(mergeHomeContent(data));
        }
      } catch (error) {
        console.error("Failed to load home content:", error);
      }
    }

    loadHomeContent();
  }, []);

  useEffect(() => {
    if (!home.slideshow.length) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % home.slideshow.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [home.slideshow.length]);

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
            <a href="#why" className="hover:opacity-50">
              Why
            </a>
            <a href="#events" className="hover:opacity-50">
              Events
            </a>
            <a href="#services" className="hover:opacity-50">
              Services
            </a>
            <a href="/product" className="hover:opacity-50">
              Product
            </a>
          </nav>

          <a
            href={home.hero.ctaUrl || whatsappUrl}
            className="group inline-flex items-center gap-3 border border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
          >
            Contact
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </header>

      {/* HERO VIDEO FIRST */}
      <section className="pt-20">
        <div className="relative aspect-video w-full overflow-hidden border-b border-black bg-black">
          <video
            className="h-full w-full object-cover"
            src={home.hero.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />

          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto max-w-[1500px] px-5 pb-5 md:px-10 md:pb-8">
              <h1 className="text-[14vw] font-black uppercase leading-[0.76] tracking-[-0.1em] text-white mix-blend-difference md:text-[11vw]">
                {renderLines(home.hero.headline)}
              </h1>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-10">
          <div className="grid gap-8 border-b border-black pb-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-black/50">
                {home.hero.eyebrow}
              </p>
              <h2 className="max-w-6xl text-6xl font-black uppercase leading-[0.84] tracking-[-0.08em] md:text-8xl">
                {renderLines(home.hero.title)}
              </h2>
            </div>

            <div className="max-w-md md:text-right">
              <p className="text-base font-semibold leading-relaxed text-black/65 md:text-lg">
                {home.hero.description}
              </p>

              <a
                href={home.hero.ctaUrl || whatsappUrl}
                className="mt-6 inline-flex items-center gap-3 border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
              >
                {home.hero.ctaText}
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RUNNING TEXT */}
      <section className="overflow-hidden border-y border-black bg-black py-5 text-white">
        <div className="flex w-max animate-[marquee_24s_linear_infinite] whitespace-nowrap">
          <p className="text-4xl font-black uppercase tracking-[-0.06em] md:text-7xl">
            {home.runningText}&nbsp;
          </p>
          <p className="text-4xl font-black uppercase tracking-[-0.06em] md:text-7xl">
            {home.runningText}&nbsp;
          </p>
        </div>
      </section>

      {/* PHOTO SLIDESHOW */}
      <section className="border-b border-black bg-black">
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {home.slideshow.map((photo, index) => (
            <img
              key={`${photo}-${index}`}
              src={photo}
              alt={`ARISTA event documentation ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                currentSlide === index
                  ? "scale-100 opacity-100"
                  : "scale-105 opacity-0"
              }`}
            />
          ))}

          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent md:w-1/3" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent md:w-1/3" />

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 md:bottom-6">
            {home.slideshow.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 transition-all ${
                  currentSlide === index
                    ? "w-10 bg-white"
                    : "w-4 bg-white/35 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY ARISTA */}
      <section id="why" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <div className="grid gap-10 border-b border-black pb-20 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Why Arista Production
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Kenapa
              <br />
              harus
              <br />
              ARISTA?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {home.why.map((item, index) => {
              const Icon = [ShieldCheck, Zap, MonitorPlay, Volume2][index] || ShieldCheck;

              return (
                <div
                  key={`${item.title}-${index}`}
                  className="group border border-black p-6 transition hover:bg-black hover:text-white"
                >
                  <Icon className="mb-10 h-9 w-9" />
                  <h3 className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm font-medium leading-relaxed opacity-65">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EVENT TYPES */}
      <section id="events" className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Event We Can Handle
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Small to
              <br />
              Big Event
            </h2>
          </div>

          <p className="max-w-xl text-lg font-semibold leading-relaxed text-black/60">
            ARISTA bisa bantu berbagai jenis acara. Tidak harus selalu event
            besar. Yang penting kebutuhan teknisnya tepat, aman, dan sesuai
            dengan konsep acara.
          </p>
        </div>

        <div className="grid border-l border-t border-black lg:grid-cols-3">
          {home.eventTypes.map((event, index) => (
            <article
              key={`${event.title}-${index}`}
              className="border-b border-r border-black p-8 transition hover:bg-black hover:text-white"
            >
              <p className="text-xs font-black uppercase tracking-[0.35em] opacity-45">
                0{index + 1} / {event.label}
              </p>

              <h3 className="mt-12 min-h-[150px] text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-5xl">
                {event.title}
              </h3>

              <p className="mt-8 text-base font-medium leading-relaxed opacity-65">
                {event.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-0 border-l border-t border-black md:grid-cols-4">
          {[
            "Wedding",
            "Corporate Event",
            "Seminar",
            "Gathering",
            "Launching",
            "Concert",
            "School Event",
            "Horeg Event",
          ].map((item) => (
            <div
              key={item}
              className="border-b border-r border-black p-5 text-sm font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-y border-black bg-[#f2f2f2]">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
                Main Services
              </p>
              <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
                Production
                <br />
                Category
              </h2>
            </div>

            <p className="max-w-xl text-lg font-semibold leading-relaxed text-black/60">
              Pilih kebutuhan utama acara kamu. Bisa ambil satu kategori saja
              atau digabung menjadi full production.
            </p>
          </div>

          <div className="grid border-l border-t border-black lg:grid-cols-3">
            {home.services.map((service, index) => {
              const Icon = [Volume2, MonitorPlay, Lightbulb][index] || Volume2;

              return (
                <article
                  key={`${service.title}-${index}`}
                  className="group border-b border-r border-black bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden border-b border-black bg-black">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="mb-10 flex items-start justify-between">
                      <span className="text-xs font-black uppercase tracking-[0.35em] text-black/45">
                        0{index + 1}
                      </span>
                      <Icon className="h-9 w-9" />
                    </div>

                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em]">
                      {service.title}
                    </h3>

                    <p className="mt-6 min-h-[140px] text-base font-medium leading-relaxed text-black/60">
                      {service.desc}
                    </p>

                    <a
                      href={home.hero.ctaUrl || whatsappUrl}
                      className="mt-8 inline-flex items-center gap-3 border border-black px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
                    >
                      Tanya Paket
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section className="bg-black px-5 py-24 text-white md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-white/40">
              Product Delivery
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-9xl">
              {renderLines(home.delivery.title)}
            </h2>
          </div>

          <div>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-white/60">
              {home.delivery.desc}
            </p>

            <div className="mt-10 grid border-l border-t border-white md:grid-cols-3">
              {home.deliveryCards.map((item, index) => {
                const Icon = [Truck, PackageCheck, PackageCheck][index] || PackageCheck;

                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="border-b border-r border-white p-6"
                  >
                    <Icon className="mb-10 h-8 w-8" />
                    <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-white/50">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT HIGHLIGHT */}
      <section id="product" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <div className="grid border border-black lg:grid-cols-2">
          <div className="border-b border-black bg-black text-white lg:border-b-0 lg:border-r">
            <div className="aspect-[4/3] overflow-hidden border-b border-white/30">
              <img
                src={home.featuredProduct.image}
                alt={home.featuredProduct.leftTitle || "ARISTA Product"}
                className="h-full w-full object-cover grayscale"
              />
            </div>

            <div className="p-8 md:p-10">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-white/45">
                {home.featuredProduct.leftEyebrow}
              </p>
              <h3 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
                {renderLines(home.featuredProduct.leftTitle)}
              </h3>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="mb-12 flex h-16 w-16 items-center justify-center border border-black bg-black text-white">
              <Cable className="h-8 w-8" />
            </div>

            <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              {home.featuredProduct.eyebrow}
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
              {renderLines(home.featuredProduct.title)}
            </h2>

            <p className="mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-black/60">
              {home.featuredProduct.description}
            </p>

            <div className="mt-10 grid gap-0 border-l border-t border-black md:grid-cols-2">
              {(home.featuredProduct.features || []).map((item) => (
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
                href={home.featuredProduct.primaryButtonUrl || "/product"}
                className="inline-flex items-center justify-center gap-3 border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-black"
              >
                {home.featuredProduct.primaryButtonText}
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={home.featuredProduct.secondaryButtonUrl || home.hero.ctaUrl || whatsappUrl}
                className="inline-flex items-center justify-center gap-3 border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-black hover:text-white"
              >
                {home.featuredProduct.secondaryButtonText}
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PRODUCT CATEGORIES */}
      <section className="border-y border-black bg-[#f2f2f2]">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
                Other Product Category
              </p>
              <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
                Lihat
                <br />
                kategori
                <br />
                lainnya.
              </h2>
            </div>

            <p className="max-w-xl text-lg font-semibold leading-relaxed text-black/60">
              ARISTA bukan hanya menyediakan jasa event. Ada juga beberapa
              kategori produk dan support teknis yang bisa membantu vendor
              bekerja lebih rapi dan profesional.
            </p>
          </div>

          <div className="grid border-l border-t border-black md:grid-cols-2 lg:grid-cols-4">
            {home.productCategories.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="border-b border-r border-black bg-white p-7 transition hover:bg-black hover:text-white"
              >
                <p className="text-xs font-black uppercase tracking-[0.35em] opacity-45">
                  0{index + 1}
                </p>
                <h3 className="mt-16 min-h-[110px] text-3xl font-black uppercase leading-[0.92] tracking-[-0.06em]">
                  {item.title}
                </h3>
                <p className="mt-8 text-sm font-medium leading-relaxed opacity-60">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              Selected Works
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Event
              <br />
              Archive
            </h2>
          </div>

          <div className="hidden items-center gap-6 text-4xl font-black md:flex">
            <span>←</span>
            <span>→</span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {home.works.map((work, index) => (
            <article key={`${work.title}-${index}`} className="group">
              <div className="aspect-video overflow-hidden border border-black bg-black">
                <img
                  src={work.image}
                  alt={work.title}
                  className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>

              <div className="mt-6 border-t border-black pt-6">
                <h3 className="text-4xl font-black uppercase leading-none tracking-[-0.06em] md:text-5xl">
                  {work.title}
                </h3>
                <p className="mt-5 flex items-center gap-2 text-sm font-bold text-black/55">
                  <MapPin className="h-4 w-4" />
                  {work.meta}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="border-y border-black bg-[#f2f2f2]">
        <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
          <div className="mb-14 flex items-start justify-between gap-8">
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Client
              <br />
              Feedback
            </h2>

            <div className="hidden items-center gap-6 text-4xl font-black md:flex">
              <span>←</span>
              <span>→</span>
            </div>
          </div>

          <div className="grid border-l border-t border-black lg:grid-cols-3">
            {home.feedback.map((item, index) => (
              <div key={`${item.name}-${index}`} className="border-b border-r border-black p-8">
                <div className="mb-10 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-black" />
                  ))}
                </div>

                <p className="min-h-[160px] text-2xl font-semibold leading-relaxed tracking-[-0.04em] text-black/70">
                  “{item.text}”
                </p>

                <p className="mt-10 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-[1500px] px-5 py-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-black/45">
              FAQ
            </p>
            <h2 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-8xl">
              Before
              <br />
              Booking
            </h2>
          </div>

          <div className="border-t border-black">
            {home.faqs.map((faq, index) => (
              <div key={`${faq.q}-${index}`} className="border-b border-black">
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

      {/* CTA */}
      <section className="bg-black px-5 py-24 text-white md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-white/40">
                {home.cta.eyebrow}
              </p>
              <h2 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.09em] md:text-9xl">
                {renderLines(home.cta.title)}
              </h2>
            </div>

            <div>
              <p className="text-lg font-medium leading-relaxed text-white/55">
                {home.cta.desc}
              </p>

              <a
                href={home.cta.buttonUrl || whatsappUrl}
                className="mt-8 inline-flex items-center gap-3 border border-white bg-white px-7 py-5 text-xs font-black uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white"
              >
                {home.cta.buttonText}
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white bg-black px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-3xl font-black uppercase tracking-[-0.06em]">
              ARISTA Production
            </p>
            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/45">
              Sound System. LED Videotron. Stage Lighting. Event Production.
              Custom Audio Cable. Product delivery until Malaysia.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/35">
              © {new Date().getFullYear()} ARISTA
            </p>

            <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/35">
              Built by{" "}
              <a
                href="https://solusivendor.com"
                target="_blank"
                rel="noreferrer"
                className="text-white underline decoration-white/30 underline-offset-4 transition hover:text-white/60"
              >
                SolusiVendor.com
              </a>
            </p>
          </div>
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