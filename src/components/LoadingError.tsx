import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React from "react";

/**
 * An error component about fetching data
 */
function LoadingError() {
  return (
    <Alert severity="error" sx={{ alignSelf: "center" }}>
      <AlertTitle>Error</AlertTitle>
      An error occured when loading data.
    </Alert>
  );
}

export default LoadingError;
