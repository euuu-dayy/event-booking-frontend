import { useEffect, useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import Navbar from "../../components/navbar/Navbar";

import GlassCard from "../../components/ui/GlassCard";

import Button from "../../components/ui/Button";

import { getSingleEvent } from "../../services/event.service";

import {
  getEventSeats,
  lockSeat,
  unlockSeat,
} from "../../services/seat.service";

import { createBooking } from "../../services/booking.service";

import { getToken, getUser } from "../../utils/auth";

import {
  createOrder,
  verifyPayment,
  markPaymentFailed,
} from "../../services/payment.service";

const EventDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser = getUser();

  const [event, setEvent] = useState(null);

  const [seats, setSeats] = useState([]);

  const [loading, setLoading] = useState(true);

  const [lockingSeatId, setLockingSeatId] = useState(null);

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, seatData] = await Promise.all([
          getSingleEvent(id),

          getEventSeats(id),
        ]);

        setEvent(eventData);

        setSeats(seatData);
      } catch (error) {
        toast.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      setCurrentTime(now);

      // AUTO CLEAN EXPIRED LOCKS
      setSeats((prevSeats) =>
        prevSeats.map((seat) => {
          if (
            seat.lockExpiresAt &&
            new Date(seat.lockExpiresAt).getTime() <= now &&
            !seat.isBooked
          ) {
            return {
              ...seat,

              lockedBy: null,

              lockExpiresAt: null,
            };
          }

          return seat;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const selectedSeats = useMemo(() => {
    return seats.filter(
      (seat) =>
        seat.lockedBy?.toString() === currentUser?._id && !seat.isBooked,
    );
  }, [seats, currentUser]);

  const totalAmount = selectedSeats.length * (event?.price || 0);

  const handleSeatClick = async (seat) => {
    const token = getToken();

    if (!token) {
      toast.error("Please login to continue");

      navigate("/login");

      return;
    }

    const isMine = seat.lockedBy?.toString() === currentUser?._id;

    const lockedByAnotherUser =
      seat.lockedBy && seat.lockedBy?.toString() !== currentUser?._id;

    if (seat.isBooked) {
      toast.error("Seat already booked");

      return;
    }

    if (lockedByAnotherUser) {
      toast.error("Seat temporarily locked");

      return;
    }

    try {
      setLockingSeatId(seat._id);

      // UNLOCK SEAT
      if (isMine) {
        await unlockSeat(seat._id);

        setSeats((prevSeats) =>
          prevSeats.map((s) =>
            s._id === seat._id
              ? {
                  ...s,

                  lockedBy: null,
                }
              : s,
          ),
        );

        toast.success(`${seat.seatNumber} removed`);

        return;
      }

      // LOCK SEAT
      const response = await lockSeat(seat._id);

      const updatedSeat = response.data;

      setSeats((prevSeats) =>
        prevSeats.map((s) => (s._id === updatedSeat._id ? updatedSeat : s)),
      );

      toast.success(`${updatedSeat.seatNumber} selected`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Seat action failed");
    } finally {
      setLockingSeatId(null);
    }
  };

  const handleBooking = async () => {
    try {
      const bookingPayload = {
        eventId: event._id,

        seatIds: selectedSeats.map((seat) => seat._id),
      };

      await createBooking(bookingPayload);

      toast.success("Booking confirmed");

      // REFRESH SEATS
      const updatedSeats = await getEventSeats(id);

      setSeats(updatedSeats);

      navigate("/my-bookings");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  const getRemainingTime = (expiresAt) => {
    if (!expiresAt) {
      return null;
    }

    const diff = new Date(expiresAt) - currentTime;

    if (diff <= 0) {
      return "Expired";
    }

    const minutes = Math.floor(diff / 1000 / 60);

    const seconds = Math.floor((diff / 1000) % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProceedBooking = async () => {
    try {
      // STEP 1
      // Create booking first

      const booking = await createBooking({
        eventId: event._id,

        seatIds: selectedSeats.map((seat) => seat._id),
      });

      // STEP 2
      // Create Razorpay order

      const order = await createOrder(booking._id);

      // STEP 3
      // Open Razorpay popup

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "LuxSeat",

        description: "Premium Event Booking",

        order_id: order.id,

        modal: {
          ondismiss: async function () {
            await markPaymentFailed(booking._id);

            toast.error("Payment cancelled");
          },
        },

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              bookingId: booking._id,
            });

            toast.success("Payment successful");

            navigate("/my-bookings");
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },

        theme: {
          color: "#D4AF37",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-background
          text-white
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />

      <div className="pt-36 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Event Info */}
          <GlassCard className="mb-10">
            <div
              className="
                flex
                flex-col
                md:flex-row
                justify-between
                gap-8
              "
            >
              <div>
                <h1
                  className="
                    text-5xl
                    font-bold
                    text-gold
                  "
                >
                  {event.title}
                </h1>

                <p className="text-zinc-400 mt-4">{event.description}</p>

                <div className="mt-6 space-y-2">
                  <p>Venue: {event.venue}</p>

                  <p>Date: {new Date(event.eventDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
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
                  <p className="text-zinc-400">Ticket Price</p>

                  <h2
                    className="
                      text-4xl
                      font-bold
                      text-gold
                      mt-2
                    "
                  >
                    ₹{event.price}
                  </h2>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Seats */}
          <GlassCard>
            <div
              className="
                flex
                flex-col
                lg:flex-row
                gap-12
              "
            >
              {/* Left */}
              <div className="flex-1">
                <div className="mb-10">
                  <h2
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    Select Seats
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Premium booking experience
                  </p>
                </div>

                {/* Screen */}
                <div className="mb-14">
                  <div
                    className="
                      w-full
                      h-5
                      rounded-full
                      bg-gradient-to-r
                      from-zinc-700
                      via-gold
                      to-zinc-700
                    "
                  />

                  <p
                    className="
                      text-center
                      text-zinc-500
                      mt-3
                    "
                  >
                    SCREEN
                  </p>
                </div>

                {/* Seat Grid */}
                <div
                  className="
                    grid
                    grid-cols-5
                    md:grid-cols-10
                    gap-4
                  "
                >
                  {seats.map((seat) => {
                    const isMine =
                      seat.lockedBy?.toString() === currentUser?._id;

                    const lockedByAnotherUser =
                      seat.lockedBy &&
                      seat.lockedBy?.toString() !== currentUser?._id;

                    return (
                      <button
                        key={seat._id}
                        onClick={() => handleSeatClick(seat)}
                        disabled={seat.isBooked || lockedByAnotherUser}
                        className={`
                          h-14
                          rounded-2xl
                          font-semibold
                          transition-all
                          duration-300

                          ${
                            seat.isBooked
                              ? "bg-rose-700 cursor-not-allowed"
                              : isMine
                                ? "bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                : lockedByAnotherUser
                                  ? "bg-amber-500 cursor-not-allowed"
                                  : "bg-zinc-800 hover:bg-zinc-700"
                          }

                          ${lockingSeatId === seat._id ? "animate-pulse" : ""}
                        `}
                      >
                        <div
                          className="
                            flex
                            flex-col
                            items-center
                            justify-center
                            leading-tight
                        "
                        >
                          <span>{seat.seatNumber}</span>

                          {isMine && seat.lockExpiresAt && (
                            <span
                              className="
                                text-[10px]
                                mt-1
                                "
                            >
                              {getRemainingTime(seat.lockExpiresAt)}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div className="lg:w-[350px]">
                <div
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                    sticky
                    top-32
                  "
                >
                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-gold
                    "
                  >
                    Booking Summary
                  </h2>

                  <div className="mt-8 space-y-6">
                    {/* Selected Seats */}
                    <div>
                      <p className="text-zinc-500">Selected Seats</p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedSeats.length > 0 ? (
                          selectedSeats.map((seat) => (
                            <div
                              key={seat._id}
                              className="
                                  px-3
                                  py-2
                                  rounded-xl
                                  bg-gold
                                  text-black
                                  font-semibold
                                "
                            >
                              {seat.seatNumber}
                            </div>
                          ))
                        ) : (
                          <p className="text-zinc-400">No seats selected</p>
                        )}
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-zinc-500">Total Amount</p>

                      <h2
                        className="
                          text-4xl
                          font-bold
                          text-gold
                          mt-2
                        "
                      >
                        ₹{totalAmount}
                      </h2>
                    </div>

                    {/* Proceed */}
                    <Button
                      className="w-full"
                      disabled={selectedSeats.length === 0}
                      onClick={handleProceedBooking}
                    >
                      Proceed To Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
