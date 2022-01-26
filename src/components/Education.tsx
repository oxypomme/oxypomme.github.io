import {
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import Animated from "./Animated";

function Education() {
	return (
		<Stack spacing={2}>
			<Animated animation="fadeInDown">
				<Typography variant="h3">Education</Typography>
			</Animated>
			<Animated animation="fadeInLeft">
				<Card variant="outlined" sx={{ display: "flex" }}>
					<CardContent sx={{ flex: 1 }}>
						<Typography variant="overline">2021 - 2022</Typography>
						<Typography variant="h5">LP CIASIE</Typography>
						<Typography variant="subtitle1" gutterBottom>
							Traineeship
						</Typography>
						<Typography variant="body1">Some intel here</Typography>
					</CardContent>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image="https://api.lorem.space/image?w=151&h=151&hash=7cob4tsv"
						alt="Live from space album cover"
					/>
				</Card>
			</Animated>
			<Animated animation="fadeInLeft">
				<Card variant="outlined" sx={{ display: "flex" }}>
					<CardContent sx={{ flex: 1 }}>
						<Typography variant="overline">2019 - 2021</Typography>
						<Typography variant="h5" gutterBottom>
							DUT Informatique
						</Typography>
						<Typography variant="body1">Some intel here</Typography>
					</CardContent>
					<CardMedia
						component="img"
						sx={{ width: 151 }}
						image="https://api.lorem.space/image?w=151&h=151&hash=7cob4tsv"
						alt="Live from space album cover"
					/>
				</Card>
			</Animated>
		</Stack>
	);
}

export default Education;
