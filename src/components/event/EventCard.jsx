import { motion } from "framer-motion";

import Button from "../ui/Button";

import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
      }}
      className="
        group
        overflow-hidden
        rounded-3xl
        bg-card
        border
        border-white/10
        shadow-xl
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={
            event.poster ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
          }
          alt={event.title}
          className="
            h-[320px]
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/20
            to-transparent
          "
        />

        {/* Price Badge */}
        <div
          className="
            absolute
            top-5
            right-5
            px-4
            py-2
            rounded-full
            bg-black/50
            backdrop-blur-md
            border
            border-gold/20
            text-gold
            font-semibold
          "
        >
          ₹{event.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div
          className="
            flex
            items-center
            justify-between
            mb-4
          "
        >
          <p className="text-zinc-400">
            {event.venue}
          </p>

          <p className="text-zinc-500 text-sm">
            {new Date(
              event.eventDate
            ).toLocaleDateString()}
          </p>
        </div>

        <h2
          className="
            text-2xl
            font-bold
            text-white
            mb-4
          "
        >
          {event.title}
        </h2>

        <p
          className="
            text-zinc-400
            line-clamp-2
            mb-6
          "
        >
          {event.description}
        </p>

        <div
          className="
            flex
            items-center
            justify-between
            mt-6
          "
        >
          <div>
            <p className="text-zinc-500 text-sm">
              Available Seats
            </p>

            <p className="text-gold font-semibold">
              {event.availableSeats}
            </p>
          </div>

          <Link
            to={`/events/${event._id}`}
          >
            <Button className="px-5 py-2">
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;