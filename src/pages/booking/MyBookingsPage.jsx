import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Navbar from "../../components/navbar/Navbar";

import GlassCard from "../../components/ui/GlassCard";

import { getMyBookings } from "../../services/booking.service";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();

        setBookings(data);
      } catch (error) {
        toast.error("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="pt-36 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p
              className="
                text-gold
                uppercase
                tracking-[0.3em]
                text-sm
                mb-4
              "
            >
              Booking History
            </p>

            <h1
              className="
                text-5xl
                font-bold
              "
            >
              My Bookings
            </h1>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <GlassCard>
              <div className="py-16 text-center">
                <h2
                  className="
                    text-3xl
                    font-bold
                    text-gold
                  "
                >
                  No Bookings Yet
                </h2>

                <p className="text-zinc-400 mt-4">
                  Your bookings will appear here.
                </p>
              </div>
            </GlassCard>
          ) : (
            <div className="space-y-8">
              {bookings
                .filter((booking) => booking.event)
                .map((booking) => (
                  <GlassCard key={booking._id}>
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
                          {booking.event.title}
                        </h2>

                        <div className="mt-5 space-y-2 text-zinc-400">
                          <p>Venue: {booking.event.venue}</p>

                          <p>
                            Date:{" "}
                            {new Date(
                              booking.event.eventDate,
                            ).toLocaleDateString()}
                          </p>

                          <p>
                            Seats:{" "}
                            {booking.seats
                              .map((seat) => seat.seatNumber)
                              .join(", ")}
                          </p>
                        </div>
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
                        <p className="text-zinc-400">Total Paid</p>

                        <h2
                          className="
                            text-4xl
                            font-bold
                            text-gold
                            mt-2
                          "
                        >
                          ₹{booking.totalAmount}
                        </h2>

                        <p
                          className="
                            mt-4
                            text-sm
                            text-emerald-400
                          "
                        >
                          {booking.bookingStatus}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsPage;
