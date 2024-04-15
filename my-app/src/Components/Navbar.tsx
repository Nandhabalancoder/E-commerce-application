import React, { useEffect, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Importing login icon
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogedIn, setUser } from "../redux/authSlice";
import { Badge, Button } from "@mui/material";
import { fetchCart, getCart } from "../redux/Slice";

const Navbar: React.FC = () => {
  const pages = [{ name: "Home", link: "/" },
  { name: "About", link: "/" }
  ];
  const user = useSelector(getUserLogedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart() as any);
  }, [dispatch]);
  const cartList = useSelector(getCart);

  const userCartList = useMemo(() => {
    if (!cartList || !user) return [];
    return cartList.filter((item: any) => item.userId === user.userId);
  }, [cartList, user]);

console.log(user)
// Function to store user data in local storage
const storeUserDataInLocalStorage = (userData:any) => {
  localStorage.setItem('userData', JSON.stringify(userData));
};

// Function to retrieve user data from local storage
const getUserDataFromLocalStorage = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

useEffect(() => {
  if (user) {
    storeUserDataInLocalStorage(user);
  } else {
    const storedUserData = getUserDataFromLocalStorage();
    if (storedUserData) {
      dispatch(setUser(storedUserData));
    }
  }
}, [user, dispatch]);
  return (
    <AppBar position="fixed" style={{ top: 0, bottom: 'auto', background: '#f5c011', width: '100%' }}>
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
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={item?.link}
                >
                  {item?.name}
                </Link>
              </p>
            ))}
          </Typography>
        </div>
        <div>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Link>
          {user && user?.admin ? (
            <Link
              to={"/admin"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button variant="contained" color="error">
                Admin
              </Button>
            </Link>
          ) : (
            ""
          )}

          {userCartList?.length > 0 ? (
            <IconButton color="inherit">
              <Badge badgeContent={userCartList.length} color="error">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
              
                  <ShoppingCartIcon />
                </Link>
              </Badge>{" "}
            </IconButton>
          ) : (
            ""
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
