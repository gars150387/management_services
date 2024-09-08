// src/components/Navbar.jsx
import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import { notification } from "antd";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./style/style.css";

const navItems = [
  { title: "home", route: "/"},
  { title: "dashboard", route: "/"},
  { title: "clients", route: "/clients"},
];

const Navbar = () => {
  const navigate = useNavigate();

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
            <Grid item sm={9} md={6} lg={6}>
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {navItems.map((item) => {
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
              </Box>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
