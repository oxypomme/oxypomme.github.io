import { Link, Typography } from "@mui/material";
import React from "react";
import { Components } from "react-markdown";

const components: Components = {
  p: ({ children, ...props }) => (
    <Typography variant="body1" {...props}>
      {children}
    </Typography>
  ),
  a: ({ children, href, ...props }) => {
    const key = !/^https?/i.test(href ?? "") ? "to" : "href";
    const params = {
      [key]: href,
      ...props,
    };
    return <Link {...params}>{children}</Link>;
  },
  ul: ({ children, ...props }) => (
    <ul style={{ marginLeft: "1rem" }} {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }) => (
    <Typography variant="body1" component="li" {...props}>
      {children}
    </Typography>
  ),
};

export default components;
