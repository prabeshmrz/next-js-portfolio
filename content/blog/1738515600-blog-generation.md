---
id: 1738515600-BLOG
aliases: []
tags:
  - Next.js
  - Markdown
  - React
  - Syntax Highlighting
date: "2026-02-02"
description: A deep dive into how this portfolio generates blog posts from markdown files, including syntax highlighting.
draft: false
readingTime: "5"
title: How This Blog is Built: From Markdown to React
---

Welcome to a meta-post about how this blog system works! If you're reading this, you're seeing the result of a pipeline that transforms simple Markdown files into the rich React pages you see before you. Let's break down the magic.

## The Architecture

The blog system is built on a few key pillars:

1.  **Content Storage**: Markdown files in `content/blog`.
2.  **Data Fetching**: Server-side parsing with `fs` and `gray-matter`.
3.  **Rendering**: `react-markdown` for converting Markdown to JSX.
4.  **Styling**: Tailwind CSS and custom components.

## 1. Content Storage

All blog posts live in the `content/blog` directory. Each post is a separate `.md` file. We use a frontmatter block at the top of each file (delimited by `---`) to store metadata like the title, date, and tags.

```yaml
---
title: My Awesome Post
date: "2026-02-02"
tags: ["React", "Next.js"]
description: A short summary.
---
```

## 2. Parsing with `gray-matter`

In `src/lib/content.ts`, we use the `gray-matter` library to parse these files. It separates the YAML frontmatter from the markdown body.

```typescript
// src/lib/content.ts
export function getPostBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(contentDirectory, "blog", `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        slug,
        ...data,
        content,
    } as BlogPost;
}
```

This function reads the file, parses the metadata into a `data` object, and extracts the raw markdown content.

## 3. Rendering with `react-markdown`

The magic happens in `src/app/writings/[slug]/page.tsx`. This dynamic route page receives the `slug` as a parameter, fetches the post content, and renders it using `ReactMarkdown`.

```tsx
// src/app/writings/[slug]/page.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ... inside the component
<article className="prose ...">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {post.content}
    </ReactMarkdown>
</article>
```

We use `remark-gfm` to support GitHub Flavored Markdown (tables, autolinks, etc.).

## 4. Syntax Highlighting

One of the coolest features is the syntax highlighting for code blocks. This is achieved using a combination of `rehype-highlight` and a custom component mapping.

First, we pass `rehype-highlight` as a plugin to `ReactMarkdown`. This detects code blocks and prepares them for highlighting.

Then, we define a custom component for the `code` element. This allows us to intercept the code blocks and render our own `CodeBlock` component, which handles the visual styling, language detection, and copy functionality.

```tsx
<ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight]} // Enables highlighting support
    components={{
        code({ className, children, ...props }) {
            // Check if it's a code block with a language specified
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
                <CodeBlock
                    language={match[0]}
                    className={className}
                    {...props}
                >
                    {children}
                </CodeBlock>
            ) : (
                // Render inline code normally
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
    }}
>
    {post.content}
</ReactMarkdown>
```

The `CodeBlock` component (in `src/components/ui/code-block.tsx`) then takes care of the actual presentation, giving us those nice looking code snippets you see above!

## Conclusion

This setup provides a great balance between simplicity (writing in Markdown) and power (React components and detailed styling). It allows for a frictionless writing experience while maintaining full control over the presentation.
