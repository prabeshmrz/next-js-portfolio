import { getContentByTag } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";
import { PostListItem } from "@/components/PostListItem";

interface TagPageProps {
    params: Promise<{ tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const { projects, posts } = getContentByTag(decodedTag);

    return (
        <div className="flex flex-col min-h-screen">

            <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-16 w-full text-foreground transition-colors duration-300">
                <section className="space-y-4">
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
                        Contents with tag <span className="text-primary">"{decodedTag}"</span>
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Found {projects.length} projects and {posts.length} articles
                    </p>
                </section>

                {projects.length > 0 && (
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">folder_open</span> Projects
                            </h3>
                            <div className="h-px flex-1 mx-6 bg-border"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map(project => (
                                <ProjectCard key={project.slug} project={project} />
                            ))}
                        </div>
                    </section>
                )}

                {posts.length > 0 && (
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">edit_note</span> Articles
                            </h3>
                            <div className="h-px flex-1 mx-6 bg-border"></div>
                        </div>
                        <div className="divide-y divide-border border-t border-b border-border">
                            {posts.map(post => (
                                <PostListItem key={post.slug} post={post} />
                            ))}
                        </div>
                    </section>
                )}

                {projects.length === 0 && posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <span className="material-symbols-outlined text-muted-foreground text-[48px] mb-4">
                            label_off
                        </span>
                        <h3 className="text-xl font-bold text-foreground">No content found</h3>
                        <p className="text-muted-foreground mt-2 max-w-sm">
                            We couldn't find any projects or articles with this tag.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}
