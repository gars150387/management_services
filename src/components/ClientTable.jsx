/* eslint-disable react/prop-types */
import { useState } from "react";
import UpdateClientModal from "./UpdateClientModal";
import ClientDetailModal from "./ClientDetailModal";

const ClientTable = ({ clients, onUpdateClient }) => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [detail, setDetail] = useState(null);

  const handleUpdateClick = (client) => {
    setSelectedClient(client);
  };

  const handleClientDetail = (client) => {
    setDetail(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setDetail(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded">
        <thead>
          <tr className="bg-gray-200 border-b-2 border-gray-300">
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr className="bg-white border-b-2 border-gray-300" key={client.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {client.first_name} {client.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{client.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
              <td className="px-6 py-4 whitespace-nowrap justify-between items-center gap-1">
                <button
                  onClick={() => handleUpdateClick(client)}
                  className="text-white bg-gray-800 border-2 rounded p-2 hover:text-gray-800 hover:bg-white transition-all mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleClientDetail(client)}
                  className="text-white bg-gray-800 border-2 rounded p-2 hover:text-gray-800 hover:bg-white transition-all mr-2"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClient && (
        <div id="div-update-modal" className="w-full h-full fixed top-0 left-0 bg-gray-900 bg-opacity-50 z-50">
          <UpdateClientModal
            client={selectedClient}
            onClose={handleCloseModal}
            onUpdateClient={onUpdateClient}
          />
        </div>
      )}
      {detail && (
        <ClientDetailModal client={detail} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ClientTable;
