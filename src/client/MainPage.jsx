// src/components/ClientList.jsx
import { Grid } from "@mui/material";
import { Spin, Table, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkArray } from "../components/utils/checkArray";
import { supabase } from "../supabaseClient";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const companyId = JSON.parse(localStorage.getItem("companyData"));
  const fetchClients = async () => {
    setLoading(true);
    try {
      // Step 1: Retrieve the company client IDs from the company table
      const { data: customerData, error: customerError } = await supabase
        .from("customer")
        .select("*")
        .eq("company_id", checkArray(companyId).id); // Fetch customers whose IDs match the clientIds

      if (customerError) {
        setLoading(false);
        throw new Error(customerError.message);
      }
      // Step 3: Retrieve all customers based on the IDs found in the company client column
      setLoading(false);
      return setClients(customerData);
    } catch (error) {
      console.error("Error fetching company customers:", error.message);
      return setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => `${record.first_name} ${record.last_name}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      key: "address",
      render: (text, record) =>
        `${record.street}, ${record.city}, ${record.state}, ${record.zip_code}`,
    },
    {
      title: "Extra",
      dataIndex: "extra",
      key: "extra",
    },
  ];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <div style={{ width: "100%", margin: "20px auto 5px", padding: "20px" }}>
          <Button
            style={{ width: "100%", margin: "auto", padding: "20px 0" }}
            onClick={() => navigate("/new-client")}
          >
            Create New Client
          </Button>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <Table
            columns={columns}
            dataSource={clients}
            style={{ width: "100%", margin: "0px auto", padding: "20px" }}
            pagination={true}
          />
        )}
      </Grid>
      {/* </Card> */}
    </div>
  );
};

export default ClientList;
