import type { ReactNode } from 'react';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { articles } from '@/app/lib/articles';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maxontorres.com';

function toISODate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-4">
      {children}
    </div>
  );
}

export default function YangoUniversityArticle({
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    author: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
      jobTitle: 'Full-Stack Developer & Educator',
      sameAs: [
        'https://github.com/maxonreid',
        'https://linkedin.com/in/maxonreid',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Maximiliano Brito Torres',
      url: SITE_URL,
    },
    keywords: article.tags.join(', '),
    articleSection: 'Career & Education',
    inLanguage: locale === 'lo' ? 'lo-LA' : 'en-US',
    wordCount: 900,
    timeRequired: 'PT5M',
    educationalLevel: 'Beginner to Intermediate',
    about: {
      '@type': 'Thing',
      name: 'Web Development Education',
      description: 'Teaching web fundamentals and computer science at Yango University in China',
    },
    mentions: [
      {
        '@type': 'Organization',
        name: 'Yango University',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Fuzhou',
          addressRegion: 'Fujian',
          addressCountry: 'CN',
        },
      },
    ],
    teaches: [
      'HTML',
      'CSS',
      'JavaScript',
      'Web Development',
      'Frontend Development',
      'Computer Science Fundamentals',
    ],
    isAccessibleForFree: true,
    educationalUse: 'Teaching experience and career insights',
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

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Teach Web Development Effectively',
    description: 'Best practices for teaching web development fundamentals across language and cultural barriers',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Focus on Practical Learning',
        text: 'Keep classes practical and fun. Get students building something they can see working in the browser, even simple landing pages.',
      },
      {
        '@type': 'HowToStep',
        name: 'Use Visual Demonstrations',
        text: 'Rely heavily on visual demonstrations, live coding, diagrams, and examples to overcome language barriers.',
      },
      {
        '@type': 'HowToStep',
        name: 'Let Code Be the Common Language',
        text: 'Code becomes a universal language. Once students start experimenting and seeing results, communication barriers disappear.',
      },
      {
        '@type': 'HowToStep',
        name: 'Build Strong Fundamentals',
        text: 'Focus on core concepts like HTTP, DOM manipulation, and CSS behavior rather than specific frameworks.',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What did you teach at Yango University?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I taught web development fundamentals including HTML semantic structure, CSS responsive layout, JavaScript basics, browser functionality, internet fundamentals, and the client-server model behind web applications.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you overcome language barriers when teaching coding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use visual demonstrations, live coding, diagrams, and practical examples. Code becomes a universal language that transcends spoken language barriers once students start experimenting.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does teaching make you a better developer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Teaching forces you to understand concepts at a deeper level, strengthens your fundamentals, improves your ability to communicate technical ideas, and reveals gaps in your own understanding.',
        },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <article itemScope itemType="https://schema.org/Article">

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
              <li className="text-[#d6b46b] truncate max-w-[200px]" aria-current="page">Teaching at Yango University</li>
            </ol>
          </nav>

          {/* Tags + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs border border-white/[0.06] text-[#9ea0a8] px-3 py-1 rounded-full"
                itemProp="keywords"
              >
                {tag}
              </span>
            ))}
            <time 
              dateTime={publishedTime} 
              itemProp="datePublished"
              className="font-mono text-xs text-[#9ea0a8]"
            >
              {article.date} · {article.readTime} read
            </time>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#e6e7ea] leading-tight mb-6" itemProp="headline">
            Teaching Web Development in China @ <span className="text-[#d6b46b]">Yango University</span>
          </h1>

          {/* Lede */}
          <p className="text-xl text-[#9ea0a8] leading-relaxed mb-12 max-w-2xl" itemProp="abstract">
            Shortly after the end of the Covid Era, I spent time teaching web development at Yango University in the city of Fuzhou, Fujian. I had always wanted to try life and work in China.
          </p>

          {/* Hero image */}
          <figure className="rounded-2xl overflow-hidden border border-white/[0.06] shadow-[0_32px_80px_rgba(0,0,0,0.5)] mb-20" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <img
              src="/images/articles/yango-university-china/students-coding.jpeg"
              alt="Students learning web development and coding at Yango University in Fuzhou, China"
              className="w-full object-cover"
              width="1200"
              height="630"
              loading="eager"
              fetchPriority="high"
              itemProp="url contentUrl"
            />
            <meta itemProp="description" content="Students coding at Yango University" />
            <meta itemProp="name" content="Yango University Web Development Class" />
          </figure>
        </section>

        {/* ── Body ─────────────────────────────────────────────────────────── */}
        <div className="w-[92%] max-w-[860px] mx-auto pb-24 space-y-20">

          {/* Section: Teaching the Foundations */}
          <section>
            <SectionLabel>[ THE CURRICULUM ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6" itemProp="alternativeHeadline">
              Teaching the Foundations of the Web
            </h2>
            <div className="prose-article mb-8">
              <p>
                My role was to introduce students to the fundamentals of web development.
              </p>
              <p>We focused on things like:</p>
            </div>

            {/* Topics list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                'HTML and semantic page structure',
                'CSS and responsive layout',
                'JavaScript basics',
                'How browsers work',
                'What is the Internet',
                'The client–server model behind web applications',
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
                >
                  <span className="text-[#d6b46b] mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-[#e6e7ea]">{topic}</span>
                </div>
              ))}
            </div>

            <div className="prose-article">
              <p>
                Instead of only teaching theory, I tried to keep things practical as much as possible, classes needed to be fun, that is what motivates students the most. The goal was always to get students building something they could see working in the browser.
              </p>
              <p>
                Even a simple landing page or interactive UI was enough to get people excited about programming.
              </p>
            </div>
          </section>

          {/* Image: Student presenting */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <img
              src="/images/articles/yango-university-china/student-presenting-a-topic.jpeg"
              alt="Student presenting web development project and topic at Yango University class"
              className="w-full object-cover"
              loading="lazy"
              width="1200"
              height="675"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Student presenting their project to the class
            </figcaption>
            <meta itemProp="description" content="Student presenting at Yango University" />
          </figure>

          {/* Section: Teaching in a Different Culture */}
          <section>
            <SectionLabel>[ THE CHALLENGE ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Teaching in a Different Culture
            </h2>
            <div className="prose-article">
              <p>
                Teaching in China came with some unique challenges.
              </p>
              <p>
                Language differences meant that long technical explanations didn't always work well, I taught my classes in English, and not every student could understand. So I relied heavily on visual demonstrations, live coding, lots of diagrams, and examples.
              </p>
              <p>
                One thing I noticed quickly is that code itself becomes the common language. Once students start experimenting and seeing results in the browser, the barrier disappears.
              </p>
            </div>
          </section>

          {/* Image grid: Students coding */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <img
                src="/images/articles/yango-university-china/female-student-coding.jpeg"
                alt="Female student working on web development HTML CSS JavaScript exercise at Yango University"
                className="w-full object-cover h-64 md:h-80"
                loading="lazy"
                width="600"
                height="400"
                itemProp="url contentUrl"
              />
              <meta itemProp="description" content="Female student coding at Yango University" />
            </figure>
            <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
              <img
                src="/images/articles/yango-university-china/male-student-coding.jpeg"
                alt="Male student working on web development HTML CSS JavaScript exercise at Yango University"
                className="w-full object-cover h-64 md:h-80"
                loading="lazy"
                width="600"
                height="400"
                itemProp="url contentUrl"
              />
              <meta itemProp="description" content="Male student coding at Yango University" />
            </figure>
          </div>

          {/* Section: Why Teaching Makes You Better */}
          <section>
            <SectionLabel>[ THE INSIGHT ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Why Teaching Makes You a Better Developer
            </h2>
            <div className="prose-article mb-8">
              <p>
                Teaching programming forces you to understand things at a deeper level.
              </p>
              <p>When you have to explain concepts like:</p>
            </div>

            {/* Concepts list */}
            <div className="space-y-3 mb-8">
              {[
                'How HTTP requests work',
                'How the DOM is manipulated',
                'Why CSS layouts behave the way they do',
              ].map((concept) => (
                <div
                  key={concept}
                  className="flex gap-3 bg-white/[0.02] border border-white/[0.06] rounded-xl p-4"
                >
                  <span className="text-[#d6b46b] mt-0.5 shrink-0 font-mono text-sm">→</span>
                  <span className="text-sm text-[#e6e7ea]">{concept}</span>
                </div>
              ))}
            </div>

            <div className="prose-article mb-8">
              <p>
                You quickly discover which parts you truly understand and which parts you don't.
              </p>
              <p>That process made me a better developer in several ways:</p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: 'Clearer Thinking',
                  desc: 'About how systems work',
                  icon: '🧠',
                },
                {
                  title: 'Stronger Fundamentals',
                  desc: 'Core concepts over frameworks',
                  icon: '⚡',
                },
                {
                  title: 'Better Communication',
                  desc: 'Of technical ideas',
                  icon: '💬',
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-[#d6b46b]/30 transition-colors"
                >
                  <div className="text-2xl mb-3">{benefit.icon}</div>
                  <h3 className="text-sm font-bold text-[#e6e7ea] mb-1">{benefit.title}</h3>
                  <p className="text-xs text-[#9ea0a8] leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <div className="prose-article mt-8">
              <p>
                All of those skills matter just as much as writing code.
              </p>
            </div>
          </section>

          {/* Image: Group presentation */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <img
              src="/images/articles/yango-university-china/students-presenting-a-topic.jpeg"
              alt="Students presenting their web development final project at Yango University in Fuzhou China"
              className="w-full object-cover"
              loading="lazy"
              width="1200"
              height="675"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Students presenting their final project
            </figcaption>
            <meta itemProp="description" content="Students presenting at Yango University" />
          </figure>

          {/* Section: A Global Industry */}
          <section>
            <SectionLabel>[ PERSPECTIVE ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              A Global Industry
            </h2>
            <div className="prose-article">
              <p>
                One thing that stood out to me while teaching in China was how global software development really is.
              </p>
              <p>
                Students in Fuzhou were learning the same core technologies used by developers everywhere: web standards, JavaScript, APIs, and modern development tools.
              </p>
              <p>
                The problems developers work on are surprisingly similar no matter where you are in the world.
              </p>
              <p>
                But yeah, infrastructure is quite different and confusing.
              </p>
            </div>
          </section>

          {/* Image: Students working together */}
          <figure className="rounded-xl overflow-hidden border border-white/[0.06]" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
            <img
              src="/images/articles/yango-university-china/female-and-male-student-coding.jpeg"
              alt="Students collaborating on web development project learning HTML CSS JavaScript at Yango University"
              className="w-full object-cover"
              loading="lazy"
              width="1200"
              height="675"
              itemProp="url contentUrl"
            />
            <figcaption className="font-mono text-xs text-[#9ea0a8] text-center py-3 border-t border-white/[0.06] bg-white/[0.02]">
              Collaborative coding session
            </figcaption>
            <meta itemProp="description" content="Collaborative coding at Yango University" />
          </figure>

          {/* Section: Looking Back */}
          <section>
            <SectionLabel>[ REFLECTION ]</SectionLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-6">
              Looking Back
            </h2>
            <div className="prose-article">
              <p>
                Teaching web development was an experience that stayed with me. It reinforced something that I still believe strongly: strong fundamentals and clear thinking matter more than any particular framework or tool.
              </p>
              <p>
                And those fundamentals are the same whether you are teaching in a classroom or building real software.
              </p>
            </div>

            {/* Callout */}
            <div className="my-8 bg-[#d6b46b]/5 border-l-2 border-[#d6b46b] rounded-r-xl p-6">
              <p className="font-mono text-sm text-[#9ea0a8] mb-1">KEY TAKEAWAY</p>
              <p className="text-[#e6e7ea] text-lg leading-relaxed">
                Strong fundamentals and clear thinking matter more than any particular framework or tool.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t border-white/[0.06] pt-16">
            <div className="font-mono text-sm text-[#9ea0a8] tracking-[8px] font-semibold mb-6">
              [ MORE ARTICLES ]
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#e6e7ea] mb-4">
              Keep Reading
            </h2>
            <p className="text-[#9ea0a8] mb-10 leading-relaxed max-w-xl">
              Check out more technical notes, guides, and lessons learned from my experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/articles`}
                className="inline-flex items-center gap-2 bg-[#d6b46b] text-[#0a0a0c] px-6 py-3 rounded-lg font-semibold hover:bg-[#b99046] transition-colors"
              >
                View All Articles
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 border border-white/[0.06] text-[#9ea0a8] px-6 py-3 rounded-lg font-mono text-sm hover:border-[#d6b46b]/50 hover:text-[#e6e7ea] transition-all"
              >
                ← Back Home
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
