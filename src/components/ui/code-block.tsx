"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    language?: string;
    children?: React.ReactNode;
}

export function CodeBlock({ language, children, className, ...props }: CodeBlockProps) {
    const [isCopied, setIsCopied] = React.useState(false);
    const codeRef = React.useRef<HTMLElement>(null);

    const copyToClipboard = async () => {
        try {
            const code = codeRef.current?.textContent || "";
            await navigator.clipboard.writeText(code);
            setIsCopied(true);
            toast.success("Copied to clipboard");
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy code");
        }
    };

    // Extract language name for badge (remove "language-" prefix)
    const languageName = language?.replace("language-", "") || "text";

    return (
        <div className={cn("relative group rounded-lg bg-zinc-950 my-6 overflow-hidden grid min-w-0", className)} {...props}>
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-zinc-900/50">
                <span className="text-xs font-mono font-medium text-muted-foreground uppercase">
                    {languageName}
                </span>
                <button
                    onClick={copyToClipboard}
                    className="p-1.5 rounded-md hover:bg-zinc-800 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy code"
                >
                    {isCopied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4" />
                    )}
                </button>
            </div>
            <div className="p-4 overflow-auto max-h-[500px] w-full">
                <pre className="!bg-transparent !p-0 !m-0 border-none">
                    <code ref={codeRef} className={cn("font-mono text-sm", language)}>
                        {children}
                    </code>
                </pre>
            </div>
        </div>
    );
}
