import type { SxProps } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import Animated from "../components/Animated";

type Props = React.PropsWithChildren<{
  animation?: {
    animation?: string;
    repeat?: number | false;
    delay?: number;
  };
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
  sx?: Omit<SxProps, "color">;
}>;

/**
 * Discret text to show on the bottom of the parent
 *
 * @param animation The animation to loop
 * @param sx The style passed to the container
 */
function ShyText({ animation, sx, children, variant }: Props) {
  return (
    <Typography
      variant={variant ?? "h3"}
      component="div"
      sx={{
        display: {
          xs: "none",
          sm: "block",
        },
        position: "absolute",
        width: "100%",
        left: 0,
        bottom: "5rem",
        textAlign: "center",
        color: "#222",
        ...sx,
      }}
    >
      {animation ? (
        <Animated
          animation={animation.animation ?? "fadeInDown"}
          repeat={animation.repeat ?? 5}
          delay={animation.delay}
        >
          {children}
        </Animated>
      ) : (
        <>{children}</>
      )}
    </Typography>
  );
}

export default ShyText;
