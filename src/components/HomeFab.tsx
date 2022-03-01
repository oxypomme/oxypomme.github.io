import { Home } from "@mui/icons-material";
import { Fab } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

type Props = React.PropsWithoutRef<{
  show: boolean;
}>;

function HomeFab({ show }: Props) {
  const [searchParams] = useSearchParams();

  return (
    <Zoom in={show}>
      <Fab
        size="medium"
        color="secondary"
        sx={{
          position: "absolute",
          left: "1rem",
          top: "1rem",
        }}
        component={Link}
        to={{ pathname: "/", search: searchParams.toString() }}
      >
        <Home />
      </Fab>
    </Zoom>
  );
}

export default HomeFab;
