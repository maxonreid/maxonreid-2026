'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { articles } from '@/app/lib/articles';

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = use(params);
  const article = articles.find((a) => a.slug === slug);

  if (!article || !article.published) {
    notFound();
  }

  // Route to the specific article renderer
  if (slug === 'how-i-built-orderbridge') {
    return <OrderBridgeArticle locale={locale} article={article} />;
  }

  notFound();
}

// ─── OrderBridge Article ───────────────────────────────────────────────────

function OrderBridgeArticle({
  locale,
  article,
}: {
  locale: string;
  article: (typeof articles)[0];
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-0 w-[92%] max-w-[860px] mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-sm text-[#9ea0a8] mb-10">
            <Link href={`/${locale}`} className="hover:text-[#d6b46b] transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/articles`} className="hover:text-[#d6b46b] transition-colors">Articles</Link>
            <span>/</span>
            <span className="text-[#d6b46b] truncate max-w-[200px]">How I Built OrderBridge</span>
          </div>

          {/* Tags + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs border border-white/[0.06] text-[#9ea0a8] px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            <span className="font-mono text-xs text-[#9ea0a8]">
              {article.date} · {article.readTime} read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#e6e7ea] leading-tight mb-6">
            How I Built OrderBridge: Solving the{' '}
            <span className="text-[#d6b46b]">Delivery-to-POS Middleware Gap</span>
          </h1>

          {/* Lede */}
          <p className="text-xl text-[#9ea0a8] leading-relaxed mb-12 max-w-2xl">
            A few months ago, a client came to me with a problem that was simple to describe and
            it seemed quite straightforward. They needed to bridge the gap between major delivery
            platforms and their own POS system with an automated OAuth 2.0 handshake.
          </p>

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.5)] mb-20">
            <img
              src="/images/projects/orderbridge/orderbridge-cover.png"
              alt="OrderBridge dashboard overview"
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="w-[92%] max-w-[860px] mx-auto pb-24 space-y-20">

          {/* Section: The Pain Point */}
          <section>
            <SectionLabel>[ THE PAIN POINT ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Keeping Track of All the Orders
            </h2>
            <div className="prose-article">
              <p>
                Before we automated this, the workflow was boring and painful. 
                Most busy kitchens have a counter full of tablets from different delivery apps.
              </p>
              <p>A staff member has to:</p>
              <ol>
                <li>Read the order off a tablet.</li>
                <li>Manually type it into the POS.</li>
                <li>Hope they didn't miss a "no onions" modifier or something.</li>
              </ol>
              <p>
                In a quiet shop, it's boring. In a kitchen doing 80+ orders a day, it's a painful
                operational problem.
              </p>
            </div>

            {/* Callout */}
            <div className="my-8 bg-[#d6b46b]/5 border-l-2 border-[#d6b46b] rounded-r-xl p-6">
              <p className="font-mono text-sm text-[#9ea0a8] mb-1">THE MATH</p>
              <p className="text-[#e6e7ea] text-lg leading-relaxed">
                50 orders a day × 2.5 minutes of manual entry × $18/hr ={' '}
                <span className="text-[#d6b46b] font-bold">$1,100+ lost every month</span> to a
                task that shouldn't involve a human at all.
              </p>
            </div>
          </section>

          {/* Screenshot: Orders page */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]">
            <img
              src="/images/projects/orderbridge/orderbridge-orders.png"
              alt="OrderBridge orders page with live order feed"
              className="w-full object-cover"
              loading="lazy"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Orders page — filterable, sortable, real-time status updates
            </figcaption>
          </figure>

          {/* Section: Engineering the Pipeline */}
          <section>
            <SectionLabel>[ ENGINEERING ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Engineering the Pipeline
            </h2>
            <div className="prose-article">
              <p>
                Once the ROI was clear, I mapped out the pipeline. The logic needed to be
                bulletproof:
              </p>
            </div>

            {/* Pipeline steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {[
                { n: '01', title: 'Ingest delivery webhooks', desc: 'Receive HTTPS POST from each delivery platform.' },
                { n: '02', title: 'Verify signatures', desc: 'HMAC-SHA256 check — security before anything else.' },
                { n: '03', title: 'Translate schemas', desc: 'Map disparate JSON payloads into a unified POS format.' },
                { n: '04', title: 'Inject the order', desc: 'POST to the POS API with exponential-backoff retry.' },
                { n: '05', title: 'Broadcast updates', desc: 'WebSocket push to the live dashboard — no polling.' },
              ].map((s) => (
                <div
                  key={s.n}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors group"
                >
                  <div className="font-mono text-3xl font-bold text-[#d6b46b]/20 group-hover:text-[#d6b46b]/40 transition-colors mb-3">
                    {s.n}
                  </div>
                  <h3 className="text-sm font-bold text-[#e6e7ea] mb-1">{s.title}</h3>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed">{s.desc}</p>
                </div>
              ))}

            </div>
          </section>

          <div>
            <p >
              I started with a Software Requirements Specification (SRS) because 
              it is much easier to fix a mistake in a document than it is to rewrite code later.
            </p>
          </div>

          {/* Screenshot: Dashboard */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]">
            <img
              src="/images/projects/orderbridge/orderbridge-dashboard.png"
              alt="OrderBridge live dashboard showing real-time order feed"
              className="w-full object-cover"
              loading="lazy"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Live dashboard — real-time order feed with status tracking
            </figcaption>
          </figure>

          {/* Section: The Stack */}
          <section>
            <SectionLabel>[ TECH STACK ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-3">
              The Tech Stack
            </h2>
            <p className="text-[#9ea0a8] mb-8 leading-relaxed">
              What tools would I use for this kind of project:
            </p>

            <div className="space-y-4">
              {[
                {
                  name: 'Node.js & TypeScript',
                  body: "I am sure that Python would've also worked wonders here. Personally I prefer working with node modules and npm over pip and virtual environments.",
                },
                {
                  name: 'Fastify (Not Express)',
                  body: "Express is the legacy default, but Fastify is built for modern performance. Built-in JSON schema validation, lower overhead. For a middleware API where every millisecond counts, Fastify wins.",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <div className="font-mono text-sm font-semibold text-[#d6b46b] mb-2">{t.name}</div>
                  <p className="text-sm text-[#9ea0a8] leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: The Hard Parts */}
          <section>
            <SectionLabel>[ THE HARD PARTS ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Translation and Trust
            </h2>
            <div className="prose-article">
              <p>
                The Translator was the hardest part of this project. DoorDash, Uber Eats,
                and GrabFood all have wildly different ideas of how to describe a "Cheeseburger
                with no pickles." Mapping these inconsistent payloads to a standardised POS SKU
                while maintaining a MenuMapping table required deep edge-case handling. If the
                mapping fails, the system has to fail{' '}
                <em>gracefully</em> — not drop the order into a void.
              </p>
              <p>
                Then there was the OAuth 2.0 Server. It's one thing to <em>use</em> OAuth; it's
                another to <em>be</em> the provider. Building the authorization endpoints, token
                logic, and encrypted storage according to the RFC specs took more gray hair than
                the rest of the app combined.
              </p>
            </div>
          </section>

          {/* Screenshot: MockPOS */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]">
            <img
              src="/images/projects/orderbridge/orderbridge-mock-pos.png"
              alt="MockPOS terminal showing injected orders arriving from OrderBridge"
              className="w-full object-cover"
              loading="lazy"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Phing Kai Kitchen [POS Simulator] — orders arriving automatically from OrderBridge
            </figcaption>
          </figure>

          {/* Section: Introducing OrderBridge */}
          <section>
            <SectionLabel>[ THE PORTFOLIO BUILD ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Introducing OrderBridge
            </h2>
            <div className="prose-article">
              <p>
                I enjoyed the architecture of the client project so much that I built
                OrderBridge — a refined, standalone version for my portfolio. It's not just a
                copy; it's an evolution. A complete end-to-end demo that simulates the entire
                flow without needing real-world infrastructure.
              </p>
            </div>

            <div className="my-8 space-y-4">
              {[
                {
                  name: 'Backend',
                  body: 'Fastify, TypeScript, and WebSockets.',
                },
                {
                  name: 'POS Simulator (MockPOS)',
                  body: "A secondary app representing a fictional restaurant called Phing Kai Kitchen. It acts as the 'target' POS, complete with its own OAuth consent screen and live order terminal.",
                },
                // {
                //   name: 'Visual Distinction',
                //   body: 'MockPOS intentionally uses a different aesthetic (navy and amber) from the OrderBridge dashboard. Side by side, it\'s immediately clear these are two separate systems communicating over the wire.',
                // },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <div className="font-mono text-sm font-semibold text-[#d6b46b] mb-2">{t.name}</div>
                  <p className="text-sm text-[#9ea0a8] leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Screenshot: Simulator */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]">
            <img
              src="/images/projects/orderbridge/orderbridge-simulator.png"
              alt="OrderBridge order simulator page"
              className="w-full object-cover"
              loading="lazy"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Simulator — fire test orders from any delivery platform with one click
            </figcaption>
          </figure>

          {/* Section: Hindsight */}
          {/* <section>
            <SectionLabel>[ HINDSIGHT ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              20/20
            </h2>
            <div className="prose-article">
              <p>
                If I were starting over today, I'd move to a Test-Driven Development (TDD)
                approach for the Translator module specifically. The number of permutations in
                delivery payloads is so high that writing the tests before the mapping logic
                would have saved hours of manual debugging. The Translator is the heart of the
                system — it deserves the most rigorous test coverage.
              </p>
            </div>
          </section> */}

          {/* CTA */}
          <section className="border-t border-white/[0.06] pt-16">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-6">
              [ SEE IT IN ACTION ]
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-4">
              Check Out the Live Demo
            </h2>
            <p className="text-[#9ea0a8] mb-10 leading-relaxed max-w-xl">
              The code is open on GitHub if you want to dive into the schema mapping. And if
              your business is currently drowning in "tablet farm" chaos — let's talk.
            </p>
            <div className="flex flex-wrap gap-4">
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
                href={`/${locale}/projects/orderbridge`}
                className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-6 py-3 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
              >
                Full Case Study
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href={`/${locale}/articles`}
                className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-6 py-3 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
              >
                ← All Articles
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-4">
      {children}
    </div>
  );
}
