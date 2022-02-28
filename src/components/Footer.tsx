import { Link, Paper, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Paper
      sx={{ display: "flex", flexWrap: "wrap", py: 1, px: 4 }}
      square
      elevation={2}
      className="animate__animated animate__slideInUp"
    >
      <Typography>
        {new Date().getFullYear()} ©{" "}
        <Link href="https://github.com/oxypomme">SUBLET Tom</Link> –{" "}
        <Link href="https://github.com/oxypomme/oxypomme.github.io/blob/master/LICENSE">
          MIT
        </Link>
      </Typography>
      <Typography sx={{ ml: "auto" }}>
        Build with <Link href="https://reactjs.org/">React</Link> and{" "}
        <Link href="https://mui.com/">MUI</Link> • Powered by{" "}
        <Link href="https://strapi.io/">Strapi</Link> • Hosted on{" "}
        <Link href="https://pages.github.com/">GitHub Pages</Link> and{" "}
        <Link href="https://heroku.com/">Heroku</Link>
      </Typography>
    </Paper>
  );
}

export default Footer;
