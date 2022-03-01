import "animate.css";
import React from "react";
import ScrollAnimation, { ScrollAnimationProps } from "react-animate-on-scroll";

type Props = React.PropsWithChildren<
  Omit<ScrollAnimationProps, "animateIn" | "animateOut"> & {
    animation: string;
    repeat?: number | false;
  }
>;

function Animated({
  children,
  animation,
  delay,
  repeat,
  duration,
  animateOnce,
  className,
  ...props
}: Props) {
  const ref = React.useRef<ScrollAnimation>(null);

  const inAnimation = `animate__${animation}`;

  React.useEffect(() => {
    if (ref.current) {
      const node = (ref.current as unknown as { node: HTMLElement }).node;
      // Removing legacy class
      node.classList.remove("animated");

      if (repeat) {
        let interval: NodeJS.Timer | null = null;
        (async () => {
          if (delay) {
            await new Promise((resolve) => setTimeout(resolve, delay * 1000));
          }
          node.classList.add(inAnimation);
          const outAnimation = `animate__${animation.replace("In", "Out")}`;

          interval = setInterval(async () => {
            node.classList.add(outAnimation);
            node.classList.remove(inAnimation);
            await new Promise((resolve) =>
              setTimeout(resolve, (duration ?? 1) * 1000)
            );
            node.classList.add(inAnimation);
            node.classList.remove(outAnimation);
          }, repeat * 1000);
        })();
        return () => {
          if (interval) clearInterval(interval);
        };
      }
    }
  }, [animation, delay, duration, inAnimation, repeat]);

  return (
    <ScrollAnimation
      scrollableParentSelector=".mandatory-scroll-container"
      {...props}
      className={`animate__animated ${className ?? ""}`}
      animateIn={inAnimation}
      animateOnce={animateOnce ?? true}
      delay={(delay ?? 0.25) * 1000}
      ref={ref}
    >
      {children}
    </ScrollAnimation>
  );
}

export default Animated;
