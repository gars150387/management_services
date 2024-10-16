/* eslint-disable react/prop-types */
// src/components/CreateClient.jsx
import { Button } from "antd";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const CreateClientModal = ({ onClose, onCreateClient, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const companyDataStored = useRef();

  useEffect(() => {
    companyDataStored.current = JSON.parse(localStorage.getItem("companyData"));
    console.log(companyDataStored.current);
  }, []);

  const onSubmit = async (data) => {
    onCreateClient(data);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Create New Client
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              First name
            </label>
            <input
              {...register("first_name", {
                required: "First name is required",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Client name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Last name
            </label>
            <input
              {...register("last_name", { required: "Last name is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Client name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              {...register("phone", { required: "Phone is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs italic">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email address"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="legalId"
            >
              Legal ID
            </label>
            <input
              {...register("legal-id")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="legalId"
              type="text"
              placeholder="Legal ID"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="street"
            >
              Street
            </label>
            <input
              {...register("street")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="street"
              type="text"
              placeholder="Street address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              {...register("city")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="state"
            >
              State
            </label>
            <input
              {...register("state")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="state"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="zip"
            >
              ZIP
            </label>
            <input
              {...register("zip_code")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="zip"
              type="text"
              placeholder="ZIP code"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="extraInfo"
            >
              Extra Info
            </label>
            <textarea
              {...register("extra")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="extraInfo"
              placeholder="Any additional information"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              htmlType="submit"
            >
              {isLoading ? "Creating..." : "Create Client"}
            </Button>
            <Button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              htmlType="reset"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientModal;
