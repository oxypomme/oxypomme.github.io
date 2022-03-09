import React from "react";
import LazyLoad from "react-lazyload";

type Props = React.PropsWithChildren<{
  align?: "center" | "end" | "none" | "start";
  height?: string | number;
  overflow?: boolean;
}>;

function LazyPanel({ children, align, height, overflow }: Props) {
  return (
    <LazyLoad
      height={height ?? "100vh"}
      style={{ scrollSnapAlign: align ?? "start" }}
      overflow={overflow}
      once
    >
      {children}
    </LazyLoad>
  );
}

export default LazyPanel;
