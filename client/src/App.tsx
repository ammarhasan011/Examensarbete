import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Cart from "./components/cart/cart";
import SignInForm from "./components/user-forms/signIn-form";
import Home from "./components/home";
import Products from "./components/products/products";
import AboutUs from "./components/aboutUs/aboutUs";
import Footer from "./components/footer/footer";
import SignUpForm from "./components/user-forms/signUp-form";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
