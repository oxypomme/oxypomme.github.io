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
      target: props.target ?? (key === "href" ? "_blank" : undefined),
    };
    if (params.target === "_blank" && !params.rel) {
      params.rel = "noopener";
    }
    return (
      <Link {...params} onClick={(e) => e.stopPropagation()}>
        {children}
      </Link>
    );
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