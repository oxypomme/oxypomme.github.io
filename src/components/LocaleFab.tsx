import React from "react";
import Box from "@mui/material/Box";
import { Locale, localizedStrings } from "../features/languages";
import { Fab } from "@mui/material";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  onClick: (e: React.MouseEvent, l: Locale) => void;
}>;

function LocaleFAB({ locale, onClick }: Props) {
  return (
    <Box
      sx={{ position: "fixed", top: "1rem", right: "1rem", display: "flex" }}
    >
      {Object.values(Locale).map((l, i) => (
        <Fab key={i} onClick={(e) => onClick(e, l)}>
          {localizedStrings[l][locale]}
        </Fab>
      ))}
    </Box>
  );
}

export default LocaleFAB;
