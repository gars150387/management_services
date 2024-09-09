// src/pages/SignUpCompanyPage.jsx
import { Box, Button, Grid, TextField } from "@mui/material";
import { Card, notification } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const SignUpCompanyPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  console.log(userInfo);
  const gettingSession = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
    console.log(userInfo);
    return setUserInfo(session);
  };

  useEffect(() => {
    gettingSession();
  }, []);
  const onSubmit = async (data) => {
    const { companyName, street, city, state, website, legalId, email } = data;

    // Supabase sign-up call
    const { error } = await supabase.from("company").insert({
      name: companyName,
      street,
      city,
      state,
      website,
      legal_id: legalId,
      email,
      rooter: true,
      employees: JSON.stringify([userInfo.session.user.id]),
      client: JSON.stringify([]),
    });

    if (error) {
      notification.error({
        message: "Sign Up Failed",
        description: error.message,
      });
    } else {
      notification.success({
        message: "Sign Up Successful",
        description: "You have successfully signed up!",
      });
      setTimeout(() => {
        return navigate("/");
      }, 2000);
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
      <Card style={{ width: 500 }}>
        <h2>Company Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Company Name */}
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                fullWidth
                margin="normal"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            </Grid>

            {/* Street Address */}
            <Grid item xs={12}>
              <TextField
                label="Street"
                fullWidth
                margin="normal"
                {...register("street", {
                  required: "Street address is required",
                })}
                error={!!errors.street}
                helperText={errors.street?.message}
              />
            </Grid>

            {/* City */}
            <Grid item xs={6}>
              <TextField
                label="City"
                fullWidth
                margin="normal"
                {...register("city", { required: "City is required" })}
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            </Grid>

            {/* State */}
            <Grid item xs={6}>
              <TextField
                label="State"
                fullWidth
                margin="normal"
                {...register("state", { required: "State is required" })}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>

            {/* Zip Code */}
            <Grid item xs={12}>
              <TextField
                label="Zip Code"
                fullWidth
                margin="normal"
                {...register("zipCode", { required: "Zip code is required" })}
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            </Grid>

            {/* Website */}
            <Grid item xs={12}>
              <TextField
                label="Website"
                fullWidth
                margin="normal"
                {...register("website", { required: "Website is required" })}
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            </Grid>

            {/* Legal ID */}
            <Grid item xs={12}>
              <TextField
                label="Legal ID"
                fullWidth
                margin="normal"
                {...register("legalId", { required: "Legal ID is required" })}
                error={!!errors.legalId}
                helperText={errors.legalId?.message}
              />
            </Grid>

            {/* Email */}
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

            {/* Password */}

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create new company
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default SignUpCompanyPage;
