// Import Material-UI components and styles
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import { handleRegistration } from "../Utils/SignUpUtils";
import { useState } from "react";
import { validateEmail, validatePassword } from "../Utils/ValidationUtils";

// SignUnForm Component
const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    height: "70vh",
    margin: "20px auto",
  };

  const handleRegistrationWithValidation = async (e) => {
    e.preventDefault();

    // Validera fälten med hjälp av de importerade valideringsfunktionerna
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
    // Fortsätt med registreringen här om det inte finns några valideringsfel
    if (!emailError && !passwordError) {
      handleRegistration({
        firstName,
        lastName,
        email,
        password,
      });
    }
  };

  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };

  return (
    // Render the sign-up form
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid container direction="column" alignItems="center">
          <RouterLink to="/sign-in" style={{ textDecoration: "none" }}>
            <ArrowBackIcon
              style={{ cursor: "pointer", marginBottom: 10, color: "inherit" }}
            />
          </RouterLink>

          <Avatar style={avatarStyle}>
            <PersonAddAltIcon />
          </Avatar>
          <h2 style={headerStyle}>Skapa konto</h2>

          <Typography variant="caption">
            Fyll i formulären för att skapa ett konto!
          </Typography>
        </Grid>
        {/* <form onSubmit={handleRegistration}> */}
        <form onSubmit={handleRegistrationWithValidation}>
          {" "}
          <TextField
            name="firstName"
            fullWidth
            label="Förnamn"
            variant="standard"
            placeholder="Ange ditt namn"
            required
          />
          <TextField
            label="Efternamn"
            name="lastName"
            variant="standard"
            fullWidth
            placeholder="Ange ditt efternamn"
            required
          />
          <TextField
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            placeholder="Ange ditt email"
            required
            autoComplete="username"
          />
          <TextField
            name="password"
            type="password"
            label="Lösenord"
            variant="standard"
            fullWidth
            placeholder="Ange ditt lösenord"
            required
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={buttonStyle}
          >
            Skapa konto
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUpForm;
