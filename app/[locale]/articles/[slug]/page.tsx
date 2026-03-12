import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { articles } from '@/app/lib/articles';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

type ArticleRouteParams = {
  slug: string;
  locale: string;
};

function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug && a.published);
}

function toISODate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export function generateStaticParams() {
  const locales = ['en', 'lo'];
  const publishedArticles = articles.filter((a) => a.published);

  return publishedArticles.flatMap((article) =>
    locales.map((locale) => ({
      locale,
      slug: article.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ArticleRouteParams>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/${locale}/articles/${article.slug}`;
  const canonicalUrl = new URL(canonicalPath, SITE_URL).toString();
  const publishedTime = toISODate(article.date);

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en/articles/${article.slug}`,
        lo: `/lo/articles/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: article.title,
      description: article.excerpt,
      siteName: 'Maxon Torres',
      locale: locale === 'lo' ? 'lo_LA' : 'en_US',
      publishedTime,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<ArticleRouteParams>;
}) {
  const { slug, locale } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
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
  const articleUrl = new URL(`/${locale}/articles/${article.slug}`, SITE_URL).toString();
  const articleImage = new URL(article.image, SITE_URL).toString();
  const publishedTime = toISODate(article.date);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: [articleImage],
    datePublished: publishedTime,
    dateModified: publishedTime,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: new URL(`/${locale}`, SITE_URL).toString(),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Articles',
        item: new URL(`/${locale}/articles`, SITE_URL).toString(),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <article>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-0 w-[92%] max-w-[860px] mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-2 font-mono text-sm text-[#9ea0a8]">
              <li>
                <Link href={`/${locale}`} className="hover:text-[#d6b46b] transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/${locale}/articles`} className="hover:text-[#d6b46b] transition-colors">Articles</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#d6b46b] truncate max-w-[200px]" aria-current="page">How I Built OrderBridge</li>
            </ol>
          </nav>

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

          <div className="prose-article mb-12 max-w-none">
            <p>
              This project started as a real client brief. The request came in Spanish:{' '}
              <em lang="es">
                "Queremos conectar los servicios de domicilios de nuestros clientes (DoorDash, etc.)
                a StreamOrder utilizando OAuth. Una vez que StreamOrder esté conectado y autenticado,
                las cuentas de los servicios de entrega de los clientes se conectarán a nuestro sistema
                POS."
              </em>
              In short: they needed to connect their clients' delivery accounts to their POS system through StreamOrder's partner API — automatically, via OAuth, with no manual intervention. I analysed the requirements, read through the StreamOrder partner documentation, and got to work.
            </p>
          </div>

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

          {/* Section: The Brief */}
          <section>
            <SectionLabel>[ THE BRIEF ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              The Client Proposal
            </h2>
            <div className="prose-article mb-8">
              <p>
                Before writing a single line of code, I put together a formal proposal. It forced
                clarity on both sides — the client understood exactly what they were getting, and I
                understood exactly what I was building.
              </p>
            </div>

            {/* Proposal document card */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden mb-8">

              {/* Document header */}
              <div className="border-b border-white/[0.06] px-6 py-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-[#9ea0a8] mb-1">PROJECT PROPOSAL</p>
                  <h3 className="text-lg font-bold text-[#e6e7ea]">
                    Delivery Apps to POS Integration
                  </h3>
                  <p className="font-mono text-xs text-[#9ea0a8] mt-1">
                    Middleware API · StreamOrder · OAuth 2.0
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-xs text-[#9ea0a8]">Maximiliano B. Torres</p>
                  <p className="font-mono text-xs text-[#9ea0a8]">February 27, 2026</p>
                </div>
              </div>

              <div className="p-6 space-y-6">

                {/* Description */}
                <div>
                  <p className="font-mono text-xs text-[#d6b46b] mb-2">DESCRIPTION</p>
                  <p className="text-sm text-[#9ea0a8] leading-relaxed">
                    This project establishes a secure, automated &ldquo;Digital Bridge&rdquo; — a
                    Middleware API between the StreamOrder aggregator and the client&apos;s Point of
                    Sale (POS) system, enabling delivery orders to flow automatically into the POS
                    with no manual intervention.
                  </p>
                </div>

                {/* Objective */}
                <div>
                  <p className="font-mono text-xs text-[#d6b46b] mb-2">OBJECTIVE</p>
                  <p className="text-sm text-[#9ea0a8] leading-relaxed mb-3">
                    Implement OAuth 2.0 as the authentication layer, ensuring data remains secure
                    while allowing orders to sync automatically from delivery platforms into the POS.
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        label: 'Secure Connection',
                        desc: 'OAuth handshake — no shared passwords, data protected by encrypted digital keys.',
                      },
                      {
                        label: 'Automatic Sync',
                        desc: 'Every DoorDash and delivery platform order appears in the POS instantly.',
                      },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-3 text-sm">
                        <span className="text-[#d6b46b] mt-0.5 shrink-0">→</span>
                        <span>
                          <span className="text-[#e6e7ea] font-medium">{item.label}:</span>{' '}
                          <span className="text-[#9ea0a8]">{item.desc}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture flow */}
                <div>
                  <p className="font-mono text-xs text-[#d6b46b] mb-3">ARCHITECTURE FLOW</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      'Delivery Platforms',
                      'StreamOrder',
                      'Middleware API',
                      'POS System',
                      'Dashboard',
                    ].map((node, i, arr) => (
                      <div key={node} className="flex items-center gap-2">
                        <div
                          className={`font-mono text-xs px-3 py-1.5 rounded-lg border ${
                            i === 2
                              ? 'bg-[#d6b46b]/10 border-[#d6b46b]/40 text-[#d6b46b]'
                              : 'border-white/[0.06] text-[#9ea0a8]'
                          }`}
                        >
                          {node}
                        </div>
                        {i < arr.length - 1 && (
                          <span className="text-[#9ea0a8]/40 text-xs">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <h3 className="text-lg font-bold text-[#e6e7ea] mb-4">4-Week Timeline</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  week: 'Week 1',
                  title: 'Security & The Digital Handshake',
                  goal: 'Securely connect the client accounts.',
                  result:
                    'StreamOrder officially linked; data protected by encrypted OAuth keys.',
                },
                {
                  week: 'Week 2',
                  title: 'The Automation Bridge',
                  goal: 'Make the systems communicate.',
                  result:
                    'Translator and webhook listener live in a test environment — orders captured and translated instantly.',
                },
                {
                  week: 'Week 3',
                  title: 'Dashboard & Live Launch',
                  goal: 'Visibility and production readiness.',
                  result:
                    'Bridge active, orders printing in the POS, live monitoring dashboard delivered.',
                },
                {
                  week: 'Week 4',
                  title: 'Refinement & Monitoring',
                  goal: 'Stability under real-world conditions.',
                  result:
                    '7-day live monitoring window; API changes from StreamOrder or delivery platforms patched immediately.',
                },
              ].map((w) => (
                <div
                  key={w.week}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <p className="font-mono text-xs text-[#d6b46b] mb-1">{w.week}</p>
                  <h4 className="text-sm font-bold text-[#e6e7ea] mb-3">{w.title}</h4>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed mb-1">
                    <span className="text-[#e6e7ea]">Goal:</span> {w.goal}
                  </p>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed">
                    <span className="text-[#e6e7ea]">Result:</span> {w.result}
                  </p>
                </div>
              ))}
            </div>

            {/* Core deliverables */}
            <h3 className="text-lg font-bold text-[#e6e7ea] mb-4">Core Deliverables</h3>
            <div className="space-y-3 mb-8">
              {[
                {
                  name: 'OAuth 2.0 Integration',
                  desc: 'Authentication layer connecting all accounts without sharing private passwords.',
                },
                {
                  name: 'Real-Time Order Injection',
                  desc: 'Orders detected via webhook and pushed directly into the POS within seconds.',
                },
                {
                  name: 'Automated Translator',
                  desc: 'Intelligent menu mapping ensuring every item, modifier, and customer note matches the POS format.',
                },
                {
                  name: 'Automatic Token Refresh',
                  desc: 'Self-maintaining security — OAuth tokens renew automatically so the connection never expires.',
                },
                {
                  name: 'Reliability Monitoring',
                  desc: 'Error-tracking that alerts immediately if an order fails to sync.',
                },
                {
                  name: 'Live Connection Dashboard',
                  desc: 'Web view to monitor bridge status and verify the most recent successful syncs.',
                },
              ].map((d) => (
                <div
                  key={d.name}
                  className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
                >
                  <span className="text-[#d6b46b] mt-0.5 shrink-0 font-mono text-sm">✓</span>
                  <div className="text-sm">
                    <span className="font-medium text-[#e6e7ea]">{d.name}</span>
                    <span className="text-[#9ea0a8]"> — {d.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Prerequisites callout */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 mb-8">
              <p className="font-mono text-xs text-[#d6b46b] mb-3">PROJECT PREREQUISITES</p>
              <div className="space-y-2">
                {[
                  'StreamOrder Developer access with Partner API enabled.',
                  'POS developer portal credentials with write permissions.',
                  'Menu / SKU list exported from the POS (CSV or Excel).',
                  'A named technical point of contact authorised to approve the OAuth handshake.',
                ].map((req) => (
                  <div key={req} className="flex gap-3 text-sm">
                    <span className="text-[#9ea0a8]/40 mt-0.5 shrink-0">—</span>
                    <span className="text-[#9ea0a8]">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PDF download */}
            <a
              href="/docs/projects/orderbridge/orderbridge-proposal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-5 py-2.5 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
            >
              ↓ Download Original Proposal (PDF)
            </a>
          </section>

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

          {/* Section: The SRS */}
          <section>
            <SectionLabel>[ THE PROCESS ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Writing the Spec First
            </h2>
            <div className="prose-article mb-8">
              <p>
                I started with a Software Requirements Specification (SRS) before writing a single
                line of code. It&apos;s much easier to fix a mistake in a document than to rewrite
                production code later. The SRS forced both me and the client to agree on exactly
                what &ldquo;done&rdquo; looked like — no ambiguity, no scope creep.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: 'FR-01',
                  title: 'OAuth 2.0 Server',
                  desc: 'System must act as an OAuth 2.0 provider — issuing, validating, and refreshing tokens per RFC 6749.',
                },
                {
                  label: 'FR-02',
                  title: 'Webhook Ingestion',
                  desc: 'System must accept HTTPS POST webhooks from delivery platforms and verify each request with HMAC-SHA256 signature validation.',
                },
                {
                  label: 'FR-03',
                  title: 'Schema Translation',
                  desc: 'System must map all incoming delivery payloads to a unified POS format, with graceful failure and logging on unmapped SKUs.',
                },
                {
                  label: 'FR-04',
                  title: 'POS Injection',
                  desc: 'System must POST translated orders to the POS API with exponential-backoff retry on failure — no order dropped silently.',
                },
                {
                  label: 'NFR-01',
                  title: 'Real-Time Updates',
                  desc: 'Dashboard must reflect order status changes via WebSocket push. No polling.',
                },
                {
                  label: 'NFR-02',
                  title: 'Token Persistence',
                  desc: 'OAuth tokens must survive server restarts, stored encrypted at rest.',
                },
              ].map((r) => (
                <div
                  key={r.label}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-[#d6b46b] bg-[#d6b46b]/10 px-2 py-0.5 rounded">
                      {r.label}
                    </span>
                    <span className="text-sm font-bold text-[#e6e7ea]">{r.title}</span>
                  </div>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

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

          {/* Section: Deployment */}
          <section>
            <SectionLabel>[ DEPLOYMENT ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Infrastructure
            </h2>
            <div className="prose-article mb-8">
              <p>
                The three services are independently deployed — each with its own host, its own
                domain, and its own responsibility. This mirrors how a real production integration
                would be structured.
              </p>
            </div>

            {/* Infrastructure diagram */}
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 mb-8">
              <p className="font-mono text-xs text-[#d6b46b] mb-5">INFRASTRUCTURE OVERVIEW</p>
              <div className="space-y-3">
                {[
                  {
                    host: 'Vercel',
                    service: 'OrderBridge Dashboard',
                    detail: 'Real-time monitoring UI — edge-deployed, globally available.',
                    tag: 'Frontend',
                  },
                  {
                    host: 'Railway',
                    service: 'OrderBridge API + PostgreSQL',
                    detail: 'Core middleware engine with the OAuth server, webhook ingestion, schema translator, and POS injector. PostgreSQL stores OAuth tokens, menu mappings, and order logs.',
                    tag: 'Backend',
                  },
                  {
                    host: 'Railway',
                    service: 'MockPOS Server',
                    detail: 'Isolated POS simulator running as a completely separate service — its own OAuth consent flow, its own order terminal.',
                    tag: 'Simulator',
                  },
                ].map((s) => (
                  <div
                    key={s.service}
                    className="flex gap-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 hover:border-[#d6b46b]/30 transition-colors"
                  >
                    <div className="shrink-0 text-right w-16 pt-0.5">
                      <span className="font-mono text-xs text-[#d6b46b]">{s.host}</span>
                    </div>
                    <div className="w-px bg-white/[0.06] shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#e6e7ea]">{s.service}</span>
                        <span className="font-mono text-xs text-[#9ea0a8] border border-white/[0.06] px-2 py-0.5 rounded-full">
                          {s.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#9ea0a8] leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why separate */}
            <div className="bg-[#d6b46b]/5 border-l-2 border-[#d6b46b] rounded-r-xl p-6">
              <p className="font-mono text-xs text-[#9ea0a8] mb-1">WHY SEPARATE SERVICES</p>
              <p className="text-[#e6e7ea] text-sm leading-relaxed">
                Keeping MockPOS on its own Railway service wasn&apos;t just convenient — it was
                the point. It proves the integration works across a real network boundary, not just
                between two functions in the same process.
              </p>
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
                  github: 'https://github.com/maxonreid/orderbridge-api',
                },
                {
                  name: 'Dashboard',
                  body: 'Real-time monitoring and control UI for the OrderBridge system.',
                  github: 'https://github.com/maxonreid/orderbridge-dashboard/',
                },
                {
                  name: 'POS Simulator (MockPOS)',
                  body: "A secondary app representing a fictional restaurant called Phing Kai Kitchen. It acts as the 'target' POS, complete with its own OAuth consent screen and live order terminal.",
                  github: 'https://github.com/maxonreid/mock-pos-server',
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-sm font-semibold text-[#d6b46b]">{t.name}</div>
                    <a
                      href={t.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9ea0a8] hover:text-[#d6b46b] transition-colors"
                      aria-label={`View ${t.name} on GitHub`}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  </div>
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

          {/* Section: Source Code */}
          <section>
            <SectionLabel>[ SOURCE CODE ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              The Complete Codebase
            </h2>
            <p className="text-[#9ea0a8] mb-8 leading-relaxed">
              All three core components are open-source and available on GitHub:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: 'OrderBridge API',
                  desc: 'Core middleware engine with OAuth 2.0, webhook ingestion, and schema translation.',
                  url: 'https://github.com/maxonreid/orderbridge-api',
                },
                {
                  title: 'OrderBridge Dashboard',
                  desc: 'Real-time monitoring UI with live order feed and connection status.',
                  url: 'https://github.com/maxonreid/orderbridge-dashboard/',
                },
                {
                  title: 'MockPOS Server',
                  desc: 'POS simulator demonstrating the complete integration flow.',
                  url: 'https://github.com/maxonreid/mock-pos-server',
                },
              ].map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/50 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#e6e7ea] group-hover:text-[#d6b46b] transition-colors">
                      {repo.title}
                    </h3>
                    <svg className="w-4 h-4 text-[#9ea0a8] group-hover:text-[#d6b46b] transition-colors flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </div>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed group-hover:text-[#b8bcc4] transition-colors">
                    {repo.desc}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* Section: Live Demos */}
          <section>
            <SectionLabel>[ LIVE DEMOS ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Try It Out
            </h2>
            <p className="text-[#9ea0a8] mb-8 leading-relaxed">
              Both services are live and ready to use:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                {
                  name: 'OrderBridge Dashboard',
                  desc: 'Real-time monitoring interface. Watch orders flow through the pipeline as they arrive.',
                  url: 'https://orderbridge.maxontorres.com/',
                  icon: '📊',
                },
                {
                  name: 'MockPOS Server',
                  desc: 'Live orders page from the fictional Phing Kai Kitchen POS system. See orders injected in real time.',
                  url: 'https://mock-pos-server-production.up.railway.app/orders',
                  icon: '🍜',
                },
              ].map((demo) => (
                <a
                  key={demo.url}
                  href={demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/50 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#e6e7ea] group-hover:text-[#d6b46b] transition-colors">
                      {demo.name}
                    </h3>
                    <span className="text-lg mt-0.5">🔗</span>
                  </div>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed group-hover:text-[#b8bcc4] transition-colors mb-3">
                    {demo.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[#d6b46b] font-mono">
                    Visit →
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-white/[0.06] pt-16">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-6">
              [ SEE IT IN ACTION ]
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-4">
              Ready to Explore?
            </h2>
            <p className="text-[#9ea0a8] mb-10 leading-relaxed max-w-xl">
              Dive into the source code, watch the live systems in action, or check out the full case study.
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
        </article>
      </main>
      <Footer />
    </>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-4">
      {children}
    </div>
  );
}
