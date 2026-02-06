import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Mermaid } from "@/components/Mermaid";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        <span className="text-sm font-medium">Back to Projects</span>
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20 w-full">
                <header className="mb-12 space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 font-bold uppercase text-[11px] tracking-widest text-primary bg-primary/10">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                            <span className="material-symbols-outlined text-[28px]">{project.icon}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground leading-[1.1] tracking-tight">
                            {project.title}
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        {project.description}
                    </p>

                    <div className="flex items-center gap-4 pt-4">
                        {project.links.source !== "#" && (
                            <Link
                                href={project.links.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">code</span>
                                Source Code
                            </Link>
                        )}
                        {/* Add live demo link if available in future schemas */}
                    </div>
                </header>

                <article className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-mono prose-headings:font-bold prose-a:text-primary prose-code:before:content-none prose-code:after:content-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                            pre: ({ children }) => <>{children}</>,
                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                const isMermaid = className?.includes('language-mermaid');

                                if (isMermaid) {
                                    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                                }

                                return match ? (
                                    <CodeBlock
                                        language={match[0]}
                                        className={className}
                                        {...props}
                                    >
                                        {children}
                                    </CodeBlock>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {project.content || ""}
                    </ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
