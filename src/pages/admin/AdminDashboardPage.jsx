import { motion } from "framer-motion";

import Navbar from "../../components/navbar/Navbar";

import GlassCard from "../../components/ui/GlassCard";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { getDashboardAnalytics } from "../../services/admin.service";

const AdminDashboardPage = () => {
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchAnalytics =
    async () => {
      try {
        const data =
          await getDashboardAnalytics();

        setAnalytics(data);
      } catch (error) {
        toast.error(
          "Failed to load analytics",
        );
      } finally {
        setLoading(false);
      }
    };

  fetchAnalytics();
}, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="pt-36 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-14"
          >
            <p
              className="
                  text-gold
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  mb-4
                "
            >
              Admin Panel
            </p>

            <h1
              className="
                  text-5xl
                  font-bold
                "
            >
              Dashboard Overview
            </h1>
          </motion.div>

          {/* Analytics */}
          <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-8
                mb-12
              "
          >
            {loading ? (
  <p>Loading...</p>
) : (
  [
    {
      title: "Total Events",

      value:
        analytics.totalEvents,
    },

    {
      title: "Total Bookings",

      value:
        analytics.totalBookings,
    },

    {
      title: "Revenue",

      value: `₹${analytics.totalRevenue}`,
    },

    {
      title: "Active Users",

      value:
        analytics.totalUsers,
    },
  ].map((item, index) => (
    <motion.div
      key={item.title}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay:
          index * 0.1,
      }}
    >
      <GlassCard>
        <p className="text-zinc-400">
          {item.title}
        </p>

        <h2
          className="
            text-5xl
            font-bold
            text-gold
            mt-4
          "
        >
          {item.value}
        </h2>
      </GlassCard>
    </motion.div>
  ))
)}
          </div>

          {/* Quick Actions */}
          <div
            className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-8
              "
          >
            <GlassCard>
              <h2
                className="
                    text-3xl
                    font-bold
                    mb-6
                  "
              >
                <Link to="/admin/events">
                  <GlassCard>
                    <h2
                      className="
                        text-3xl
                        font-bold
                        mb-6
                    "
                    >
                      Event Management
                    </h2>

                    <p className="text-zinc-400">
                      Create, edit, and manage premium events from the admin
                      dashboard.
                    </p>
                  </GlassCard>
                </Link>
              </h2>

              <p className="text-zinc-400">
                Create, edit, and manage premium events from the admin
                dashboard.
              </p>
            </GlassCard>

            <GlassCard>
              <h2
                className="
                    text-3xl
                    font-bold
                    mb-6
                  "
              >
                Booking Analytics
              </h2>

              <p className="text-zinc-400">
                Track booking activity, revenue, occupancy, and customer
                behavior.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
