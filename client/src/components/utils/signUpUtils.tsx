//Imports
import axios from "axios";

// Function to handle user registration
export const handleRegistration = async (
  event: React.FormEvent<HTMLFormElement>,
  navigate: any
) => {
  event.preventDefault();

  if (!event.target) {
    return;
  }

  // Typing function to tell TypeScript that this is a form element
  const target = event.target as typeof event.target & {
    firstName: { value: string };
    lastName: { value: string };
    email: { value: string };
    password: { value: string };
  };

  // Get the form data
  const formData = {
    firstName: target.firstName.value,
    lastName: target.lastName.value,
    email: target.email.value,
    password: target.password.value,
  };

  try {
    // Send a POST request to backend
    const response = await axios.post(
      "http://localhost:3000/api/users/register",
      formData
    );
    const userCreated = response.data;

    if (userCreated) {
      // Redirect to the sign-in page upon successful registration
      navigate("/sign-in");
    } else {
      console.log("Användaren skapades inte");
    }
    // Console the data from backend
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
