/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import { Icon } from "@iconify/react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
} from "@mui/material";

import { notification, Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarContext } from "../protectedRoutes/ProtectedRoutes";
import { supabase } from "../supabaseClient";
import "./style/style.css";
const company = JSON.parse(localStorage.getItem("companyData"));
const navItems = [
  { title: "Home", route: "/" },
  { title: "dashboard", route: "/" },
  { title: "clients", route: "/clients" },
];
const cultures = ["en", "es"];
const drawerWidth = 240;
const Navbar = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setValue } = useContext(NavbarContext);
  const navigate = useNavigate();
  const { window } = props;
  const handleChange = (value) => {
    return setValue(value);
  };
  // Fetch the user information from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      const { data: session } = await supabase.auth.getSession();

      if (!session?.session?.user) {
        // If no user is logged in, redirect to login
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={`${item.title}-${item.route}`} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink key={item.title} to={`${item.route}`}>
                <div className="content-main-navbar-updated">
                  <article
                    className={
                      location.pathname === `${item.route}`
                        ? "nav-item-base-main-navbar-updated"
                        : "nav-item-base-1-main-navbar-updated"
                    }
                  >
                    <div className="content-2-main-navbar-updated">
                      <div className="text-1-main-navbar-updated text-mdsemibold">
                        <p style={{ textTransform: "capitalize" }}>
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <NavLink>
              <button
                style={{
                  outline: "none",
                  border: "transparent",
                  margin: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                }}
                key={"authenticated"}
                onClick={() => handleLogout()}
              >
                <div className="content-main-navbar-updated">
                  <article className={"nav-item-base-1-main-navbar-updated"}>
                    <div className="content-2-main-navbar-updated">
                      <div className="text-1-main-navbar-updated text-mdsemibold">
                        <p style={{ textTransform: "capitalize" }}>log out </p>
                      </div>
                    </div>
                  </article>
                </div>
              </button>
            </NavLink>
          </ListItemButton>
        </ListItem>
        <div className="content-2-main-navbar-updated">
          <div className="text-1-main-navbar-updated text-mdsemibold">
            <Select
              defaultValue="en"
              style={{
                backgroundColor: "transparent",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10,
                margin: "auto",
              }}
              onChange={handleChange}
              dropdownRender={(menu) => (
                <div style={{ margin: "3dvh 0 0 0" }}>{menu}</div>
              )}
              options={[
                ...cultures.map((c, idx) => {
                  return {
                    value: c,
                    label: c,
                  };
                }),
              ]}
              popupClassName="custom-popup"
            />
          </div>
        </div>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Handle user logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      notification.error({
        message: "Logout Failed",
        description: error.message,
      });
    } else {
      localStorage.removeItem("companyData");
      notification.success({
        message: "Logged Out",
        description: "You have successfully logged out.",
      });
      navigate("/login");
    }
  };
  //"
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--blue700)",
        margin: "0 0 20dvh 0",
      }}
    >
      <AppBar
        style={{
          top: 0,
          backgroundColor: "var(--blue700)",
          width: "100%",
        }}
        component="nav"
      >
        <Toolbar>
          <div
            id="grid-container-inside"
            style={{
              justifyContent: "space-between",
              backgroundColor: "var(--blue700)",
              width: `100%`,
            }}
          >
            <Grid
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
              item
              sm={12}
              md={12}
              lg={12}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { sm: "flex", md: "none", lg: "none" },
                  backgroundColor: "var(--blue700)",
                  borderBottom: "solid 1px var(--blue-dark--600)",
                }}
              >
                <Icon icon="material-symbols:menu" />
              </IconButton>

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                    md: "flex",
                    lg: "flex",
                  },
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  {navItems.map((item, index) => {
                    if (index < 1) {
                      return (
                        <NavLink key={item.title} to={`${item.route}`}>
                          <div className="content-main-navbar-updated">
                            <article
                              className={"nav-item-base-1-main-navbar-updated"}
                            >
                              <div className="content-2-main-navbar-updated">
                                <div className="text-1-main-navbar-updated text-mdsemibold">
                                  <p style={{ textTransform: "capitalize" }}>
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            </article>
                          </div>
                        </NavLink>
                      );
                    }
                    return (
                      <NavLink key={item.title} to={`${item.route}`}>
                        <div className="content-main-navbar-updated">
                          <article
                            className={
                              location.pathname === `${item.route}`
                                ? "nav-item-base-main-navbar-updated"
                                : "nav-item-base-1-main-navbar-updated"
                            }
                          >
                            <div className="content-2-main-navbar-updated">
                              <div className="text-1-main-navbar-updated text-mdsemibold">
                                <p style={{ textTransform: "capitalize" }}>
                                  {item.title}
                                </p>
                              </div>
                            </div>
                          </article>
                        </div>
                      </NavLink>
                    );
                  })}
                  <NavLink>
                    <button
                      style={{
                        outline: "none",
                        border: "transparent",
                        margin: 0,
                        padding: 0,
                        backgroundColor: "transparent",
                      }}
                      key={"authenticated"}
                      onClick={() => handleLogout()}
                    >
                      <div className="content-main-navbar-updated">
                        <article
                          className={"nav-item-base-1-main-navbar-updated"}
                        >
                          <div className="content-2-main-navbar-updated">
                            <div className="text-1-main-navbar-updated text-mdsemibold">
                              <p style={{ textTransform: "capitalize" }}>
                                log out{" "}
                              </p>
                            </div>
                          </div>
                        </article>
                      </div>
                    </button>
                  </NavLink>
                </div>
                <NavLink>
                  <div className="content-2-main-navbar-updated">
                    <div className="text-1-main-navbar-updated text-mdsemibold">
                      <Select
                        defaultValue="en"
                        style={{
                          backgroundColor: "transparent",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 10,
                          margin: "auto",
                        }}
                        onChange={handleChange}
                        dropdownRender={(menu) => (
                          <div style={{ margin: "3dvh 0 0 0" }}>{menu}</div>
                        )}
                        options={[
                          ...cultures.map((c, idx) => {
                            return {
                              value: c,
                              label: c,
                            };
                          }),
                        ]}
                        popupClassName="custom-popup"
                      />
                    </div>
                  </div>
                </NavLink>
              </Box>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              GridSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Grid>
  );
};

export default Navbar;
