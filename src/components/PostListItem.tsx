import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/lib/content";

interface PostListItemProps {
    post: BlogPost;
}

export function PostListItem({ post }: PostListItemProps) {
    return (
        <article className="py-8 group border-b border-border last:border-0 relative">
            <Link href={`/writings/${post.slug}`} className="absolute inset-0 z-10"><span className="sr-only">View Post</span></Link>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[16px]">
                                calendar_today
                            </span>{" "}
                            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <div className="flex flex-wrap justify-end gap-2">
                            {post.tags.map(tag => (
                                <Link key={tag} href={`/tags/${tag}`} className="z-20">
                                    <Badge variant="secondary" className="px-2 py-0.5 rounded bg-primary/5 text-primary uppercase text-[10px] font-bold transition-colors hover:bg-primary/10 cursor-pointer">{tag}</Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                        {post.description}
                    </p>
                </div>
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

