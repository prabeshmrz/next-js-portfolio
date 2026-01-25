import Link from "next/link";
import { getProfile, getProjects, getPosts } from "@/lib/content";
import { PostListItem } from "@/components/PostListItem";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const profile = getProfile();
  const allProjects = getProjects();
  const featuredProjects = allProjects.filter(p => p.tags.includes("featured"));
  const posts = getPosts().slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">

      <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-16 w-full">
        {/* Hero Section */}
        <section className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Freelance
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              {profile.name.split(" ")[0]}
            </span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/about">
              <Button size="lg" className="rounded-xl font-bold shadow-lg shadow-primary/25 cursor-pointer">
                View Profile
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="rounded-xl font-bold hover:bg-secondary/80 cursor-pointer">
                Contact Me
              </Button>
            </Link>
          </div>
        </section>

        {/* Skills Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Core Technical Skills</h3>
            <div className="h-px flex-1 mx-6 bg-border"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {profile.skills.map((skill) => (
              <div key={skill.name} className="p-4 rounded-2xl bg-card border border-border flex flex-col items-center gap-3 hover:border-primary/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary cursor-pointer">{skill.icon}</span>
                </div>
                <span className="text-sm font-semibold text-center cursor-pointer">{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Featured Projects</h3>
            <Link href="/projects" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              View Archive <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-foreground">Recent Posts</h3>
            <Link href="/writings" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
              Read More <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
          <div className="divide-y divide-border border-t border-b border-border">
            {posts.map(post => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
