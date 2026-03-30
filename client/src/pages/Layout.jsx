import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import AuthPage from "./Login";

function Layout() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-hidden">
      {user ? (
        <div className="flex min-h-screen flex-col bg-gray-50">
          <Navbar />
          <main className="mx-auto flex-1 w-full max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default Layout;
