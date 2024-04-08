import { HTMLProps, useRef } from "react"

export type ButtonProps = HTMLProps<HTMLButtonElement> & {
	type?: "submit" | "button" | "reset"
}

/**
 * Button is a reusable component representing a button element.
 * @param {ButtonProps} props - The props for the Button component.
 * @returns {JSX.Element} - The Button JSX element.
 */
function Button(
	{
		type = "button",
		className,
		children,
		data,
		...rest
	} : ButtonProps
) {
	let buttonEl = useRef(null)

	return (
		<button
			type={type}
			ref={buttonEl}
			className={className} 
            {...rest}
		>
			{children}
		</button>
	)
}

export default Button