import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Hero() {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <div className="min-h-screen pb-20">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
          <a href="https://prebuiltui.com">
            <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
            <a href="#" className="hover:text-blue-600 transition">
              Home
            </a>
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition">
              Testimonials
            </a>
            <a href="#cta" className="hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          <div className="flex gap-2 mt-4">
            <Link
              to="/app?state=register"
              className="hidden md:block px-6 py-2 bg-blue-500 hover:bg-blue-700 active:scale-95 transition-all rounded-full text-white"
              hidden={user}
            >
              Get started – It’s free
            </Link>
            <Link
              to="/app?state=login"
              className="hidden md:block px-6 py-2 border active:scale-95 hover:bg-slate-50 transition-all rounded-full text-slate-700 hover:text-slate-900"
              hidden={user}
            >
              Login
            </Link>
            <Link
              to="/app"
              className="hidden md:block px-8 py-2 bg-blue-500 hover:bg-blue-700 active:scale-95 transition-all rounded-full text-white"
              hidden={!user}
            >
              Dashboard
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden active:scale-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="lucide lucide-menu"
            >
              <path d="M4 5h16M4 12h16M4 19h16" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#features" className="text-white">
            Features
          </a>
          <a href="#testimonials" className="text-white">
            Testimonials
          </a>
          <a href="#cta" className="text-white">
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-blue-600 hover:bg-blue-700 transition text-white rounded-md flex"
          >
            X
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black mt-15">
          <div className="absolute top-28 left-1/3 -z-10 size-96 bg-blue-300 blur-[120px] opacity-30"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            {/* LEFT SIDE (Resume Images) */}
            <div className="hidden lg:flex col-span-6 justify-center relative">
              {/* Glow behind resumes */}
              <div className="absolute -z-10 w-80 h-72 bg-blue-600 rounded-full blur-3xl opacity-40"></div>

              {/* Resume images */}
              <img
                src="/resume-2.png"
                alt="Sample resume"
                className="w-78 rounded-xl shadow-xl"
              />

              <img
                src="/resume-1.png"
                alt="Sample resume"
                className="w-78 rounded-xl shadow-xl absolute top-16 left-20 rotate-3"
              />
            </div>

            {/* RIGHT SIDE (Hero Content) */}
            <div className="col-span-6 text-center lg:text-left mt-5">
              <h1 className="text-5xl md:text-6xl font-semibold leading-tight max-w-3xl mt-5">
                Land your dream job with{" "}
                <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  AI-powered
                </span>{" "}
                resumes.
              </h1>

              <p className="max-w-md text-lg text-slate-600 mt-8">
                Create, edit and download professional resumes with AI-powered
                assistance.
              </p>

              {/* CTA */}
              <div className="mt-12 flex justify-center lg:justify-start">
                <Link
                  to="/app"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-10 py-4 ring-offset-2 ring-1 ring-blue-400 flex items-center gap-2 transition-all active:scale-95"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-7-7l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>

              <p className="mt-20 text-sm text-slate-500">
                Trusted by students and working professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

         * {
             font-family: 'Poppins', sans-serif;
            }
                `}
      </style>
    </>
  );
}

export default Hero;
