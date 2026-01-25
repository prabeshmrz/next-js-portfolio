import { getPosts, BlogPost } from "@/lib/content";
import { PostListItem } from "@/components/PostListItem";
import { Pagination } from "@/components/Pagination";

interface WritingsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const POSTS_PER_PAGE = 5;

export default async function WritingsPage({ searchParams }: WritingsPageProps) {
    const posts = getPosts();
    const totalPosts = posts.length;

    const awaitedSearchParams = await searchParams;
    const pageParam = awaitedSearchParams.page;
    const currentPage = typeof pageParam === 'string' ? parseInt(pageParam) : 1;

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const displayedPosts = posts.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-12 w-full">
                <section className="space-y-4">
                    <h2 className="text-4xl font-extrabold text-foreground tracking-tight">Writings</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                        A collection of technical notes, architecture deep-dives, and guides on building scalable backend systems.
                    </p>
                </section>

                <section className="space-y-0 border-t border-border">
                    {displayedPosts.map((post: BlogPost) => (
                        <PostListItem key={post.slug} post={post} />
                    ))}
                    {displayedPosts.length === 0 && (
                        <div className="py-20 text-center text-muted-foreground border-b border-border">
                            No writings found on this page.
                        </div>
                    )}
                </section>

                <Pagination
                    currentPage={currentPage}
                    totalItems={totalPosts}
                    itemsPerPage={POSTS_PER_PAGE}
                    baseUrl="/writings"
                />

            </div>
        </div>
    );
}
