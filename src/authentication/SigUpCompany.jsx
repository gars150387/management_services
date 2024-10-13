// src/pages/SignUpCompanyPage.jsx
import { notification } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const SignUpCompanyPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const gettingSession = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    }
    setUserInfo(session);
  };

  useEffect(() => {
    gettingSession();
  }, []);

  const onSubmit = async (data) => {
    const { companyName, street, city, state, website, legalId, email } = data;

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
        navigate("/dashboard");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              type="text"
              placeholder="Company Name"
              {...register("companyName")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Street"
              {...register("street")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              placeholder="City"
              {...register("city")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              placeholder="State"
              {...register("state")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="text"
              placeholder="ZIP"
              {...register("zip")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="url"
              placeholder="Website"
              {...register("website")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <input
              type="tel"
              placeholder="Phone"
              {...register("phone")}
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpCompanyPage;
