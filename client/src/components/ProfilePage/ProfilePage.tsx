// Imports
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import OrderHistory from "../OrderHistory/OrderHistory";
import { useNavigate } from "react-router-dom";
import {
  handleLogoutAndRedirect,
  handleLoginAndRedirect,
  checkAdminStatus,
} from "../Utils/AuthUtils";
import "./ProfilePage.css";

const ProfilePage = () => {
  // Use the useNavigate hook from React Router
  const navigate = useNavigate();
  // State to track if the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect to fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if the user is logged in and redirect if necessary
        await handleLoginAndRedirect(navigate);
        // Fetch and set the admin status
        const adminStatus = await checkAdminStatus();
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [navigate]); // useEffect dependency on navigate

  const buttonStyle = { marginTop: 40, margin: "8px 0" };
  const avatarStyle = { backgroundColor: "#1976d2" };

  // Click handler for the "Ändra på produkter" button
  const handleProductManagement = () => {
    // Navigate to the ProductManagement component
    navigate("/product-management");
  };

  return (
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
            {isAdmin && (
              <Button
                color="primary"
                variant="contained"
                style={buttonStyle}
                onClick={handleProductManagement}
              >
                Ändra på produkter
              </Button>
            )}
            <OrderHistory />
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default ProfilePage;
