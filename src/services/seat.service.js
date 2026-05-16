import axiosInstance from "../api/axios";

export const getEventSeats =
  async (eventId) => {
    const response =
      await axiosInstance.get(
        `/seats/${eventId}`
      );

    return response.data.data;
  };

export const lockSeat =
  async (seatId) => {
    const response =
      await axiosInstance.post(
        `/seats/lock/${seatId}`
      );

    return response.data;
  };

  export const unlockSeat =
  async (seatId) => {
    const response =
      await axiosInstance.post(
        `/seats/unlock/${seatId}`
      );

    return response.data;
  };