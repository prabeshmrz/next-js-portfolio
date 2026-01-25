import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";
import { Pagination } from "@/components/Pagination";

interface ProjectsPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
    const params = await searchParams;
    const page = typeof params.page === "string" ? parseInt(params.page) : 1;
    const limit = 6;

    const allProjects = getProjects();
    const totalProjects = allProjects.length;

    const startIndex = (page - 1) * limit;
    const projects = allProjects.slice(startIndex, startIndex + limit);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-16 w-full text-foreground transition-colors duration-300">
                <section className="space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">Projects Archive</h2>
                    <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl leading-relaxed">
                        A comprehensive list of engineering projects, from distributed systems and microservices to specialized backend tools.
                    </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full py-20 text-center text-muted-foreground">
                            No projects found on this page.
                        </div>
                    )}
                </div>

                <Pagination
                    currentPage={page}
                    totalItems={totalProjects}
                    itemsPerPage={limit}
                    baseUrl="/projects"
                />

            </div>
        </div>
    );
}
