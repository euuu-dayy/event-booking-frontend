import { motion } from "framer-motion";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "../ui/Button";

import { getUser, logoutUser } from "../../utils/auth";

import { logoutUserApi } from "../../services/auth.service";

const Navbar = () => {
  const user = getUser();

  const isAdmin = user?.role === "admin";

  const location = useLocation();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("Calling logout API");

      await logoutUserApi();

      console.log("Logout API success");

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

    {
      name: "My Bookings",
      path: "/my-bookings",
    },

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
        px-6
        py-5
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          px-6
          py-4
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

        {/* Nav Links */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                transition-all
                ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-zinc-300 hover:text-gold"
                }
              `}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div
                className="
                  hidden
                  md:flex
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

                  <p className="text-xs text-zinc-400">Premium User</p>
                </div>
              </div>

              <Button onClick={handleLogout} className="px-5 py-2">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button className="px-5 py-2">Login</Button>
              </Link>

              <Link to="/register">
                <button
                  className="
                    hidden
                    md:block
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
      </div>
    </motion.nav>
  );
};

export default Navbar;
