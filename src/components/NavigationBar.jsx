/* eslint-disable no-unused-vars */
// src/components/Navbar.jsx
import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import { notification, Select } from "antd";
import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarContext } from "../protectedRoutes/ProtectedRoutes";
import { supabase } from "../supabaseClient";
import "./style/style.css";
import { checkArray } from "./utils/checkArray";
const company = JSON.parse(localStorage.getItem("companyData"));
const navItems = [
  { title: `${checkArray(company)?.name ?? ""}`, route: "/" },
  { title: "dashboard", route: "/" },
  { title: "clients", route: "/clients" },
];
const cultures = ["en", "es"];

const Navbar = () => {
  const { value, setValue } = useContext(NavbarContext);
  const navigate = useNavigate();
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
        margin: "auto",
      }}
    >
      <AppBar
        style={{
          top: "2.9dvh",
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
            <Grid display={'flex'} justifyContent={"flex-start"} alignItems={"center"} item sm={12} md={12} lg={12}>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                    md: "flex",
                    lg: "flex",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
    </Grid>
  );
};

export default Navbar;
