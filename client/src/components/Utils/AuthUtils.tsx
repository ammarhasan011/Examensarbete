// Import
import axios from "axios";

// Function to log out and redirect
export const handleLogoutAndRedirect = async (navigate: any) => {
  try {
    // Send a DELETE request to log out the user
    await axios.delete("/api/users/logout");
    console.log("User logged out successfully");

    // Fetch user information to check if the user is logged out
    const response = await axios.get("/api/users/authorize");
    const userIsLoggedOut = !response.data._id;

    // If the user is logged out, redirect to the home page
    if (userIsLoggedOut) {
      navigate("/");
    } else {
      console.log("Du är inte inloggad.");
    }
  } catch (error) {
    console.error(
      "Logout error:",
      (error as any).response?.data || (error as any).message
    );
  }
};

// // Function to log in and redirect
export const handleLoginAndRedirect = async (navigate: any) => {
  try {
    // Fetch user information to check if the user is logged in
    const response = await axios.get("/api/users/authorize");
    const userIsLoggedIn = response.data._id;
    console.log("User logged in successfully");

    // If the user is logged in, redirect to the profile page
    if (userIsLoggedIn) {
      navigate("/profile-page");
    } else {
      console.log("Du är inte inloggad.");
    }
  } catch (error) {
    console.error(
      "Authorize error:",
      (error as any).response?.data || (error as any).message
    );
  }
};

// Function to check if the user is an admin
export const checkAdminStatus = async () => {
  try {
    const response = await axios.get("/api/users/authorize");
    const isAdmin = response.data.isAdmin;

    return isAdmin;
  } catch (error) {
    console.error(
      "Error checking admin status:",
      (error as any).response?.data || (error as any).message
    );
    return false; // Return false in case of an error
  }
};
