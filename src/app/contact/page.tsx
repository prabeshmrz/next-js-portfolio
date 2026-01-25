import { getProfile } from "@/lib/content";
import { CopyButton } from "@/components/CopyButton";

export default function ContactPage() {
    const profile = getProfile();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-5xl mx-auto p-6 lg:p-12 w-full text-foreground transition-colors duration-300">
                <div className="mb-10 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                        Communication
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
                        Get in Touch
                    </h2>
                    <p className="text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        I'm always open to discussing new projects, technical challenges, or potential collaborations. Feel free to reach out through any of these channels.
                    </p>
                </div>

                <div className="mb-10 space-y-12">
                    <section>
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Primary Channel</h3>
                        <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-card border border-border flex flex-col items-stretch md:flex-row md:items-center justify-between gap-6 shadow-sm">
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-2xl md:text-3xl">mail</span>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-sm font-semibold text-muted-foreground mb-0.5">Send an Email</p>
                                    <p className="text-base md:text-2xl font-mono font-bold text-foreground break-all">{profile.email}</p>
                                </div>
                            </div>
                            <CopyButton
                                text={profile.email}
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background font-bold rounded-xl hover:scale-105 transition-all active:scale-95 text-sm md:text-base cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                Copy to Clipboard
                            </CopyButton>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Socials &amp; Networks</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
                            {profile.social.github && (
                                <a
                                    href={`https://github.com/${profile.social.github}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 hover:border-primary transition-all group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                        <svg className="w-7 h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">GitHub</p>
                                        <p className="font-mono text-xs md:text-sm text-foreground truncate font-semibold">@{profile.social.github}</p>
                                    </div>
                                </a>
                            )}
                            {profile.social.linkedin && (
                                <a
                                    href={`https://linkedin.com/in/${profile.social.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 hover:border-primary transition-all group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                        <svg className="w-7 h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">LinkedIn</p>
                                        <p className="font-mono text-xs md:text-sm text-foreground truncate font-semibold">/in/{profile.social.linkedin}</p>
                                    </div>
                                </a>
                            )}
                            {profile.social.instagram && (
                                <a
                                    href={`https://instagram.com/${profile.social.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 hover:border-primary transition-all group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                        <svg className="w-7 h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Instagram</p>
                                        <p className="font-mono text-xs md:text-sm text-foreground truncate font-semibold">@{profile.social.instagram}</p>
                                    </div>
                                </a>
                            )}
                            {profile.social.facebook && (
                                <a
                                    href={`https://facebook.com/${profile.social.facebook}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 md:p-5 rounded-xl md:rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 hover:border-primary transition-all group"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                        <svg className="w-7 h-7 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Facebook</p>
                                        <p className="font-mono text-xs md:text-sm text-foreground truncate font-semibold">{profile.social.facebook}</p>
                                    </div>
                                </a>
                            )}
                        </div>
                    </section>

                    <div className="flex flex-col gap-8 md:grid md:grid-cols-2 md:gap-12">
                        <section>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Deep Dive</h3>
                            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-primary/5 border border-primary/20 flex flex-col items-start gap-4">
                                <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
                                <h4 className="text-lg md:text-xl font-bold text-foreground">Schedule a Call</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Want to talk architecture or hire me for a role? Book a 30-min slot on my calendar.
                                </p>
                                <a
                                    className="inline-flex items-center gap-2 mt-2 md:mt-4 text-primary font-bold hover:underline"
                                    href={profile.calendly}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Go to Calendly <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                </a>
                            </div>
                        </section>
                        <section>
                            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Current Status</h3>
                            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-card border border-border flex flex-col items-start gap-4 shadow-sm">
                                <span className="material-symbols-outlined text-muted-foreground text-3xl">location_on</span>
                                <h4 className="text-lg md:text-xl font-bold text-foreground">Location</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {profile.location}
                                </p>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary">
                                    <span className="material-symbols-outlined text-[16px] text-muted-foreground">schedule</span>
                                    <span className="font-mono text-[10px] md:text-xs font-semibold text-foreground">GMT +5:45</span>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>

            </div>
        </div >
    );
}


