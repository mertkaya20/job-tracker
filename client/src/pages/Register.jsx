import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../schemas/auth-schema";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../api/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/auth-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  const password = useWatch({ control, name: "password" });

  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = getStrength(password);

  const strengthConfig = {
    0: { label: "Too weak", color: "bg-gray-200", width: "w-0" },
    1: { label: "Weak", color: "bg-red-400", width: "w-1/4" },
    2: { label: "Fair", color: "bg-yellow-400", width: "w-2/4" },
    3: { label: "Good", color: "bg-lime-400", width: "w-3/4" },
    4: { label: "Strong", color: "bg-green-500", width: "w-full" },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: registerRequest,
    onSuccess: (response) => {
      localStorage.setItem("token", response.data.token);
      dispatch(login({ user: response.data.user, token: response.data.token }));
      navigate("/dashboard");
    },
    onError: (error) => {
      setErrorMessage(error.response.data.message);
    },
  });

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
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="jack"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="sparrow@example.com"
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
            {password && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${strengthConfig[strength].color} ${strengthConfig[strength].width}`}
                  />
                </div>
                <p
                  className={`text-xs mt-1 ${strengthConfig[strength].color.replace("bg-", "text-")}`}
                >
                  {strengthConfig[strength].label}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary transition-colors"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <button
            disabled={!isValid || isPending}
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity mt-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isPending ? "Signing in" : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
