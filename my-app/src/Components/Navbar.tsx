import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Importing login icon
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const pages = [{ name: "Home", link: "/" }];

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex" }}
            color="inherit"
          >
            {pages?.map((item, index) => (
              <p key={index} style={{ margin: "0 10px" }}>
                <Link  style={{ textDecoration: 'none', color: 'inherit' }} to={item?.link}>{item?.name}</Link>
              </p>
            ))}
          </Typography>
        </div>
        <div>
          <Link to={"/login"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
