import axiosInstance from "../api/axios";

export const getAllEvents =
  async () => {
    const response =
      await axiosInstance.get(
        "/events"
      );

    return response.data.data;
  };

  export const getSingleEvent =
  async (eventId) => {
    const response =
      await axiosInstance.get(
        `/events/${eventId}`
      );

    return response.data.data;
  };

  export const deleteEvent =
  async (eventId) => {
    const response =
      await axiosInstance.delete(
        `/events/${eventId}`
      );

    return response.data;
  };

export const updateEvent =
  async (
    eventId,
    eventData
  ) => {
    const response =
      await axiosInstance.patch(
        `/events/${eventId}`,
        eventData
      );

    return response.data.data;
  };