import { useState } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import axiosInstance from "../../api/axios";

import AuthLayout from "../../layouts/AuthLayout";

import GlassCard from "../../components/ui/GlassCard";

import Input from "../../components/ui/Input";

import Button from "../../components/ui/Button";

const RegisterPage = () => {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await axiosInstance.post(
          "/auth/register",
          formData
        );

      toast.success(
        response.data.message
      );

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="w-full max-w-md"
      >
        <GlassCard>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <h1
                className="
                  text-4xl
                  font-bold
                  text-gold
                "
              >
                Create Account
              </h1>

              <p className="text-zinc-400 mt-2">
                Join premium booking
                experience
              </p>
            </div>

            <Input
              label="Name"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Register"}
            </Button>

            <p className="text-zinc-400 text-center">
              Already have an
              account?{" "}
              <Link
                to="/login"
                className="
                  text-gold
                  hover:underline
                "
              >
                Login
              </Link>
            </p>
          </form>
        </GlassCard>
      </motion.div>
    </AuthLayout>
  );
};

export default RegisterPage;