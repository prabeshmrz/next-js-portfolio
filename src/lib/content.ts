import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Profile {
    name: string;
    role: string;
    location: string;
    headline: string;
    bio: string;
    avatar: string;
    email: string;
    calendly: string;
    social: {
        github: string;
        linkedin: string;
        instagram: string;
        facebook: string;
    };
    skills: {
        name: string;
        icon: string;
    }[];
    stats: {
        label: string;
        value: string;
    }[];
    bio_extended: string[];
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    icon: string;
    links: {
        case_study: string;
        source: string;
    };
}

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    tags: string[];
    description: string;
    draft?: boolean;
    content?: string;
}

export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    description: string[];
}

export interface Experience {
    items: ExperienceItem[];
}

export interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    description: string;
}

export interface Education {
    items: EducationItem[];
}

export function getPostBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(contentDirectory, "blog", `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        slug,
        ...data,
        content,
        draft: data.draft ?? false,
    } as BlogPost;
}

export function getProfile(): Profile {
    const fullPath = path.join(contentDirectory, "info", "profile.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data as Profile;
}

export function getExperience(): Experience {
    const fullPath = path.join(contentDirectory, "info", "experience.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data as Experience;
}

export function getEducation(): Education {
    const fullPath = path.join(contentDirectory, "info", "education.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return data as Education;
}

export function getProjects(): Project[] {
    const projectsDirectory = path.join(contentDirectory, "projects");
    const fileNames = fs.readdirSync(projectsDirectory);
    const projects = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return {
            slug,
            ...data,
        } as Project;
    });
    return projects;
}

export function getPosts(): BlogPost[] {
    const postsDirectory = path.join(contentDirectory, "blog");
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return {
            slug,
            ...data,
            draft: data.draft ?? false, // Default to false if missing, though we added true to existing
        } as BlogPost;
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Filter posts: In production, show only non-draft posts. In dev, show all.
    const filteredPosts = posts.filter((post) => {
        if (isProduction) {
            return post.draft === false;
        }
        return true;
    });

    // Sort posts by date
    return filteredPosts.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function searchContent(query: string) {
    const q = query.toLowerCase().trim();
    if (!q) return { projects: [], posts: [] };

    const projects = getProjects().filter(project =>
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some(tag => tag.toLowerCase().includes(q))
    );

    const posts = getPosts().filter(post =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some(tag => tag.toLowerCase().includes(q))
    );

    return { projects, posts };
}

export function getContentByTag(tag: string) {
    const t = tag.toLowerCase().trim();
    if (!t) return { projects: [], posts: [] };

    const projects = getProjects().filter(project =>
        project.tags.some(tag => tag.toLowerCase() === t)
    );

    const posts = getPosts().filter(post =>
        post.tags.some(tag => tag.toLowerCase() === t)
    );

    return { projects, posts };
}

