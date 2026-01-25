import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/lib/content";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group p-5 rounded-3xl bg-card border border-border hover:shadow-xl hover:shadow-primary/5 transition-all">
            <div className="flex items-start justify-between mb-3 gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{project.icon}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                    {project.tags.filter(tag => tag !== "featured").map(tag => (
                        <Link key={tag} href={`/tags/${tag}`} className="z-20">
                            <Badge variant="secondary" className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">{tag}</Badge>
                        </Link>
                    ))}
                </div>
            </div>
            <h4 className="text-lg font-bold font-mono mb-2 group-hover:text-primary transition-colors">
                {project.title}
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                {project.description}
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-border">
                {project.links.case_study !== "#" && (
                    <Link
                        href={project.links.case_study}
                        className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:text-primary transition-colors text-muted-foreground"
                    >
                        <span className="material-symbols-outlined text-[14px]">link</span> Case Study
                    </Link>
                )}
                {project.links.source !== "#" && (
                    <Link
                        href={project.links.source}
                        className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:text-primary transition-colors text-muted-foreground"
                    >
                        <span className="material-symbols-outlined text-[14px]">code</span> Source
                    </Link>
                )}
            </div>
        </div>
    );
}

