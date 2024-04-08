import { HTMLProps } from "react"
import classNames from "classnames"

type TitleProp = HTMLProps<HTMLDivElement> & {
    title: string
    isLoaded: boolean
}

/**
 * Title component displays a title text with conditional opacity based on loading state.
 * It will be put on diagonally of the image through positioning in CSS
 * @param {Object} props - The props for the Title component.
 * @param {string} props.title - The title text to be displayed.
 * @param {boolean} props.isLoaded - A boolean indicating whether the title is loaded.
 * @returns {JSX.Element} - The Title component JSX element.
 */
function Title (
    {
        title,
        isLoaded,
        ...rest 
    } : TitleProp
) {


    return (
        <div className={"title"}
            {...rest}
        >
            {title}
        </div>
    )
}

export default Title