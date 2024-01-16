import axios from "axios";

export const handleLogoutAndRedirect = async (navigate: any) => {
  try {
    // Skicka en DELETE-förfrågan till
    await axios.delete("/api/users/logout");
    console.log("User logged out successfully");

    const response = await axios.get("/api/users/authorize");
    const userIsLoggedOut = !response.data._id;
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
