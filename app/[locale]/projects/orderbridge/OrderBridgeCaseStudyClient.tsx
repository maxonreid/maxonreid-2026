'use client';

import { useState } from 'react';
import { Link } from '@/routing';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const galleryImages: GalleryImage[] = [
  {
    src: '/images/projects/orderbridge/orderbridge-dashboard.png',
    alt: 'OrderBridge dashboard showing live order feed',
    caption: 'Live dashboard — real-time order feed with status tracking',
  },
  {
    src: '/images/projects/orderbridge/orderbridge-orders.png',
    alt: 'OrderBridge orders page with filters',
    caption: 'Orders page — filterable, sortable, CSV export',
  },
  {
    src: '/images/projects/orderbridge/orderbridge-mock-pos.png',
    alt: 'MockPOS mock terminal showing injected orders',
    caption: 'MockPOS terminal — orders arriving automatically from OrderBridge',
  },
  {
    src: '/images/projects/orderbridge/orderbridge-simulator.png',
    alt: 'OrderBridge simulator page',
    caption: 'Simulator — fire test orders from any delivery platform',
  },
];

const techStack = [
  {
    name: 'React 19 + Vite',
    reason: 'Fast dev experience, React Query for server state, no SSR overhead needed for a dashboard.',
  },
  {
    name: 'Fastify + TypeScript',
    reason: 'Lower overhead than Express, schema-based validation built in, excellent TypeScript support.',
  },
  {
    name: 'PostgreSQL + Prisma',
    reason: 'Relational data fits the order/token/mapping schema well. Prisma keeps migrations safe and typed.',
  },
  {
    name: 'WebSockets (ws)',
    reason: 'Native WebSocket — no Socket.io overhead for a single broadcast channel.',
  },
  {
    name: 'OAuth 2.0 + AES-256',
    reason: 'Industry-standard POS auth flow. Tokens encrypted at rest before writing to the database.',
  },
  {
    name: 'HMAC-SHA256',
    reason: 'Webhook signature verification — only legitimate delivery platform payloads are processed.',
  },
];

const outcomes = [
  { value: '<800ms', label: 'End-to-end order processing' },
  { value: '5', label: 'Delivery platforms supported' },
  { value: '3', label: 'POS systems integrated' },
  { value: '0', label: 'Manual steps required' },
];

