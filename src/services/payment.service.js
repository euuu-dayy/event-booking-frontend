import axiosInstance from "../api/axios";

export const createOrder =
  async (bookingId) => {
    const response =
      await axiosInstance.post(
        "/payments/create-order",
        {
          bookingId,
        },
      );

    return response.data.data;
  };

export const verifyPayment =
  async (paymentData) => {
    const response =
      await axiosInstance.post(
        "/payments/verify",
        paymentData,
      );

    return response.data;
  };

export const markPaymentFailed =
  async (bookingId) => {
    const response =
      await axiosInstance.post(
        "/payments/failed",
        {
          bookingId,
        },
      );

    return response.data;
  };