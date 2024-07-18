import {
  Add,
  CategoryOutlined,
  Home as HomeIcon,
  InfoSharp,
  Menu as MenuIcon,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logo from "../../../Assets/Images/Logo.png";
import { UserModel } from "../../../Models/UserModel";
import { AppState } from "../../../Redux/AppState";
import { calculateCartAmount } from "../../../Utils/CalculateCart";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Cart from "../../ProductsArea/Cart/Cart";

const ResponsiveMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // State for cart visibility
  const currentUser = useSelector<AppState, UserModel>(
    (appState) => appState.user
  );
  const isAdmin = currentUser?.roleId === 1;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpen(open);
    };

  const menuItems = [
    { text: "Categories", icon: <CategoryOutlined />, path: "/categories" },
    { text: "Products", icon: <ShoppingCart />, path: "/products" },
    { text: "About", icon: <InfoSharp />, path: "/about" },
    isAdmin && { text: "Add Product", icon: <Add />, path: "/products/new" },
  ];

  const menuList = (
    <List>
      {menuItems.map((item, index) => (
        <ListItem button key={index} component={NavLink} to={item.path}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
  const cartAmount = useSelector((appState: AppState) =>
    calculateCartAmount(appState?.cart.products)
  );
  const badgeContent = cartAmount > 0 ? cartAmount : "0";
  return (
    <>
      <div>
        <AppBar position="fixed" sx={{ backgroundColor: "#f5f5f5" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="default"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <AuthMenu />
            {!isAdmin && (
              <Button onClick={() => setCartOpen(!cartOpen)}>
                <Badge badgeContent={badgeContent} color="primary">
                  <ShoppingCart />
                </Badge>
              </Button>
            )}
            <Typography variant="caption" component="div" sx={{ flexGrow: 1 }}>
              <img height={105} width={210} src={Logo} alt="get-market-logo" />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250 }}
          >
            {menuList}
          </div>
        </Drawer>
        <Toolbar />
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <div>
            <Cart />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default ResponsiveMenu;
