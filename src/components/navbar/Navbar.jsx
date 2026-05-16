import { useState } from "react";

import { motion } from "framer-motion";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Menu, X } from "lucide-react";

import Button from "../ui/Button";

import { getUser, logoutUser } from "../../utils/auth";

import { logoutUserApi } from "../../services/auth.service";

const Navbar = () => {
  const user = getUser();

  const isAdmin = user?.role === "admin";

  const location = useLocation();

  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUserApi();

      logoutUser();

      navigate("/");
    } catch (error) {
      console.log(error);

      logoutUser();

      navigate("/");
    }
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },

    {
      name: "Events",
      path: "/dashboard",
    },

    {
      name: "About",
      path: "/about",
    },

    ...(user
      ? [
          {
            name: "My Bookings",
            path: "/my-bookings",
          },
        ]
      : []),

    ...(isAdmin
      ? [
          {
            name: "Admin",
            path: "/admin",
          },
        ]
      : []),
  ];

  return (
    <motion.nav
      initial={{
        y: -80,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        px-4
        md:px-6
        py-4
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          px-5
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          {/* Logo */}
          <Link to="/">
            <h1
              className="
                text-2xl
                font-bold
                tracking-wide
                text-gold
              "
            >
              LuxSeat
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-8
            "
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  const protectedRoutes = [
                    "/dashboard",
                    "/my-bookings",
                    "/admin",
                  ];

                  const token = localStorage.getItem("token");

                  if (protectedRoutes.includes(link.path) && !token) {
                    navigate("/login", {
                      state: {
                        from: link.path,
                      },
                    });

                    return;
                  }

                  navigate(link.path);

                  setMobileMenuOpen(false);
                }}
                className={`
      transition-all
      text-left
      ${
        location.pathname === link.path
          ? "text-gold"
          : "text-zinc-300 hover:text-gold"
      }
    `}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Desktop Right */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-4
            "
          >
            {user ? (
              <>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-gold
                      flex
                      items-center
                      justify-center
                      text-black
                      font-bold
                    "
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm text-white">{user.name}</p>

                    <p
                      className="
                        text-xs
                        text-zinc-400
                      "
                    >
                      {isAdmin ? "Administrator" : "Premium User"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  className="
                    px-5
                    py-2
                  "
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    className="
                      px-5
                      py-2
                    "
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <button
                    className="
                      px-5
                      py-2
                      rounded-2xl
                      border
                      border-zinc-700
                      text-zinc-300
                      hover:border-gold
                      hover:text-gold
                      transition-all
                    "
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              md:hidden
              text-white
            "
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              md:hidden
              mt-6
              border-t
              border-white/10
              pt-6
              flex
              flex-col
              gap-5
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                    text-lg
                    transition-all
                    ${
                      location.pathname === link.path
                        ? "text-gold"
                        : "text-zinc-300"
                    }
                  `}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    mt-2
                  "
                >
                  <div
                    className="
                      w-10
                      h-10
                      rounded-full
                      bg-gold
                      flex
                      items-center
                      justify-center
                      text-black
                      font-bold
                    "
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-white">{user.name}</p>

                    <p
                      className="
                        text-xs
                        text-zinc-400
                      "
                    >
                      {isAdmin ? "Administrator" : "Premium User"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleLogout}
                  className="
                    w-full
                    mt-3
                  "
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    className="
                      w-full
                    "
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <button
                    className="
                      w-full
                      py-3
                      rounded-2xl
                      border
                      border-zinc-700
                      text-zinc-300
                      hover:border-gold
                      hover:text-gold
                      transition-all
                    "
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
