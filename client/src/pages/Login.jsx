import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../schemas/auth-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginRequest } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login } from "../store/auth-slice";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate("/dashboard");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Job<span className="text-primary">Tracker</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your job applications easily
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={!isValid || isPending}
            className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity mt-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isPending ? "Signing in" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
