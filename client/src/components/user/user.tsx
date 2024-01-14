import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import TextField from "@mui/material/TextField";
import "./user.css";

const User = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "30px auto",
  };

  const avatarStyle = { backgroundColor: "#1976d2" };

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
          label="Username"
          variant="standard"
          fullWidth
          required
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          fullWidth
          required
        />
      </Paper>
    </Grid>
  );
};

export default User;
