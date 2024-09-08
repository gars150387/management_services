// src/pages/LoginPage.jsx
import { Box, Button, Grid, TextField } from "@mui/material";
import { Card, notification } from "antd";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error, data:session } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notification.error({
        message: "Login Failed",
        description: error.message,
      });
    } else {
      const { data:companyInfo, error:companyError } = await supabase
      .from("company")
      .select("*")
      .ilike("employees", `%${session.user.id}%`)
      if (companyError) {
        notification.error({
          message: "Login Failed",
          description: companyError.message,
        });
      } else {
        localStorage.setItem("companyData", JSON.stringify(companyInfo));
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in!",
        });
        // Redirect to dashboard or other protected routes
        navigate("/");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>
        </form>
        <Grid item xs={12}>
          <NavLink to="/signup" end>
            <Button color="primary" fullWidth>
              Sign Up
            </Button>
          </NavLink>
        </Grid>
      </Card>
    </Box>
  );
};

export default LoginPage;
