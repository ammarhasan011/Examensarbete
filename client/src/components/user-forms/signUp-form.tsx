import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RegisterForm = () => {
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    height: "70vh",
    margin: "20px auto",
  };

  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={avatarStyle}>
            <PersonAddAltIcon />
          </Avatar>
          <h2 style={headerStyle}>Skapa konto</h2>
          <Typography variant="caption">
            Fyll i formulären för att skapa ett konto.
          </Typography>
        </Grid>
        <form action="">
          {" "}
          <TextField
            id="standard-basic"
            fullWidth
            label="Förnamn"
            variant="standard"
            placeholder="Ange ditt namn"
            required
          />
          <TextField
            label="Efternamn"
            variant="standard"
            fullWidth
            placeholder="Ange ditt efternamn"
            required
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            fullWidth
            placeholder="Ange ditt email"
            required
          />
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
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

export default RegisterForm;
