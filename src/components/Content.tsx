import { HTMLProps, useState } from 'react'
import ImageComponent from './Image'
import Title from './Title'
import classNames from 'classnames'


type ContentProp =  HTMLProps<HTMLDivElement> & {
    src: string
    title: string
}

/**
 * Content is  component that represents a content block containing an image and a title.
 * @param {Object} props - The props for the Content component.
 * @param {string} props.src - The URL of the image to be displayed.
 * @param {string} props.title - The title of the content.
 * @returns {JSX.Element} - The Content JSX element.
 */
function Content (
    {
        className,
        src, 
        title,
        ...rest
    } : ContentProp
) {

    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    return (
        <div className={classNames("content", className)} 
                { ...rest } 
        >
                <ImageComponent title={title} 
                                src={src}
                                isLoaded={isLoaded}
                                setIsLoaded={setIsLoaded}
                    />
                {
                    isLoaded && <Title title={title} 
                                       isLoaded={isLoaded}/>
                }
        </div>
    )
}

export default Content