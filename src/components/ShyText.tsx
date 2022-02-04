import { SxProps, Typography } from "@mui/material";
import React from "react";
import Animated from "../components/Animated";

type Props = React.PropsWithChildren<{
  animation?: {
    animation?: string;
    repeat?: number;
    delay?: number;
  };
  sx?: Omit<SxProps, "color">;
}>;

function ShyText({ animation, sx, children }: Props) {
  return (
    <Typography
      variant="h3"
      component="div"
      sx={{
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
