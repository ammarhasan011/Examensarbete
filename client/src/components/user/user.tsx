import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const User = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "30px auto",
  };

  const avatarStyle = { backgroundColor: "#1976d2" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid container direction="column" alignItems="center">
          <Avatar style={avatarStyle}>
            <PersonSharpIcon />
          </Avatar>
          <h2> logga in</h2>
        </Grid>
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          id="standard-basic"
          type="password"
          label="Password"
          variant="standard"
          fullWidth
          required
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
          {" "}
          Har du ett konto?
          <Link href="#" underline="hover">
            Registrera dig?
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default User;
