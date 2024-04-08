import React, { useState, useEffect, Fragment } from 'react';
import Content from './Content';
import Pagination from './Pagination';
import ShuffleButton from './ShuffleButton';

/**
 * Gallery is a React component that displays a collection of images in a gallery format.
 * @returns {JSX.Element} - The Gallery JSX element.
 */
export type JsonPlaceholderData = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

type Error = any;

const ITEMS_PER_PAGE = 5;
const ROUTE = "https://jsonplaceholder.typicode.com/photos";

function Gallery() {
    const [fetchData, setFetchData] = useState<JsonPlaceholderData[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                // Fetch data from API
                const response = await fetch(`${ROUTE}?_page=${currentPage}&_limit=${ITEMS_PER_PAGE}`);
                if (!response.ok) throw new Error('Error fetching data');
                const jsonData = await response.json();
                setFetchData(jsonData);
                // Calculate total pages based on response headers
                const resTotalPage = response.headers.get('X-Total-Count');
                if (!resTotalPage) return;
                const pages = Math.ceil(parseInt(resTotalPage, 10) / ITEMS_PER_PAGE);
                setTotalPages(pages);
            } catch (error: Error) {
                console.error(error);
            }
        };

        fetchPhoto();
    }, [currentPage]);

    if (!fetchData) return <Fragment />;

    return (
        <Fragment>
            {/* Display gallery content */}
            <div className="gallery">
                {fetchData.map(data => (
                    <Content key={data.id} src={data.url} title={data.title} />
                ))}
            </div>
            {/* Display shuffle button */}
            <ShuffleButton data={fetchData} setData={setFetchData} />
            {/* Display pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Fragment>
    );
}

export default Gallery;
