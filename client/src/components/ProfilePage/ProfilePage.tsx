// Import Material-UI components and styles
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleLogoutAndRedirect } from "../Utils/AuthUtils";

// ProfilePage Component
const ProfilePage = () => {
  //useNavigate-hook redirecting
  const navigate = useNavigate();

  const paperStyle = {
    padding: "30px 20px",
    width: 800,
    margin: "20px auto",
    height: "60vh",
  };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };
  const avatarStyle = { backgroundColor: "#1976d2" };

  // const handleLogout = async () => {
  //   try {
  //     // Skicka en DELETE-förfrågan till
  //     await axios.delete("/api/users/logout");
  //     console.log("User logged out successfully");
  //   } catch (error) {
  //     console.error(
  //       "Logout error:",
  //       (error as any).response?.data || (error as any).message
  //     );
  //   }
  // };

  // const handleLogoutAndRedirect = async (
  //   e: React.FormEvent<HTMLFormElement>
  // ) => {
  //   // await handleLogout(e); // Call the handleLogout function
  //   e.preventDefault();

  //   try {
  //     await axios.get("/api/users/logout");
  //     console.log("User logged out successfully");

  //     const response = await axios.get("/api/users/authorize");
  //     const userIsLoggedOut = !response.data._id;
  //     if (userIsLoggedOut) {
  //       navigate("/");
  //     } else {
  //       console.log("Du är inte inloggad.");
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Logout error:",
  //       (error as any).response?.data || (error as any).message
  //     );
  //   }
  // };

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
              onClick={() => handleLogoutAndRedirect(navigate)}
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
