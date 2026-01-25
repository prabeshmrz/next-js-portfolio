"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Profile } from "@/lib/content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
    profile: Profile;
    className?: string;
    onItemClick?: () => void;
}

export function Sidebar({ profile, className, onItemClick }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", icon: "home", href: "/" },
        { name: "Writings", icon: "edit_note", href: "/writings" },
        { name: "About", icon: "person", href: "/about" },
        { name: "Projects", icon: "folder_open", href: "/projects" },
        { name: "Contact Me", icon: "alternate_email", href: "/contact" },
    ];

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-50",
            !className && "hidden lg:flex",
            className
        )}>
            <div className="p-8 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-sidebar-accent shadow-xl mb-6 relative">
                    <Avatar className="w-full h-full">
                        <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
                        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </div>
                <h1 className="text-xl font-bold tracking-tight text-sidebar-foreground">
                    {profile.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">{profile.role}</p>

                <div className="flex gap-4 mt-6">
                    {profile.social.github && (
                        <a
                            href={`https://github.com/${profile.social.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <span className="sr-only">GitHub</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                        </a>
                    )}
                    {profile.social.linkedin && (
                        <a
                            href={`https://linkedin.com/in/${profile.social.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                        </a>
                    )}
                    {profile.social.instagram && (
                        <a
                            href={`https://instagram.com/${profile.social.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <span className="sr-only">Instagram</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                        </a>
                    )}
                    {profile.social.facebook && (
                        <a
                            href={`https://facebook.com/${profile.social.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <span className="sr-only">Facebook</span>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                        </a>
                    )}
                </div>
            </div>

            <nav className="flex-1 px-4 mt-2">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname.includes(item.href) && item.href !== "/" || pathname === item.href;
                        return (
                            <li key={item.name}>
                                {item.name === "About" && (
                                    <div className="pt-4 pb-2">
                                        <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Know Me</span>
                                    </div>
                                )}
                                {item.name === "Contact Me" && (
                                    <div className="pt-4 pb-2">
                                        <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Work Together</span>
                                    </div>
                                )}
                                <Link
                                    href={item.href}
                                    onClick={onItemClick}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all group",
                                        isActive
                                            ? "bg-primary/10 text-primary font-semibold border-r-4 border-primary"
                                            : "text-muted-foreground hover:bg-sidebar-accent hover:text-primary"
                                    )}
                                >
                                    <span className={cn("material-symbols-outlined", !isActive && "text-slate-400 group-hover:text-primary")}>
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-6 text-xs text-muted-foreground border-t border-sidebar-border">
                © {new Date().getFullYear()} {profile.name}
            </div>
        </aside>
    );
}

