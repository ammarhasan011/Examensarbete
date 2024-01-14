import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";

const User = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "30px auto",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Avatar>
          <PersonSharpIcon />
        </Avatar>
        <h2> logga in</h2>
      </Paper>
    </Grid>
  );
};

export default User;
