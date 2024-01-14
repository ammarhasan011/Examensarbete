import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const SignUpForm = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    height: "70vh",
    margin: "20px auto",
  };

  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Security check to avoid 'null' error
  const handleRegistration = async (
    //types up event so React understands
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!event.target) {
      return;
    }

    // Typing function to tell TypeScript that this is a form element
    const target = event.target as typeof event.target & {
      firstName: { value: string };
      lastName: { value: string };
      email: { value: string };
      password: { value: string };
    };

    // Get the form data
    const formData = {
      firstName: target.firstName.value,
      lastName: target.lastName.value,
      email: target.email.value,
      password: target.password.value,
    };

    try {
      //Send a POST request to backend
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );

      // Console the data from backend
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
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
        <form onSubmit={handleRegistration}>
          {" "}
          <TextField
            id="standard-basic"
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
            id="standard-basic"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            placeholder="Ange ditt email"
            required
          />
          <TextField
            id="standard-basic"
            name="password"
            type="password"
            label="Lösenord"
            variant="standard"
            fullWidth
            placeholder="Ange ditt lösenord"
            required
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
