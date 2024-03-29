// Imports
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { handleLogin } from "../Utils/SignInUtils";
import { handleLoginAndRedirect } from "../Utils/AuthUtils";
import axios from "axios";

// SignInForm Component
const SignInForm = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "30px auto",
  };

  //CSS
  const avatarStyle = { backgroundColor: "#1976d2" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };

  // Get the navigate function from react-router-dom
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in, if yes redirect to profile page
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/api/users/authorize");
        const userIsLoggedIn = response.data._id;

        if (userIsLoggedIn) {
          navigate("/profile-page");
        }
      } catch (error) {
        console.error("Fel vid kontroll av inloggningsstatus:", error);
      }
    };
    // Call the checkLoginStatus function on component mount
    checkLoginStatus();
  }, [navigate]);

  // Login handler and redirection
  const handleLoginAndRedirectLocal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    await handleLogin(e);
    e.preventDefault();
    await handleLoginAndRedirect(navigate);
  };

  return (
    <form onSubmit={handleLoginAndRedirectLocal}>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid container direction="column" alignItems="center">
            <Avatar style={avatarStyle}>
              <PersonSharpIcon />
            </Avatar>
            <h2> logga in</h2>
            <Typography variant="caption">
              Logga in efter att du har skapat ett konto!
            </Typography>
          </Grid>
          <TextField
            name="email"
            label="Email"
            variant="standard"
            placeholder="Ange ditt email"
            fullWidth
            type="email"
            required
            autoComplete="email"
          />
          <TextField
            type="text"
            name="password"
            label="Lösenord"
            variant="standard"
            placeholder="Ange ditt lösenord"
            fullWidth
            inputProps={{ minLength: 5 }}
            required
            autoComplete="current-password"
          />
          <Button
            type="submit"
            color="primary"
            fullWidth
            variant="contained"
            style={buttonStyle}
          >
            Logga in
          </Button>
          <Typography>
            Har du ett konto?
            <RouterLink to="/sign-up" style={{ textDecoration: "none" }}>
              Registrera dig nu!
            </RouterLink>
          </Typography>
        </Paper>
      </Grid>
    </form>
  );
};

export default SignInForm;
