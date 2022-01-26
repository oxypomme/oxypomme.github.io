import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Stack,
	Typography,
} from "@mui/material";
import Animated from "./Animated";

function Experience() {
	return (
		<Stack spacing={2}>
			<Animated animation="fadeInDown">
				<Typography variant="h3">Experience</Typography>
			</Animated>
			<Animated animation="fadeInRight">
				<Card variant="outlined" sx={{ display: "flex" }}>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image="https://api.lorem.space/image?w=151&h=151&hash=7cob4tsv"
						alt="Live from space album cover"
					/>
					<CardContent sx={{ flex: 1 }}>
						<Typography variant="overline">June 2021 - August 2022</Typography>
						<Typography variant="h5">VISIOcompte</Typography>
						<Typography variant="subtitle1" gutterBottom>
							Fullstack Developer
						</Typography>
						<Typography variant="body1">Some intel here</Typography>
					</CardContent>
				</Card>
			</Animated>
		</Stack>
	);
}

export default Experience;
