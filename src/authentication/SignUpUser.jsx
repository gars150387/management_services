// src/pages/SignUpPage.jsx
import { Box, Button, Grid, TextField } from "@mui/material";
import { Card, notification } from "antd";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password, firstName, lastName } = data;

    // Supabase sign-up call
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
          },
        },
      }
    );

    if (signUpError) {
      notification.error({
        message: "Sign Up Failed",
        description: signUpError.message,
      });
    } else {
      // If sign-up was successful, get the user id and insert into the `user` table
      const userId = signUpData?.user?.id;

      const { error: insertError } = await supabase.from("user").insert({
        id: userId, // Use the Supabase user id
        email,
        first_name: firstName,
        last_name: lastName,
        phone: "00000000000000", // Example phone number; replace with real input as needed
      });

      if (insertError) {
        notification.error({
          message: "User Insertion Failed",
          description: insertError.message,
        });
      } else {
        notification.success({
          message: "Sign Up Successful",
          description:
            "You have successfully signed up! Please now set up your company account.",
          duration: 4,
        });
        setTimeout(() => {
          return navigate("/signup-company");
        }, 2000);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* First Name Field */}
            <Grid item xs={12}>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            {/* Last Name Field */}
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign up user
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
        <Grid item xs={12}>
          <NavLink to="/login" end>
            <Button color="primary" fullWidth>
              Log In
            </Button>
          </NavLink>
        </Grid>
    </Box>
  );
};

export default SignUpPage;
