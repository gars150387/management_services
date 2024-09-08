// src/components/ClientList.jsx
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Button, Box, Typography } from "@mui/material";
import { Card, Spin, Table } from "antd";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const companyId = JSON.parse(localStorage.getItem("companyData"));
  const fetchClients = async () => {
    setLoading(true);
    const result = new Set();
    try {
      // Step 1: Retrieve the company client IDs from the company table
      const { error: companyError } = await supabase
        .from("company")
        .select("client")
        .eq("id", companyId[0].id)
        .single();

      if (companyError) {
        throw new Error(companyError.message);
      }
      // Step 2: Parse the client field if it's a JSON-like text
      const clientIds = JSON.parse(companyId[0].client); // Assuming the client field is a JSON-like string of customer IDs
      // Step 3: Retrieve all customers based on the IDs found in the company client column
      for (let customerId of clientIds) {
        const { data: customerData, error: customerError } = await supabase
          .from("customer")
          .select("*")
          .eq("id", Number(customerId)); // Fetch customers whose IDs match the clientIds
        if (customerError) {
          throw new Error(customerError.message);
        }
        // Return the customer data
        result.add(customerData[0]);
      }
      setLoading(false);
      return setClients(Array.from(result));
    } catch (error) {
      console.error("Error fetching company customers:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      key: 'address',
      render: (text, record) => 
        `${record.street}, ${record.city}, ${record.state}, ${record.zip_code}`,
    },
    {
      title: 'Extra',
      dataIndex: 'extra',
      key: 'extra',
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Card style={{ width: "100%", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Clients
        </Typography>

        {/* Button to create new client */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "20px" }}
          onClick={() => navigate("/new-client")}
        >
          Create New Client
        </Button>
        {loading ? <Spin /> : <Table columns={columns} dataSource={clients} />}
      </Card>
    </Box>
  );
};

export default ClientList;
