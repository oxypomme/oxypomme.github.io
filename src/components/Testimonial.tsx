import { Avatar, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Testimonial as TestimonialType } from "../features/fetchAPI";
import { Locale } from "../features/languages";
import MUIMarkdown from "./MUIMarkdown";

type Props = React.PropsWithoutRef<{
  data: TestimonialType;
  locale: Locale;
}>;

function Testimonial({ data: testimonial, locale }: Props) {
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
