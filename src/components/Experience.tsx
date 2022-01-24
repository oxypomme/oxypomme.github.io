import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	Stack,
	Typography,
} from "@mui/material";
import { generateAnimation } from "../generateAnimation";

function Experience() {
	const fade = generateAnimation("fadeInRight");

	return (
		<Stack spacing={2}>
			<Typography variant="h3">Experience</Typography>
			<Card variant="outlined" className={fade("visio")}>
				<CardContent>
					<Typography variant="overline">June 2021 - August 2022</Typography>
					<Typography variant="h5">VISIOcompte</Typography>
					<Typography variant="subtitle1" gutterBottom>
						Fullstack Developer
					</Typography>
					<Typography variant="body1">Some intel here</Typography>
				</CardContent>
			</Card>
		</Stack>
	);
}

export default Experience;
