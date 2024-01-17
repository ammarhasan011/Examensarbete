// Import Material-UI components and styles
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import { handleRegistration } from "../Utils/SignUpUtils";

// SignUnForm Component
const SignUpForm = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    // Rensa tidigare felmeddelanden vid ändring av formuläret
    setValidationErrors({});

    // Uppdatera state för inputfälten
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Ditt befintliga kod för att hämta formulärdata
    const formData = getFormDataFromEvent(e);

    try {
      // Skicka begäran till servern
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registreringen lyckades, hantera det här
        setValidationErrors({});
      } else {
        // Registreringen misslyckades, hämta valideringsfel från servern
        const errorData = await response.json();
        setValidationErrors({
          email: errorData.errors.email,
          password: errorData.errors.password,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const getFieldError = (fieldName) => {
    return validationErrors[fieldName] || "";
  };
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    height: "70vh",
    margin: "20px auto",
  };

  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const buttonStyle = { marginTop: 40, margin: "8px 0" };

  return (
    // Render the sign-up form
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid container direction="column" alignItems="center">
          <RouterLink to="/sign-in" style={{ textDecoration: "none" }}>
            <ArrowBackIcon
              style={{ cursor: "pointer", marginBottom: 10, color: "inherit" }}
            />
          </RouterLink>

          <Avatar style={avatarStyle}>
            <PersonAddAltIcon />
          </Avatar>
          <h2 style={headerStyle}>Skapa konto</h2>

          <Typography variant="caption">
            Fyll i formulären för att skapa ett konto!
          </Typography>
        </Grid>
        <form onSubmit={handleRegistration}>
          {" "}
          <TextField
            name="firstName"
            fullWidth
            label="Förnamn"
            variant="standard"
            placeholder="Ange ditt namn"
            required
            onChange={handleInputChange}
          />
          <TextField
            label="Efternamn"
            name="lastName"
            variant="standard"
            fullWidth
            placeholder="Ange ditt efternamn"
            required
            onChange={handleInputChange}
          />
          <TextField
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            placeholder="Ange ditt email"
            required
            onChange={handleInputChange}
          />
          {validationErrors.email && (
            <Typography variant="caption" color="error">
              {validationErrors.email}
            </Typography>
          )}
          <TextField
            name="password"
            type="password"
            label="Lösenord"
            variant="standard"
            fullWidth
            placeholder="Ange ditt lösenord"
            required
            onChange={handleInputChange}
          />
          {validationErrors.password && (
            <Typography variant="caption" color="error">
              {validationErrors.password}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={buttonStyle}
          >
            Skapa konto
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUpForm;
