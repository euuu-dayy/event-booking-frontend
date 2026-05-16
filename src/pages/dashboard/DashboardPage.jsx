import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import toast from "react-hot-toast";

import Navbar from "../../components/navbar/Navbar";

import GlassCard from "../../components/ui/GlassCard";

import EventCard from "../../components/event/EventCard";

import EventCardSkeleton from "../../components/event/EventCardSkeleton";

import { getUser } from "../../utils/auth";

import { getAllEvents } from "../../services/event.service";

const DashboardPage = () => {
  const user = getUser();

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchEvents =
      async () => {
        try {
          const data =
            await getAllEvents();

          setEvents(data);
        } catch (error) {
          toast.error(
            "Failed to load events"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="pt-36 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
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
          >
            <GlassCard className="mb-12">
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-8
                "
              >
                <div>
                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-bold
                      text-gold
                    "
                  >
                    Welcome,
                    {" "}
                    {user?.name}
                  </h1>

                  <p className="text-zinc-400 mt-4">
                    Explore luxury
                    events and reserve
                    premium seats.
                  </p>
                </div>

                <div
                  className="
                    bg-gold/10
                    border
                    border-gold/20
                    rounded-3xl
                    px-8
                    py-6
                  "
                >
                  <p className="text-zinc-400">
                    Available Events
                  </p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      text-gold
                      mt-2
                    "
                  >
                    {events.length}
                  </h2>
                </div>
              </div>
            </GlassCard>
          </motion.div>

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
              delay: 0.1,
              duration: 0.6,
            }}
            className="mb-12"
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
              Premium Experiences
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
              "
            >
              Book Your
              {" "}
              Luxury Event
            </h2>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-8
              "
            >
              {[...Array(3)].map(
                (_, index) => (
                  <EventCardSkeleton
                    key={index}
                  />
                )
              )}
            </div>
          )}

          {/* Events */}
          {!loading &&
            events.length > 0 && (
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-3
                  gap-8
                "
              >
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                  />
                ))}
              </div>
            )}

          {/* Empty */}
          {!loading &&
            events.length === 0 && (
              <GlassCard>
                <div className="text-center py-16">
                  <h2
                    className="
                      text-3xl
                      font-bold
                      text-gold
                    "
                  >
                    No Events Found
                  </h2>

                  <p className="text-zinc-400 mt-4">
                    Events will appear
                    here once created.
                  </p>
                </div>
              </GlassCard>
            )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;