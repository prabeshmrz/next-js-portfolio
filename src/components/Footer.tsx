import { getProfile } from "@/lib/content";

export function Footer() {
    const profile = getProfile();
    return (
        <footer className="pt-12 pb-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} {profile.name}. Built with passion and clean code.
            </p>
        </footer>
    );
}
