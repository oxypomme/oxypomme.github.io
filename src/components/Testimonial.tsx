import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import React from "react";
import ReactMarkdown from "react-markdown";
import type { Testimonial as TestimonialType } from "../features/fetchAPI";
import type { Locale } from "../features/languages";
import MUIMarkdown from "./MUIMarkdown";

type Props = React.PropsWithoutRef<{
  data: TestimonialType;
  locale: Locale;
}>;

/**
 * Render a testimonial
 *
 * @param data The testimonial
 * @param locale The current locale
 */
function Testimonial({ data: testimonial }: Props) {
  return (
    <Card>
      <CardContent>
        <ReactMarkdown components={MUIMarkdown}>
          {testimonial.content}
        </ReactMarkdown>
      </CardContent>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "primary.main" }}
            src={testimonial.logo}
            alt={testimonial.logo && testimonial.name}
          >
            {testimonial.name[0]}
          </Avatar>
        }
        title={testimonial.name}
        subheader={testimonial.role}
      />
    </Card>
  );
}

export default Testimonial;
