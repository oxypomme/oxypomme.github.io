import React from "react";
import { Box, Link, Typography } from "@mui/material";
import Animated from "./Animated";

function Header() {
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
			<Animated animation="fadeInUp">
				<Typography variant="h1">SUBLET Tom</Typography>
			</Animated>
			<Animated animation="fadeInUp" delay={1}>
				<Typography variant="subtitle2" sx={{ fontSize: "3em" }}>
					Fullstack Developer
				</Typography>
			</Animated>
			<Animated animation="fadeInUp" delay={1.5}>
				<Typography variant="body1">
					I’m Tom SUBLET from France, French is my mother tongue but I also
					speak English. I’m currently a fullstack developer in a traineeship at
					VISIOcompte (accounting firm located at Jouy-aux-Arches, near Metz)
					while I’m studying for a degree in web development in Nancy. I’m
					always eager to learn more languages (IT or not), more ways to work
					and more technologies. To explore what I’ve learnt, I’ve created many
					personal projects that I’ve created during my studies, almost all of
					it is on <Link href="https://github.com/oxypomme">GitHub</Link>.
				</Typography>
			</Animated>
		</Box>
	);
}

export default Header;
