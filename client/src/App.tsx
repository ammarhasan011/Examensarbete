//Import required modules
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Cart from "./components/Cart/Cart";
import SignInForm from "./components/UserForms/SignInForm";
import Home from "./components/home";
import Products from "./components/Products/Products";
import AboutUs from "./components/AboutUs/AboutUs";
import Footer from "./components/Footer/footer";
import SignUpForm from "./components/UserForms/SignUpForm";
import ProfilePage from "./components/ProfilePage/ProfilePage";

// Main component representing the entire application
const App = () => {
  return (
    // Use React Router for navigation
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/profile-page" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

//Exporting App
export default App;
