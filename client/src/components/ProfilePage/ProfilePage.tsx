// Import Material-UI components and styles
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import OrderHistory from "../OrderHistory/OrderHistory";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleLogoutAndRedirect } from "../Utils/AuthUtils";
import "./ProfilePage.css";

// ProfilePage Component
const ProfilePage = () => {
  //useNavigate-hook redirecting
  const navigate = useNavigate();

  const buttonStyle = { marginTop: 40, margin: "8px 0" };
  const avatarStyle = { backgroundColor: "#1976d2" };

  return (
    // Render the sign-in form
    <div>
      <Grid>
        <Paper elevation={20} className="profile-paper">
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
              onClick={() => handleLogoutAndRedirect(navigate)}
            >
              Logga ut
            </Button>
            //show orders
            <OrderHistory />
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default ProfilePage;
