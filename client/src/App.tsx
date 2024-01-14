import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Cart from "./components/cart/cart";
import User from "./components/user/user";
import Home from "./components/home";
import Products from "./components/products/products";
import AboutUs from "./components/aboutUs/aboutUs";
import Footer from "./components/footer/footer";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
