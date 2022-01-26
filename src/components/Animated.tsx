import React from "react";
import "animate.css";
import ScrollAnimation from "react-animate-on-scroll";

interface Props {
	animation: string;
	delay?: number;
	animateOnce?: boolean;
	className?: string;
	[key: string]: any;
}

function Animated({
	children,
	animation,
	delay,
	animateOnce,
	className,
	...props
}: React.PropsWithChildren<Props>) {
	return (
		<ScrollAnimation
			{...props}
			className={`animate__animated ${className}`}
			animateIn={`animate__${animation}`}
			animateOnce={animateOnce ?? true}
			delay={(delay ?? 0.5) * 1000}
		>
			{children}
		</ScrollAnimation>
	);
}

export default Animated;
