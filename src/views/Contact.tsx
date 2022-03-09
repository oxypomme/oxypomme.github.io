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
import { postAPI } from "../features/fetchAPI";
import { Locale, localizedStrings } from "../features/languages";

type Props = React.PropsWithoutRef<{
  locale: Locale;
  sx?: SxProps;
}>;

type AlertType = {
  severity?: "success" | "error" | "warning" | "info";
  message: string;
};

function Contact({ locale, sx }: Props) {
  const [errors, setErrors] = React.useState({
    name: true,
    email: true,
    content: true,
    send: false,
  });
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [alert, setAlert] = React.useState<AlertType | null>(null);

  const showAlert = (
    severity: AlertType["severity"],
    message: AlertType["message"],
    duration = 1
  ) => {
    setAlert({ severity, message });
    setTimeout(() => {
      setAlert(null);
    }, duration * 1000);
  };

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

  const onSendClick = async () => {
    try {
      setErrors({ ...errors, send: true });
      const data = await postAPI("contact", {
        name,
        email,
        text: content,
      });

      if (data) {
        setName("");
        setEmail("");
        setContent("");
        showAlert("success", localizedStrings.contactOK[locale]);
      } else {
        throw new Error("No data");
      }
    } catch (error) {
      showAlert("error", localizedStrings.contactKO[locale]);
    } finally {
      setErrors({ ...errors, send: false });
    }
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
        {localizedStrings.contactTitle[locale]}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", mb: 4 }}>
        <TextField
          required
          error={errors.name}
          label={localizedStrings.contactNameField[locale]}
          value={name}
          onChange={handleNameChange}
          sx={{ flex: 1, mr: 2 }}
        />
        <TextField
          required
          error={errors.email}
          label={localizedStrings.contactMailField[locale]}
          type="email"
          value={email}
          onChange={handleEmailChange}
          sx={{ flex: 1, ml: 2 }}
        />
      </Box>

      <TextField
        required
        error={errors.content}
        label={localizedStrings.contactContentField[locale]}
        multiline
        rows={7}
        value={content}
        onChange={handleContentChange}
      />
      <Button
        sx={{ my: 2, mx: "auto", width: { xs: "100%", md: "50%" } }}
        variant="contained"
        disabled={Object.values(errors).filter((e) => e).length > 0}
        onClick={onSendClick}
      >
        <Send />
        {localizedStrings.contactSend[locale]}
      </Button>

      <Link href={"mailto:" + process.env.REACT_APP_MAIL} color="secondary">
        {localizedStrings.contactAlt[locale]}
      </Link>
    </Container>
  );
}

export default Contact;
