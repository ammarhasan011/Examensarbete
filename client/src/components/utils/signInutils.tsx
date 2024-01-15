//Imports
import axios from "axios";

//Security check to avoid 'null' error
export const handleLogin = async (
  //types up event so React understands
  event: React.FormEvent<HTMLFormElement>
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

    // Console the data from backend
    console.log(response.data);
  } catch (error) {
    console.error(error);
    // console.error("Login error:", error.response?.data || error.message);
  }
};
