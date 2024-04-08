import React, { useState, useEffect } from 'react';
import Loader from './Loader';

type ImageProps = React.HTMLProps<HTMLImageElement> & {
    src: string;
    title?: string;
    isLoaded: boolean
    setIsLoaded: (isLoaded : boolean) => void
};


/**
 * ImageComponent is a component designed to handle image including loading and caching.
 * It provides functionality to cache images in local storage, retrieve cached images, and display loaders while images are being loaded.
 * Should the image fail to load, it will call request it again
 * @param {Object} props - The props for the ImageComponent.
 * @param {string} props.src - The URL of the image to be displayed.
 * @param {string} [props.title] - The title or alt text for the image.
 * @param {boolean} props.isLoaded - A boolean indicating whether the image has finished loading.
 * @param {function} props.setIsLoaded - A function to set the isLoaded state of the component.
 * @returns {JSX.Element} - The ImageComponent JSX element.
 */
function ImageComponent (
    { 
        title,
        src,
        isLoaded,
        setIsLoaded,
        ...rest
    } : ImageProps
) {
    
    const [cachedSrc, setCachedSrc] = useState<string | null>(null);

    // retrieve image from the cache based on src, if there are none then store the iamge
    useEffect(() => {
        const cachedImage = localStorage.getItem(src);
        if (cachedImage) {
            setCachedSrc(cachedImage);
            setIsLoaded(true); // Set isLoaded to true if image is loaded from cache
        } 
        const img = new Image() as HTMLImageElement;
        img.onload = () => {
            setIsLoaded(true);
            setCachedSrc(img.src);
            localStorage.setItem(src, img.src); // Cache image data in local storage
        };
        img.src = src;

        return () => {
            // Cleanup function: set isLoaded to false when component is unmounted
            setIsLoaded(false);
        };
    }, [src, setIsLoaded]);
    

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.target as HTMLImageElement;
        const src = img.src;

        // Retry fetching the image after a delay
        setTimeout(() => {
            img.src = src;
        }, 5000); 
    };

    return (
        <div className="img-container">
            {!isLoaded && <Loader />}
            <img
                alt={title}
                loading={"lazy"}
                src={cachedSrc || src} // Use cached URL if available, otherwise use original URL
                onError={handleImageError}
                {...rest}
            />
            
        </div>
    );
}

export default ImageComponent;