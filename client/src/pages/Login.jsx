import React from "react";
import { User2Icon, Mail, Lock } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../app/features/authSlice.js";

function Login() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlState = searchParams.get("state");

  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ FIX 1: handleChange added
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData);
      dispatch(login(data));
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } catch (error) {
      toast(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[350px] text-center border border-gray-300/60 rounded-2xl px-6 sm:px-8 py-8 bg-white shadow-sm"
      >
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2 mb-8">
          Please {state} in to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center w-full mb-4 border border-gray-300/80 h-12 rounded-full pl-4 sm:pl-6 gap-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <User2Icon size={16} className="text-gray-500 flex-shrink-0" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border-none outline-none w-full bg-transparent text-sm placeholder:text-gray-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mb-4 border border-gray-300/80 h-12 rounded-full pl-4 sm:pl-6 gap-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <Mail size={13} className="text-gray-500 flex-shrink-0" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="border-none outline-none w-full bg-transparent text-sm placeholder:text-gray-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center w-full mb-6 border border-gray-300/80 h-12 rounded-full pl-4 sm:pl-6 gap-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <Lock size={13} className="text-gray-500 flex-shrink-0" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none w-full bg-transparent text-sm placeholder:text-gray-400"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-left mb-6">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-12 rounded-full text-white font-medium bg-blue-500 hover:bg-blue-600 active:scale-95 transition-all duration-200 mb-6 text-sm sm:text-base"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p className="text-gray-500 text-sm">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            type="button"
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors ml-1"
          >
            {state === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
