import React from "react";
import "animate.css";
import ScrollAnimation, { ScrollAnimationProps } from "react-animate-on-scroll";

type Props = React.PropsWithChildren<
  Omit<ScrollAnimationProps, "animateIn" | "animateOut"> & {
    animation: string;
  }
>;

function Animated({
  children,
  animation,
  delay,
  animateOnce,
  className,
  ...props
}: Props) {
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
