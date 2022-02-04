import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";
import { Components } from "react-markdown";

/**
 * Object to pass at `<ReactMarkdown>` to convert basic HTML Elements to MUI Elements
 */
const components: Components = {
  p: ({ children, ...props }) => (
    <Typography
      variant="body1"
      sx={{ "&:not(:first-of-type)": { mt: 2 } }}
      {...props}
    >
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ul: ({ children, ordered, ...props }) => (
    <ul style={{ marginLeft: "1rem" }} {...props}>
      {children}
    </ul>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  li: ({ children, ordered, ...props }) => (
    <Typography variant="body1" component="li" {...props}>
      {children}
    </Typography>
  ),
};

export default components;
