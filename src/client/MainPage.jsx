// src/components/ClientList.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkArray } from "../components/utils/checkArray";
import { supabase } from "../supabaseClient";
import ClientTable from "../components/ClientTable";
import CreateClientModal from "./NewClient";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const companyId = JSON.parse(localStorage.getItem("companyData"));
  const companyDataStored = useRef(companyId[0]);
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

  const handleCreateClient = async (data) => {
    setIsLoading(true);
    console.log(data);
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
          company_id: checkArray(companyDataStored.current).id,
        })
        .single();
      if (insertError) {
        setIsLoading(false);
        throw new Error(`insertError: ${insertError.message}`);
      }
      setIsLoading(false);
      setShowCreateModal(false)
      return navigate("/clients");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const handleUpdateClient = (updatedClient) => {
    setClients(
      clients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Clients</h1>
      <button
        onClick={() => setShowCreateModal(true)}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New Client
      </button>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <ClientTable clients={clients} onUpdateClient={handleUpdateClient} />
      )}
      {showCreateModal && (
        <CreateClientModal
          onClose={() => setShowCreateModal(false)}
          onCreateClient={handleCreateClient}
          loading={isLoading}
        />
      )}
    </div>
  );
};
export default ClientList;
