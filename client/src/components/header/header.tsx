import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import { Link } from "react-router-dom";

// const pages = ["Hemmmm", "Produkter"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            M Shop
          </Typography>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              Hem
            </Button>
          </Link>

          <Link
            to="/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              Produkter
            </Button>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            M Shop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/*   {pages.map((page) => (
              <Link
                to={`/${page.toLowerCase()}`}
                key={page}
                onClick={handleCloseNavMenu}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  {page}
                </Button>
              </Link>
            ))}*/}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* Mina ikoner */}
            <Link to="/user">
              <PersonSharpIcon
                sx={{
                  marginRight: 1.5,
                  fontSize: "2.2rem",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </Link>
            <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
              <ShoppingCartSharpIcon
                sx={{
                  marginLeft: 2,
                  fontSize: "1.9rem",
                  color: "white",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
