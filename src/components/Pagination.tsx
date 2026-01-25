import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    baseUrl: string;
}

export function Pagination({ currentPage, totalItems, itemsPerPage, baseUrl }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;

    if (totalPages <= 1) return null;

    const getPageUrl = (page: number) => {
        const url = new URL(baseUrl, "http://localhost"); // dummy base for construction
        url.searchParams.set("page", page.toString());
        return `${url.pathname}${url.search}`;
    };

    return (
        <div className="flex items-center justify-between pt-8 border-t border-border">
            <div className="text-sm text-muted-foreground font-medium">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} items
            </div>
            <div className="flex gap-2">
                {currentPage > 1 && (
                    <Link href={getPageUrl(currentPage - 1)}>
                        <Button variant="outline" size="sm" className="rounded-lg font-bold gap-2">
                            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            Previous
                        </Button>
                    </Link>
                )}
                {currentPage < totalPages && (
                    <Link href={getPageUrl(currentPage + 1)}>
                        <Button variant="outline" size="sm" className="rounded-lg font-bold gap-2">
                            Next
                            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}
