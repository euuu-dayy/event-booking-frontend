import { useState } from "react";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";

import Input from "../ui/Input";

import Button from "../ui/Button";

import {
  updateEvent,
} from "../../services/event.service";

const EditEventModal = ({
  event,

  onClose,

  onEventUpdated,
}) => {
  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: event.title,

      description:
        event.description,

      venue: event.venue,

      eventDate:
        new Date(
          event.eventDate,
        )
          .toISOString()
          .slice(0, 16),

      price: event.price,
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const updatedEvent =
          await updateEvent(
            event._id,
            formData,
          );

        onEventUpdated(
          updatedEvent,
        );

        toast.success(
          "Event updated successfully",
        );

        onClose();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Update failed",
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="w-full max-w-2xl"
      >
        <GlassCard>
          <div
            className="
              flex
              items-center
              justify-between
              mb-8
            "
          >
            <div>
              <p
                className="
                  text-gold
                  uppercase
                  tracking-[0.3em]
                  text-sm
                  mb-3
                "
              >
                Admin Event
              </p>

              <h2
                className="
                  text-4xl
                  font-bold
                "
              >
                Edit Event
              </h2>
            </div>

            <button
              onClick={onClose}
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/5
                hover:bg-white/10
                transition-all
              "
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
            <div className="md:col-span-2">
              <Input
                label="Event Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Description"
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
              />
            </div>

            <Input
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
            />

            <Input
              label="Event Date"
              name="eventDate"
              type="datetime-local"
              value={
                formData.eventDate
              }
              onChange={handleChange}
            />

            <Input
              label="Ticket Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
            />

            <div className="md:col-span-2 pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? "Updating..."
                  : "Update Event"}
              </Button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default EditEventModal;