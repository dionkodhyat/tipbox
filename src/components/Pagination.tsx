import React from "react";
import Button from "./Button";

/**
 * Pagination is a reusable React component representing a pagination control.
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {JSX.Element} - The Pagination JSX element.
 */
interface PaginationProps {
    currentPage: number; // The current page number.
    totalPages: number; // The total number of pages.
    onPageChange: (page: number) => void; // Function to handle page change.
}

function Pagination(
    {
        currentPage,
        totalPages,
        onPageChange
    }: PaginationProps
) {

    /**
     * Handles the click event for the "Previous" button.
     */
    const handlePrevClick = () => {
        onPageChange(currentPage - 1);
    };

    /**
     * Handles the click event for the "Next" button.
     */
    const handleNextClick = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <div className="d-flex justify-content-center">
            <Button onClick={handlePrevClick} disabled={currentPage === 1} className="text-only-btn">Previous</Button>
            <span>Page {currentPage} out of {totalPages}</span>
            <Button onClick={handleNextClick} disabled={currentPage === totalPages} className="text-only-btn">Next</Button>
        </div>
    );
};

export default Pagination;
