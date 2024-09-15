// src/pages/SignUpPage.jsx
import { Box, Button, Grid, TextField } from "@mui/material";
import { Card, notification } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
      const userId = signUpData?.user?.id;

      const { error: insertError } = await supabase.from("user").insert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        phone: "00000000000000", // Example phone number
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
        width: "100vw",
        backgroundColor: "var(--blue700)",
      }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: "90%", md: "80%", lg: "400px" }, // Responsive width based on screen size
          padding: { xs: "10px", sm: "20px" },
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
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
                sx={{
                  marginTop: "10px",
                  padding: { xs: "8px", sm: "10px" },
                }}
              >
                Create new user
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid
          sx={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
          item
          xs={12}
        >
          <p>
            Have you an account?{" "}
            <Link to="/login" end>
              Sign in here
            </Link>
          </p>
        </Grid>
      </Card>
    </Box>
  );
};

export default SignUpPage;
