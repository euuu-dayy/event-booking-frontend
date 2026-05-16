import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import Navbar from "../../components/navbar/Navbar";

import GlassCard from "../../components/ui/GlassCard";

import Button from "../../components/ui/Button";

import CreateEventModal from "../../components/admin/CreateEventModal";

import { getAllEvents, deleteEvent } from "../../services/event.service";

import EditEventModal from "../../components/admin/EditEventModal";

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(eventId);

      setEvents((prev) => prev.filter((event) => event._id !== eventId));

      toast.success("Event deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();

        setEvents(data);
      } catch (error) {
        toast.error("Failed to fetch events");
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
          {/* Header */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
              mb-14
            "
          >
            <div>
              <p
                className="
                  text-gold
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  mb-4
                "
              >
                Admin Events
              </p>

              <h1
                className="
                  text-5xl
                  font-bold
                "
              >
                Manage Events
              </h1>
            </div>

            <Button onClick={() => setShowModal(true)}>Create Event</Button>
          </div>

          {/* Events */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-6">
              {events.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                >
                  <GlassCard>
                    <div
                      className="
                          flex
                          flex-col
                          lg:flex-row
                          lg:items-center
                          lg:justify-between
                          gap-8
                        "
                    >
                      <div>
                        <h2
                          className="
                              text-3xl
                              font-bold
                              text-gold
                            "
                        >
                          {event.title}
                        </h2>

                        <div
                          className="
                              mt-5
                              space-y-2
                              text-zinc-400
                            "
                        >
                          <p>Venue: {event.venue}</p>

                          <p>
                            Date:{" "}
                            {new Date(event.eventDate).toLocaleDateString()}
                          </p>

                          <p>Price: ₹{event.price}</p>

                          <p>Available Seats: {event.availableSeats}</p>
                        </div>
                      </div>

                      <div
                        className="
                            flex
                            flex-wrap
                            gap-4
                          "
                      >
                        <Button onClick={() => setSelectedEvent(event)}>
                          Edit
                        </Button>

                        <button
                          onClick={() => handleDelete(event._id)}
                          className="
                            px-6
                            py-3
                            rounded-2xl
                            border
                            border-rose-500/30
                            text-rose-400
                            hover:bg-rose-500/10
                            transition-all
                        "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <CreateEventModal
              onClose={() => setShowModal(false)}
              onEventCreated={(newEvent) => {
                setEvents((prev) => [newEvent, ...prev]);
              }}
            />
          )}

          {selectedEvent && (
            <EditEventModal
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
              onEventUpdated={(updatedEvent) => {
                setEvents((prev) =>
                  prev.map((event) =>
                    event._id === updatedEvent._id ? updatedEvent : event,
                  ),
                );
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;
