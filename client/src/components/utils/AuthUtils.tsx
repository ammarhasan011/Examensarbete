// import axios from "axios";
// import { handleLogin } from "./signInutils";

// export const handleLogoutAndRedirect = async (navigate: any) => {
//   try {
//     // Skicka en DELETE-förfrågan till
//     await axios.delete("/api/users/logout");
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

// // Function for login and redirection
// export const handleLoginAndRedirect = async (
//   e: React.FormEvent<HTMLFormElement>
// ) => {
//   try {
//     await handleLogin(e); // Call the handleLogin function
//     e.preventDefault();

//     // Check if the user is logged in session._id
//     const response = await axios.get("/api/users/authorize");
//     const userIsLoggedIn = response.data._id;

//     // If there is a session._id redirect
//     if (userIsLoggedIn) {
//       navigate("/profile-page");
//     } else {
//       console.log("Du är inte inloggad.");
//     }
//   } catch (error) {
//     console.error(
//       "Authorize error:",
//       (error as any).response?.data || (error as any).message
//     );
//   }
// };
import axios from "axios";

export const handleLogoutAndRedirect = async (navigate: any) => {
  try {
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

export const handleLoginAndRedirect = async (navigate: any) => {
  try {
    const response = await axios.get("/api/users/authorize");
    const userIsLoggedIn = response.data._id;

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
