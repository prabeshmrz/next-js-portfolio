"use client";

import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { cn } from "@/lib/utils";

// Initialize mermaid
mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    flowchart: {
        htmlLabels: true,
        curve: "basis",
    },
    themeVariables: {
        fontSize: "14px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    }
});

interface MermaidProps {
    chart: string;
    className?: string;
}

export function Mermaid({ chart, className }: MermaidProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [svg, setSvg] = useState<string>("");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (!chart) return;

        const renderChart = async () => {
            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                // Render returns an object with svg property in newer versions, or string in older
                // We'll handle the rendering manually to be safe with React 19/Next 15+ environments
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
                setError("");
            } catch (err) {
                console.error("Mermaid rendering failed:", err);
                setError("Failed to render diagram");
                // Mermaid might leave an error element in the DOM, we can clear it if needed
                // typically handled by bound error boundary or try/catch
            }
        };

        renderChart();
    }, [chart]);

    if (error) {
        return <div className="p-4 border border-destructive/50 text-destructive rounded-md text-xs">{error}</div>;
    }

    return (
        <div
            ref={ref}
            className={cn("w-full overflow-x-auto my-8 flex justify-center bg-card/50 p-6 rounded-xl border border-border/50", className)}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
