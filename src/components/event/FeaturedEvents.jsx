import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import EventCard from "./EventCard";

import EventCardSkeleton from "./EventCardSkeleton";

import { getAllEvents } from "../../services/event.service";

const FeaturedEvents = () => {
  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchEvents =
      async () => {
        try {
          const data =
            await getAllEvents();

          setEvents(data);
        } catch (err) {
          setError(
            "Failed to fetch events"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchEvents();
  }, []);

  return (
    <section className="px-6 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
            Featured Events
          </p>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-white
            "
          >
            Discover Premium
            Experiences
          </h2>
        </motion.div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-500">
            {error}
          </p>
        )}

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
            <div className="text-center text-zinc-400">
              No events available
            </div>
          )}
      </div>
    </section>
  );
};

export default FeaturedEvents;