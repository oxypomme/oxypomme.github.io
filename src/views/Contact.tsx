import { Send } from "@mui/icons-material";
import {
  Button,
  Container,
  Link,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import type { Locale } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

function Contact({ locale, sx }: Props) {
  const [errors, setErrors] = React.useState({
    name: true,
    email: true,
    content: true,
  });
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let error = false;
    if (!e.target.value) {
      error = true;
    }
    setName(e.target.value);
    setErrors({ ...errors, name: error });
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let error = false;
    if (
      !e.target.value ||
      !e.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      error = true;
    }
    setEmail(e.target.value);
    setErrors({ ...errors, email: error });
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let error = false;
    if (!e.target.value) {
      error = true;
    }
    setContent(e.target.value);
    setErrors({ ...errors, content: error });
  };

  return (
    <Container
      sx={{
        ...sx,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
        Me contacter
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 4 }}>
        <TextField
          required
          error={errors.name}
          helperText={errors.name && "Incorrect name"}
          label="Name"
          value={name}
          onChange={handleNameChange}
          sx={{ flex: 1, mr: 2 }}
        />
        <TextField
          required
          error={errors.email}
          helperText={errors.email && "Incorrect email"}
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          sx={{ flex: 1, ml: 2 }}
        />
      </Box>

      <TextField
        required
        error={errors.content}
        helperText={errors.content && "Incorrect content"}
        label="Content"
        multiline
        rows={7}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        sx={{ my: 2, mx: "auto", width: { xs: "100%", md: "50%" } }}
        variant="contained"
        disabled={Object.values(errors).filter((e) => e).length > 0}
      >
        <Send />
        Send
      </Button>

      <Link href={"mailto:" + process.env.REACT_APP_MAIL} color="secondary">
        Vous préférez passer par votre propre adresse mail ?
      </Link>
    </Container>
  );
}

export default Contact;
