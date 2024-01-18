//Imports
import axios from "axios";

//Security check to avoid 'null' error
export const handleLogin = async (
  //types up event so React understands
  event: React.FormEvent<HTMLFormElement>,
  navigate: any
) => {
  // Prevent default form submission
  event.preventDefault();

  if (!event.target) {
    return;
  }

  // Typing function to tell TypeScript that this is a form element
  const target = event.target as typeof event.target & {
    email: { value: string };
    password: { value: string };
  };

  // Get the form data
  const formData = {
    email: target.email.value,
    password: target.password.value,
  };

  try {
    //Send a POST request to backend
    const response = await axios.post("/api/users/login", formData);
    const userIsLoggedIn = response.data._id;

    console.log("User logged in successfully");

    // If the user is logged in, redirect to the profile page
    if (userIsLoggedIn) {
      navigate("/profile-page");
    } else {
      console.log("Du är inte inloggad.");
    }
    // Console the data from backend
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// //Imports
// import axios from "axios";

// // Function to check if the user is logged in
// const checkUserLoginStatus = async () => {
//   try {
//     const response = await axios.get("/api/users/authorize");
//     return response.data._id || null;
//   } catch (error) {
//     console.error(
//       "Authorize error:",
//       (error as any).response?.data || (error as any).message
//     );
//     return null;
//   }
// };

// // Function to handle login
// export const handleLogin = async (
//   event: React.FormEvent<HTMLFormElement>,
//   navigate: any
// ) => {
//   event.preventDefault();

//   if (!event.target) {
//     return;
//   }

//   const target = event.target as typeof event.target & {
//     email: { value: string };
//     password: { value: string };
//   };

//   const formData = {
//     email: target.email.value,
//     password: target.password.value,
//   };

//   try {
//     // Check if the user is already logged in
//     const userIsLoggedIn = await checkUserLoginStatus();

//     if (userIsLoggedIn) {
//       navigate("/profile-page");
//       return; // Skip the login process if already logged in
//     }

//     // Send a POST request to log in the user
//     const response = await axios.post("/api/users/login", formData);
//     const loggedInUserId = response.data._id;

//     console.log("User logged in successfully");

//     // If the user is logged in, redirect to the profile page
//     if (loggedInUserId) {
//       navigate("/profile-page");
//     } else {
//       console.log("Du är inte inloggad.");
//     }

//     // Check login status after handling login
//     const authUserIsLoggedIn = await checkUserLoginStatus();

//     if (authUserIsLoggedIn) {
//       navigate("/profile-page");
//     } else {
//       console.log("Autentisering misslyckades efter inloggning.");
//     }

//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
