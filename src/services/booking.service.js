import axiosInstance from "../api/axios";

export const createBooking =
  async (bookingData) => {
    const response =
      await axiosInstance.post(
        "/bookings",
        bookingData
      );

    return response.data.data;
  };

export const getMyBookings =
  async () => {
    const response =
      await axiosInstance.get(
        "/bookings/my-bookings"
      );

    return response.data.data;
  };

export const cancelBooking =
  async (bookingId) => {
    const response =
      await axiosInstance.patch(
        `/bookings/${bookingId}/cancel`
      );

    return response.data;
  };