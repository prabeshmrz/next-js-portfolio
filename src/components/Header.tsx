"use client";

import { useTheme } from "next-themes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { Profile } from "@/lib/content";

interface HeaderProps {
    profile: Profile;
}

export function Header({ profile }: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border text-foreground transition-colors duration-300">
            <div className="px-6 lg:px-12 py-4 flex items-center w-full">
                {/* Mobile Menu Trigger */}
                <div className="lg:hidden mr-4">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <span className="material-symbols-outlined text-muted-foreground cursor-pointer">
                                menu
                            </span>
                        </SheetTrigger>
                        {/* Visually hidden title for accessibility */}
                        <div className="sr-only">
                            <SheetTitle>Navigation Menu</SheetTitle>
                            <SheetDescription>Access site navigation and profile information</SheetDescription>
                        </div>
                        <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-sidebar-border [&>button]:hidden">
                            <Sidebar profile={profile} onItemClick={() => setOpen(false)} className="w-64" />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Main Content Container (Search + Theme) - Centered align with max-w-5xl */}
                <div className="flex-1 flex max-w-5xl mx-auto w-full items-center justify-between lg:px-12">
                    <div className="flex items-center gap-4 flex-1 max-w-2xl">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[20px]">
                                search
                            </span>
                            <Input
                                className="w-full bg-secondary border-none rounded-full pl-10 pr-4 py-2 text-sm focus-visible:ring-primary/50"
                                placeholder="Search projects or posts..."
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full bg-secondary hover:bg-secondary/80"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" && <span className="material-symbols-outlined text-[18px] text-yellow-500">light_mode</span>}
                            {theme === "light" && <span className="material-symbols-outlined text-[18px] text-blue-400">dark_mode</span>}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
