import { Alert, AlertTitle } from "@mui/material";
import React from "react";

function LoadingError() {
  return (
    <Alert severity="error" sx={{ alignSelf: "center" }}>
      <AlertTitle>Error</AlertTitle>
      An error occured when loading data.
    </Alert>
  );
}

export default LoadingError;
