import { Grid } from "@mui/material";
import React from "react";
import Education from "./Education";
import Experience from "./Experience";

function Profile() {
	return (
		<Grid container spacing={24} sx={{ height: "100vh" }}>
			<Grid item xs={6}>
				<Education />
			</Grid>
			<Grid item xs={6}>
				<Experience />
			</Grid>
		</Grid>
	);
}

export default Profile;
