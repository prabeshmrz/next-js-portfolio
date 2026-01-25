# Portfolio: Adaptive Software Engineer

A modern, content-driven portfolio and blog built with **Next.js 15**, **Tailwind CSS**, and **Shadcn UI**. This project is designed for software engineers who want a high-performance, aesthetically pleasing site that is easy to manage via Markdown.

## 🚀 Features

- **Next.js 15 (App Router)**: Leveraging the latest React features and server-side rendering for optimal performance.
- **Markdown-Powered Content**: Manage your projects, blog posts, and profile information entirely through `.md` files. No database required.
- **Dynamic Search & Filtering**: Built-in search engine to filter projects and writings by technology, title, or description.
- **Tag-Based Navigation**: Discover related content effortlessly through a unified tagging system.
- **Fully Responsive & Adaptive**: Seamless transition between desktop (permanent sidebar) and mobile (sheet-based drawer) navigation.
- **Dark Mode Support**: Aesthetic dark and light themes powered by `next-themes`.
- **Modern UI Components**: Leverages **Shadcn UI** for high-quality, accessible interactive elements.
- **SEO Optimized**: Pre-configured meta tags, semantic HTML, and lightning-fast load times.

## 📂 Project Structure

```text
├── content/              # Markdown files (Source of truth)
│   ├── blog/             # Writings and notes
│   ├── projects/         # Engineering projects
│   └── info/             # Profile, experience, and education metadata
├── src/
│   ├── app/              # Next.js App Router (Pages & Layouts)
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions and content parsing logic
│   └── styles/           # Global CSS and Tailwind configurations
└── public/               # Static assets (images, icons, etc.)
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Content Parsing**: [Gray-matter](https://github.com/jonschlinkert/gray-matter) & [React-markdown](https://github.com/remarkjs/react-markdown)
- **Icons**: [Material Symbols](https://fonts.google.com/icons) & [Lucide React](https://lucide.dev/)
- **Type Safety**: TypeScript

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Managing Content

To update your portfolio, simply edit the Markdown files in the `content/` directory.

- **Profile Info**: Edit `content/info/profile.md` to change your name, role, bio, and social links.
- **Projects**: Add new `.md` files to `content/projects/`. Ensure you include the necessary frontmatter (title, tags, icon, links).
- **Blog Posts**: Add new `.md` files to `content/blog/`. You can mark posts as `draft: true` to prevent them from showing up in production.

---

Built with ❤️ by Prabesh Maharjan.
