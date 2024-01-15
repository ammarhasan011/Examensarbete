// Import Material-UI components and styles
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

import Button from "@mui/material/Button";

// ProfilePage Component
const ProfilePage = () => {
  const paperStyle = { padding: "30px 20px", width: 800, margin: "20px auto" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };
  const avatarStyle = { backgroundColor: "#1976d2" };

  return (
    // Render the sign-in form
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid container direction="column" alignItems="center">
            <Avatar style={avatarStyle}>
              <PersonIcon />
            </Avatar>
            <h2>Ditt Konto</h2>
            <Typography variant="caption">Du är inloggad</Typography>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={buttonStyle}
            >
              Logga ut
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default ProfilePage;
