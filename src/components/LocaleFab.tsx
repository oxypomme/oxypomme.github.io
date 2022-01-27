import TranslateIcon from "@mui/icons-material/Translate";
import { Fab, styled } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Locale, localizedStrings } from "../features/languages";

const FabGroup = {
  Button: styled(Fab)``,
  Menu: styled(Box)(({ visible }: { visible: boolean }) => ({
    display: visible ? "flex" : "none",
    flexDirection: "column",
  })),
  Label: styled("span")(({ visible }: { visible: boolean }) => ({
    display: visible ? "inline" : "none",
  })),
};

type Props = React.PropsWithoutRef<{
  locale: Locale;
  onClick: (e: React.MouseEvent, l: Locale) => void;
}>;

function LocaleFAB({ locale, onClick }: Props) {
  const [open, setOpen] = React.useState(false);

  const onMouseEnterGroup = (e: React.MouseEvent) => {
    setOpen(true);
  };
  const onMouseLeaveGroup = (e: React.MouseEvent) => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "1rem",
        right: "1rem",
      }}
      onMouseEnter={onMouseEnterGroup}
      onMouseLeave={onMouseLeaveGroup}
    >
      <FabGroup.Button size="small" variant="extended">
        <TranslateIcon />
        <FabGroup.Label visible={open}>
          {localizedStrings.languages[locale]}
        </FabGroup.Label>
      </FabGroup.Button>
      <FabGroup.Menu visible={open}>
        {Object.values(Locale).map((l, i) => (
          <Fab
            key={i}
            sx={{ marginTop: "0.5rem" }}
            onClick={(e) => {
              setOpen(false);
              onClick(e, l);
            }}
            size="small"
            variant="extended"
          >
            {localizedStrings[l][locale]}
          </Fab>
        ))}
      </FabGroup.Menu>
    </Box>
  );
}

export default LocaleFAB;
