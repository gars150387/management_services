// src/components/CreateClient.jsx
import { Box, Button, Grid, TextField } from "@mui/material";
import { Card, notification } from "antd";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { checkArray } from "../components/utils/checkArray";
import { supabase } from "../supabaseClient";
//{ onSuccess }
const CreateClient = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const companyDataStored = useRef();
  // Handle form submission to insert client data into Supabase
  useEffect(() => {
    companyDataStored.current = JSON.parse(localStorage.getItem("companyData"));
    console.log(companyDataStored.current);
  }, []);
  const onSubmit = async (data) => {
    const {
      first_name,
      last_name,
      email,
      street,
      city,
      state,
      zip_code,
      legal_id,
      phone,
      extra,
    } = data;

    try {
      // Insert client data into Supabase and get the new client's id
      const { error: insertError } = await supabase
        .from("customer")
        .insert({
          first_name,
          last_name,
          email,
          street,
          city,
          state,
          zip_code,
          legal_id,
          phone,
          extra,
          company_id:checkArray(companyDataStored.current).id
        })
        .select("id") // Get the newly inserted client's ID
        .single();

      if (insertError) {
        throw new Error(`insertError: ${insertError.message}`);
      }
      return navigate("/clients");
      // Once the client is inserted, retrieve the company's current client data
    } catch (error) {
      // Error handling
      notification.error({
        message: "Error",
        description: `Modal Error: ${error.message}`,
      });
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
        <h2>Create New Client</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12}>
              <TextField
                label="First Name"
                fullWidth
                margin="normal"
                {...register("first_name", {
                  required: "First name is required",
                })}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12}>
              <TextField
                label="Last Name"
                fullWidth
                margin="normal"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            {/* Street */}
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
            <Grid item xs={6}>
              <TextField
                label="Zip Code"
                fullWidth
                margin="normal"
                {...register("zip_code", { required: "Zip Code is required" })}
                error={!!errors.zip_code}
                helperText={errors.zip_code?.message}
              />
            </Grid>

            {/* Legal ID */}
            <Grid item xs={6}>
              <TextField
                label="Legal ID"
                fullWidth
                margin="normal"
                {...register("legal_id", { required: "Legal ID is required" })}
                error={!!errors.legal_id}
                helperText={errors.legal_id?.message}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={6}>
              <TextField
                label="Phone"
                fullWidth
                margin="normal"
                {...register("phone", { required: "Phone is required" })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            {/* Extra Information */}
            <Grid item xs={12}>
              <TextField
                label="Extra Information"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...register("extra")}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default CreateClient;
