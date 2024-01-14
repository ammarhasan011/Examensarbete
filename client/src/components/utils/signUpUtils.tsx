import axios from "axios";

//Security check to avoid 'null' error
export const handleRegistration = async (
  //types up event so React understands
  event: React.FormEvent<HTMLFormElement>
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
    //Send a POST request to backend
    const response = await axios.post(
      "http://localhost:3000/api/users/register",
      formData
    );

    // Console the data from backend
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