const pipeline = [
  {
    step: '01',
    title: 'Webhook Reception',
    desc: 'Each delivery platform sends an HTTPS POST to a shared webhook endpoint. The server verifies the HMAC-SHA256 signature, rejects invalid payloads immediately, and deduplicates by order ID.',
  },
  {
    step: '02',
    title: 'Translation',
    desc: 'A platform-specific handler maps the delivery schema to a standardised POS payload. Each item is resolved against a MenuMapping table that links platform item IDs to POS SKUs.',
  },
  {
    step: '03',
    title: 'Injection',
    desc: 'The translated payload is POSTed to the POS API with exponential backoff retry. On success, the POS order ID is stored. On failure after max retries, the order is marked FAILED and flagged for manual review.',
  },
  {
    step: '04',
    title: 'Real-Time Sync',
    desc: 'Every state change is persisted to PostgreSQL and broadcast via WebSocket to all connected dashboard clients — no polling, no page refreshes.',
  },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  activeIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  return (
    
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        className="absolute top-6 right-6 text-[#9ea0a8] hover:text-[#e6e7ea] font-mono text-sm transition-colors"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        [ ESC ]
      </button>

      <button
        className="absolute left-6 text-[#9ea0a8] hover:text-[#d6b46b] font-mono text-2xl transition-colors"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        ←
      </button>

      <div
        className="max-w-5xl w-full mx-16 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIndex].src}
          alt={images[activeIndex].alt}
          className="w-full rounded-xl border border-white/[0.06]"
        />
        <p className="text-center font-mono text-sm text-[#9ea0a8]">
          {images[activeIndex].caption}
        </p>
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === activeIndex ? 'bg-[#d6b46b]' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <button
        className="absolute right-6 text-[#9ea0a8] hover:text-[#d6b46b] font-mono text-2xl transition-colors"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrderBridgeCaseStudy() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length));
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length
    );

  return (
    <>
      <Header />

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}

      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-0 w-[92%] max-w-[1200px] mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-sm text-[#9ea0a8] mb-10">
            <Link href="/" className="hover:text-[#d6b46b] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-[#d6b46b] transition-colors">Work</Link>
            <span>/</span>
            <span className="text-[#d6b46b]">OrderBridge</span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['2026', 'Automation', 'Integration', 'Full-Stack'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs border border-white/[0.06] text-[#9ea0a8] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#e6e7ea] leading-none mb-6">
            Order<span className="text-[#d6b46b]">Bridge</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-[#9ea0a8] max-w-2xl leading-relaxed mb-10">
            A middleware system that connects food delivery platforms to restaurant POS systems —
            eliminating manual order entry entirely.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="https://orderbridge.maxontorres.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#d6b46b] text-[#0a0a0c] px-6 py-3 rounded-lg font-semibold hover:bg-[#b99046] transition-colors"
            >
              View Live Demo
              <span aria-hidden="true">→</span>
            </a>
            <Link
              href="/articles/how-i-built-orderbridge"
              className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-6 py-3 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
            >
              Read the Build Article
              <span aria-hidden="true">↗</span>
            </Link>
            <a
              href="https://github.com/maxonreid/orderbridge-api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-6 py-3 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Hero image */}
          {/* <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <img
              src="/images/projects/orderbridge/orderbridge-cover.png"
              alt="OrderBridge dashboard overview"
              className="w-full object-cover"
            />
          </div> */}

          <figure className="rounded-2xl overflow-hidden border border-white/[0.06] mt-8">
            <img
              src="/images/projects/orderbridge/orderbridge-diagram.png"
              alt="OrderBridge architecture diagram showing delivery platforms flowing through OrderBridge into a restaurant POS"
              className="w-full object-cover"
              width={2400}
              height={1260}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              High-level flow: delivery platforms {'->'} OrderBridge {'->'} restaurant POS
            </figcaption>
          </figure>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────────────────── */}
        <section className="py-20 w-[92%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {outcomes.map((o) => (
              <div
                key={o.label}
                className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#d6b46b] mb-2 font-mono">
                  {o.value}
                </div>
                <div className="text-sm text-[#9ea0a8] leading-snug">{o.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Problem ──────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold sticky top-8">
                [ THE PROBLEM ]
              </div>
            </div>
            <div className="space-y-6 text-lg text-[#9ea0a8] leading-relaxed max-w-2xl">
              <p>
                Every time an order arrives from DoorDash, Uber Eats, or Grubhub, someone at
                the restaurant has to manually read it off a tablet and type it into their POS
                system. At 50 orders a day, that's over two hours of labour — every single day.
              </p>
              <p>
                Manual entry introduces errors. A missed modifier, a wrong quantity, a skipped
                item. In a high-volume kitchen, one wrong order ripples into customer complaints,
                refunds, and wasted food.
              </p>
              <p>
                The economics are straightforward: at 50 orders per day, 2.5 minutes of manual
                entry each, and $18/hr labour cost — that's over{' '}
                <span className="text-[#d6b46b] font-semibold">$1,100 lost every month</span>{' '}
                to a problem that should be automated.
              </p>
            </div>
          </div>
        </section>

        {/* ── Solution ─────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold sticky top-8">
                [ THE SOLUTION ]
              </div>
            </div>
            <div className="space-y-8 max-w-2xl">
              <p className="text-lg text-[#9ea0a8] leading-relaxed">
                OrderBridge sits between delivery platforms and the POS. When an order arrives,
                it receives the webhook, translates the payload into the POS format, and injects
                the order automatically — in under 800ms, with no human in the loop.
              </p>

              {/* Architecture flow */}
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
                <div className="font-mono text-xs text-[#9ea0a8] mb-6 tracking-wider">
                  ARCHITECTURE FLOW
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 font-mono text-sm">
                  {[
                    { label: 'Delivery\nPlatform', cls: 'arch-node-platform' },
                    { label: 'Webhook\nReceiver', cls: 'arch-node-middleware' },
                    { label: 'Translator', cls: 'arch-node-middleware' },
                    { label: 'Injector', cls: 'arch-node-middleware' },
                    { label: 'POS\nSystem', cls: 'arch-node-pos' },
                  ].flatMap((node, i, arr) => {
                    const items = [
                      <div
                        key={node.label}
                        className={`bg-white/[0.03] border rounded-lg px-3 py-2 text-center text-xs leading-tight whitespace-pre-line ${node.cls}`}
                      >
                        {node.label}
                      </div>,
                    ];
                    if (i < arr.length - 1) {
                      items.push(
                        <span key={`arrow-${i}`} className="text-[#9ea0a8] text-lg leading-none">
                          <span className="hidden sm:inline">→</span>
                          <span className="sm:hidden">↓</span>
                        </span>
                      );
                    }
                    return items;
                  })}
                </div>
                <div className="mt-4 pt-4 border-t border-white/[0.06] font-mono text-xs text-[#9ea0a8]">
                  WebSocket broadcast → Dashboard (real-time)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-12">
              [ HOW IT WORKS ]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pipeline.map((step) => (
                <div
                  key={step.step}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-6 hover:border-[#d6b46b]/30 transition-colors group"
                >
                  <div className="font-mono text-4xl font-bold text-[#d6b46b]/20 group-hover:text-[#d6b46b]/40 transition-colors mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#e6e7ea] mb-3">{step.title}</h3>
                  <p className="text-[#9ea0a8] leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Demo Video ───────────────────────────────────────────────────── */}
        {/* <section className="py-20 border-t border-white/[0.06]"> */}
          {/* <div className="w-[92%] max-w-[1200px] mx-auto"> */}
            {/* <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-12"> */}
              {/* [ DEMO ] */}
            {/* </div> */}
            {/* Replace VIDEO_ID with your YouTube video ID once published */}
            {/* <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"> */}
              {/* <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="OrderBridge demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              /> */}
            {/* </div> */}
          {/* </div> */}
        {/* </section> */}

        {/* ── Screenshots ──────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-12">
              [ SCREENSHOTS ]
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  className="group relative aspect-video rounded-xl overflow-hidden border border-white/[0.06] hover:border-[#d6b46b]/50 transition-all text-left"
                  onClick={() => openLightbox(i)}
                  aria-label={`View screenshot: ${img.caption}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="font-mono text-xs text-[#e6e7ea]">{img.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
            <div>
              <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold sticky top-8">
                [ TECH STACK ]
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <div className="font-mono text-sm font-semibold text-[#d6b46b] mb-2">
                    {tech.name}
                  </div>
                  <p className="text-sm text-[#9ea0a8] leading-relaxed">{tech.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 border-t border-white/[0.06]">
          <div className="w-[92%] max-w-[1200px] mx-auto text-center">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-6">
              [ WORK TOGETHER ]
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#e6e7ea] mb-4">
              Have a similar integration problem?
            </h2>
            <p className="text-[#9ea0a8] mb-10 max-w-lg mx-auto leading-relaxed">
              I build custom automation and integration systems for businesses tired of
              manual workflows. Fixed price, clean code, fast delivery.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#d6b46b] text-[#0a0a0c] px-8 py-3 rounded-lg font-semibold hover:bg-[#b99046] transition-colors"
              >
                Let's Talk
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-8 py-3 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
              >
                ← Back to Work
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}