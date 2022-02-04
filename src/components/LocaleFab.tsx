import CloseIcon from "@mui/icons-material/Close";
import TranslateIcon from "@mui/icons-material/Translate";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import React from "react";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  onClick: (e: React.MouseEvent, l: Locale) => void;
}>;

/**
 * Button group for switching locale
 *
 * @param locale The current locale
 * @param onClick Handler called when switching locale
 */
function LocaleFAB({ locale, onClick }: Props) {
  return (
    <>
      <SpeedDial
        sx={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
        icon={
          <SpeedDialIcon icon={<TranslateIcon />} openIcon={<CloseIcon />} />
        }
        ariaLabel="Language Menu"
        direction="down"
        FabProps={{ size: "medium" }}
      >
        {Object.values(Locale).map((l, i) => (
          <SpeedDialAction
            key={i}
            FabProps={{
              sx: { fontSize: "1.5em" },
              children: "Langue",
            }}
            icon={localizedStrings[l][locale].split(" ")[0]}
            tooltipTitle={localizedStrings[l][locale].split(" ")[1]}
            tooltipOpen
            onClick={(e) => onClick(e, l)}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default LocaleFAB;
