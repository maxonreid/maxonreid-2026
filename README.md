# Maxon Torres Portfolio 2026

A modern, bilingual portfolio website built with Next.js 16, featuring internationalization support for English and Lao languages.

## ✨ Features

- 🌍 **Internationalization**: Full support for English (en) and Lao (lo) languages using `next-intl`
- 📱 **Responsive Design**: Built with Tailwind CSS v4 for seamless mobile and desktop experiences
- 🎨 **Modern UI**: Clean interface with Lucide React icons and smooth animations
- 💼 **Portfolio Sections**:
  - Hero/Landing section
  - About section
  - Projects showcase with detailed project pages
  - Blog/Articles with dynamic routing
  - Services overview
  - Contact section
- 💻 **Terminal Emulator**: Interactive terminal component using XTerm.js
- ⚡ **Type-Safe**: Built with TypeScript for enhanced developer experience

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd maxonreid-2026

# Install dependencies
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The app supports locale routing:

- English: `http://localhost:3000/en`
- Lao: `http://localhost:3000/lo`

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── about/          # About page
│   │   ├── articles/       # Blog posts
│   │   ├── projects/       # Project showcase
│   │   └── layout.tsx      # Root layout
│   └── components/         # React components
│       ├── home/           # Homepage sections
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LanguageSwitcher.tsx
├── messages/               # i18n translations
│   ├── en.json            # English translations
│   └── lo.json            # Lao translations
├── public/                # Static assets
├── i18n.ts               # i18n configuration
└── routing.ts            # Routing configuration
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Terminal**: [XTerm.js](https://xtermjs.org/)
- **Flags**: [country-flag-icons](https://www.npmjs.com/package/country-flag-icons)

## 🌐 Adding Translations

Edit the translation files in the `messages/` directory:

- `messages/en.json` for English
- `messages/lo.json` for Lao

To add a new locale:

1. Add translation file to `messages/` directory
2. Update `routing.ts` to include the new locale
3. Update `i18n.ts` if needed

## 📝 License

This project is private and proprietary.

## 🤝 Contact

For inquiries or collaboration opportunities, please visit the contact section on the website.
