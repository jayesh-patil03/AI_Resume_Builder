import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isBuilderPage = location.pathname.startsWith("/app/builder/");

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <div className="bg-white shadow">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between text-slate-800 transition-all ${
          isBuilderPage
            ? "px-4 py-3 sm:px-6 lg:px-8 sm:py-3.5"
            : "px-4 py-3.5 sm:px-6 lg:px-8"
        }`}
      >
        <Link to="/">
          <img
            src="/logo.svg"
            alt="logo"
            className={isBuilderPage ? "h-8 w-auto sm:h-11" : "h-11 w-auto"}
          />
        </Link>

        <div
          className={`flex items-center text-sm ${
            isBuilderPage ? "gap-2 sm:gap-4" : "gap-3 sm:gap-4"
          }`}
        >
          <p className={isBuilderPage ? "hidden sm:block" : "max-sm:hidden"}>
            Hi, {user?.name}
          </p>
          <button
            onClick={logoutUser}
            className={`rounded-full bg-blue-500 text-white transition-all hover:bg-blue-600 active:scale-95 ${
              isBuilderPage
                ? "px-3 py-1 text-[11px] sm:px-6 sm:py-1.5 sm:text-sm"
                : "px-4 py-1.5 text-xs sm:px-6 sm:text-sm"
            }`}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

