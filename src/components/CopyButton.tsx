"use client";

import { toast } from "sonner";

interface CopyButtonProps {
    text: string;
    children?: React.ReactNode;
    className?: string;
}

export function CopyButton({ text, children, className }: CopyButtonProps) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    return (
        <button
            onClick={copyToClipboard}
            className={className}
        >
            {children}
        </button>
    );
}
