import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/ui/pagination"

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Paginator({ currentPage, totalPages, onPageChange }: PaginatorProps) {
    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const items = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page
        if (startPage > 1) {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                items.push(
                    <PaginationItem key="ellipsis1">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem key={i}>
                    <PaginationLink
                        onClick={() => handlePageClick(i)}
                        isActive={i === currentPage}
                        className={i === currentPage ? "bg-green-300" : ""}
                    >
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                items.push(
                    <PaginationItem key="ellipsis2">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            items.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => handlePageClick(totalPages)}>
                        {totalPages}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <Pagination className="w-full">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageClick(currentPage - 1)}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageClick(currentPage + 1)}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
