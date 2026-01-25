import { getProfile, getExperience, getEducation } from "@/lib/content";

export default function AboutPage() {
    const profile = getProfile();
    const experience = getExperience();
    const education = getEducation();

    return (
        <div className="flex flex-col min-h-screen">
            <div className="max-w-5xl mx-auto p-6 lg:p-12 space-y-20 w-full">
                <h2 className="text-2xl lg:text-4xl font-extrabold text-foreground">
                    Adaptive Software Engineer: <span className="text-primary">Bridging</span> Development and Management
                </h2>
                <section className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-top">
                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden border-2 border-border shadow-2xl">
                            <img
                                alt={`${profile.name} Professional`}
                                className="w-full h-full object-cover"
                                src={profile.avatar}
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                    </div>
                    <div className="space-y-6">
                        {profile.bio_extended.map((paragraph, index) => (
                            index < 2 && (
                                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                                    {paragraph}
                                </p>
                            )
                        ))}
                        <div className="flex items-center gap-6 pt-4">
                            {profile.stats.map((stat, index) => (
                                <div key={index} className="contents">
                                    <div className="flex flex-col">
                                        <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{stat.label}</span>
                                    </div>
                                    {index < profile.stats.length - 1 && (
                                        <div className="w-px h-10 bg-border"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">work</span>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">Work Experience</h3>
                        </div>
                        <div className="relative pl-8 space-y-12">
                            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border"></div>
                            {experience.items.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg text-foreground leading-tight">
                                                {item.role}
                                            </h4>
                                            <span className="text-xs font-bold text-primary uppercase">
                                                {item.period}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-muted-foreground mb-4">
                                            {item.company}
                                        </p>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {item.description.map((desc, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                                                    {desc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">school</span>
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">Education</h3>
                        </div>
                        <div className="relative pl-8 space-y-12">
                            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-border"></div>
                            {education.items.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg text-foreground leading-tight">
                                                {item.degree}
                                            </h4>
                                            <span className="text-xs font-bold text-primary uppercase">
                                                {item.period}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-muted-foreground">
                                            {item.institution}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

