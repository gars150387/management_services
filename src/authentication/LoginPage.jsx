// src/pages/LoginPage.jsx
import { notification } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, password } = data;
    const { error, data: session } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notification.error({
        message: "Login Failed",
        description: error.message,
      });
    } else {
      const { data: companyInfo, error: companyError } = await supabase
        .from("company")
        .select("*")
        .ilike("employees", `%${session.user.id}%`);
      if (companyError) {
        notification.error({
          message: "Login Failed",
          description: companyError.message,
        });
      } else {
        localStorage.setItem("companyData", JSON.stringify(companyInfo));
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in!",
        });
        // Redirect to dashboard or other protected routes
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span className="text-red-500 text-xs">This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register('password', { required: true, minLength: 6 })}
              />
              {errors.password && <span className="text-red-500 text-xs">Password must be at least 6 characters long</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Don&lsquo;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;