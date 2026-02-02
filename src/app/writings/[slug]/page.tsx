import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { getPostBySlug, getPosts } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Get 2 random posts for "Continue Reading"
    const allPosts = getPosts();
    const otherPosts = allPosts.filter(p => p.slug !== slug).sort(() => 0.5 - Math.random()).slice(0, 2);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/writings" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        <span className="text-sm font-medium">Back to Writings</span>
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12 lg:py-20 w-full">
                <header className="mb-12 space-y-6">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="px-3 py-1 font-bold uppercase text-[11px] tracking-widest text-primary bg-primary/10">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-foreground leading-[1.1] tracking-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-6 text-sm font-mono text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">schedule</span>
                            <span>{post.readingTime} min read</span>
                        </div>
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
                        {post.content || ""}
                    </ReactMarkdown>
                </article>

                {/* <section className="mt-20 p-8 rounded-2xl bg-secondary/50 border border-border">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1 space-y-2">
                            <h3 className="text-xl font-bold text-foreground">Technical Deep-Dives</h3>
                            <p className="text-muted-foreground">Join 2,000+ engineers receiving bi-weekly notes on Go, Kubernetes, and Distributed Systems.</p>
                        </div>
                        <form className="flex w-full md:w-auto gap-2">
                            <input
                                className="flex-1 md:w-64 bg-background border-border rounded-lg text-sm px-4 py-2 focus:ring-2 ring-primary/50 border"
                                placeholder="you@example.com"
                                type="email"
                            />
                            <Button type="submit" className="font-bold">Subscribe</Button>
                        </form>
                    </div>
                </section> */}

                <section className="mt-20 space-y-8">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                        <h3 className="text-2xl font-bold text-foreground">Continue Reading</h3>
                        <Link href="/writings" className="text-primary font-semibold text-sm hover:underline">View archive</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {otherPosts.map(p => (
                            <Link key={p.slug} href={`/writings/${p.slug}`} className="group p-6 rounded-xl border border-border hover:bg-secondary/50 transition-all block">
                                <time className="text-xs font-mono text-muted-foreground uppercase">{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</time>
                                <h4 className="text-lg font-mono font-bold mt-2 group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
