import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import Button from "../ui/Button";
import axiosInstance from "../../api/axios";

const CreateEventModal = ({ onClose, onEventCreated }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    eventDate: "",
    totalSeats: "",
    price: "",
    poster: null, // 🚀 STEP 10: Added poster state
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🚀 STEP 11: Build FormData
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      const response = await axiosInstance.post("/events", submitData);

      toast.success("Event created successfully");
      onEventCreated(response.data.data);
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-gold uppercase tracking-[0.3em] text-sm mb-3">
                Admin Event
              </p>
              <h2 className="text-4xl font-bold">Create Event</h2>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 transition-all"
            >
              ✕
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="md:col-span-2">
              <Input
                label="Event Title"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Venue"
              name="venue"
              placeholder="Enter venue"
              value={formData.venue}
              onChange={handleChange}
            />

            <Input
              label="Event Date"
              name="eventDate"
              type="datetime-local"
              value={formData.eventDate}
              onChange={handleChange}
            />

            <Input
              label="Total Seats"
              name="totalSeats"
              type="number"
              placeholder="100"
              value={formData.totalSeats}
              onChange={handleChange}
            />

            <Input
              label="Ticket Price"
              name="price"
              type="number"
              placeholder="499"
              value={formData.price}
              onChange={handleChange}
            />

            {/* 🚀 STEP 10: File Input */}
            <div className="md:col-span-2">
              <label className="text-sm text-zinc-400 mb-3 block">
                Event Poster
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, poster: e.target.files[0] })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white"
              />
            </div>

            <div className="md:col-span-2 pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default CreateEventModal;
