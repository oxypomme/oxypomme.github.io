import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { generateAnimation } from "../generateAnimation";

function Header() {
	const fade = generateAnimation("fadeInUp");

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<Typography className={fade("name")} variant="h1">
				SUBLET Tom
			</Typography>
			<Typography
				className={fade("sub")}
				variant="subtitle2"
				sx={{ fontSize: "3em" }}
			>
				Fullstack Developer
			</Typography>
			<Typography className={fade("body")} variant="body1">
				I’m Tom SUBLET from France, French is my mother tongue but I also speak
				English. I’m currently a fullstack developer in a traineeship at
				VISIOcompte (accounting firm located at Jouy-aux-Arches, near Metz)
				while I’m studying for a degree in web development in Nancy. I’m always
				eager to learn more languages (IT or not), more ways to work and more
				technologies. To explore what I’ve learnt, I’ve created many personal
				projects that I’ve created during my studies, almost all of it is on{" "}
				<Link href="https://github.com/oxypomme">GitHub</Link>.
			</Typography>
		</Box>
	);
}

export default Header;
