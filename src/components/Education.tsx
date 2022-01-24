import {
	Card,
	CardContent,
	CardHeader,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import { generateAnimation } from "../generateAnimation";

function Education() {
	const fade = generateAnimation("fadeInLeft");

	return (
		<Stack spacing={2}>
			<Typography variant="h3">Education</Typography>
			<Card variant="outlined" className={fade("CIASIE")}>
				<CardContent>
					<Typography variant="overline">2021 - 2022</Typography>
					<Typography variant="h5">LP CIASIE</Typography>
					<Typography variant="subtitle1" gutterBottom>
						Traineeship
					</Typography>
					<Typography variant="body1">Some intel here</Typography>
				</CardContent>
			</Card>
			<Card variant="outlined" className={fade("DUT")}>
				<CardContent>
					<Typography variant="overline">2019 - 2021</Typography>
					<Typography variant="h5" gutterBottom>
						DUT Informatique
					</Typography>
					<Typography variant="body1">Some intel here</Typography>
				</CardContent>
			</Card>
		</Stack>
	);
}

export default Education;
